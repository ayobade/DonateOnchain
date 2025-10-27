import Header from "../component/Header";
import Footer from "../component/Footer";
import Button from "../component/Button";
import { Plus, X, Camera, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const NgoProfile = () => {
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const [activeCategory, setActiveCategory] = useState<'NFTs' | 'History' | 'Created'>('NFTs');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        bio: '',
        bannerImage: null as string | null,
        profileImage: null as string | null
    });
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        categories: [] as string[],
        country: '',
        officeAddress: '',
        contactEmail: '',
        websiteLink: ''
    });
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [ngoDetails, setNgoDetails] = useState<any>(null);
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const [showFullBio, setShowFullBio] = useState(false);
    const [emailError, setEmailError] = useState<string>('');
    const [createdDesigns, setCreatedDesigns] = useState<any[]>([]);
    const [statistics, setStatistics] = useState({
        causesSupported: 0,
        totalDonated: 0,
        totalProfit: 0,
        totalDesigns: 0
    });

    // Load NGO data from localStorage
    useEffect(() => {
        const ngos = JSON.parse(localStorage.getItem('ngos') || '[]')
        if (ngos.length > 0) {
            const latestNgo = ngos[ngos.length - 1] // Get the most recent NGO
            setProfileData({
                name: latestNgo.ngoName,
                bio: latestNgo.missionStatement,
                bannerImage: null,
                profileImage: null
            })
            setFormData({
                name: latestNgo.ngoName,
                bio: latestNgo.missionStatement,
                categories: latestNgo.categories || [],
                country: latestNgo.country || '',
                officeAddress: latestNgo.officeAddress || '',
                contactEmail: latestNgo.contactEmail || '',
                websiteLink: latestNgo.websiteLink || ''
            })
            setNgoDetails(latestNgo) // Store all NGO data
        }
    }, [])
    
    // Load created designs from localStorage
    useEffect(() => {
        const savedDesigns = JSON.parse(localStorage.getItem('ngoDesigns') || '[]');
        setCreatedDesigns(savedDesigns);
    }, [])

    // Calculate statistics for NGO
    useEffect(() => {
        const savedDesigns = JSON.parse(localStorage.getItem('ngoDesigns') || '[]');
        
        // Get donation history (when user donated to causes)
        const donationHistory = JSON.parse(localStorage.getItem('userDonations') || '[]');
        
        // Get purchase history (when someone purchased the NGO's designs)
        const purchaseHistory = JSON.parse(localStorage.getItem('ngoPurchases') || '[]');
        
        // Calculate causes supported (unique campaigns from donations)
        const uniqueCampaigns = new Set(donationHistory.map((donation: any) => donation.campaign).filter(Boolean));
        
        // Calculate total donated (sum of all donations)
        const totalDonated = donationHistory.reduce((sum: number, donation: any) => {
            const amount = parseFloat(donation.amount?.replace(/[^\d.]/g, '') || '0');
            return sum + amount;
        }, 0);
        
        // Calculate total profit (sum of purchases of NGO's designs)
        const totalProfit = purchaseHistory.reduce((sum: number, purchase: any) => {
            const amount = parseFloat(purchase.amount?.replace(/[^\d.]/g, '') || '0');
            return sum + amount;
        }, 0);
        
        setStatistics({
            causesSupported: uniqueCampaigns.size,
            totalDonated: totalDonated,
            totalProfit: totalProfit,
            totalDesigns: savedDesigns.length
        });
    }, [createdDesigns])

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
        if (ngoDetails) {
            setFormData({
                name: profileData.name,
                bio: profileData.bio,
                categories: ngoDetails.categories || [],
                country: ngoDetails.country || '',
                officeAddress: ngoDetails.officeAddress || '',
                contactEmail: ngoDetails.contactEmail || '',
                websiteLink: ngoDetails.websiteLink || ''
            });
        } else {
        setFormData({
            name: profileData.name,
                bio: profileData.bio,
                categories: [],
                country: '',
                officeAddress: '',
                contactEmail: '',
                websiteLink: ''
            });
        }
        setBannerImage(profileData.bannerImage);
        setProfileImage(profileData.profileImage);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setEmailError(''); // Clear email error when closing modal
    };

    const handleSaveProfile = () => {
        // Prevent saving if email is invalid
        if (emailError) {
            return;
        }
       
        setProfileData(prev => ({
            ...prev,
            bio: formData.bio,
            bannerImage: bannerImage || prev.bannerImage,
            profileImage: profileImage || prev.profileImage
        }));
        
        // Update NGO data in localStorage
        if (ngoDetails) {
            const ngos = JSON.parse(localStorage.getItem('ngos') || '[]')
            const updatedNgos = ngos.map((ngo: any) => {
                if (ngo.id === ngoDetails.id) {
                    return {
                        ...ngo,
                        missionStatement: formData.bio,
                        categories: formData.categories,
                        country: formData.country,
                        officeAddress: formData.officeAddress,
                        contactEmail: formData.contactEmail,
                        websiteLink: formData.websiteLink
                    }
                }
                return ngo
            })
            localStorage.setItem('ngos', JSON.stringify(updatedNgos))
            
            // Update ngoDetails state
            setNgoDetails({
                ...ngoDetails,
                missionStatement: formData.bio,
                categories: formData.categories,
                country: formData.country,
                officeAddress: formData.officeAddress,
                contactEmail: formData.contactEmail,
                websiteLink: formData.websiteLink
            })
        }
        
      
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
        
        // Validate email when contact email is changed
        if (field === 'contactEmail') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError('');
            }
        }
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
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl md:text-4xl font-bold text-black">{profileData.name || 'NGO'}</h1>
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={handleEditProfile}
                                    className="gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </Button>
                            </div>
                            <div className="max-w-md">
                                <p className={`text-black text-sm leading-relaxed break-words ${!showFullBio ? 'line-clamp-2 overflow-hidden' : ''}`}>
                                {profileData.bio || ''}
                            </p>
                                {profileData.bio && profileData.bio.length > 100 && (
                                    <button
                                        onClick={() => setShowFullBio(!showFullBio)}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1"
                                    >
                                        {showFullBio ? 'Show Less' : 'Show More'}
                                    </button>
                                )}
                            </div>
                            {isConnected && address && (
                                <div className="flex items-center gap-2 mt-3">
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
                            
                            {/* NGO Details */}
                            {ngoDetails && (
                                <div className="mt-4 max-w-[500px]">
                                    {/* Show More Button */}
                                    <button
                                        onClick={() => setShowMoreDetails(!showMoreDetails)}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {showMoreDetails ? 'Show Less' : 'Show More'}
                                    </button>
                                    
                                    {/* All Details */}
                                    {showMoreDetails && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm break-words">
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Categories: </span>
                                                <span className="text-black break-words">{ngoDetails.categories?.join(', ') || 'N/A'}</span>
                                            </div>
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Country: </span>
                                                <span className="text-black break-words">{ngoDetails.country || 'N/A'}</span>
                                            </div>
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Office Address: </span>
                                                <span className="text-black break-words">{ngoDetails.officeAddress || 'N/A'}</span>
                                            </div>
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Contact Email: </span>
                                                <span className="text-black break-words">{ngoDetails.contactEmail || 'N/A'}</span>
                                            </div>
                                            {ngoDetails.websiteLink && (
                                                <div className="break-words">
                                                    <span className="text-gray-600 font-medium">Website: </span>
                                                    <a href={ngoDetails.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                                        {ngoDetails.websiteLink}
                                                    </a>
                                                </div>
                                            )}
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Wallet: </span>
                                                <span className="text-black font-mono text-xs break-all">{ngoDetails.walletAddress ? `${ngoDetails.walletAddress.substring(0, 10)}...${ngoDetails.walletAddress.substring(ngoDetails.walletAddress.length - 8)}` : 'N/A'}</span>
                                            </div>
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Network: </span>
                                                <span className="text-black break-words">{ngoDetails.preferredNetwork || 'N/A'}</span>
                                            </div>
                                            <div className="break-words">
                                                <span className="text-gray-600 font-medium">Status: </span>
                                                <span className={`font-medium break-words ${ngoDetails.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    {ngoDetails.verified ? 'Verified' : 'Pending Verification'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                      
                        <div className="flex flex-row gap-3">
                            <Button variant="secondary" size="lg" className="gap-2" onClick={() => navigate('/create-design', { state: { fromNgo: true } })}>
                                <Plus size={20} />
                                Create Design
                            </Button>
                            <Button variant="primary-bw" size="lg" className="gap-2">
                                <Plus size={20} />
                                Create Campaign
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
                        <div className="mb-40">
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🎫</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No NFTs collected yet</h3>
                                <p className="text-gray-500">Your collected NFTs will appear here</p>
                            </div>
                        </div>
                    )}

                    {activeCategory === 'History' && (
                        <div className="mb-40">
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📜</div>
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No transaction history</h3>
                                <p className="text-gray-500">Your purchase and donation history will appear here</p>
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
                                                    className="w-full h-full object-contain"
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
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-black mb-1">{design.pieceName}</h3>
                                        <p className="text-sm text-gray-600 mb-1">Campaign: {design.campaign}</p>
                                        <p className="text-sm font-semibold text-black mb-1">₦{design.price}</p>
                                        <p className="text-xs text-gray-500">Created: {new Date(design.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-gray-500 mb-4">No designs created yet</p>
                                    <Button 
                                        variant="primary-bw" 
                                        size="lg"
                                        onClick={() => navigate('/create-design', { state: { fromNgo: true } })}
                                    >
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
                                    
                                    {/* NGO Fields */}
                                    {ngoDetails && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Categories
                                                </label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {['Education', 'Health', 'Environment', 'Poverty Alleviation', 'Human Rights', 'Animal Welfare', 'Others'].map((category) => (
                                                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.categories.includes(category)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setFormData(prev => ({ ...prev, categories: [...prev.categories, category] }))
                                                                    } else {
                                                                        setFormData(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }))
                                                                    }
                                                                }}
                                                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                                                            />
                                                            <span className="text-sm text-black">{category}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.country}
                                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Office Address
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.officeAddress}
                                                    onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Contact Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.contactEmail}
                                                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none ${
                                                        emailError ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                />
                                                {emailError && (
                                                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    value={formData.websiteLink}
                                                    onChange={(e) => handleInputChange('websiteLink', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                                />
                                            </div>
                                        </>
                                    )}
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

export default NgoProfile;