import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import ScrollToTop from './component/ScrollToTop'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import UserProfile from './pages/UserProfile'
import Campaign from './pages/Campaign'
import CampaignDetails from './pages/CampaignDetails'
import HowItWorks from './pages/HowItWorks'
import CreateDesign from './pages/CreateDesign'
import BecomeanNgo from './pages/BecomeanNgo'
import NgoProfile from './pages/NgoProfile'
import Header from './component/Header'
import ProfileSetupModal from './component/ProfileSetupModal'
import PrivateRoute from './component/PrivateRoute'
import { getUserProfile, getNgoProfile } from './utils/firebaseStorage'

const App = () => {
    const { isConnected, address } = useAccount()
    const [showProfileSetup, setShowProfileSetup] = useState(false)

    useEffect(() => {
        const checkProfileExists = async () => {
            if (isConnected && address) {
                
                try {
                    const userProfile = await getUserProfile(address)
                    const ngoProfile = await getNgoProfile(address)
                    
                    
                    if (userProfile && userProfile.name && userProfile.bio) {
                        setShowProfileSetup(false)
                        return
                    }
                    
                    if (ngoProfile && ngoProfile.name && ngoProfile.bio) {
                        setShowProfileSetup(false)
                        return
                    }
                    
                    const savedProfile = localStorage.getItem('userProfile')
                    if (savedProfile) {
                        const profile = JSON.parse(savedProfile)
                        if (profile.name && profile.bio) {
                            setShowProfileSetup(false)
                            return
                        }
                    }
                    
                    const ngos = JSON.parse(localStorage.getItem('ngos') || '[]')
                    if (ngos.length > 0 && ngos[ngos.length - 1].ngoName && ngos[ngos.length - 1].missionStatement) {
                        setShowProfileSetup(false)
                        return
                    }
                    
                    setShowProfileSetup(true)
                } catch (error) {
                    console.error('Error checking profile:', error)
                  
                    const savedProfile = localStorage.getItem('userProfile')
                    if (!savedProfile || !JSON.parse(savedProfile).name) {
                        setShowProfileSetup(true)
                    }
                }
            }
        }
        
        checkProfileExists()
    }, [isConnected, address])

    const handleCloseProfileSetup = () => {
        setShowProfileSetup(false)
        localStorage.setItem('profileSetupCompleted', 'true')
    }

    return (
        <CartProvider>
            <Router>
                <Header />
                <ScrollToTop />
                <ProfileSetupModal isOpen={showProfileSetup} onClose={handleCloseProfileSetup} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/user-profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    <Route path="/campaign" element={<Campaign />} />
                    <Route path="/campaign/:id" element={<CampaignDetails />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/create-design" element={<PrivateRoute><CreateDesign /></PrivateRoute>} />
                    <Route path="/become-an-ngo" element={<BecomeanNgo />} />
                    <Route path="/ngo-profile" element={<PrivateRoute><NgoProfile /></PrivateRoute>} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App;