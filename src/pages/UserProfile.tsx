import Header from "../component/Header";
import Footer from "../component/Footer";
import Button from "../component/Button";
import NFTcard from "../component/NFTcard";
import { Plus, X, Camera, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const UserProfile = () => {
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const [activeCategory, setActiveCategory] = useState<'NFTs' | 'History' | 'Created'>('NFTs');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [createdDesigns, setCreatedDesigns] = useState<any[]>([]);
    const [copied, setCopied] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'OluwaDayo',
        bio: 'Design with purpose turn your creativity into meaningful contributions that support real-world causes.',
        bannerImage: null as string | null,
        profileImage: null as string | null
    });
    const [formData, setFormData] = useState({
        name: 'OluwaDayo',
        bio: 'Design with purpose turn your creativity into meaningful contributions that support real-world causes.'
    });
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [statistics, setStatistics] = useState({
        causesSupported: 0,
        totalDonated: 0,
        totalProfit: 0,
        totalDesigns: 0
    });

    // Load created designs from localStorage
    useEffect(() => {
        const savedDesigns = JSON.parse(localStorage.getItem('userDesigns') || '[]');
        setCreatedDesigns(savedDesigns);
        
        // Set active tab if stored
        const savedTab = localStorage.getItem('activeProfileTab');
        if (savedTab && (savedTab === 'NFTs' || savedTab === 'History' || savedTab === 'Created')) {
            setActiveCategory(savedTab as 'NFTs' | 'History' || 'Created');
        }
    }, []);

    // Calculate statistics
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const savedDesigns = JSON.parse(localStorage.getItem('userDesigns') || '[]');
        
        // Calculate causes supported (unique campaigns from cart items)
        const uniqueCampaigns = new Set(cartItems.map((item: any) => item.campaign).filter(Boolean));
        
        // Calculate total donated (sum of all cart item prices)
        const totalDonated = cartItems.reduce((sum: number, item: any) => {
            const price = parseFloat(item.price?.replace(/[^\d.]/g, '') || '0');
            return sum + price;
        }, 0);
        
        // Calculate total profit (sum of purchased items from cart, not created designs)
        // Profit should only count when someone purchases the user's designs
        const totalProfit = cartItems.reduce((sum: number, item: any) => {
            // Only count items that are user's designs (have pieceName or isNgo is false)
            if (item.pieceName && !item.isNgo) {
                const price = parseFloat(item.price?.replace(/[^\d.]/g, '') || '0');
                return sum + price;
            }
            return sum;
        }, 0);
        
        setStatistics({
            causesSupported: uniqueCampaigns.size,
            totalDonated: totalDonated,
            totalProfit: totalProfit,
            totalDesigns: savedDesigns.length
        });
    }, [createdDesigns]);

    const handleCategoryChange = (category: 'NFTs' | 'History' | 'Created') => {
        setActiveCategory(category);
    };

    const handleCopyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shortenAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleEditProfile = () => {
        
        setFormData({
            name: profileData.name,
            bio: profileData.bio
        });
        setBannerImage(profileData.bannerImage);
        setProfileImage(profileData.profileImage);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveProfile = () => {
        
        setProfileData(prev => ({
            ...prev,
            bio: formData.bio,
            bannerImage: bannerImage || prev.bannerImage,
            profileImage: profileImage || prev.profileImage
        }));
        
        
        setIsEditModalOpen(false);
        
      
        setShowSuccessMessage(true);
        
        
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
        
        
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBannerImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            
         
            <div className="pt-0 max-w-[1440px] mx-auto">
             
                <div className="relative w-full h-[150px] md:h-[250px] bg-black ">
                   
                    {profileData.bannerImage && (
                        <img 
                            src={profileData.bannerImage} 
                            alt="Banner" 
                            className="w-full h-full object-cover"
                        />
                    )}
                    
                    
                    <div className="absolute bottom-[-25%]  left-4 md:left-7">
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                                {profileData.profileImage ? (
                                    <img 
                                        src={profileData.profileImage} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <span className="text-black text-2xl md:text-4xl font-bold"></span>
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <Camera size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
                
              
                <div className="px-4 md:px-7 pt-12 md:pt-24">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
                      
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-4xl font-bold text-black mb-2">{profileData.name}</h1>
                            <p className="text-black text-sm md:text-lg leading-relaxed max-w-md mb-3">
                                {profileData.bio}
                            </p>
                            {isConnected && address && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleCopyAddress}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-mono"
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={16} className="text-green-600" />
                                                <span className="text-green-600">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={16} className="text-gray-600" />
                                                <span className="text-gray-700">{shortenAddress(address)}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                        
                   
                        <div className="flex flex-row gap-3">
                            <Button variant="secondary" size="lg" className="gap-2" onClick={handleEditProfile}>
                                Edit Profile
                            </Button>
                            <Button variant="primary-bw" size="lg" className="gap-2" onClick={() => navigate('/create-design', { state: { fromNgo: false } })}>
                                <Plus size={20} />
                                Create Design
                            </Button>
                        </div>
                    </div>
                </div>
                
              
                <div className="px-4 md:px-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Causes Supported</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">{statistics.causesSupported}</p>
                    </div>
                    
                  
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Donated</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">₦{statistics.totalDonated.toLocaleString()}</p>
                    </div>
                    
                   
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Profit</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">₦{statistics.totalProfit.toLocaleString()}</p>
                    </div>
                    
                 
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Designs</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">{statistics.totalDesigns}</p>
                    </div>
                    </div>
                </div>
                
             
                <div className="px-4 md:px-7 mt-20">
                  
                    <div className="flex gap-2 mb-8">
                        <Button 
                            variant={activeCategory === 'NFTs' ? 'primary-bw' : 'secondary'} 
                            size="lg"
                            onClick={() => handleCategoryChange('NFTs')}
                        >
                            NFTs
                        </Button>
                        <Button 
                            variant={activeCategory === 'History' ? 'primary-bw' : 'secondary'} 
                            size="lg"
                            onClick={() => handleCategoryChange('History')}
                        >
                            History
                        </Button>
                        <Button 
                            variant={activeCategory === 'Created' ? 'primary-bw' : 'secondary'} 
                            size="lg"
                            onClick={() => handleCategoryChange('Created')}
                        >
                            Created
                        </Button>
                    </div>
                    
                   
                    {activeCategory === 'NFTs' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-40">
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                            <NFTcard
                                image="/src/assets/Clothimg.png"
                                title="Live In Balance NFT"
                            />
                        </div>
                    )}

                    {activeCategory === 'History' && (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-40">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-black text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium">ID</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Details</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Causes</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Amount</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Split</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium">Blockchain</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-4 text-sm text-gray-900">2334</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Live in Balance</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Books for Africa</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">25HBAR</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">10%</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Completed</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">20/03/2025</td>
                                            <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline">View</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-4 text-sm text-gray-900">2334</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Purchased Live in Balance</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Save Gaza</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">10USDT</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">20%</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Completed</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">20/03/2025</td>
                                            <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline">View</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-4 text-sm text-gray-900">2334</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Purchased Live in Balance</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Purchased Live in Balance</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">50USDT</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">10%</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">Completed</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">20/03/2025</td>
                                            <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline">View</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeCategory === 'Created' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-40">
                            {createdDesigns.length > 0 ? (
                                createdDesigns.map((design) => (
                                    <div 
                                        key={design.id} 
                                        className="bg-white rounded-3xl p-4 hover:border hover:border-black/10 transition-colors cursor-pointer"
                                        onClick={() => navigate(`/product/${design.id}`)}
                                    >
                                        <div className="rounded-2xl bg-[#eeeeee] mb-4">
                                            <div className="aspect-square rounded-xl overflow-hidden bg-[#eeeeee] flex items-center justify-center relative">
                                                {/* T-shirt mockup background */}
                                                <img 
                                                    src="/src/assets/shirtfront.png" 
                                                    alt="Shirt Mockup" 
                                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                                    style={{ 
                                                        filter: design.color === '#FFFFFF' ? 'none' : 
                                                               design.color === '#000000' ? 'brightness(0)' : 'none'
                                                    }}
                                                />
                                                
                                                {/* Uploaded design overlay */}
                                                {design.frontDesign?.dataUrl && (
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
                                                            src={design.frontDesign.dataUrl} 
                                                            alt="Design" 
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                )}
                                                
                                                {/* Fallback if no design */}
                                                {!design.frontDesign?.dataUrl && (
                                                    <div className="text-center text-gray-500">
                                                        <div className="text-4xl mb-2">👕</div>
                                                        <p className="text-sm">{design.type}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[22px] font-semibold leading-tight mb-1">
                                                {design.pieceName}
                                            </h3>
                                            <p className="text-[14px] text-black/60 mb-3">Campaign: {design.campaign}</p>
                                            <p className="text-[22px] font-semibold">₦{design.price}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Created: {new Date(design.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <div className="text-6xl mb-4">🎨</div>
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No designs created yet</h3>
                                    <p className="text-gray-500 mb-6">Start creating your first design to see it here!</p>
                                    <Button
                                        variant="primary-bw"
                                        size="lg"
                                        onClick={() => navigate('/create-design', { state: { fromNgo: false } })}
                                        className="gap-2"
                                    >
                                        <Plus size={20} />
                                        Create Design
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            
            {isEditModalOpen && (
                <>
                   
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50"
                        onClick={handleCloseModal}
                    />
                    
                    
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div 
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <button 
                                    onClick={handleCloseModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-600" />
                                </button>
                                <h2 className="text-xl font-semibold text-black">Edit profile</h2>
                                <Button 
                                    variant="primary-bw" 
                                    size="sm"
                                    onClick={handleSaveProfile}
                                >
                                    Save
                                </Button>
                            </div>
                            
                          
                            <div className="p-6">
                              
                                <div className="relative mb-6">
                                    <div className="w-full h-32 bg-black rounded-xl relative overflow-hidden">
                                        {bannerImage && (
                                            <img 
                                                src={bannerImage} 
                                                alt="Banner" 
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-colors cursor-pointer">
                                            <Camera size={24} className="text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBannerUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                
                               
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center relative -mt-10 ml-4 overflow-hidden">
                                        {profileImage ? (
                                            <img 
                                                src={profileImage} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <span className="text-black text-2xl font-bold"></span>
                                        )}
                                        <label className="absolute w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
                                            <Camera size={14} className="text-white" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProfileUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                                
                               
                                <div className="space-y-4">
                                   
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    
                                   
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
           
            {showSuccessMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Profile has been successfully updated!</span>
                </div>
            )}
            
            <Footer />
        </div>
    )
}

export default UserProfile;
