import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Banner from '../component/Banner'
import ProductCard from '../component/ProductCard'
import { products } from '../data/databank'
import { ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
    const [openAccordion, setOpenAccordion] = useState<string | null>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const { addToCart } = useCart()

  
    const product = products.find(p => p.id === parseInt(id || '1'))

    if (!product) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const handleAccordionToggle = (section: string) => {
        setOpenAccordion(openAccordion === section ? null : section)
    }

    const handleAddToCart = () => {
        if (selectedSize && product) {
            // Add the selected quantity to cart
            for (let i = 0; i < selectedQuantity; i++) {
                addToCart(product.id, selectedSize, product.color)
            }
            setShowSuccessMessage(true)
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }
    }

    return (
        <div>
            <Header />
            
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">You added {selectedQuantity} item{selectedQuantity > 1 ? 's' : ''} to cart!</span>
                </div>
            )}
            
            {/* Product Detail Section */}
            <section className="px-4 md:px-7 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/*Product Information */}
                    <div className="flex flex-col justify-center">
                        <div className="max-w-md">
                           
                            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                                {product.title}
                            </h1>
                            
                          
                            <p className="text-lg text-black mb-4">
                                By {product.creator}
                            </p>
                            
                          
                            <p className="text-2xl font-semibold text-black mb-8">
                                {product.price}
                            </p>

                          
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-black mb-3">
                                    Size
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    >
                                        <option value="">Choose an option</option>
                                        {product.sizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Quantity selector */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-black mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                        className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                    >
                                        <span className="text-base">-</span>
                                    </button>
                                    <input
                                        type="number"
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 h-10 border border-gray-300 rounded text-center text-sm"
                                        min="1"
                                    />
                                    <button
                                        onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                                        className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="text-base">+</span>
                                    </button>
                                </div>
                            </div>

                           
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!selectedSize}
                            >
                                Add to cart
                            </button>

                          
                            <div className="space-y-2">
                             
                                <div className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => handleAccordionToggle('details')}
                                        className="w-full px-4 py-3 text-left bg-black text-white rounded-lg flex items-center justify-between hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="font-medium">Product Details</span>
                                        <ChevronDown 
                                            className={`transform transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} 
                                            size={20} 
                                        />
                                    </button>
                                    {openAccordion === 'details' && (
                                        <div className="p-4 bg-gray-50 text-gray-700">
                                            <p>{product.details}</p>
                                        </div>
                                    )}
                                </div>

                           
                                <div className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => handleAccordionToggle('shipping')}
                                        className="w-full px-4 py-3 text-left bg-black text-white rounded-lg flex items-center justify-between hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="font-medium">Shipping</span>
                                        <ChevronDown 
                                            className={`transform transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} 
                                            size={20} 
                                        />
                                    </button>
                                    {openAccordion === 'shipping' && (
                                        <div className="p-4 bg-gray-50 text-gray-700">
                                            <p>{product.shipping}</p>
                                        </div>
                                    )}
                                </div>

                             
                                <div className="border border-gray-200 rounded-lg">
                                    <button
                                        onClick={() => handleAccordionToggle('delivery')}
                                        className="w-full px-4 py-3 text-left bg-black text-white rounded-lg flex items-center justify-between hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="font-medium">Delivery</span>
                                        <ChevronDown 
                                            className={`transform transition-transform ${openAccordion === 'delivery' ? 'rotate-180' : ''}`} 
                                            size={20} 
                                        />
                                    </button>
                                    {openAccordion === 'delivery' && (
                                        <div className="p-4 bg-gray-50 text-gray-700">
                                            <p>{product.delivery}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* You may also like section */}
            <section className="px-4 md:px-7 py-12">
               
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
                        You may also like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {products
                            .filter(p => p.id !== product.id)
                            .slice(0, 5)
                            .map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    image={relatedProduct.image}
                                    title={relatedProduct.title}
                                    creator={relatedProduct.creator}
                                    price={relatedProduct.price}
                                    alt={relatedProduct.title}
                                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                                />
                            ))}
                    </div>
              
            </section>

            

<Banner />

            <Footer />
        </div>
    )
}

export default ProductPage