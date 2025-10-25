import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Banner from '../component/Banner'
import ProductCard from '../component/ProductCard'
import { products } from '../data/databank'
import { ChevronDown, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
    const [openAccordion, setOpenAccordion] = useState<string | null>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [customDesign, setCustomDesign] = useState<any>(null)
    const [currentImageView, setCurrentImageView] = useState<'front' | 'back'>('front')
    const { addToCart } = useCart()

    // Check if this is a custom design from localStorage
    useEffect(() => {
        if (id) {
            // Check both user and NGO designs
            const userDesigns = JSON.parse(localStorage.getItem('userDesigns') || '[]')
            const ngoDesigns = JSON.parse(localStorage.getItem('ngoDesigns') || '[]')
            const allDesigns = [...userDesigns, ...ngoDesigns]
            const foundDesign = allDesigns.find((design: any) => design.id === parseInt(id))
            if (foundDesign) {
                setCustomDesign(foundDesign)
            }
        }
    }, [id])

    // Use custom design if found, otherwise use regular product
    const product = customDesign || products.find(p => p.id === parseInt(id || '1'))

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
        if (product) {
            if (customDesign) {
                // For custom designs, add each selected size as a separate cart item
                customDesign.sizes.forEach((size: string) => {
                    for (let i = 0; i < selectedQuantity; i++) {
                        addToCart(customDesign.id, size, customDesign.color)
                    }
                })
            } else if (selectedSize) {
                // For regular products, use the selected size
            for (let i = 0; i < selectedQuantity; i++) {
                addToCart(product.id, selectedSize, product.color)
                }
            }
            setShowSuccessMessage(true)
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        if (customDesign) {
            // Determine which storage to use based on design type
            const storageKey = customDesign.isNgo ? 'ngoDesigns' : 'userDesigns'
            const existingDesigns = JSON.parse(localStorage.getItem(storageKey) || '[]')
            const updatedDesigns = existingDesigns.filter((design: any) => design.id !== customDesign.id)
            localStorage.setItem(storageKey, JSON.stringify(updatedDesigns))
            
            // Navigate back to appropriate profile
            const redirectPath = customDesign.isNgo ? '/ngo-profile' : '/user-profile'
            navigate(redirectPath)
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
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
            
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">Delete Design?</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete "{customDesign?.pieceName}"? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="flex-1 bg-gray-200 text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Product Detail Section */}
            <section className="px-4 md:px-7 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
                                {customDesign ? (
                                    /* Custom Design Display */
                                    <div className="relative w-full max-w-sm">
                                        {/* T-shirt mockup background */}
                                        <img 
                                            src="/src/assets/shirtfront.png" 
                                            alt="Shirt Mockup" 
                                            className="w-full h-auto object-contain"
                                            style={{ 
                                                filter: customDesign.color === '#FFFFFF' ? 'none' : 
                                                       customDesign.color === '#000000' ? 'brightness(0)' : 'none'
                                            }}
                                        />
                                        
                                        {/* Uploaded design overlay */}
                                        {currentImageView === 'front' && customDesign.frontDesign?.dataUrl && (
                                            <div 
                                                className="absolute"
                                                style={{ 
                                                    width: '145px', 
                                                    height: '200px',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                <img 
                                                    src={customDesign.frontDesign.dataUrl} 
                                                    alt="Front Design" 
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        
                                        {currentImageView === 'back' && customDesign.backDesign?.dataUrl && (
                                            <div 
                                                className="absolute"
                                                style={{ 
                                                    width: '145px', 
                                                    height: '200px',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                            >
                                                <img 
                                                    src={customDesign.backDesign.dataUrl} 
                                                    alt="Back Design" 
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        
                                        {/* Navigation arrows */}
                                        {(customDesign.frontDesign?.dataUrl && customDesign.backDesign?.dataUrl) && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageView(currentImageView === 'front' ? 'back' : 'front')}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                                >
                                                    <ChevronLeft size={20} className="text-gray-700" />
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageView(currentImageView === 'front' ? 'back' : 'front')}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                                                >
                                                    <ChevronRight size={20} className="text-gray-700" />
                                                </button>
                                            </>
                                        )}
                                        
                                        {/* Image Navigation */}
                                        {(customDesign.frontDesign?.dataUrl || customDesign.backDesign?.dataUrl) && (
                                            <div className="flex justify-center mt-4">
                                                <div className="flex bg-white rounded-lg p-1 shadow-sm">
                                                    <button
                                                        onClick={() => setCurrentImageView('front')}
                                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                                            currentImageView === 'front' 
                                                                ? 'bg-black text-white' 
                                                                : 'text-gray-600 hover:text-black'
                                                        }`}
                                                    >
                                                        Front
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentImageView('back')}
                                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                                            currentImageView === 'back' 
                                                                ? 'bg-black text-white' 
                                                                : 'text-gray-600 hover:text-black'
                                                        }`}
                                                    >
                                                        Back
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Regular Product Display */
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto object-contain"
                                />
                                )}
                            </div>
                        </div>
                    </div>

                    {/*Product Information */}
                    <div className="flex flex-col justify-center">
                        <div className="max-w-md">
                           
                            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                                {customDesign ? customDesign.pieceName : product.title}
                            </h1>
                          
                            <p className="text-lg text-black mb-4">
                                {customDesign ? `Campaign: ${customDesign.campaign}` : `By ${product.creator}`}
                            </p>
                          
                            <p className="text-2xl font-semibold text-black mb-8">
                                {customDesign ? `₦${customDesign.price}` : product.price}
                            </p>

                          
                            {customDesign ? (
                                /* Custom Design - Read-only Size and Quantity */
                                <>
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-black mb-3">
                                            Size
                                        </label>
                                        <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black">
                                            {customDesign.sizes ? customDesign.sizes.join(', ') : customDesign.size}
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-black mb-3">
                                            Quantity
                                        </label>
                                        <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black">
                                            {customDesign.quantity}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                /* Regular Product - Interactive Size and Quantity */
                                <>
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
                                                {product.sizes.map((size: string) => (
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
                                                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
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
                                </>
                            )}

                            {/* Custom Design Description */}
                            {customDesign && customDesign.description && (
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-black mb-3">
                                        Description
                                    </label>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-gray-700">{customDesign.description}</p>
                                    </div>
                                </div>
                            )}

                            {customDesign ? (
                                /* Edit and Delete Buttons for Custom Designs */
                                <div className="flex gap-3 mb-8">
                                    <button 
                                        onClick={() => navigate('/create-design', { state: { editDesign: customDesign } })}
                                        className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Edit Design
                                    </button>
                                    <button 
                                        onClick={handleDeleteClick}
                                        className="bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ) : (
                                /* Add to Cart Button for Regular Products */
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors mb-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={!selectedSize}
                            >
                                Add to cart
                            </button>
                            )}

                          
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