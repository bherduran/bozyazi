// HeroSea.jsx — Ana sayfa girişindeki 3D deniz ve Nagidos Adası
//
// React Three Fiber ile çizilen küçük bir sahne:
// - Deniz: dalgaları vertex shader'da hesaplanan yassı bir düzlem. Normaller
//   dalga formülünden analitik olarak hesaplanıyor, yüzey pürüzsüz görünüyor.
// - Ada: logodaki Nagidos Adası çizimi, ufukta bir düzlem üzerinde.
// - Gökyüzü yok: tuval şeffaf, arkadaki CSS gradyanı gökyüzü oluyor. Böylece
//   renkler mevcut tasarımla birebir aynı kalıyor.
// Bu dosya HeroSeaLoader tarafından lazy olarak yüklenir.

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE                     from 'three'

// Güneş: ufukta, sağda, adanın arkasında. Denizdeki altın parıltı (shader) böylece
// soldaki başlığın arkasına değil adanın önüne düşüyor; metin okunur kalıyor.
const SUN_DIR = new THREE.Vector3(0.55, 0.22, -1).normalize()

const waterVertex = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying vec3  vWorld;
  varying vec3  vNormal;

  // Her dalga hem yüksekliğe hem de eğime (normal için) katkı veriyor
  void addWave(vec2 p, vec2 dir, float freq, float speed, float amp,
               inout float h, inout vec2 grad) {
    vec2  d     = normalize(dir);
    float phase = dot(p, d) * freq + uTime * speed;
    h    += sin(phase) * amp;
    grad += d * cos(phase) * amp * freq;
  }

  void main() {
    vec3  p    = position;
    float h    = 0.0;
    vec2  grad = vec2(0.0);
    addWave(p.xy, vec2( 1.0,  0.3), 0.35, 0.9, 0.30, h, grad);
    addWave(p.xy, vec2(-0.4,  1.0), 0.62, 1.3, 0.15, h, grad);
    addWave(p.xy, vec2( 0.7, -0.6), 1.25, 1.9, 0.06, h, grad);
    addWave(p.xy, vec2(-0.9, -0.2), 2.10, 2.6, 0.025, h, grad);
    p.z += h;
    vHeight = h;

    // Düzlem yerelde XY, yukarısı +Z. Normal dalga eğiminden analitik olarak
    // geliyor; böylece yüzey fasetli değil pürüzsüz görünüyor.
    vec3 localNormal = normalize(vec3(-grad.x, -grad.y, 1.0));
    vNormal = normalize(mat3(modelMatrix) * localNormal);

    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const waterFragment = /* glsl */ `
  uniform vec3 uSun;
  varying float vHeight;
  varying vec3  vWorld;
  varying vec3  vNormal;

  void main() {
    vec3  n       = normalize(vNormal);
    vec3  viewDir = normalize(cameraPosition - vWorld);
    float diff    = clamp(dot(n, uSun), 0.0, 1.0);
    float spec    = pow(max(dot(reflect(-uSun, n), viewDir), 0.0), 140.0);
    // Yüzeye yatık bakınca su daha açık görünür (Fresnel)
    float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);

    // Palet: --deep, --azure, --gold-light
    vec3 deep  = vec3(0.024, 0.094, 0.141);
    vec3 azure = vec3(0.102, 0.420, 0.541);
    vec3 gold  = vec3(0.910, 0.722, 0.427);

    vec3 col = mix(deep, azure, smoothstep(-0.4, 0.5, vHeight) * 0.45 + diff * 0.2 + fresnel * 0.35);
    col += gold * spec * 0.55;

    // Ufka doğru şeffaflaş, arkadaki CSS gökyüzüyle yumuşakça birleşsin
    float dist = length(vWorld.xz - cameraPosition.xz);
    float fade = 1.0 - smoothstep(16.0, 34.0, dist);
    gl_FragColor = vec4(col, fade * 0.95);
  }
`

function Water() {
  const material = useRef()
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uSun: { value: SUN_DIR } }), [])

  useFrame((_, delta) => {
    // delta'yı sınırlıyoruz: sekme geri gelince dalgalar ileri sıçramasın
    material.current.uniforms.uTime.value += Math.min(delta, 0.05)
  })

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -10]}>
      <planeGeometry args={[70, 44, 200, 128]} />
      <shaderMaterial
        ref={material}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// Ada: logodaki Nagidos çizimi (public/nagidos-island.png), ufukta dikey bir
// düzlem üzerinde. Çizim zaten ışıklandırılmış olduğu için ışıktan etkilenmeyen
// bir materyal kullanıyoruz; rengi akşam havasına uysun diye biraz soğutuyoruz.
// Dalgalar önünden geçtiği için alt kenarı denize gömülmüş gibi görünüyor.
const ISLAND_ASPECT = 1272 / 272

function Island() {
  const aspect  = useThree(state => state.size.width / state.size.height)
  const texture = useLoader(THREE.TextureLoader, '/nagidos-island.png')
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  // Masaüstünde ada metnin karşısında (sağda) dursun. Dikey ekranlarda başlık
  // tüm genişliği kaplıyor ve ada tam arkasına düşüyor; orada sadece deniz kalsın.
  if (aspect < 0.8) return null
  const x = aspect > 1.2 ? 5.4 : 3.2
  const width = 11

  return (
    <mesh position={[x, width / ISLAND_ASPECT / 2 - 0.32, -17]}>
      <planeGeometry args={[width, width / ISLAND_ASPECT]} />
      <meshBasicMaterial map={texture} color="#a9b9c6" transparent alphaTest={0.02} toneMapped={false} />
    </mesh>
  )
}

// Kamera hafifçe salınır ve fareyi biraz takip eder. Tuval pointer olaylarını
// almıyor (üstündeki metin ve buton tıklanabilsin), bu yüzden fareyi
// pencereden dinliyoruz.
function CameraRig() {
  const pointer = useRef({ x: 0, y: 0 })
  const target  = useMemo(() => new THREE.Vector3(0, 0.7, -12), [])

  useEffect(() => {
    const onMove = e => {
      pointer.current.x = (e.clientX / window.innerWidth)  * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame(({ camera, clock }, delta) => {
    const t = clock.elapsedTime
    const k = 1 - Math.exp(-delta * 2)   // kare hızından bağımsız yumuşatma
    camera.position.x += (Math.sin(t * 0.12) * 0.35 + pointer.current.x * 0.6 - camera.position.x) * k
    camera.position.y += (1.55 + Math.sin(t * 0.21) * 0.07 - pointer.current.y * 0.18 - camera.position.y) * k
    camera.lookAt(target)
  })

  return null
}

export default function HeroSea({ active = true, onReady }) {
  return (
    <Canvas
      className="hero-sea-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.55, 6], fov: 50, near: 0.1, far: 80 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); onReady?.() }}
    >
      <Water />
      {/* Görsel yüklenene kadar deniz tek başına görünür */}
      <Suspense fallback={null}>
        <Island />
      </Suspense>
      <CameraRig />
    </Canvas>
  )
}
