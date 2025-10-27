import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Banner from '../component/Banner'
import CampaignCard from '../component/CampaignCard'
import FilterButton from '../component/FilterButton'
import ShopImg from '../assets/ShopImg.png'
import { ChevronDown } from 'lucide-react'
import { campaigns } from '../data/databank'

const Campaign = () => {
    const navigate = useNavigate()
    const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([])
    

    const getCategoryDisplayName = (category: string) => {
        switch (category) {
            case 'all': return 'All'
            case 'healthcare': return 'Healthcare'
            case 'education': return 'Education'
            case 'climate-change': return "Climate Change"
            default: return 'All'
        }
    }

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
        { value: 'climate-change', label: "Climate Change" }
    ]
  
    useEffect(() => {
        setFilteredCampaigns(campaigns)
    }, [])
 
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
        
        if (category === 'all') {
            setFilteredCampaigns(campaigns)
        } else {
            const filtered = campaigns.filter(campaign => 
                campaign.category === category
            )
            setFilteredCampaigns(filtered)
        }
    }
    return (
        <div>
            <Header />
            <section className="relative h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden mx-4 md:mx-7 my-8 rounded-3xl ">
                <div className="absolute inset-0 z-0">
                    <img
                        src={ShopImg}
                        alt="Campaign Hero"
                        className="w-full h-full object-cover rounded-3xl object-center"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <h1 
                        className="text-white font-bold text-3xl md:text-4xl lg:text-6xl tracking-wider"
                        style={{
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 900,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        Donations Changes Lives
                    </h1>
                </div>
            </section>

          
            <section className="px-4 md:px-7 py-8">
               
                <div className="flex items-center gap-4 mb-8">
                    {/* Desktop Category Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <FilterButton 
                            isActive={activeCategory === 'all'}
                            onClick={() => handleCategoryClick('all')}
                        >
                            All
                        </FilterButton>
                        <FilterButton 
                            isActive={activeCategory === 'healthcare'}
                            onClick={() => handleCategoryClick('healthcare')}
                        >
                            HealthCare
                        </FilterButton>
                        <FilterButton 
                            isActive={activeCategory === 'education'}
                            onClick={() => handleCategoryClick('education')}
                        >
                            Education
                        </FilterButton>
                        <FilterButton 
                            isActive={activeCategory === 'climate-change'}
                            onClick={() => handleCategoryClick('climate-change')}
                        >
                            Climate Change
                        </FilterButton>
                    </div>

                 
                    <div className="md:hidden relative w-full max-w-[200px]">
                        <button 
                            className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                        >
                            <span className="text-base font-medium">{getCategoryDisplayName(activeCategory)}</span>
                            <ChevronDown size={20} className={`transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isMobileCategoryOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsMobileCategoryOpen(false)} />
                                <div className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 overflow-hidden">
                                    {categories.map((category) => (
                                        <button
                                            key={category.value}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                                                activeCategory === category.value ? 'bg-gray-100 font-medium' : ''
                                            }`}
                                            onClick={() => {
                                                handleCategoryClick(category.value)
                                                setIsMobileCategoryOpen(false)
                                            }}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

              
                {filteredCampaigns.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                         {filteredCampaigns.map((campaign) => (
                             <CampaignCard
                                 key={campaign.id}
                                 image={campaign.image}
                                 title={campaign.title}
                                 amountRaised={campaign.amountRaised}
                                 goal={campaign.goal}
                                 percentage={campaign.percentage}
                                 alt={campaign.title}
                                 onClick={() => navigate(`/campaign/${campaign.id}`)}
                             />
                         ))}
                     </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No campaigns found</h3>
                            <p className="text-gray-500">
                                No campaigns match your selected category.
                            </p>
                        </div>
                    </div>
                )}
            </section>
            
            <Banner />
            <Footer />
        </div>
    )
}

export default Campaign