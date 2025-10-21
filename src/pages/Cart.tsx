import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'
import Banner from '../component/Banner'


const Cart = () => {
    return (
        <div>
            <Header />
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold mb-4">Cart</h1>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart