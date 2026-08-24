// translations.js — Tüm çeviriler burada
//
// i18next nasıl çalışır?
// - Her dil için bir "namespace" (alan) tanımlarsın
// - t('key') ile metni çağırırsın
// - Dil değişince tüm t() çağrıları otomatik güncellenir
//
// Yapı: { dil: { namespace: { key: "değer" } } }

export const translations = {
  tr: {
    common: {
      // Navbar
      nav_home:     'Ana Sayfa',
      nav_discover: 'Keşfet',
      nav_nature:   'Doğa',
      nav_culture:  'Kültür',
      nav_gallery:  'Galeri',
      nav_assistant:'Rehber',
      nav_visit:    'Ziyaret',

      // Footer
      footer_tagline: "Toroslar'ın Denizle Buluştuğu Yer",
      footer_rights:  'Tüm hakları saklıdır.',
      footer_location: 'Mersin İli · Türkiye · Akdeniz Kıyısı',
    },

    home: {
      eyebrow:     "Mersin İli · Türkiye · Akdeniz Kıyısı",
      hero_title1: "Toroslar'ın",
      hero_title2: "Denizle",
      hero_title3: "Buluştuğu Yer",
      hero_sub:    "Dramatik dağların ve berrak Akdeniz'in kucağında saklı, el değmemiş bir kıyı cenneti — Bozyazı, alışılmışın dışına çıkma cesareti gösterenleri bekliyor.",
      hero_cta:    "İlçeyi Keşfet",
      scroll:      "Kaydır",

      about_label:  "Bozyazı Hakkında",
      about_title1: "Akdeniz'in",
      about_title2: "Gizli Cenneti",
      about_p1:     "Bozyazı; Mersin iline bağlı, muhteşem Toros Dağları ile pırıl pırıl Akdeniz arasına gizlenmiş, el değmemiş bir kıyı ilçesidir. Yaklaşık 26.000 kişilik nüfusuyla, büyük tatil beldelerinin çoktan yitirdiği özgünlüğünü koruyan ender yerlerden biridir.",
      about_p2:     "Bir zamanlar ziyaretçileri uzak tutan dağ yolları artık bu ilçenin cazibesinin bir parçası — bu yolculuğu göze alanlar kristal berraklığında sular, Helenistik dönemden kalma antik kentler ve samimi bir sıcaklıkla karşılaşır.",
      quote:        '"Zamanın gelgitiyle birlikte yavaşça aktığı, sessiz bir Akdeniz kıyısı."',
      quote_attr:   "— Bozyazı'dan bir seyyah izlenimi",

      stat_area:    'km² Yüzölçümü',
      stat_history: 'Yüzyıldan Gelen Tarih',
      stat_sun:     'Güneşli Gün / Yıl',
      stat_dist:    'km Batısında Mersin',

      preview_label:  'Sayfalar',
      preview_title1: 'Neyi Keşfetmek',
      preview_title2: 'İstersiniz?',

      preview_discover_tag:  'Antik & Tarihi',
      preview_discover_title:'Keşfet',
      preview_discover_desc: 'Nagidos Adası, Softa Kalesi, Maraş Tepesi ve daha fazlası.',
      preview_nature_tag:    'Doğal Güzellikler',
      preview_nature_title:  'Doğa',
      preview_nature_desc:   'Kristal Akdeniz, Toros yürüyüş rotaları, Çaltı Mağarası.',
      preview_culture_tag:   'Yaşam & Lezzet',
      preview_culture_title: 'Kültür',
      preview_culture_desc:  "Deniz ürünleri, yerel pazarlar, Türk misafirperverliği.",
      preview_gallery_tag:   'Fotoğraflar',
      preview_gallery_title: 'Galeri',
      preview_gallery_desc:  "Bozyazı'nın dört mevsim güzelliğini keşfedin.",
    },

    discover: {
      label:      'Mutlaka Görün',
      title1:     'İlçeyi',
      title2:     'Keşfedin',
      desc:       "Tepedeki antik kalelerden bozulmamış doğa parklarına — Bozyazı'nın her köşesinde meraklı bir gezgini bekleyen bir keşif gizlidir.",

      place1_tag:  'Antik Kent',
      place1_name: 'Nagidos Adası',
      place1_desc: "MÖ 4. yüzyılda Rodos ve Samos'un üssü olarak kurulan Helenistik yerleşim, Paşabeleni Tepesi'nde yer alır.",

      place2_tag:  'Kale',
      place2_name: 'Softa Kalesi',
      place2_desc: "İlçeye 4 km mesafede Fidik Dağı'ndaki gizemli kale; çift sıra duvarları ve efsanevi yeraltı tünelleriyle bilinir.",

      place3_tag:  'Tepe',
      place3_name: 'Maraş Tepesi',
      place3_desc: 'Yaklaşık 1.000 metre yükseklikte ilçeyi ve Akdeniz kıyısını kuşbakışı sunan tarihi tepe.',

      place4_tag:  'Mağara',
      place4_name: 'Çaltı Mağarası',
      place4_desc: '1.200 metre rakımda yakın zamanda turizme açılan bu mağara, Mersin\'in en yüksek doğal güzelliğidir.',

      place5_tag:  'Tabiat Parkı',
      place5_name: 'Dikilitaş Tabiat Parkı',
      place5_desc: 'Merkezine 15 km uzaklıkta, 33,5 hektarlık doğa parkı; kıyı çamları ve deniz sesiyle büyüler.',

      place6_tag:  'Marina',
      place6_name: 'Bozyazı Marinası',
      place6_desc: 'Tekne gezileri ve balıkçı teknelerinin yanaştığı küçük ama keyifli marina.',
    },

    nature: {
      label:  'Doğal Güzellikler',
      title1: 'Vahşi',
      title2: 'Güzellikle Dolu',
      desc:   'Toros zirvelerinden Akdeniz kıyısına uzanan bu eşsiz coğrafyada doğa her köşede farklı bir sürpriz saklar.',

      item1_title: 'Kristal Deniz',
      item1_desc:  "Bozyazı açıklarındaki Akdeniz suları eşsiz berraklığıyla ünlüdür; yüzme, şnorkelle dalış ve balık tutma için mükemmel.",
      item2_title: 'Toros Rotaları',
      item2_desc:  'Toros Dağları; zirvelerin sunduğu panoramik kıyı manzarasıyla birlikte kilometrelerce yürüyüş rotası barındırır.',
      item3_title: 'Çaltı Mağarası',
      item3_desc:  '1.200 metre rakımda yer alan bu doğal mucize, sarkıt ve dikitleriyle muhteşem bir yeraltı atmosferi sunar.',
      item4_title: 'Dikilitaş Parkı',
      item4_desc:  '33,5 hektarlık tabiat parkı; kıyı çamları, berrak hava ve deniz sesiyle sakinleşmek isteyenler için idealdir.',
      item5_title: 'Narenciye Bahçeleri',
      item5_desc:  'Ilıman kıyı şeridi; muz bahçeleri, portakal ve limon bağları ile bezenmiş canlı bir kültür peyzajıdır.',
      item6_title: 'Akdeniz Gün Batımları',
      item6_desc:  "Güneşin Toroslar'ın ardına çekilişini izlemek için Maraş Tepesi ya da sahil şeridi mükemmel manzara noktaları sunar.",

      activities_label: 'Aktiviteler',
      activities_title: 'Ne Yapabilirsiniz?',
      act1: 'Yüzme & Şnorkel',
      act2: 'Toros Yürüyüşü',
      act3: 'Mağara Keşfi',
      act4: 'Balık Tutma',
      act5: 'Doğa Fotoğrafçılığı',
      act6: 'Piknik & Kamp',
    },

    culture: {
      label:  'Kültür & Lezzet',
      title1: 'Yerel Hayatı',
      title2: 'Tadın',
      desc:   "Bozyazı yalnızca görülecek değil, yaşanacak bir yer. Sofrası, insanı ve ritmiyle sizi içine çeker.",

      item1_title: 'Deniz Ürünleri & Meze',
      item1_desc:  'Denize nazır restoranlarda günün en taze avını, geleneksel Türk meze sofrasıyla tadın.',
      item2_title: 'Türk Misafirperverliği',
      item2_desc:  "Bozyazı'da bir çay ya da kahve daveti asla tesadüf değildir — gerçek bir karşılama jestir.",
      item3_title: 'Yerel Pazarlar',
      item3_desc:  "İlçenin verimli kıyı şeridi Türkiye'nin en kaliteli muzunu, narenciyesini ve yerfıstığını yetiştirir.",
      item4_title: 'Deniz Kenarı Geceleri',
      item4_desc:  "Güneş Toroslar'ın ardına çekildiğinde kafeler Türk halk müziği ve fener ışıklarıyla canlanır.",
      item5_title: 'Arkeolojik Miras',
      item5_desc:  "Nagidos'tan çıkarılan eserler — antik gümüş sikkeler dahil — Mersin Müzesi'nde sergilenmektedir.",
      item6_title: 'Topluluk Ruhu',
      item6_desc:  "İlçenin küçük ölçeği herkesi birbirine yakın kılar. Pazarlar, liman, çay ocakları — gerçek hayat burada akar.",
    },

    gallery: {
      label:  'Fotoğraf Galerisi',
      title1: "Bozyazı'yı",
      title2: 'Gözlerle Keşfet',
      desc:   'Bir fotoğrafa tıkla, büyütülmüş hâlde görüntüle. Ok tuşlarıyla ya da ekrandaki butonlarla gezin.',
      hint:   'Fotoğraflarını /public/photos/ klasörüne ekle ve Gallery.jsx\'teki PHOTOS dizisini güncelle.',
      placeholder: 'Fotoğraf eklenecek',
    },

    assistant: {
      label:  'Yapay Zeka Rehber',
      title1: 'Bozyazı',
      title2: 'Rehberi',
      desc:   'Bozyazı hakkında aklına takılan her şeyi sor — gezilecek yerler, ulaşım, konaklama, yerel lezzetler.',
      placeholder: 'Bozyazı hakkında bir şey sor... (Enter ile gönder)',
      error:  'Bağlantı hatası oluştu. Lütfen tekrar dene.',
      error_rate_limit: 'Çok hızlı yazıyorsun 🙂 Bir dakika bekleyip tekrar dener misin?',
      initial_message: 'Merhaba! Ben Bozyazı Rehberi 🌊 Bozyazı hakkında merak ettiğin her şeyi sorabilirsin — gezilecek yerler, ulaşım, konaklama, yerel lezzetler... Nasıl yardımcı olabilirim?',
      suggestion1: "Bozyazı'ya nasıl gidebilirim?",
      suggestion2: 'En güzel plajlar hangileri?',
      suggestion3: 'Ne zaman gitmeliyim?',
      suggestion4: 'Konaklama seçenekleri neler?',
    },

    visit: {
      label:  'Yolculuğunuzu Planlayın',
      title1: 'Nasıl',
      title2: 'Gelinir & Kalınır',
      desc:   "Bozyazı'nın uzaklığı büyüsünün bir parçasıdır. Akdeniz kıyısından ya da Toros geçitlerinden yapılan yaklaşım, başlı başına bir yolculuktur.",

      card1_title: 'Nasıl Gidilir',
      card1_text:  "En yakın havalimanları Gazipaşa–Alanya (GZP) ve Antalya (AYT)'dır. Sahil yolu ya da Toros geçidiyle ulaşılabilir.",
      card2_title: 'En İyi Mevsim',
      card2_text:  'Mayıs–Ekim arası sıcak Akdeniz havası sunar. İlkbahar ve sonbahar Toros yürüyüşleri için idealdir.',
      card3_title: 'Nerede Kalınır',
      card3_text:  'Deniz manzaralı butik otellerden samimi yerel pansiyonlara geniş bir konaklama yelpazesi mevcuttur.',
      card4_title: 'Ne Yenir',
      card4_text:  'Taze deniz ürünleri, yerel mevsim sebzeleri ve Akdeniz mezelerinden oluşan sofraları kesinlikle deneyin.',
      card5_title: 'Konum',
      card5_text:  "Mersin'in 220 km batısında, Akdeniz kıyısında. 36°31′K, 32°57′D",
      card6_title: 'İpuçları',
      card6_text:  'Hafta sonu pazarını kaçırmayın. Dağ yollarında gün batımından sonra dikkatli sürün.',

      map_label: 'Harita',
      map_title1: "Bozyazı'yı",
      map_title2: 'Keşfedin',
      map_desc:   'Markerlara tıklayarak gezilecek yerleri keşfedin.',
    },
  },

  en: {
    common: {
      nav_home:     'Home',
      nav_discover: 'Discover',
      nav_nature:   'Nature',
      nav_culture:  'Culture',
      nav_gallery:  'Gallery',
      nav_assistant:'Guide',
      nav_visit:    'Visit',

      footer_tagline: 'Where the Taurus Mountains Meet the Sea',
      footer_rights:  'All rights reserved.',
      footer_location: 'Mersin Province · Turkey · Mediterranean Coast',
    },

    home: {
      eyebrow:     'Mersin Province · Turkey · Mediterranean Coast',
      hero_title1: 'Where the',
      hero_title2: 'Taurus',
      hero_title3: 'Meets the Sea',
      hero_sub:    'A pristine coastal paradise nestled between dramatic mountains and crystal-clear Mediterranean waters — Bozyazı awaits those who dare to go off the beaten path.',
      hero_cta:    'Explore the District',
      scroll:      'Scroll',

      about_label:  'About Bozyazı',
      about_title1: "The Mediterranean's",
      about_title2: 'Hidden Gem',
      about_p1:     "Bozyazı is a coastal district of Mersin Province, quietly nestled between the majestic Taurus Mountains and the sparkling Mediterranean Sea. With a population of around 26,000, it retains an authenticity that larger resort towns have long lost.",
      about_p2:     "The rugged mountain roads that once kept visitors away are now part of its charm — those who make the journey discover crystalline waters, ancient ruins dating to the Hellenistic era, and a warmth of community that feels genuinely Turkish.",
      quote:        '"A quiet shore where time drifts slowly, like the tide."',
      quote_attr:   '— A traveller\'s impression of Bozyazı',

      stat_area:    'km² District Area',
      stat_history: 'Century BC Origins',
      stat_sun:     'Sunny Days / Year',
      stat_dist:    'km West of Mersin',

      preview_label:  'Pages',
      preview_title1: 'What Would You',
      preview_title2: 'Like to Explore?',

      preview_discover_tag:  'Ancient & Historical',
      preview_discover_title:'Discover',
      preview_discover_desc: 'Nagidos Island, Softa Castle, Maraş Hill and more.',
      preview_nature_tag:    'Natural Beauty',
      preview_nature_title:  'Nature',
      preview_nature_desc:   'Crystal Mediterranean, Taurus hiking trails, Çaltı Cave.',
      preview_culture_tag:   'Life & Flavour',
      preview_culture_title: 'Culture',
      preview_culture_desc:  'Seafood, local markets, Turkish hospitality.',
      preview_gallery_tag:   'Photos',
      preview_gallery_title: 'Gallery',
      preview_gallery_desc:  'Discover Bozyazı\'s beauty across all four seasons.',
    },

    discover: {
      label:  'Must See',
      title1: 'Discover',
      title2: 'the District',
      desc:   'From hilltop ancient citadels to pristine nature parks — every corner of Bozyazı holds a discovery waiting for the curious traveller.',

      place1_tag:  'Ancient City',
      place1_name: 'Nagidos Island',
      place1_desc: 'A Hellenistic settlement founded in the 4th century BC as an outpost of Rhodes and Samos, located on Paşabeleni Hill.',

      place2_tag:  'Castle',
      place2_name: 'Softa Castle',
      place2_desc: 'A mysterious fortress on Fidik Mountain, 4 km from town, featuring double-row walls and legendary underground tunnels.',

      place3_tag:  'Hill',
      place3_name: 'Maraş Hill',
      place3_desc: 'At approximately 1,000 metres above sea level, this hill offers a bird\'s-eye view of the district and Mediterranean coastline.',

      place4_tag:  'Cave',
      place4_name: 'Çaltı Cave',
      place4_desc: 'Recently opened to tourism at 1,200 m altitude, this cave is the highest natural site in Mersin province.',

      place5_tag:  'Nature Park',
      place5_name: 'Dikilitaş Nature Park',
      place5_desc: 'A 33.5-hectare nature park 15 km from the district centre, ideal for walks amid coastal pines.',

      place6_tag:  'Marina',
      place6_name: 'Bozyazı Marina',
      place6_desc: 'A charming small marina for boat trips and fishing vessels, offering spectacular sunset views.',
    },

    nature: {
      label:  'Natural Beauty',
      title1: 'Alive with',
      title2: 'Wild Beauty',
      desc:   'From Taurus peaks to the Mediterranean shore, nature surprises at every corner of this unique landscape.',

      item1_title: 'Crystal Sea',
      item1_desc:  'The Mediterranean waters off Bozyazı are famously clear, ideal for swimming, snorkelling and fishing.',
      item2_title: 'Taurus Trails',
      item2_desc:  'The Taurus Mountains offer miles of hiking terrain with panoramic coastal views from the peaks.',
      item3_title: 'Çaltı Cave',
      item3_desc:  'This natural wonder at 1,200 m altitude features spectacular stalactites and stalagmites.',
      item4_title: 'Dikilitaş Park',
      item4_desc:  'A 33.5-hectare nature park perfect for peaceful walks amid coastal pines and sea sounds.',
      item5_title: 'Citrus Groves',
      item5_desc:  'The temperate coastal strip is lush with banana trees, citrus orchards, and olive groves.',
      item6_title: 'Mediterranean Sunsets',
      item6_desc:  'Watch the sun sink behind the Taurus from Maraş Hill or along the coast for breathtaking views.',

      activities_label: 'Activities',
      activities_title: 'What Can You Do?',
      act1: 'Swimming & Snorkelling',
      act2: 'Taurus Hiking',
      act3: 'Cave Exploration',
      act4: 'Fishing',
      act5: 'Nature Photography',
      act6: 'Picnic & Camping',
    },

    culture: {
      label:  'Culture & Flavour',
      title1: 'Taste',
      title2: 'Local Life',
      desc:   'Bozyazı is not just a place to see — it\'s a place to live. Its cuisine, people and rhythm draw you in.',

      item1_title: 'Seafood & Mezze',
      item1_desc:  'Dine at waterfront restaurants on the freshest catch of the day, with traditional Turkish mezze.',
      item2_title: 'Turkish Hospitality',
      item2_desc:  'An offer of tea or coffee in Bozyazı is never incidental — it is a genuine welcome.',
      item3_title: 'Local Markets',
      item3_desc:  "The district's fertile strip yields Turkey's finest bananas, citrus and groundnuts. Morning markets overflow with colour.",
      item4_title: 'Evenings by the Sea',
      item4_desc:  'As the sun sets, cafés come alive with Turkish folk music and lantern light over open water.',
      item5_title: 'Archaeological Heritage',
      item5_desc:  'Artefacts from Nagidos — including ancient silver coins — are displayed at Mersin Museum.',
      item6_title: 'Community Spirit',
      item6_desc:  "The district's small scale brings everyone together. Markets, the harbour, tea houses — real life unfolds here warmly.",
    },

    gallery: {
      label:  'Photo Gallery',
      title1: 'Discover Bozyazı',
      title2: 'Through the Lens',
      desc:   'Click a photo to view it enlarged. Navigate with arrow keys or the on-screen buttons.',
      hint:   'Add your photos to /public/photos/ and update the PHOTOS array in Gallery.jsx.',
      placeholder: 'Photo coming soon',
    },

    assistant: {
      label:  'AI Travel Guide',
      title1: 'Bozyazı',
      title2: 'Guide',
      desc:   'Ask anything about Bozyazı — places to visit, getting there, accommodation, local food.',
      placeholder: 'Ask something about Bozyazı... (Press Enter to send)',
      error:  'Connection error. Please try again.',
      error_rate_limit: 'That was a bit fast 🙂 Please wait a minute and try again.',
      initial_message: 'Hello! I\'m the Bozyazı Guide 🌊 You can ask me anything about Bozyazı — places to visit, getting there, accommodation, local food... How can I help?',
      suggestion1: 'How do I get to Bozyazı?',
      suggestion2: 'What are the best beaches?',
      suggestion3: 'When is the best time to visit?',
      suggestion4: 'What are the accommodation options?',
    },

    visit: {
      label:  'Plan Your Journey',
      title1: 'How to',
      title2: 'Arrive & Stay',
      desc:   "Bozyazı's remoteness is part of its magic. The approach — along the coast or down from the Taurus — is a journey in itself.",

      card1_title: 'Getting Here',
      card1_text:  'The closest airports are Gazipaşa–Alanya (GZP) and Antalya (AYT). A scenic coastal or mountain drive brings you in.',
      card2_title: 'Best Season',
      card2_text:  'May–October offers warm Mediterranean weather. Spring and autumn are ideal for Taurus hiking.',
      card3_title: 'Where to Stay',
      card3_text:  'Options range from boutique hotels with sea views to family-run pansiyons offering an authentic local experience.',
      card4_title: 'What to Eat',
      card4_text:  'Fresh seafood, local seasonal vegetables and Mediterranean mezze are absolute musts.',
      card5_title: 'Location',
      card5_text:  '220 km west of Mersin, on the Mediterranean coast. Coordinates: 36°31′N, 32°57′E',
      card6_title: 'Tips',
      card6_text:  "Don't miss the weekend market. Drive carefully on mountain roads after sunset.",

      map_label:  'Map',
      map_title1: 'Explore',
      map_title2: 'Bozyazı',
      map_desc:   'Click the markers to discover places to visit.',
    },
  },
}
