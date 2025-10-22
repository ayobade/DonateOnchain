import Header from "../component/Header";
import Footer from "../component/Footer";
import Button from "../component/Button";
import NFTcard from "../component/NFTcard";
import ProductCard from "../component/ProductCard";
import { Plus, X, Camera } from "lucide-react";
import { useState } from "react";
import { products } from "../data/databank";

const UserProfile = () => {
    const [activeCategory, setActiveCategory] = useState<'NFTs' | 'History' | 'Created'>('NFTs');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

    const handleCategoryChange = (category: 'NFTs' | 'History' | 'Created') => {
        setActiveCategory(category);
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
                            <p className="text-black text-sm md:text-lg leading-relaxed max-w-md">
                                {profileData.bio}
                            </p>
                        </div>
                        
                   
                        <div className="flex flex-row gap-3">
                            <Button variant="secondary" size="lg" className="gap-2" onClick={handleEditProfile}>
                                Edit Profile
                            </Button>
                            <Button variant="primary-bw" size="lg" className="gap-2">
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
                        <p className="text-white text-3xl md:text-4xl font-bold">0</p>
                    </div>
                    
                  
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Donated</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">$0</p>
                    </div>
                    
                   
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Profit</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">$0</p>
                    </div>
                    
                 
                    <div className="bg-black rounded-lg p-6">
                        <h3 className="text-white text-sm font-medium mb-2">Total Designs</h3>
                        <p className="text-white text-3xl md:text-4xl font-bold">0</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40">
                            {products.slice(0, 8).map((product) => (
                                <ProductCard
                                    key={product.id}
                                    image={product.image}
                                    title={product.title}
                                    creator={product.creator}
                                    price={product.price}
                                />
                            ))}
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