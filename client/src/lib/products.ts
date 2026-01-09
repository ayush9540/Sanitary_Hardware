import { Product } from "./cart-context";

export const products: Product[] = [
  {
    id: 1,
    name: "Artisan Leather Tote",
    price: 289,
    description: "Handcrafted from premium full-grain leather, this spacious tote features brass hardware and a suede-lined interior. Perfect for the modern professional who values both style and functionality.",
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
    ],
    rating: 4.8,
    reviews: 127,
    inStock: true,
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 195,
    description: "A timeless timepiece with a clean dial, sapphire crystal glass, and Swiss quartz movement. The 40mm case pairs perfectly with the Italian leather strap.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Cashmere Blend Sweater",
    price: 245,
    description: "Luxuriously soft cashmere-wool blend in a relaxed fit. Features ribbed cuffs and hem for a refined silhouette that drapes beautifully.",
    category: "Clothing",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    rating: 4.7,
    reviews: 56,
    inStock: true,
  },
  {
    id: 4,
    name: "Ceramic Pour-Over Set",
    price: 78,
    description: "Artisan-crafted ceramic dripper and carafe set. The unique spiral design ensures optimal extraction for the perfect cup every time.",
    category: "Home",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    ],
    rating: 4.6,
    reviews: 203,
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Earbuds Pro",
    price: 179,
    description: "Premium audio experience with active noise cancellation, transparency mode, and 24-hour battery life. IPX4 water resistance for any lifestyle.",
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&q=80",
    ],
    rating: 4.5,
    reviews: 412,
    inStock: true,
  },
  {
    id: 6,
    name: "Linen Throw Blanket",
    price: 125,
    description: "Stonewashed European linen blanket with a beautifully soft hand feel. Generously sized at 60x80 inches, perfect for any room.",
    category: "Home",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    ],
    rating: 4.8,
    reviews: 78,
    inStock: true,
  },
  {
    id: 7,
    name: "Canvas Sneakers",
    price: 95,
    description: "Classic low-top sneakers crafted from organic cotton canvas with vulcanized rubber soles. Effortlessly stylish for everyday wear.",
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    ],
    rating: 4.4,
    reviews: 167,
    inStock: true,
  },
  {
    id: 8,
    name: "Silk Scarf",
    price: 145,
    description: "Hand-rolled edges on this 100% mulberry silk twill scarf. Features an exclusive abstract print inspired by Japanese woodblock art.",
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=800&q=80",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
    ],
    rating: 4.9,
    reviews: 34,
    inStock: true,
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
