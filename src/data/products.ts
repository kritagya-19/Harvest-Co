/**
 * Product catalog for Harvest & Co.
 * Organized by 4 main categories matching the brand brief.
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  icon: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  tags: string[];
  weight?: string;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  features: { title: string; description: string }[];
}

// ─── Category Definitions ───────────────────────────────────────

export const categories: CategoryInfo[] = [
  {
    slug: 'fruits',
    name: 'Fresh Fruits',
    tagline: 'Sweet, juicy, and naturally fresh.',
    description: 'Explore our carefully selected collection of premium, farm-fresh organic fruits. Every fruit is 100% organic, chemical-free, freshly harvested, and meets our premium quality standards.',
    icon: '🍊',
    color: '#D45B0C',
    features: [
      { title: '100% Organic', description: 'Grown naturally without harmful chemicals or synthetic pesticides.' },
      { title: 'Freshly Harvested', description: 'Picked at peak ripeness and delivered within 24–48 hours.' },
      { title: 'Chemical-Free Promise', description: 'No wax coatings, no artificial ripening agents, ever.' },
      { title: 'Premium Selection', description: 'Only the finest seasonal fruits make it into our collection.' },
    ],
  },
  {
    slug: 'nuts',
    name: 'Premium Nuts',
    tagline: 'Protein-rich everyday nutrition.',
    description: 'Our premium nuts are naturally sourced, carefully processed, and packed with nutrition. Free from artificial chemicals and preservatives—just pure, wholesome goodness.',
    icon: '🌰',
    color: '#8B5E3C',
    features: [
      { title: 'Naturally Processed', description: 'Minimal processing to retain maximum nutrition and flavor.' },
      { title: 'Farm-Direct Sourcing', description: 'Sourced from the finest orchards across Kashmir, California, and beyond.' },
      { title: 'Preservative-Free', description: 'No artificial chemicals, colors, or preservatives added.' },
      { title: 'Rich in Nutrients', description: 'Packed with healthy fats, protein, fiber, and essential minerals.' },
    ],
  },
  {
    slug: 'salads',
    name: 'Fresh Fruit Salads',
    tagline: 'Made fresh daily, nutrient rich and delicious.',
    description: 'Delicious fruit salads prepared using our own premium fruits. Every salad is made fresh daily, nutrient rich, hygienically prepared, and free from artificial ingredients.',
    icon: '🥗',
    color: '#2D8B46',
    features: [
      { title: 'Made Fresh Daily', description: 'Prepared every morning using the freshest seasonal fruits.' },
      { title: 'Nutrient Rich', description: 'A perfect balance of vitamins, minerals, and natural sugars.' },
      { title: 'Hygienically Prepared', description: 'Prepared in FSSAI-certified kitchens with strict hygiene protocols.' },
      { title: 'No Artificial Ingredients', description: 'No preservatives, sweeteners, or artificial flavors.' },
    ],
  },
  {
    slug: 'juices',
    name: 'Fresh Fruit Juices',
    tagline: 'Refreshing flavors crafted from the freshest fruits.',
    description: 'Our juices are made using real fruits with no artificial flavors or preservatives. Freshly prepared, 100% natural, rich in vitamins and nutrients for a truly refreshing experience.',
    icon: '🍹',
    color: '#C74B16',
    features: [
      { title: 'Freshly Prepared', description: 'Cold-pressed and bottled within hours of preparation.' },
      { title: '100% Natural', description: 'Made from real fruits—no concentrates, no added water.' },
      { title: 'No Preservatives', description: 'Consume within 48 hours for the freshest experience.' },
      { title: 'Rich in Vitamins', description: 'Loaded with vitamins C, A, and essential antioxidants.' },
    ],
  },
];

// ─── Product Catalog ────────────────────────────────────────────

export const allProducts: Product[] = [
  // ── Fresh Fruits ──
  {
    id: 'fruit-1',
    name: 'Organic Alphonso Mangoes',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 599,
    originalPrice: 999,
    icon: 'mango.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 1254,
    description: 'Premium Ratnagiri Alphonso mangoes, hand-picked at peak ripeness. Known for their rich, creamy texture and intense sweetness.',
    tags: ['Organic', 'Seasonal', 'Premium'],
    weight: '1 Box (6 pcs)',
  },
  {
    id: 'fruit-2',
    name: 'Exotic Dragon Fruit',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 349,
    originalPrice: 549,
    icon: 'dragonfruit.png',
    badge: 'Exotic',
    rating: 4.7,
    reviewCount: 438,
    description: 'Vibrant pink-skinned dragon fruit with sweet, mild flavor and stunning speckled white flesh. Rich in antioxidants.',
    tags: ['Organic', 'Exotic', 'Antioxidant-Rich'],
    weight: '2 pcs',
  },
  {
    id: 'fruit-5',
    name: 'Nagpur Valencia Oranges',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 199,
    originalPrice: 329,
    icon: 'orange.png',
    rating: 4.7,
    reviewCount: 932,
    description: 'Juicy, seedless Nagpur oranges with a tangy-sweet flavor. Perfect for fresh juice or eating as-is.',
    tags: ['Organic', 'Vitamin-C Rich', 'Seasonal'],
    weight: '1 kg',
  },
  {
    id: 'fruit-6',
    name: 'Premium Avocados',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 399,
    originalPrice: 599,
    icon: 'avocado.png',
    badge: 'New',
    rating: 4.5,
    reviewCount: 312,
    description: 'Creamy Hass avocados, perfectly ripe and ready to eat. Great for guacamole, toast, or salads.',
    tags: ['Organic', 'Healthy Fats', 'Premium'],
    weight: '4 pcs',
  },
  {
    id: 'fruit-7',
    name: 'Ruby Pomegranates',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 179,
    originalPrice: 299,
    icon: 'pomegranate.png',
    rating: 4.6,
    reviewCount: 584,
    description: 'Juicy Bhagwa pomegranates with ruby-red arils. Packed with antioxidants, fiber, and vitamins.',
    tags: ['Organic', 'Antioxidant-Rich', 'Seasonal'],
    weight: '1 kg',
  },
  {
    id: 'fruit-8',
    name: 'Golden Kiwi Premium',
    category: 'Fresh Fruits',
    categorySlug: 'fruits',
    price: 299,
    originalPrice: 499,
    icon: 'kiwi.png',
    badge: 'Imported',
    rating: 4.4,
    reviewCount: 276,
    description: 'Sweet golden kiwis from New Zealand. Smooth skin, tropical flavor, and incredibly rich in Vitamin C.',
    tags: ['Organic', 'Imported', 'Vitamin-C Rich'],
    weight: '6 pcs',
  },

  // ── Premium Nuts ──
  {
    id: 'nut-1',
    name: 'Premium Kashmiri Walnuts',
    category: 'Premium Nuts',
    categorySlug: 'nuts',
    price: 400,
    originalPrice: 649,
    icon: 'walnuts.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 1456,
    description: 'Light-colored, crunchy Kashmiri walnuts with a mild, buttery flavor. Rich in omega-3 fatty acids.',
    tags: ['Organic', 'Omega-3 Rich', 'Premium'],
    weight: '500g',
  },
  {
    id: 'nut-2',
    name: 'California Premium Almonds',
    category: 'Premium Nuts',
    categorySlug: 'nuts',
    price: 349,
    originalPrice: 549,
    icon: 'almonds.png',
    rating: 4.8,
    reviewCount: 2103,
    description: 'Crunchy, natural California almonds. An excellent source of protein, healthy fats, and vitamin E.',
    tags: ['Organic', 'High-Protein', 'Chemical-Free'],
    weight: '500g',
  },
  {
    id: 'nut-3',
    name: 'Goan Premium Cashews',
    category: 'Premium Nuts',
    categorySlug: 'nuts',
    price: 499,
    originalPrice: 799,
    icon: 'cashews.png',
    badge: 'Premium',
    rating: 4.8,
    reviewCount: 987,
    description: 'W240-grade whole cashews from Goa. Creamy, buttery, and perfect for snacking or cooking.',
    tags: ['Organic', 'Premium Grade', 'Naturally Processed'],
    weight: '500g',
  },
  {
    id: 'nut-5',
    name: 'Iranian Roasted Pistachios',
    category: 'Premium Nuts',
    categorySlug: 'nuts',
    price: 599,
    originalPrice: 899,
    icon: 'pistachios.png',
    badge: 'Popular',
    rating: 4.7,
    reviewCount: 756,
    description: 'Lightly salted, perfectly roasted Iranian pistachios. A satisfying crunch with every bite.',
    tags: ['Premium', 'Lightly Salted', 'High-Protein'],
    weight: '400g',
  },
  {
    id: 'nut-7',
    name: 'Organic Mixed Nuts Premium',
    category: 'Premium Nuts',
    categorySlug: 'nuts',
    price: 649,
    originalPrice: 999,
    icon: 'mixednuts.png',
    badge: 'Best Seller',
    rating: 4.9,
    reviewCount: 1254,
    description: 'A curated blend of almonds, cashews, walnuts, and pistachios. The ultimate everyday nutrition mix.',
    tags: ['Organic', 'Mixed', 'High-Protein'],
    weight: '500g',
  },

  // ── Fresh Fruit Salads ──
  {
    id: 'salad-1',
    name: 'Classic Tropical Mix Bowl',
    category: 'Fresh Fruit Salads',
    categorySlug: 'salads',
    price: 199,
    originalPrice: 329,
    icon: 'salad_tropical_mix.png',
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 876,
    description: 'A vibrant mix of mango, pineapple, kiwi, and pomegranate seeds. Topped with a honey-lime drizzle.',
    tags: ['Fresh Daily', 'Nutrient-Rich', 'No Preservatives'],
    weight: '300g Bowl',
  },
  {
    id: 'salad-2',
    name: 'Tropical Paradise Bowl',
    category: 'Fresh Fruit Salads',
    categorySlug: 'salads',
    price: 249,
    originalPrice: 399,
    icon: 'tropicalparadise.jpeg',
    badge: 'Popular',
    rating: 4.7,
    reviewCount: 654,
    description: 'Dragon fruit, passion fruit, mango, and coconut flakes with a tropical mint dressing. Paradise in a bowl.',
    tags: ['Exotic', 'Fresh Daily', 'Vitamin-Rich'],
    weight: '350g Bowl',
  },
  {
    id: 'salad-3',
    name: 'Berry Burst Bowl',
    category: 'Fresh Fruit Salads',
    categorySlug: 'salads',
    price: 279,
    originalPrice: 449,
    icon: 'salad_berry_burst.png',
    badge: 'Superfood',
    rating: 4.9,
    reviewCount: 543,
    description: 'A superfood blend of blueberries, strawberries, raspberries, and acai. Topped with chia seeds and granola.',
    tags: ['Superfood', 'Antioxidant-Rich', 'High-Fiber'],
    weight: '300g Bowl',
  },
  {
    id: 'salad-5',
    name: 'Detox Green Bowl',
    category: 'Fresh Fruit Salads',
    categorySlug: 'salads',
    price: 229,
    originalPrice: 379,
    icon: 'detox.jpeg',
    badge: 'Wellness',
    rating: 4.6,
    reviewCount: 412,
    description: 'Green apple, kiwi, cucumber, and spinach with a light ginger-lemon dressing. Perfect for a healthy reset.',
    tags: ['Detox', 'Low-Calorie', 'Nutrient-Rich'],
    weight: '300g Bowl',
  },

  // ── Fresh Juices ──
  {
    id: 'juice-2',
    name: 'Alphonso Mango Nectar',
    category: 'Fresh Juices',
    categorySlug: 'juices',
    price: 220,
    originalPrice: 350,
    icon: 'mangojuice.png',
    badge: 'Seasonal',
    rating: 4.9,
    reviewCount: 987,
    description: 'Rich, creamy mango nectar made from 100% Alphonso pulp. The taste of summer in every sip.',
    tags: ['Seasonal', '100% Natural', 'No Preservatives'],
    weight: '300ml',
  },
  {
    id: 'juice-3',
    name: 'Blueberry Antioxidant Blast',
    category: 'Fresh Juices',
    categorySlug: 'juices',
    price: 249,
    originalPrice: 399,
    icon: 'blueberriesjuice.png',
    badge: 'Superfood',
    rating: 4.7,
    reviewCount: 567,
    description: 'Deep purple blueberry juice packed with antioxidants. Blended with a hint of apple for natural sweetness.',
    tags: ['Superfood', 'Antioxidant-Rich', 'Cold-Pressed'],
    weight: '250ml',
  },
  {
    id: 'juice-4',
    name: 'Mixed Fruit Refresher',
    category: 'Fresh Juices',
    categorySlug: 'juices',
    price: 199,
    originalPrice: 320,
    icon: 'mixedjuice.png',
    rating: 4.6,
    reviewCount: 834,
    description: 'A refreshing blend of apple, orange, pineapple, and grape. The perfect everyday vitality boost.',
    tags: ['100% Natural', 'Vitamin-Rich', 'No Added Sugar'],
    weight: '300ml',
  },
  {
    id: 'juice-5',
    name: 'Watermelon Mint Cooler',
    category: 'Fresh Juices',
    categorySlug: 'juices',
    price: 149,
    originalPrice: 249,
    icon: 'watermelonjuice.png',
    badge: 'Summer Special',
    rating: 4.5,
    reviewCount: 623,
    description: 'Hydrating watermelon juice with fresh mint and a squeeze of lime. The ultimate summer cooler.',
    tags: ['Seasonal', 'Hydrating', '100% Natural'],
    weight: '350ml',
  },
];

// ─── Helper Functions ───────────────────────────────────────────

export function getProductsByCategory(slug: string): Product[] {
  return allProducts.filter((p) => p.categorySlug === slug);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllTags(slug: string): string[] {
  const products = getProductsByCategory(slug);
  const tagSet = new Set<string>();
  products.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet);
}
