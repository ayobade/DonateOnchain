import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import ScrollToTop from './component/ScrollToTop'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import UserProfile from './pages/UserProfile'

const App = () => {
    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/user-profile" element={<UserProfile />} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App;