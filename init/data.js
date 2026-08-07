const sampleListings = [
  {
    title: "Overwater Bungalow in the Maldives",
    description: "Wake up above the crystal-clear turquoise lagoon in this iconic overwater bungalow. Your private deck comes with a glass floor panel to watch tropical fish below, a plunge pool, and a hammock swaying over the ocean. Breakfast is served by private butler. Ideal for honeymoons and bucket-list trips.",
    image: [
      { url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=80", filename: "maldives1" },
      { url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80", filename: "maldives2" }
    ],
    price: 6500,
    location: "North Malé Atoll",
    country: "Maldives",
    category: "Beachfront",
    geometry: { type: "Point", coordinates: [73.5, 4.17] },
    amenities: ["WiFi", "Air conditioning", "Private pool", "Kitchen", "Beach access"]
  },
  {
    title: "Cliffside Villa in Santorini",
    description: "Perched on the famous caldera cliffs of Oia, this whitewashed villa offers the most spectacular sunset views in the world. The cave-style architecture keeps you cool naturally, while the heated infinity pool seems to merge with the Aegean Sea. Walk to top restaurants and shops in minutes.",
    image: [
      { url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80", filename: "santorini1" },
      { url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80", filename: "santorini2" }
    ],
    price: 4200,
    location: "Oia, Santorini",
    country: "Greece",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [25.36, 36.46] },
    amenities: ["WiFi", "Air conditioning", "Private pool", "Kitchen", "Washer"]
  },
  {
    title: "Glass-Wall A-Frame in the Swiss Alps",
    description: "This architect-designed A-Frame chalet features floor-to-ceiling glass walls facing the Matterhorn. Ski-in/ski-out access from your front door, a wood-burning fireplace, and a hot tub on the snow-dusted deck. The fully stocked kitchen and wine cellar make evenings après-ski magical.",
    image: [
      { url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80", filename: "swiss1" },
      { url: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1200&q=80", filename: "swiss2" }
    ],
    price: 5500,
    location: "Zermatt",
    country: "Switzerland",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [7.74, 46.02] },
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot tub", "Parking"]
  },
  {
    title: "Luxury Treehouse in the Costa Rican Rainforest",
    description: "Suspended 20 metres above the jungle floor, this stunning treehouse gives you private access to a 15-metre waterfall and resident toucans at breakfast. The open-air bedroom is covered by a retractable glass roof for stargazing. Solar-powered, sustainably built, and utterly unforgettable.",
    image: [
      { url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?w=1200&q=80", filename: "treehouse1" },
      { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", filename: "treehouse2" }
    ],
    price: 1800,
    location: "Monteverde",
    country: "Costa Rica",
    category: "Domes",
    geometry: { type: "Point", coordinates: [-84.82, 10.31] },
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Beach access", "Washer"]
  },
  {
    title: "Historic Riad in Marrakech Medina",
    description: "Step through a carved wooden door into this 200-year-old riad, fully restored with hand-painted Zellige tilework, a mosaic courtyard fountain, and a rooftop terrace overlooking the medina. Three en-suite rooms, a hammam, and a private chef available. Walking distance to the famous Jemaa el-Fna square.",
    image: [
      { url: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1200&q=80", filename: "riad1" },
      { url: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&q=80", filename: "riad2" }
    ],
    price: 2200,
    location: "Marrakech",
    country: "Morocco",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [-7.98, 31.63] },
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Washer", "Parking"]
  },
  {
    title: "Beachfront Villa in Seminyak, Bali",
    description: "This 4-bedroom villa sits directly on Seminyak's famous black-sand beach. A 15-metre private pool runs parallel to the ocean, flanked by a sun deck with full-service poolside dining. The villa includes a daily breakfast spread, personal chef for dinners, and a chauffeur-driven car.",
    image: [
      { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80", filename: "bali1" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80", filename: "bali2" }
    ],
    price: 3800,
    location: "Seminyak, Bali",
    country: "Indonesia",
    category: "Beachfront",
    geometry: { type: "Point", coordinates: [115.16, -8.69] },
    amenities: ["WiFi", "Private pool", "Air conditioning", "Kitchen", "Beach access"]
  },
  {
    title: "Penthouse Suite in Manhattan",
    description: "Occupying the entire top floor of a landmark 1930s Art Deco building in Midtown Manhattan, this penthouse offers 360° views of the New York skyline from a wraparound private terrace. Interiors by a renowned designer feature marble bathrooms, a cinema room, and a chef's kitchen. Central Park is a 5-minute walk.",
    image: [
      { url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80", filename: "nyc1" },
      { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80", filename: "nyc2" }
    ],
    price: 8500,
    location: "Midtown Manhattan, New York City",
    country: "United States",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [-73.98, 40.75] },
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Washer", "Gym"]
  },
  {
    title: "Scottish Highland Castle Estate",
    description: "Built in 1742, this restored private castle sits on 300 acres of Highland wilderness with its own loch, deer stalking, and salmon fishing. Six grand bedrooms with four-poster beds, a formal dining room seating 20, and a tartan-clad drawing room with a roaring fireplace. Ghillie and cook included.",
    image: [
      { url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=1200&q=80", filename: "castle1" },
      { url: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=1200&q=80", filename: "castle2" }
    ],
    price: 9500,
    location: "Inverness",
    country: "United Kingdom",
    category: "Castles",
    geometry: { type: "Point", coordinates: [-4.22, 57.47] },
    amenities: ["WiFi", "Kitchen", "Fireplace", "Parking", "Washer"]
  },
  {
    title: "Luxury Safari Camp in Maasai Mara",
    description: "Sleep under canvas in this ultra-luxury tented camp on a private conservancy bordering the Maasai Mara. Each tent is 80 sq m with a four-poster king bed, copper bathtub, and a private veranda facing a waterhole where elephants and lions come to drink. Twice-daily game drives included.",
    image: [
      { url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80", filename: "safari1" },
      { url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80", filename: "safari2" }
    ],
    price: 7200,
    location: "Maasai Mara",
    country: "Kenya",
    category: "Camping",
    geometry: { type: "Point", coordinates: [35.14, -1.51] },
    amenities: ["Air conditioning", "Kitchen", "Beach access", "Washer", "Parking"]
  },
  {
    title: "Geo Dome Retreat in Iceland",
    description: "A geodesic dome on Iceland's Snæfellsnes Peninsula, perfectly positioned for Northern Lights viewing from your bed through the transparent panels. A central wood stove, sheepskin rugs, and a private outdoor hot tub make this one of the most romantic stays in Scandinavia. Glacier hike packages available.",
    image: [
      { url: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=1200&q=80", filename: "iceland1" },
      { url: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80", filename: "iceland2" }
    ],
    price: 3200,
    location: "Snæfellsnes",
    country: "Iceland",
    category: "Domes",
    geometry: { type: "Point", coordinates: [-23.77, 64.85] },
    amenities: ["WiFi", "Fireplace", "Hot tub", "Parking", "Kitchen"]
  },
  {
    title: "Tropical Overwater Villa in French Polynesia",
    description: "This award-winning overwater villa at a private island resort in Bora Bora features a master bedroom with direct lagoon access, a glass-floor living room, and a private boat mooring. The resident marine biologist can guide private reef snorkelling tours, and the on-site restaurant serves world-class French-Polynesian cuisine.",
    image: [
      { url: "https://images.unsplash.com/photo-1602391833977-358a52198938?w=1200&q=80", filename: "borabora1" },
      { url: "https://images.unsplash.com/photo-1468413253258-7bf2b3d56ae9?w=1200&q=80", filename: "borabora2" }
    ],
    price: 11000,
    location: "Bora Bora",
    country: "French Polynesia",
    category: "Tropical",
    geometry: { type: "Point", coordinates: [-151.74, -16.5] },
    amenities: ["WiFi", "Air conditioning", "Private pool", "Beach access", "Kitchen"]
  },
  {
    title: "Farmhouse Estate in Tuscany",
    description: "A beautifully restored 16th-century farmhouse set among 10 hectares of olive groves and vineyards in the Val d'Orcia. Four suites, a Michelin-starred breakfast, a heated outdoor pool, and a private wine cellar with 200 local labels. The property includes daily yoga sessions and a resident sommelier.",
    image: [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", filename: "tuscany1" },
      { url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=80", filename: "tuscany2" }
    ],
    price: 4800,
    location: "Val d'Orcia, Siena",
    country: "Italy",
    category: "Farms",
    geometry: { type: "Point", coordinates: [11.66, 43.05] },
    amenities: ["WiFi", "Private pool", "Kitchen", "Parking", "Washer"]
  },
  {
    title: "Ski-In/Ski-Out Chalet in Verbier",
    description: "One of the finest chalets in the Alps, this 6-bedroom property has its own indoor pool, cinema room, and professional-grade ski room. Breakfast prepared by a private chef is served in the panoramic dining room facing the Mont-Fort glacier. Steps from Verbier's famous après-ski restaurants and nightlife.",
    image: [
      { url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=1200&q=80", filename: "verbier1" },
      { url: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80", filename: "verbier2" }
    ],
    price: 12000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [7.22, 46.09] },
    amenities: ["WiFi", "Private pool", "Kitchen", "Fireplace", "Parking"]
  },
  {
    title: "Desert Luxury Camp in Wadi Rum",
    description: "Sleep under a billion stars in this luxury camp inside Jordan's Wadi Rum protected area. Private Bedouin-style domes include a king bed, floor heating, and panoramic windows facing the red sandstone cliffs. Sunrise camel rides, jeep tours, and dinner cooked over open fire are all included.",
    image: [
      { url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=80", filename: "wadirum1" },
      { url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80", filename: "wadirum2" }
    ],
    price: 2600,
    location: "Wadi Rum",
    country: "Jordan",
    category: "Camping",
    geometry: { type: "Point", coordinates: [35.41, 29.57] },
    amenities: ["Air conditioning", "Kitchen", "Parking", "Washer", "WiFi"]
  },
  {
    title: "Floating Houseboat in Dal Lake",
    description: "A heritage cedar-wood houseboat on the famous Dal Lake in Kashmir, decorated with hand-carved walnut panelling, Kashmiri carpets, and copper antiques. Waking up to a shikara bringing chai, lotus flowers, and fresh bread to your window is an experience unlike anywhere else on Earth.",
    image: [
      { url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?w=1200&q=80", filename: "kashmir1" },
      { url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=80", filename: "kashmir2" }
    ],
    price: 1400,
    location: "Dal Lake, Srinagar",
    country: "India",
    category: "Boats",
    geometry: { type: "Point", coordinates: [74.84, 34.09] },
    amenities: ["WiFi", "Kitchen", "Air conditioning", "Washer", "Parking"]
  },
  {
    title: "Modernist Villa in the Hollywood Hills",
    description: "Designed by a celebrated LA architect, this glass-and-concrete villa cantilevers over the canyon with unobstructed views from the Griffith Observatory to the Pacific. A 20-metre infinity pool, home cinema, and recording studio are just some of the features. Walking distance to Runyon Canyon trail.",
    image: [
      { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", filename: "la1" },
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", filename: "la2" }
    ],
    price: 7800,
    location: "Hollywood Hills, Los Angeles",
    country: "United States",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [-118.32, 34.11] },
    amenities: ["WiFi", "Private pool", "Air conditioning", "Kitchen", "Gym"]
  },
  {
    title: "Traditional Ryokan in Kyoto",
    description: "An authentic 10-room ryokan in Kyoto's historic Higashiyama district, just steps from Kiyomizudera Temple. Rooms are tatami-floored with futon bedding, shoji screens, and private onsen baths. A multi-course kaiseki dinner is prepared by a chef with 30 years of training in traditional Japanese cuisine.",
    image: [
      { url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=80", filename: "kyoto1" },
      { url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80", filename: "kyoto2" }
    ],
    price: 3100,
    location: "Higashiyama, Kyoto",
    country: "Japan",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [135.78, 34.99] },
    amenities: ["WiFi", "Air conditioning", "Kitchen", "Washer", "Parking"]
  },
  {
    title: "Arctic Glass Cabin in Finnish Lapland",
    description: "A thermally insulated glass cabin in the Finnish wilderness, designed to keep you warm while offering 360° views of the Arctic sky. Each cabin has a private sauna, a heated lounge, and is positioned on a frozen lake for snowmobile and ice fishing access. The Northern Lights appear here over 200 nights per year.",
    image: [
      { url: "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=1200&q=80", filename: "lapland1" },
      { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80", filename: "lapland2" }
    ],
    price: 4400,
    location: "Saariselkä, Lapland",
    country: "Finland",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [27.42, 68.42] },
    amenities: ["WiFi", "Fireplace", "Hot tub", "Parking", "Kitchen"]
  },
  {
    title: "Canal-Side Houseboat in Amsterdam",
    description: "A lovingly restored 1920s barge moored on the Prinsengracht canal, minutes from the Anne Frank House and the Rijksmuseum. The fully modernised interior features an open-plan kitchen, rooftop sun deck, and a charming living room with original oak beams. Bicycles included for exploring the city.",
    image: [
      { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80", filename: "amsterdam1" },
      { url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80", filename: "amsterdam2" }
    ],
    price: 1900,
    location: "Prinsengracht, Amsterdam",
    country: "Netherlands",
    category: "Boats",
    geometry: { type: "Point", coordinates: [4.88, 52.37] },
    amenities: ["WiFi", "Kitchen", "Washer", "Parking", "Air conditioning"]
  },
  {
    title: "Clifftop Eco-Lodge in Big Sur",
    description: "Perched 300 feet above the Pacific on the Big Sur cliffs, this sustainably built lodge is entirely off-grid with solar power and a living green roof. Each suite opens onto a private terrace with unobstructed ocean views. Guided foraging walks, sea kayaking, and a wood-fired hot tub make this a truly special retreat.",
    image: [
      { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80", filename: "bigsur1" },
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80", filename: "bigsur2" }
    ],
    price: 3600,
    location: "Big Sur, California",
    country: "United States",
    category: "Beachfront",
    geometry: { type: "Point", coordinates: [-121.78, 36.27] },
    amenities: ["WiFi", "Hot tub", "Kitchen", "Fireplace", "Parking"]
  }
];

module.exports = { data: sampleListings };