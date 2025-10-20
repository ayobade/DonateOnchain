import { Search, ShoppingBag, ChevronDown, Menu, X, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from './Button'
import DonateLogo from '../assets/DonateLogo.png'

const Header = () => {
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [shopEntered, setShopEntered] = useState(false)
    const [activeNav, setActiveNav] = useState<string>('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchEntered, setSearchEntered] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
            const id = requestAnimationFrame(() => setSearchEntered(true))
            return () => cancelAnimationFrame(id)
        } else {
            setSearchEntered(false)
        }
    }, [isSearchOpen])
    return (
        <header className="sticky top-0 z-20 w-full bg-white px-4 md:px-7 py-[18px] flex items-center justify-between max-h-24 relative">
            <div className="flex items-center gap-9">
                <div className="flex items-center gap-[10px]">
                    <img src={DonateLogo} alt="Donate" className="h-7 w-auto block" />
                  
                </div>
                <nav className="hidden md:flex items-center gap-9">
                    <button 
                        className={`inline-flex items-center gap-[6px] text-xl text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${isShopOpen ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setIsShopOpen((v) => !v); setActiveNav('') }}
                        aria-expanded={isShopOpen}
                        aria-haspopup="true"
                    >
                        Shop
                        <ChevronDown size={18} />
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-xl text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='How' ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setActiveNav('How'); setIsShopOpen(false); }}
                    >
                        How It Works
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-xl text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='Campaigns' ? 'border-black' : 'border-transparent hover:border-black'}`}
                        onClick={() => { setActiveNav('Campaigns'); setIsShopOpen(false); }}
                    >
                        Campaigns
                    </button>
                    <button 
                        className={`inline-flex items-center gap-[6px] text-xl text-black bg-transparent pb-1 cursor-pointer hover:opacity-80 border-b-2 transition-colors ${activeNav==='Customize' ? 'border-black' : 'border-transparent hover:border-black'}`}
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
                >
                    <ShoppingBag size={22} />
                </button>
                <div className="relative z-30 hidden md:block">
                    <Button variant="primary" size="md">Connect Wallet</Button>
                </div>

                <button 
                    aria-label="Menu"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-transparent text-black md:hidden"
                    onClick={() => { setIsMobileMenuOpen((v)=>!v); setIsShopOpen(false); setIsSearchOpen(false) }}
                >
                    {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>} 
                </button>

            </div>

     
            {isSearchOpen && <div className="fixed inset-0 z-10" onClick={() => setIsSearchOpen(false)} />}
           
            {(
                <div className={`absolute left-1/2 top-full mt-3 -translate-x-1/2 z-20 bg-[#d6d6d6] text-black rounded-full shadow-md overflow-hidden transition-all duration-200 ease-in ${searchEntered ? 'opacity-100 w-[640px] h-14' : 'opacity-0 w-0 h-14'} max-w-[calc(100vw-56px)]`}> 
                    <div className="relative h-14 flex items-center justify-center pl-14 pr-14">
                        <Search size={20} className="absolute left-5 text-black" />
                        <input 
                            type="text" 
                            placeholder="What Are You Searching For" 
                            className="w-full bg-transparent text-center text-black placeholder-black/70 text-[16px] outline-none"
                            autoFocus={isSearchOpen}
                        />
                    </div>
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
                                <li>Shirts</li>
                                <li>Caps</li>
                                <li>Hoodies</li>
                                <li>Sweaters</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-gray-300 text-lg mb-4">Collections</h4>
                            <ul className="space-y-5 text-xl">
                                <li>Fundraisers</li>
                                <li>Bestsellers</li>
                                <li>Creator’s Choice</li>
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
                                <button className="w-full flex items-center justify-between py-5" onClick={() => { setIsMobileMenuOpen(false); setActiveNav('Shop') }}>
                                    <span>Shop</span>
                                    <ChevronRight size={18} />
                                </button>
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
                            <Button variant="primary" size="md" className="w-full justify-center">Connect Wallet</Button>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}

export default Header