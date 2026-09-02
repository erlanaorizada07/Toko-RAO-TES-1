/**
 * RAO Adventure Gear - Data Store
 * Slogan: "Never Ending Adventure"
 * Berisi konfigurasi Basecamp, stok produk (inStock & stockCount), alat sewa per hari, checklist pendaki, info puncak gunung & cuaca, serta event open trip.
 */

const RAO_DATA = {
  config: {
    brandName: "RAO",
    subBrand: "Adventure Gear",
    slogan: "Never Ending Adventure",
    sellerPhone: "6281234567890", // Ganti dengan nomor WhatsApp Basecamp RAO (format internasional tanpa tanda +)
    sellerPhoneFormatted: "+62 812-3456-7890",
    sellerEmail: "basecamp@rao-adventure.id",
    sellerAddress: "Basecamp RAO Adventure, Jl. Puncak Rimba No. 99, Jalur Pendakian Mandalawangi, Jawa Barat",
    operatingHours: {
      weekdays: "Senin - Jumat: 08:00 - 22:00 WIB",
      weekends: "Sabtu - Minggu: 24 Jam (Siap Layani Drop/Ambil Alat Tektok & Weekend Camp)"
    },
    socials: {
      instagram: "@rao.adventuregear",
      youtube: "RAO Mountain Journey",
      tiktok: "@rao.outdoor"
    }
  },

  categories: {
    products: ["Semua", "Ultralight & Tektok", "Carrier & Tas Gunung", "Tenda & Shelter", "Masak & Dapur Camp", "Apparel & Sepatu", "Navigasi & Lampu"],
    rentals: ["Semua", "Tenda Dome & Shelter", "Carrier & Daypack", "Cooking Set & Kompor", "Matras & Sleeping Bag", "Aksesoris & Trekking", "Paket Camp Lengkap"],
    events: ["Semua", "Open Trip Gunung", "Tektok Challenge", "Camping Ceria", "Workshop & Ekspedisi"]
  },

  // --- Daftar Info Puncak Gunung Terfavorit & Cuaca ---
  mountainPeaks: [
    {
      id: "peak-01",
      name: "Gunung Rinjani",
      altitude: "3.726 MDPL",
      location: "Lombok, NTB",
      tempRange: "4°C - 15°C",
      difficulty: "Ekspedisi Berat",
      highlight: "Danau Segara Anak & Plawangan Sembalun",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "peak-02",
      name: "Gunung Semeru (Mahameru)",
      altitude: "3.676 MDPL",
      location: "Lumajang / Malang, Jatim",
      tempRange: "2°C - 12°C",
      difficulty: "Ekspedisi Tinggi",
      highlight: "Danau Ranukumbolo & Oro-Oro Ombo",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "peak-03",
      name: "Gunung Merbabu",
      altitude: "3.145 MDPL",
      location: "Boyolali / Magelang, Jateng",
      tempRange: "6°C - 16°C",
      difficulty: "Menengah (Sabana View)",
      highlight: "Sabana 1 & 2 serta View Gunung Merapi",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "peak-04",
      name: "Gunung Gede Pangrango",
      altitude: "2.958 MDPL",
      location: "Cianjur / Bogor, Jabar",
      tempRange: "8°C - 18°C",
      difficulty: "Tektok / Pemula Siap Fisik",
      highlight: "Alun-Alun Surya Kencana (Edelweis)",
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "peak-05",
      name: "Gunung Prau",
      altitude: "2.565 MDPL",
      location: "Wonosobo (Dieng), Jateng",
      tempRange: "5°C - 16°C",
      difficulty: "Pemula Friendly",
      highlight: "Golden Sunrise Terbaik Asia Tenggara",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "peak-06",
      name: "Gunung Papandayan",
      altitude: "2.665 MDPL",
      location: "Garut, Jabar",
      tempRange: "10°C - 20°C",
      difficulty: "Sangat Santai & Family",
      highlight: "Hutan Mati & Kawah Belerang Eksotis",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
    }
  ],

  // --- Checklist Interaktif Perlengkapan Mendaki ---
  packingChecklist: [
    { id: "chk-1", label: "Tenda Dome Double Layer (Anti Bocor & Badai)", category: "Shelter", checked: true },
    { id: "chk-2", label: "Sleeping Bag Polar / Bulang Hangat", category: "Tidur Nyenyak", checked: true },
    { id: "chk-3", label: "Matras Foil / Matras Angin Inflatable", category: "Tidur Nyenyak", checked: true },
    { id: "chk-4", label: "Carrier 45L - 60L + Raincover", category: "Packing", checked: true },
    { id: "chk-5", label: "Kompor Mini Windproof + Gas Kaleng & Nesting", category: "Dapur Camp", checked: false },
    { id: "chk-6", label: "Headlamp Terang (1000+ Lumens) & Baterai Cadangan", category: "Penerangan", checked: false },
    { id: "chk-7", label: "Jaket Windproof / Waterproof 3-Layer", category: "Pakaian", checked: false },
    { id: "chk-8", label: "Sepasang Trekking Pole (Peredam Beban Lutut)", category: "Trekking", checked: false },
    { id: "chk-9", label: "Kotak P3K Medis Pribadi & Obat Anti Hipotermia", category: "Keselamatan", checked: false }
  ],

  products: [
    {
      id: "prod-01",
      name: "RAO Apex Ultralight Carbon Trekking Pole (Pair)",
      category: "Ultralight & Tektok",
      price: 485000,
      originalPrice: 580000,
      discount: "16%",
      rating: 4.9,
      sold: 380,
      badge: "Favorit Tektok",
      elevationBadge: "3.726 MDPL Tested",
      inStock: true,
      stockCount: 18,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Trekking pole 100% serat karbon 3-section lipat super ringan hanya 165 gram per batang dengan grip busa EVA ergonomis.",
      fullDesc: "Dirancang khusus bagi para pendaki cepat (tektok) dan long-distance hiker yang membutuhkan keringanan maksimal tanpa mengorbankan stabilitas. Menggunakan sistem Quick Power Lock logam yang kokoh dan ujung tungsten carbide anti-selip di batuan terjal.",
      specs: [
        "Material: 100% 3K Carbon Fiber",
        "Panjang Terlipat: 36 cm (Mudah masuk ke side-pocket tas tektok)",
        "Panjang Operasional: 105 cm - 135 cm (Adjustable)",
        "Bobot: 165 gram / batang",
        "Grip: Extended High-density EVA Foam with Breathable Wrist Strap",
        "Kelengkapan: Mud Basket, Snow Basket, Rubber Tip Protectors, Carrying Bag"
      ]
    },
    {
      id: "prod-02",
      name: "RAO Summit Pro 60+10L Expedition Carrier",
      category: "Carrier & Tas Gunung",
      price: 1350000,
      originalPrice: 1600000,
      discount: "15%",
      rating: 5.0,
      sold: 210,
      badge: "Best Seller",
      elevationBadge: "Ekspedisi Heavy",
      inStock: true,
      stockCount: 8,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Carrier ekspedisi berkapasitas besar dengan teknologi backsystem Airflow Ergonomic, frame alumunium ganda, dan include raincover.",
      fullDesc: "Carrier tangguh untuk pendakian gunung 3-7 hari. Sistem punggung dapat diatur (Torso Adjustable S/M/L) untuk mendistribusikan beban secara merata ke pinggul sehingga pundak tidak cepat pegal. Dilengkapi bukaan depan (Front Access U-Zip) untuk mengambil sleeping bag dengan cepat.",
      specs: [
        "Kapasitas: 60L + 10L Expandable Top Lid",
        "Bahan: Ripstop Nylon 420D Water-repellent + Cordura Base 1000D",
        "Backsystem: 3D Mesh Air-Ventilation dengan Dual Curved Alloy Frame",
        "Kompartemen: Main Chamber, Sleeping Bag Compartment, Dual Side Pockets, Hipbelt Pockets",
        "Fitur Tambahan: Ice Axe / Trekking Pole Loops, Hydration Bladder Port 3L, Integrated Raincover"
      ]
    },
    {
      id: "prod-03",
      name: "RAO Strato 2P Ultralight Double Layer Tent",
      category: "Tenda & Shelter",
      price: 1250000,
      originalPrice: 1450000,
      discount: "14%",
      rating: 4.9,
      sold: 165,
      badge: "Anti Badai",
      elevationBadge: "4 Season Ready",
      inStock: true,
      stockCount: 3, // Low stock demo
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Tenda gunung 2 orang double layer free-standing dengan frame duralumin aero 7001 dan ketahanan air 4000mm PU.",
      fullDesc: "Tenda 4-season ringan seberat 1.8 kg yang telah teruji menghadapi cuaca ekstrem di puncak gunung Indonesia (Gunung Slamet, Rinjani, Semeru). Dilengkapi vestibule ganda untuk menaruh carrier dan memasak saat cuaca hujan.",
      specs: [
        "Kapasitas: 2 Orang + Ruang Simpan Tas Luas",
        "Flysheet: 20D Nylon Ripstop Silnylon Coating (Waterproof 4000mm)",
        "Inner Tent: B3 Breathable High-density Mesh + 20D Ripstop",
        "Alas (Floor): 210T Polyester Oxford (Waterproof 5000mm PU)",
        "Frame & Pasak: 7001 Aerospace Grade Duralumin Alloy",
        "Total Berat: 1.85 kg (Termasuk footprint & pasak)"
      ]
    },
    {
      id: "prod-04",
      name: "RAO PyroFlame Micro Titanium Stove + Nesting Set",
      category: "Masak & Dapur Camp",
      price: 395000,
      originalPrice: 470000,
      discount: "16%",
      rating: 4.8,
      sold: 530,
      badge: "Hemat Tempat",
      elevationBadge: "Windproof Core",
      inStock: true,
      stockCount: 25,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Kompor ultralight lipat 45 gram dengan piezo electric starter dan paket panci nesting anodized anti-lengket.",
      fullDesc: "Set memasak ringkas untuk solo hiking atau grup 2 orang. Panci nesting mampu menampung tabung gas can dan kepala kompor di dalamnya saat dipacking, menghemat ruang di dalam tas ransel.",
      specs: [
        "Kepala Kompor: Titanium Alloy 45 gram (Daya Bakar 3200W, Mendidihkan 1L air dalam 3.2 menit)",
        "Nesting: Hard-anodized Food-grade Aluminium 0.8L Pot + 0.4L Pan/Lid",
        "Grip: Handle silikon anti-panas yang dapat dilipat",
        "Kelengkapan: Kompor Lipat, Nesting Pot, Spons Cuci, Kantong Jaring Mesh"
      ]
    },
    {
      id: "prod-05",
      name: "RAO Glacier Shield Waterproof Windbreaker Jacket",
      category: "Apparel & Sepatu",
      price: 520000,
      originalPrice: 620000,
      discount: "16%",
      rating: 4.9,
      sold: 290,
      badge: "Wajib Bawa",
      elevationBadge: "Anti Hipotermia",
      inStock: false, // Out of stock demo
      stockCount: 0,
      image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Jaket gunung 3-layer waterproof 10.000mm dengan seam-sealed taping dan ventilasi ketiak (pit-zip) anti-gerah.",
      fullDesc: "Pelindung utama dari hembusan angin kencang (windproof 100%) dan badai hujan di savana / puncak gunung. Memiliki inner lining micro-mesh yang lembut dan tudung storm-hood yang bisa disesuaikan.",
      specs: [
        "Material: 3-Layer Toray Membrane (Waterproof 10.000mm, Breathability 8.000g/m²/24h)",
        "Seam Sealed: Full Taped Seams di seluruh sambungan jahitan",
        "Zipper: YKK Aquaguard Waterproof Zippers",
        "Fitur: Dual Pit-Zip Ventilation, Adjustable Velcro Cuffs, 3 Kantong Luar + 1 Kantong Dada Dalam"
      ]
    },
    {
      id: "prod-06",
      name: "RAO SpeedTrek 12L Ultralight Vest Pack",
      category: "Ultralight & Tektok",
      price: 425000,
      originalPrice: 495000,
      discount: "14%",
      rating: 4.9,
      sold: 410,
      badge: "Tektok Series",
      elevationBadge: "One Day Summit",
      inStock: true,
      stockCount: 15,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Tas rompi tektok dan trail running dengan kompartemen water bladder 2L dan dual soft-flask chest pocket.",
      fullDesc: "Tas andalan bagi pendaki tektok yang ingin bergerak cepat dan lincah dari basecamp menuju puncak gunung tanpa membawa beban berlebih. Sistem penguncian dada ganda mencegah goncangan saat berlari di medan turunan.",
      specs: [
        "Kapasitas: 12 Liter + Eksternal Bungee Cord",
        "Bahan: 70D Diamond Ripstop Nylon + Breathable 3D Mesh Back",
        "Slot Botol: 2x Saku Dada Depan (Muat Soft Flask 500ml) + 1x Slot Water Bladder 2L",
        "Trekking Pole Attachment: Holder tongkat lipat di bagian depan & bawah",
        "Berat Kosong: 240 gram"
      ]
    },
    {
      id: "prod-07",
      name: "RAO TerraGrip Vibram Waterproof Hiking Boots",
      category: "Apparel & Sepatu",
      price: 890000,
      originalPrice: 1050000,
      discount: "15%",
      rating: 4.9,
      sold: 145,
      badge: "Anti Selip",
      elevationBadge: "All-Terrain Grip",
      inStock: true,
      stockCount: 12,
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Sepatu mid-cut pendakian dengan outsole Vibram Megagrip, toe cap pelindung jari, dan membran breathable waterproof.",
      fullDesc: "Sepatu gunung kokoh yang melindungi pergelangan kaki dari cedera terkilir di jalur berbatu curam dan tanah berlumpur licin. Dilengkapi insole Ortholite yang empuk dan anti-bakteri.",
      specs: [
        "Outsole: Vibram Megagrip Compound dengan lugs 5mm",
        "Upper: Suede Leather + High-abrasion Mesh",
        "Membran: RAO-Dry Waterproof Breathable Bootie",
        "Protection: Rubber Toe Bumper & Reinforced Heel Counter",
        "Ukuran: 39, 40, 41, 42, 43, 44"
      ]
    },
    {
      id: "prod-08",
      name: "RAO NightGlow 1200 Lumens Headlamp + USB Type-C",
      category: "Navigasi & Lampu",
      price: 235000,
      originalPrice: 280000,
      discount: "16%",
      rating: 4.8,
      sold: 620,
      badge: "Super Terang",
      elevationBadge: "Night Summit Ready",
      inStock: true,
      stockCount: 30,
      image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Headlamp 1200 lumens dengan sensor lambaian tangan (motion sensor), lampu merah SOS, dan baterai tahan hingga 14 jam.",
      fullDesc: "Senter kepala wajib untuk summit attack tengah malam. Memiliki 5 mode pencahayaan (High, Medium, Low, Red Light, Red SOS Strobe) serta rating tahan air IPX6 terhadap hujan lebat.",
      specs: [
        "Intensitas: 1200 Lumens (Jangkauan Sorot hingga 150 meter)",
        "Baterai: Built-in Lithium 1800mAh Rechargeable Type-C Fast Charging",
        "Fitur Cerdas: Sensor Gerak Tangan untuk On/Off otomatis tanpa sentuh",
        "Ketahanan: IPX6 Waterproof & Drop-proof 1.5 meter",
        "Berat: 72 gram ultra-ringan di dahi"
      ]
    }
  ],

  rentals: [
    {
      id: "rent-01",
      name: "Tenda Dome 2P Ultralight Double Layer",
      category: "Tenda Dome & Shelter",
      dailyPrice: 45000,
      weeklyPrice: 240000,
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      badge: "Solo / Duo Camp",
      inStock: true,
      stockCount: 14,
      depositInfo: "KTP Asli / SIM Asli (1 Identitas)",
      shortDesc: "Tenda 2 orang double layer ringan 1.8kg anti badai. Cocok untuk tektok camp atau pasangan pendaki.",
      includes: [
        "1x Inner Tent 2P + 1x Flysheet Waterproof 3000mm",
        "1x Set Frame Alloy Duralumin Ringan",
        "10x Pasak Baja + Tali Guyline",
        "1x Tas Tenda Ringkas"
      ],
      specs: [
        "Kapasitas: 2 Orang + Teras Masak",
        "Ukuran: 210 x 140 x 110 cm",
        "Kondisi: 100% Utuh, Bersih Laundry & Bebas Bocor"
      ]
    },
    {
      id: "rent-02",
      name: "Tenda Dome 4P Double Layer (Great Outdoor / Arpenaz)",
      category: "Tenda Dome & Shelter",
      dailyPrice: 65000,
      weeklyPrice: 350000,
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
      badge: "Paling Laris",
      inStock: true,
      stockCount: 22,
      depositInfo: "KTP Asli / SIM Asli (1 Identitas per Tenda)",
      shortDesc: "Tenda kapasitas 4 orang double layer anti badai & anti rembes air. Sudah dicuci bersih & disemprot desinfektan tiap sewa.",
      includes: [
        "1x Inner Tent Kapasitas 4 Orang",
        "1x Outer Flysheet Waterproof 3000mm",
        "1x Set Frame Fiber / Alloy Lengkap",
        "12x Pasak Baja + Tali Guyline Reflektif",
        "1x Tas Penyimpanan Tenda Praktis"
      ],
      specs: [
        "Kapasitas: 4 Orang Dewasa (Plus Carrier di Teras)",
        "Ukuran: 210 x 210 x 135 cm",
        "Kondisi: 100% Utuh, Bersih, Wangi & Bebas Bocor",
        "Instalasi: Mudah dirakit dalam waktu 5-10 menit"
      ]
    },
    {
      id: "rent-03",
      name: "Tenda Dome 6P Ekspedisi & Family Room",
      category: "Tenda Dome & Shelter",
      dailyPrice: 95000,
      weeklyPrice: 520000,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      badge: "Kapasitas Besar",
      inStock: true,
      stockCount: 2, // Low stock demo
      depositInfo: "KTP Asli + Deposit Rp 100.000",
      shortDesc: "Tenda ekstra luas untuk rombongan 6 orang dengan teras lebar untuk ruang santai kumpul keluarga.",
      includes: [
        "1x Inner Tent 6P Jumbo + Outer Flysheet Full Coverage",
        "1x Set Frame Heavy Duty + Pasak Tebal 14 Pcs",
        "1x Tas Jinjing Tenda Besar"
      ],
      specs: [
        "Kapasitas: 6 Orang Dewasa",
        "Ukuran: 280 x 240 x 170 cm (Bisa berdiri di dalam)",
        "Ketahanan: Waterproof 4000mm PU"
      ]
    },
    {
      id: "rent-04",
      name: "Carrier Osprey / Deuter 60L + Raincover",
      category: "Carrier & Daypack",
      dailyPrice: 45000,
      weeklyPrice: 240000,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      badge: "Punggung Nyaman",
      inStock: true,
      stockCount: 16,
      depositInfo: "KTP Asli / Kartu Pelajar + SIM",
      shortDesc: "Carrier ergonomis dengan backsystem empuk mendistribusikan beban secara ideal untuk pendakian 2-4 hari.",
      includes: [
        "1x Carrier 60 Liter (Deuter / Osprey Series)",
        "1x Raincover Waterproof Tebal",
        "Pemeriksaan Resleting & Buckle sebelum diserahkan"
      ],
      specs: [
        "Kapasitas: 60 Liter (Muat Sleeping bag, Tenda, Logistik & Baju ganti)",
        "Backsystem: Mesh Air-Contact Foam yang sejuk di punggung",
        "Bahan: Heavy Duty Cordura Nylon"
      ]
    },
    {
      id: "rent-05",
      name: "Daypack Tektok 25L Ultralight",
      category: "Carrier & Daypack",
      dailyPrice: 25000,
      weeklyPrice: 130000,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      badge: "Khusus Tektok",
      inStock: false, // Out of stock demo (sedang disewa semua)
      stockCount: 0,
      depositInfo: "KTP Asli / SIM",
      shortDesc: "Tas ransel ringan 25 liter khusus pendakian tektok 1 hari tanpa menginap.",
      includes: [
        "1x Daypack 25L Ringan",
        "1x Raincover Daypack"
      ],
      specs: [
        "Kapasitas: 25 Liter",
        "Fitur: Slot Water Bladder, Tali Dada & Tali Pinggang"
      ]
    },
    {
      id: "rent-06",
      name: "Paket Masak Komplit (Kompor Mawar + Nesting DS-308)",
      category: "Cooking Set & Kompor",
      dailyPrice: 30000,
      weeklyPrice: 160000,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
      badge: "Wajib Masak",
      inStock: true,
      stockCount: 30,
      depositInfo: "KTP Asli / ID Karyawan",
      shortDesc: "Paket lengkap kompor gunung mawar anti-angin plus satu set panci nesting tebal untuk masak nasi, sup, dan kopi di puncak.",
      includes: [
        "1x Kompor Bunga Mawar Windproof dengan Pemantik",
        "1x Nesting Panci DS-308 (Panci Besar, Sedang, Wajan Frypan, Mangkok Mini, Centong)",
        "1x Tas Jaring Nesting"
      ],
      specs: [
        "Kompatibilitas: Tabung Gas Kaleng Butane / Hi-Cook",
        "Bahan Panci: Anodized Aluminium Higienis & Mudah Dicuci"
      ]
    },
    {
      id: "rent-07",
      name: "Sleeping Bag Polar Dacron Bulu Tebal",
      category: "Matras & Sleeping Bag",
      dailyPrice: 20000,
      weeklyPrice: 100000,
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      badge: "Hangat Nyaman",
      inStock: true,
      stockCount: 40,
      depositInfo: "Identitas Diri Asli",
      shortDesc: "Kombinasi tidur hangat penahan suhu dingin ekstrem hingga 5°C di tenda, wangi dan dicuci laundry setiap selesai dipakai.",
      includes: [
        "1x Sleeping Bag Polar Dacron / Bulu Tebal (Comfort Zone 5°C - 15°C)"
      ],
      specs: [
        "Model: Mummy / Envelope dengan hoodie penutup kepala",
        "Ukuran: 205 x 75 cm"
      ]
    },
    {
      id: "rent-08",
      name: "Matras Tiup Inflatable Angin (Self-Inflating)",
      category: "Matras & Sleeping Bag",
      dailyPrice: 25000,
      weeklyPrice: 130000,
      image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
      badge: "Tidur Empuk",
      inStock: true,
      stockCount: 20,
      depositInfo: "Identitas Diri",
      shortDesc: "Matras angin tebal 5cm menahan dingin tanah berbatu agar tidur di tenda senyaman kasur hotel.",
      includes: [
        "1x Matras Inflatable Angin + Bantal Terintegrasi",
        "1x Kantong Pouch Pompa / Penyimpanan"
      ],
      specs: [
        "Tebal: 5 cm",
        "Ukuran: 190 x 60 cm"
      ]
    },
    {
      id: "rent-09",
      name: "Headlamp LED 1000 Lumens + Baterai",
      category: "Aksesoris & Trekking",
      dailyPrice: 15000,
      weeklyPrice: 80000,
      image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
      badge: "Terang Benderang",
      inStock: true,
      stockCount: 35,
      depositInfo: "Identitas Diri",
      shortDesc: "Senter kepala penerang jalan untuk summit attack malam hari di jalur berbatu.",
      includes: [
        "1x Headlamp LED 1000 Lumens",
        "1x Set Baterai Siap Pakai"
      ],
      specs: [
        "Daya Sorot: Hingga 100 meter",
        "Mode: Terang, Redup, SOS"
      ]
    },
    {
      id: "rent-10",
      name: "Sepasang Trekking Pole Aluminium Anti-Shock",
      category: "Aksesoris & Trekking",
      dailyPrice: 20000,
      weeklyPrice: 100000,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      badge: "Lutut Aman",
      inStock: true,
      stockCount: 28,
      depositInfo: "Identitas Diri",
      shortDesc: "Sepasang tongkat mendaki pegas anti-shock meredam beban lutut saat turunan curam.",
      includes: [
        "2x Trekking Pole Aluminium Alloy 7075",
        "2x Rubber Tip & Mud Basket"
      ],
      specs: [
        "Panjang: 65 - 135 cm (Adjustable)"
      ]
    },
    {
      id: "rent-11",
      name: "Paket Super Camping Ceria 4 Orang (All-in-One)",
      category: "Paket Camp Lengkap",
      dailyPrice: 165000,
      weeklyPrice: 850000,
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      badge: "Paling Hemat & Komplit",
      inStock: true,
      stockCount: 10,
      depositInfo: "KTP Asli Penyewa + DP Booking 30%",
      shortDesc: "Paket komplit untuk kelompok 4 orang: Tenda 4P, 4 Sleeping Bag, 4 Matras, 1 Set Kompor & Nesting, plus 1 Lentera Tenda LED.",
      includes: [
        "1x Tenda Dome Double Layer Kapasitas 4P",
        "4x Sleeping Bag Hangat (Sudah Laundry)",
        "4x Matras Lapisan Alumunium Foil",
        "1x Set Kompor Windproof + Nesting DS-308",
        "1x Lampu Lentera Tenda Camping LED Rechargeable",
        "1x Flysheet Tambahan 3x4 Meter untuk Ruang Santai"
      ],
      specs: [
        "Kapasitas: Pas untuk 4 Orang Sahabat / Keluarga",
        "Hemat hingga 40% dibanding sewa satuan",
        "Gratis Konsultasi Packing & Pemasangan Tenda"
      ]
    },
    {
      id: "rent-12",
      name: "Paket Tektok Kilat 1 Orang (Solo Fast Hike)",
      category: "Paket Camp Lengkap",
      dailyPrice: 75000,
      weeklyPrice: 390000,
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      badge: "Paket Tektok",
      inStock: true,
      stockCount: 15,
      depositInfo: "KTP / SIM Asli",
      shortDesc: "Paket ringkas siap tektok: 1 Daypack 25L, 1 Pasang Trekking Pole, 1 Headlamp Terang, plus 1 Windbreaker Poncho.",
      includes: [
        "1x Daypack Ultralight 25L",
        "2x Trekking Pole Aluminium",
        "1x Headlamp LED 1000 Lumens",
        "1x Jas Hujan Poncho Ultralight"
      ],
      specs: [
        "Total Berat Alat: < 1.2 kg"
      ]
    }
  ],

  events: [
    {
      id: "evt-01",
      title: "Open Trip: Sunrise Summit Gunung Prau 2565 MDPL (Dieng)",
      category: "Open Trip Gunung",
      altitude: "2.565 MDPL",
      difficulty: "Pemula Friendly",
      difficultyClass: "diff-badge-easy",
      date: "17 - 18 Oktober 2026",
      time: "2 Hari 1 Malam (Mepo Basecamp Patakbanteng)",
      location: "Gunung Prau, Wonosobo, Jawa Tengah",
      price: 475000,
      originalPrice: 600000,
      status: "Pendaftaran Dibuka",
      badge: "Golden Sunrise",
      quotaLeft: 8,
      speaker: "Guide Berlisensi APGI + Porter Tim RAO",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      description: "Nikmati keindahan Golden Sunrise terbaik se-Asia Tenggara dengan latar belakang Gunung Sindoro & Sumbing. Jalur ramah pemula dan didampingi tim medis serta fotografer outdoor.",
      facilities: ["Tenda & Matras Sudah Dipasangkan Tim", "Makan 3x Selama di Gunung", "Simaksi & Asuransi Pendakian", "Dokumentasi Foto & Video Drone", "P3K Standar Gunung"],
      agenda: [
        "Day 1 (08:00): Kumpul di Basecamp, Briefing & Mulai Pendakian Santai",
        "Day 1 (14:00): Tiba di Sunrise Camp, Istirahat, Sunset Hunting & Makan Malam",
        "Day 2 (05:00): Wake up Call Golden Sunrise Hunting & Foto Bersama",
        "Day 2 (08:00): Sarapan, Packing, Perjalanan Turun & Penyerahan Sertifikat"
      ]
    },
    {
      id: "evt-02",
      title: "Tektok Mountain Challenge: Gn. Gede Pangrango 2958 MDPL",
      category: "Tektok Challenge",
      altitude: "2.958 MDPL",
      difficulty: "Tektok / Fisik Prima",
      difficultyClass: "diff-badge-tektok",
      date: "24 Oktober 2026",
      time: "03:00 - 18:00 WIB (One Day Summit)",
      location: "Taman Nasional Gunung Gede Pangrango, Jawa Barat",
      price: 285000,
      originalPrice: 350000,
      status: "Khusus Fisik Prima",
      badge: "Ultralight Tektok",
      quotaLeft: 12,
      speaker: "Tim Trail Runner & Fast Hiker RAO",
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80",
      description: "Tantangan mendaki tektok (tanpa bermalam) menggapai puncak Gunung Gede 2958 MDPL dengan gaya ultralight hiking. Cocok untuk menguji ketahanan fisik dan kecepatan mendaki.",
      facilities: ["Simaksi Resmi TNGGP & Asuransi", "Sweeper & Leader Berpengalaman", "Water Station & Energy Gel Bar", "Jersey Eksklusif Finisher Tektok RAO", "Medali Logam Finisher"],
      agenda: [
        "02:30 : Registrasi Ulang di Basecamp RAO Cibodas",
        "03:00 : Start Mendaki Melewati Pos Telaga Biru & Kandang Badak",
        "09:30 : Target Tiba di Puncak Kawah Gunung Gede & Alun-Alun Surya Kencana",
        "11:30 : Memulai Perjalanan Turun",
        "17:30 : Tiba Kembali di Basecamp & Penyerahan Medali"
      ]
    },
    {
      id: "evt-03",
      title: "Open Trip: Savana 360° Gunung Merbabu via Selo 3145 MDPL",
      category: "Open Trip Gunung",
      altitude: "3.145 MDPL",
      difficulty: "Menengah",
      difficultyClass: "diff-badge-medium",
      date: "31 Okt - 01 Nov 2026",
      time: "2 Hari 1 Malam (Mepo Basecamp Selo, Boyolali)",
      location: "Gunung Merbabu, Jawa Tengah",
      price: 580000,
      originalPrice: 700000,
      status: "Sisa 6 Slot",
      badge: "Lautan Awan",
      quotaLeft: 6,
      speaker: "Guide APGI & Fotografer Landscape",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Menikmati hamparan sabana hijau luas di Pos 4 & 5 serta pemandangan gagah Gunung Merapi di hadapan mata. Berkemah di bawah taburan jutaan bintang galaksi Bima Sakti.",
      facilities: ["Tenda Dome Double Layer 4P", "Makan Enak 3x & Coffee Break", "Tiket Simaksi Online BTNGMb", "P3K & Oksigen Darurat", "Dokumentasi Foto Landscape"],
      agenda: [
        "Day 1 (07:30): Registrasi di Basecamp Selo & Mulai Trekking",
        "Day 1 (13:30): Tiba di Sabana 1 / Sabana 2, Sunset Hunting & Gala Dinner Camp",
        "Day 2 (04:30): Summit Attack Puncak Kenteng Songo & Triangulasi",
        "Day 2 (08:30): Sarapan di Camp, Turun ke Basecamp & Penutupan Trip"
      ]
    },
    {
      id: "evt-04",
      title: "Camping Ceria & Sunrise Hunting Kawah Gunung Papandayan",
      category: "Camping Ceria",
      altitude: "2.665 MDPL",
      difficulty: "Sangat Santai",
      difficultyClass: "diff-badge-easy",
      date: "07 - 08 November 2026",
      time: "2 Hari 1 Malam (Mepo Parkiran Camp David)",
      location: "Gunung Papandayan, Garut, Jawa Barat",
      price: 390000,
      originalPrice: 480000,
      status: "Ramah Keluarga",
      badge: "Family Friendly",
      quotaLeft: 14,
      speaker: "Tim Pendamping Family RAO",
      image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80",
      description: "Jelajahi Hutan Mati yang eksotis, Kawah Belerang aktif, dan padang bunga Edelweis Tegal Alun dengan jalur landai yang aman untuk pendaki pemula, wanita, dan anak-anak.",
      facilities: ["Tenda Dome Siap Pakai di Pondok Saladah", "Makan Barbeque Camp & Sarapan", "Tiket Masuk TWA Papandayan", "Pemandu & Porter Fasilitator"],
      agenda: [
        "Day 1 (09:00): Kumpul di Camp David, Jalan Santai Melewati Kawah",
        "Day 1 (12:00): Tiba di Pondok Saladah, Barbeque Malam & Api Unggun",
        "Day 2 (05:30): Sunrise Hunting di Hutan Mati & Tegal Alun",
        "Day 2 (11:00): Turun Kembali ke Camp David"
      ]
    },
    {
      id: "evt-05",
      title: "Workshop: Navigasi Darat, Peta Kompas & Survival Rimba",
      category: "Workshop & Ekspedisi",
      altitude: "1.200 MDPL",
      difficulty: "Skill Lapangan",
      difficultyClass: "diff-badge-medium",
      date: "14 November 2026",
      time: "08:30 - 16:30 WIB (One Day Class)",
      location: "Hutan Pendidikan & Basecamp RAO Adventure",
      price: 180000,
      originalPrice: 250000,
      status: "Praktek Langsung",
      badge: "Outdoor Skill",
      quotaLeft: 15,
      speaker: "Instruktur SAR & Navigasi Gunung Senior",
      image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80",
      description: "Kuasai kemampuan vital membaca peta topografi (kontur), menentukan sudut kompas bidik (Azimuth & Back-Azimuth), teknik resection/intersection, hingga membuat bivak darurat saat tersesat.",
      facilities: ["Peta Topografi Fisik & Busur Navigasi", "Makan Siang Rimba & Coffee Break", "Hands-on Kompas Bidik Suunto", "E-Sertifikat Keterampilan Navigasi"],
      agenda: [
        "08:30 - 10:30 : Teori Membaca Garis Kontur, Skala & Koordinat Grid",
        "10:30 - 12:30 : Praktek Bidik Kompas & Menentukan Posisi di Hutan",
        "12:30 - 13:30 : Ishoma",
        "13:30 - 16:30 : Simulasi Orientasi Medan Hutan & Pembuatan Bivak Survival"
      ]
    },
    {
      id: "evt-06",
      title: "Ekspedisi Akbar: 4D3N Puncak Rinjani 3726 MDPL & Segara Anak",
      category: "Workshop & Ekspedisi",
      altitude: "3.726 MDPL",
      difficulty: "Ekspedisi Berat",
      difficultyClass: "diff-badge-hard",
      date: "19 - 22 November 2026",
      time: "4 Hari 3 Malam (Mepo Bandara Lombok LOP)",
      location: "Taman Nasional Gunung Rinjani, Lombok, NTB",
      price: 1850000,
      originalPrice: 2200000,
      status: "Slot Terbatas",
      badge: "Seven Summits",
      quotaLeft: 4,
      speaker: "Chief Expedition Leader RAO + Porter Lokal Sembalun",
      image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80",
      description: "Perjalanan impian menaklukkan atap Pulau Lombok 3726 MDPL. Berkemah di Plawangan Sembalun dan bermalam di tepi Danau Kawah Segara Anak yang magis dengan pemandangan Gunung Barujari.",
      facilities: ["Transportasi Bandara - Basecamp PP", "Tiket Masuk TNGR & Asuransi", "Tenda & Logistik Lengkap Dimasak Porter", "Pemandu Berlisensi & Porter Tim", "Dokumentasi Lengkap"],
      agenda: [
        "Day 1: Penjemputan Lombok, Menuju Sembalun & Aklimatisasi",
        "Day 2: Trekking Sembalun ke Plawangan Sembalun (Camp 1)",
        "Day 3: Summit Attack 3726 MDPL Sunrise, Turun ke Danau Segara Anak (Camp 2)",
        "Day 4: Trekking Turun via Senaru, Penjemputan & Wisata Kuliner Lombok"
      ]
    },
    {
      id: "evt-07",
      title: "Ekspedisi Mahameru: Atap Pulau Jawa Gunung Semeru 3676 MDPL",
      category: "Workshop & Ekspedisi",
      altitude: "3.676 MDPL",
      difficulty: "Ekspedisi Tinggi",
      difficultyClass: "diff-badge-hard",
      date: "26 - 29 November 2026",
      time: "4 Hari 3 Malam (Mepo Stasiun Malang Kotabaru)",
      location: "Taman Nasional Bromo Tengger Semeru, Jawa Timur",
      price: 1650000,
      originalPrice: 1950000,
      status: "Pendaftaran Dibuka",
      badge: "Atap Jawa",
      quotaLeft: 7,
      speaker: "Senior Expedition Guide RAO",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      description: "Menapakkan kaki di Ranukumbolo yang legendaris, mendaki Tanjakan Cinta, melintasi Oro-Oro Ombo berlapis bunga Verbena, hingga menggapai Puncak Abadi Mahameru 3676 MDPL.",
      facilities: ["Jeep Hardtop Malang - Ranu Pane PP", "Simaksi & Surat Izin Dokter", "Tenda, Matras & Makanan Dimasak Tim", "Guide APGI & Dokumentasi Video"],
      agenda: [
        "Day 1: Malang ke Ranu Pane, Trekking ke Ranukumbolo (Camp 1)",
        "Day 2: Ranukumbolo ke Kalimati via Oro-Oro Ombo (Camp 2)",
        "Day 3: 00:00 Summit Attack Mahameru, Sunrise Puncak, Turun ke Ranukumbolo",
        "Day 4: Ranukumbolo ke Ranu Pane & Kembali ke Stasiun Malang"
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Rian Hidayat",
      role: "Trail Runner & Tektoker Gunung",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Trekking pole carbon RAO enteng banget pas dipakai tektok Gunung Gede 6 jam pulang pergi! Pelayanan sewa alat di basecamp-nya juga 24 jam jadi gampang ambil alat pas subuh."
    },
    {
      id: 2,
      name: "Annisa Larasati",
      role: "Leader Komunitas Pendaki Cantik",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Ikut Open Trip Prau bareng RAO Adventure seru abis! Tendanya bersih wangi, makanannya enak dimasakin tim, dan guide-nya ramah banget ngebantuin pas jalur nanjak."
    },
    {
      id: 3,
      name: "Fahmi Pratama",
      role: "Solo Backpacker & Outdoor Enthusiast",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      comment: "Sewa tenda 4P dan carrier di RAO kondisinya selalu terawat 100%, gak pernah ada resleting macet atau tenda bocor. Harga sewa paket komplitnya paling murah di kelasnya."
    }
  ],

  faqs: [
    {
      q: "Bagaimana cara mengatur apakah sebuah barang ada stoknya atau tidak?",
      a: "Status stok diatur langsung di file data melalui properti 'inStock: true/false' dan 'stockCount: number'. Jika stok bernilai 0 atau false, sistem akan otomatis menampilkan label 'Stok Habis / Sedang Disewa', menonaktifkan tombol beli/sewa, dan memunculkan tombol 'Tanya Restock via WhatsApp'."
    },
    {
      q: "Bagaimana cara menentukan berapa hari sewa alat camping di RAO?",
      a: "Anda bisa langsung memilih durasi hari sewa (1 Hari, 2 Hari, 3 Hari, atau 1 Minggu) langsung pada kartu alat sewa atau di dalam modal booking. Harga akan langsung terkalkulasi secara otomatis sesuai jumlah hari yang Anda pilih."
    },
    {
      q: "Apakah harga sewa setiap barang berbeda?",
      a: "Ya, setiap barang memiliki tarif sewa tersendiri yang sangat fleksibel, mulai dari alat satuan seperti headlamp (Rp 15.000/hari), sleeping bag (Rp 20.000/hari), tenda 2P-6P (Rp 45.000 - Rp 95.000/hari), hingga paket hemat camping keluarga 4 orang (Rp 165.000/hari)."
    },
    {
      q: "Apa saja syarat jaminan saat mengambil alat sewa?",
      a: "Penyewa wajib menitipkan 1 identitas asli yang masih berlaku (KTP / SIM / Kartu Pelajar + Kartu Keluarga). Untuk grup atau penyewaan jumlah banyak (lebih dari 3 tenda), dapat menggunakan jaminan KTP penanggung jawab plus uang deposit yang dikembalikan penuh saat alat kembali utuh."
    },
    {
      q: "Apakah alat sewa di RAO Adventure terjamin bersih dan tidak bocor?",
      a: "Seluruh tenda, sleeping bag, dan matras selalu dicuci bersih, dijemur kering, dan disemprot desinfektan aroma segar setelah setiap pemakaian. Tenda juga telah melalui uji ketahanan air (QC) sebelum diserahkan."
    },
    {
      q: "Apakah pemula yang belum pernah naik gunung boleh ikut Open Trip RAO?",
      a: "Tentu sangat boleh! Khusus untuk open trip Gunung Prau dan Camping Ceria Papandayan didesain sangat ramah pemula (*beginner friendly*). Anda akan dipandu oleh guide profesional bersertifikasi APGI yang siap mendampingi tempo jalan Anda."
    }
  ],

  stats: [
    { label: "Pendaki & Klien Petualang", value: "10,500+" },
    { label: "Peralatan Sewa Siap Pakai", value: "650+" },
    { label: "Puncak Gunung Terjamah", value: "54 Puncak" },
    { label: "Rating Kepuasan Komunitas", value: "4.9 / 5.0" }
  ]
};

// Ekspor objek ke window agar mudah diakses di browser
window.RAO_DATA = RAO_DATA;
