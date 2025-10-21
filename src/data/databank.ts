import Clothimg from '../assets/Clothimg.png'
import Causeimg from '../assets/Causeimg.png'
import Creatorimg from '../assets/Creator.png'

export interface Product {
  id: number
  image: string
  title: string
  creator: string
  price: string
  category: string
  categoryType: string
  size: string
  color: string
  sizes: string[]
  description: string
  details: string
  shipping: string
  delivery: string
}

export interface Cause {
  id: number
  image: string
  title: string
  organization: string
}

export interface Creator {
  id: number
  image: string
  name: string
  role: string
}

export const products: Product[] = [
  {
    id: 1,
    image: Clothimg,
    title: "Live In Balance",
    creator: "OluwaDayo",
    price: "₦20,000",
    category: "shirts",
    categoryType: "fundraisers",
    size: "M",
    color: "black",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A beautifully designed t-shirt that represents the balance between creativity and social impact. Made with sustainable materials and featuring an elegant script design.",
    details: "100% organic cotton, pre-shrunk, machine washable. Designed and printed locally to support community artists.",
    shipping: "Free shipping on orders over ₦15,000. Standard delivery: 3-5 business days. Express delivery: 1-2 business days.",
    delivery: "We partner with local delivery services to ensure your order arrives safely. Tracking information provided upon shipment."
  },
  {
    id: 2,
    image: Clothimg,
    title: "Creative Freedom",
    creator: "Sarah Johnson",
    price: "₦15,000",
    category: "hoodies",
    categoryType: "bestsellers",
    size: "L",
    color: "gray",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Express your creative freedom with this comfortable hoodie featuring minimalist design elements.",
    details: "80% cotton, 20% polyester blend. Soft fleece interior, adjustable drawstring hood.",
    shipping: "Free shipping on orders over ₦15,000. Standard delivery: 3-5 business days.",
    delivery: "Tracked delivery with signature confirmation. Safe packaging guaranteed."
  },
  {
    id: 3,
    image: Clothimg,
    title: "Artistic Vision",
    creator: "Mike Chen",
    price: "₦35,000",
    category: "caps",
    categoryType: "creators-choice",
    size: "S",
    color: "white",
    sizes: ["S", "M", "L"],
    description: "A premium cap that showcases artistic vision and supports independent creators.",
    details: "100% cotton twill, structured cap with curved brim. Adjustable strap closure.",
    shipping: "Free shipping on all orders. Standard delivery: 2-4 business days.",
    delivery: "Express delivery available. Package protection included."
  },
  {
    id: 4,
    image: Clothimg,
    title: "Community Spirit",
    creator: "Aisha Okafor",
    price: "₦25,000",
    category: "sweaters",
    categoryType: "fundraisers",
    size: "M",
    color: "navy",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Celebrate community spirit with this warm and stylish sweater designed for social impact.",
    details: "100% merino wool, hand-knitted by local artisans. Soft and breathable fabric.",
    shipping: "Free shipping on orders over ₦20,000. Standard delivery: 4-6 business days.",
    delivery: "Carefully packaged to maintain quality. Tracking available upon shipment."
  },
  {
    id: 5,
    image: Clothimg,
    title: "Innovation Drive",
    creator: "David Kim",
    price: "₦18,000",
    category: "shirts",
    categoryType: "bestsellers",
    size: "L",
    color: "blue",
    sizes: ["S", "M", "L", "XL"],
    description: "Drive innovation forward with this tech-inspired t-shirt supporting STEM education.",
    details: "100% cotton, moisture-wicking technology. Designed for comfort and style.",
    shipping: "Free shipping on orders over ₦15,000. Standard delivery: 3-5 business days.",
    delivery: "Express delivery available. Package protection included."
  },
  {
    id: 6,
    image: Clothimg,
    title: "Cultural Heritage",
    creator: "Fatima Al-Zahra",
    price: "₦30,000",
    category: "hoodies",
    categoryType: "creators-choice",
    size: "M",
    color: "burgundy",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Honor cultural heritage with this beautifully crafted hoodie featuring traditional patterns.",
    details: "Premium cotton blend, embroidered details. Hand-finished by skilled artisans.",
    shipping: "Free shipping on all orders. Standard delivery: 3-5 business days.",
    delivery: "Special care packaging for delicate items. Signature confirmation required."
  },
  {
    id: 7,
    image: Clothimg,
    title: "Future Leaders",
    creator: "James Wilson",
    price: "₦22,000",
    category: "caps",
    categoryType: "fundraisers",
    size: "L",
    color: "green",
    sizes: ["S", "M", "L", "XL"],
    description: "Support future leaders with this cap designed to inspire the next generation.",
    details: "100% cotton twill, structured design. Adjustable closure for perfect fit.",
    shipping: "Free shipping on orders over ₦20,000. Standard delivery: 2-4 business days.",
    delivery: "Tracked delivery with confirmation. Safe packaging guaranteed."
  },
  {
    id: 8,
    image: Clothimg,
    title: "Sustainable Future",
    creator: "Elena Rodriguez",
    price: "₦28,000",
    category: "sweaters",
    categoryType: "bestsellers",
    size: "S",
    color: "beige",
    sizes: ["XS", "S", "M", "L"],
    description: "Build a sustainable future with this eco-friendly sweater made from recycled materials.",
    details: "100% recycled polyester, soft and warm. Environmentally conscious production.",
    shipping: "Free shipping on all orders. Standard delivery: 4-6 business days.",
    delivery: "Carbon-neutral shipping. Package made from recycled materials."
  }
]

export const causes: Cause[] = [
  {
    id: 1,
    image: Causeimg,
    title: "Children In Gaza",
    organization: "The Palestine NGO"
  },
  {
    id: 2,
    image: Causeimg,
    title: "Education For All",
    organization: "Global Education Fund"
  },
  {
    id: 3,
    image: Causeimg,
    title: "Clean Water Initiative",
    organization: "Water For Life"
  },
  {
    id: 4,
    image: Causeimg,
    title: "Climate Action",
    organization: "Green Earth Foundation"
  },
  {
    id: 5,
    image: Causeimg,
    title: "Mental Health Support",
    organization: "Mind Matters"
  }
]

export const creators: Creator[] = [
  {
    id: 1,
    image: Creatorimg,
    name: "OluwaDayo",
    role: "Creator"
  },
  {
    id: 2,
    image: Creatorimg,
    name: "Sarah Johnson",
    role: "Designer"
  },
  {
    id: 3,
    image: Creatorimg,
    name: "Mike Chen",
    role: "Artist"
  },
  {
    id: 4,
    image: Creatorimg,
    name: "Aisha Okafor",
    role: "Creator"
  },
  {
    id: 5,
    image: Creatorimg,
    name: "David Kim",
    role: "Creator"
  },
  {
    id: 6,
    image: Creatorimg,
    name: "David Kim",
    role: "Creator"
  },
  
]


