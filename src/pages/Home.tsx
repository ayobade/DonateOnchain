import Header from '../component/Header'
import Footer from '../component/Footer'
import HeroImage from '../assets/Heroimg.png'
import Clothimg from '../assets/Clothimg.png'
import Causeimg from '../assets/Causeimg.png'

const Home = () => {
    return (
        <div>   
            <Header />
            {/* Hero section */}    
            <section className="relative max-h-[780px] min-h-[780px] flex items-end justify-start overflow-hidden">
            
                <div className="absolute inset-0 z-0">
                    <img 
                        src={HeroImage} 
                        alt="Hero Background" 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                
               
                <div className="relative z-10 text-white px-6 pb-20 max-w-2xl">
                    <h1 
                        className="mb-6 text-left"
                        style={{
                            fontFamily: 'Legian Typeface',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '60px',
                            lineHeight: '65px',
                            letterSpacing: '-3%'
                        }}
                    >
                        Where <span className="font-black">Creativity</span> Meets <span className="font-black">Social Impact</span>
                    </h1>
                    <p 
                        className="text-left text-gray-200 max-w-xl"
                        style={{
                            fontFamily: 'Gellix',
                            fontWeight: 300,
                            fontStyle: 'normal',
                            fontSize: '20px',
                            lineHeight: '30px',
                            letterSpacing: '0%'
                        }}
                    >
                        Buy or design products that give back. Every transaction supports verified causes and rewards you with NFT proof of donation.
                    </p>
                </div>
            </section>

            {/* Popular campaign */}
            <section className="px-4 md:px-7 py-12">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">Popular Campaigns</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Popular causes */}
            <section className="px-4 md:px-7 py-12">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">Popular Causes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Causeimg} alt="Cause" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Children In Gaza</h3>
                            <p className="text-[14px] text-black/60">The Palestine NGO</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Causeimg} alt="Cause" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Children In Gaza</h3>
                            <p className="text-[14px] text-black/60">The Palestine NGO</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Causeimg} alt="Cause" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Children In Gaza</h3>
                            <p className="text-[14px] text-black/60">The Palestine NGO</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Causeimg} alt="Cause" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Children In Gaza</h3>
                            <p className="text-[14px] text-black/60">The Palestine NGO</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Causeimg} alt="Cause" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Children In Gaza</h3>
                            <p className="text-[14px] text-black/60">The Palestine NGO</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Special collections */}
            <section className="px-4 md:px-7 py-12">
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-8">Special Collections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                    <div className="rounded-3xl p-4 hover:border hover:border-black/10 transition-colors">
                        <div className="rounded-2xl bg-[#eeeeee]">
                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center">
                                <img src={Clothimg} alt="Cloth" className="w-[85%] h-[85%] object-contain" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[22px] font-semibold leading-tight">Live In Balance</h3>
                            <p className="text-[14px] text-black/60">By OluwaDayo</p>
                            <p className="mt-3 text-[22px] font-semibold">₦20,000</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;