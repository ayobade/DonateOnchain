import { Search, ShoppingBag, ChevronDown, Menu, X, ChevronRight, User, Package, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import DonateLogo from '../assets/DonateLogo.png'
import { useCart } from '../context/CartContext'
import { products } from '../data/databank'

const Header = () => {
    const navigate = useNavigate()
    const { getCartItemCount } = useCart()
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [shopEntered, setShopEntered] = useState(false)
    const [activeNav, setActiveNav] = useState<string>('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])

    const handleShopItemClick = () => {
        setIsShopOpen(false)
        navigate('/shop')
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (query.trim() === '') {
            setSearchResults([])
            return
        }
        
        const results = products.filter(product => 
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.creator.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(results)
    }

    const handleSearchResultClick = (productId: number) => {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
        navigate(`/product/${productId}`)
    }

    const handleAccountMenuClick = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen)
        setIsShopOpen(false)
        setIsSearchOpen(false)
    }

    const handleProfileClick = () => {
        setIsAccountMenuOpen(false)
        navigate('/user-profile')
    }

    const handleOrdersClick = () => {
        setIsAccountMenuOpen(false)
        
        console.log('Navigate to orders')
    }

    const handleSignOutClick = () => {
        setIsAccountMenuOpen(false)
        
        console.log('Sign out')
    }

    useEffect(() => {
        if (isShopOpen) {
            const id = requestAnimationFrame(() => setShopEntered(true))
            return () => cancelAnimationFrame(id)
        } else {
            setShopEntered(false)
        }
    }, [isShopOpen])

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isSearchOpen])

    useEffect(() => {
       
        document.body.style.paddingTop = '72px' 
        
        return () => {
            document.body.style.paddingTop = '0'
        }
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-20 w-full bg-white px-4 md:px-7 py-[18px] flex items-center justify-between max-h-24">
            <div className="flex items-center gap-9">
                <div className="flex items-center gap-[10px]">
                    <img 
                        src={DonateLogo} 
                        alt="Donate" 
                        className="h-7 w-auto block cursor-pointer " 
                        onClick={() => navigate('/')}
                    />
                </div>
                <nav className="hidden md:flex items-center gap-9">
                    <button 
                        className={`inline-flex items-center gap-[6px] text-base text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${isShopOpen ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setIsShopOpen((v) => !v); setActiveNav('') }}
                        aria-expanded={isShopOpen}
                        aria-haspopup="true"
                    >
                        Shop
                        <ChevronDown size={18} />
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-base text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='How' ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setActiveNav('How'); setIsShopOpen(false); }}
                    >
                        How It Works
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-base text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='Campaigns' ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setActiveNav('Campaigns'); setIsShopOpen(false); }}
                    >
                        Campaigns
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-base text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='Customize' ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setActiveNav('Customize'); setIsShopOpen(false); }}
                    >
                        Customize
                    </button>
                </nav>
            </div>

            <div className="flex items-center gap-[12px] relative">
                <button 
                    aria-label="Search"
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer ${isSearchOpen ? 'bg-gray-300 text-black' : 'bg-transparent text-black hover:bg-gray-100'}`}
                    onClick={() => { setIsSearchOpen((v) => !v); setIsShopOpen(false) }}
                    aria-expanded={isSearchOpen}
                >
                    <Search size={18} />
                </button>
                <button 
                    aria-label="Cart"
                    className="relative z-30 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-transparent border-none text-black cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingBag size={22} />
                    {getCartItemCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {getCartItemCount()}
                        </span>
                    )}
                </button>
                <div className="relative z-30 hidden md:block">
                    <Button 
                        variant="primary" 
                        size="md"
                        onClick={handleAccountMenuClick}
                    >
                        Account
                    </Button>
                </div>

                <button 
                    aria-label="Menu"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-transparent text-black md:hidden"
                    onClick={() => { setIsMobileMenuOpen((v)=>!v); setIsShopOpen(false); setIsSearchOpen(false) }}
                >
                    {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>} 
                </button>

            </div>

     
            {isSearchOpen && <div className="fixed inset-x-0 top-20 bottom-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />}
           
            {isSearchOpen && (
                <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-20 bg-white text-black rounded-lg shadow-xl w-[640px] max-w-[calc(100vw-56px)] overflow-hidden">
                    <div className="relative h-14 flex items-center justify-center pl-14 pr-14 border-b border-gray-200">
                        <Search size={20} className="absolute left-5 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="What Are You Searching For" 
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full bg-transparent text-center text-black placeholder-gray-500 text-[16px] outline-none"
                            autoFocus={isSearchOpen}
                        />
                    </div>
                    
                   
                    {searchResults.length > 0 && (
                        <div className="max-h-80 overflow-y-auto">
                            {searchResults.map((product) => (
                                <div 
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                                    onClick={() => handleSearchResultClick(product.id)}
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img 
                                            src={product.image} 
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-black">{product.title}</h3>
                                        <p className="text-sm text-gray-600">By {product.creator}</p>
                                        <p className="text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-black">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {searchQuery && searchResults.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No products found for "{searchQuery}"
                        </div>
                    )}
                </div>
            )}

          
            {isShopOpen && (
                <>
              
                <div className="fixed inset-0 z-10" onClick={() => setIsShopOpen(false)} />
                <div className={`absolute left-16 top-full mt-3 z-20 bg-black text-white rounded-2xl shadow-xl w-[420px] max-w-[calc(100vw-56px)] pl-10 pr-6 py-6 transition-all duration-200 ease-in transform ${shopEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-gray-300 text-lg mb-4">Collections</h4>
                            <ul className="space-y-5 text-xl">
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Shirts</button></li>
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Caps</button></li>
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Hoodies</button></li>
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Sweaters</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-gray-300 text-lg mb-4">Collections</h4>
                            <ul className="space-y-5 text-xl">
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Fundraisers</button></li>
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Bestsellers</button></li>
                                <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-300 transition-colors">Creator's Choice</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </>
            )}

            {isMobileMenuOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute left-0 top-full z-20 w-full bg-white text-black px-4 py-6 shadow-xl md:hidden">
                        <ul className="divide-y divide-black/10 text-xl">
                            <li>
                                <button className="w-full flex items-center justify-between py-5" onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}>
                                    <span>Shop</span>
                                    <ChevronRight size={18} className={`transition-transform ${isMobileShopOpen ? 'rotate-90' : ''}`} />
                                </button>
                                {isMobileShopOpen && (
                                    <div className="pl-4 pb-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <h4 className="text-gray-500 text-sm mb-2 font-medium">Collections</h4>
                                                <ul className="space-y-2 text-base">
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Shirts</button></li>
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Caps</button></li>
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Hoodies</button></li>
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Sweaters</button></li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-gray-500 text-sm mb-2 font-medium">Categories</h4>
                                                <ul className="space-y-2 text-base">
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Fundraisers</button></li>
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Bestsellers</button></li>
                                                    <li><button onClick={() => handleShopItemClick()} className="hover:text-gray-600 transition-colors">Creator's Choice</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                            <li>
                                <button className="w-full flex items-center justify-between py-5" onClick={() => { setIsMobileMenuOpen(false); setActiveNav('How') }}>
                                    <span>How It Works</span>
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center justify-between py-5" onClick={() => { setIsMobileMenuOpen(false); setActiveNav('Campaigns') }}>
                                    <span>Campaigns</span>
                                    
                                </button>
                            </li>
                            <li>
                                <button className="w-full flex items-center justify-between py-5" onClick={() => { setIsMobileMenuOpen(false); setActiveNav('Customize') }}>
                                    <span>Customize</span>
                                </button>
                            </li>
                        </ul>
                        <div className="pt-6">
                            <Button 
                                variant="primary" 
                                size="md" 
                                className="w-full justify-center"
                                onClick={handleAccountMenuClick}
                            >
                                Account
                            </Button>
                        </div>
                    </div>
                </>
            )}

            {/* Account Menu Overlay */}
            {isAccountMenuOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsAccountMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-3 z-20 bg-white text-black rounded-lg shadow-xl w-48 border border-gray-200">
                        <div className="py-2">
                            <button 
                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                onClick={handleProfileClick}
                            >
                                <User size={18} className="text-gray-600" />
                                <span className="text-sm font-medium">Profile</span>
                            </button>
                            <button 
                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                                onClick={handleOrdersClick}
                            >
                                <Package size={18} className="text-gray-600" />
                                <span className="text-sm font-medium">Orders</span>
                            </button>
                            <hr className="my-1 border-gray-200" />
                            <button 
                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-red-600"
                                onClick={handleSignOutClick}
                            >
                                <LogOut size={18} />
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}

export default Header