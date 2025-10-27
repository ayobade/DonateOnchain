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

const App = () => {
    const { isConnected } = useAccount()
    const [showProfileSetup, setShowProfileSetup] = useState(false)

    useEffect(() => {
        if (isConnected) {
            const setupCompleted = localStorage.getItem('profileSetupCompleted')
            if (!setupCompleted) {
                setShowProfileSetup(true)
            }
        }
    }, [isConnected])

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
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/campaign" element={<Campaign />} />
                    <Route path="/campaign/:id" element={<CampaignDetails />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/create-design" element={<CreateDesign />} />
                    <Route path="/become-an-ngo" element={<BecomeanNgo />} />
                    <Route path="/ngo-profile" element={<NgoProfile />} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App;