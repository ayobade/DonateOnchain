import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface CartItem {
    id: number
    quantity: number
    size: string
    color: string
    uniqueId: string 
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (productId: number, size: string, color: string) => void
    updateQuantity: (uniqueId: string, newQuantity: number) => void
    removeItem: (uniqueId: string) => void
    clearCart: () => void
    getCartItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

interface CartProviderProps {
    children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

   
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart)
             
                const migratedCart = parsedCart.map((item: any) => {
                    if (!item.uniqueId) {
                        return {
                            ...item,
                            uniqueId: `${item.id}-${item.size}-${item.color}`
                        }
                    }
                    return item
                })
                setCartItems(migratedCart)
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            }
        }
    }, [])

   
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (productId: number, size: string, color: string) => {
        const uniqueId = `${productId}-${size}-${color}`
        setCartItems(prevItems => {
          
            const existingItemIndex = prevItems.findIndex(
                item => item.uniqueId === uniqueId
            )

            if (existingItemIndex > -1) {
               
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                }
                return updatedItems
            } else {
             
                const newItem = { id: productId, quantity: 1, size, color, uniqueId }
                return [...prevItems, newItem]
            }
        })
    }

    const updateQuantity = (uniqueId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(uniqueId)
            return
        }
        setCartItems(items => 
            items.map(item => 
                item.uniqueId === uniqueId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (uniqueId: string) => {
        setCartItems(items => items.filter(item => item.uniqueId !== uniqueId))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }

    const value: CartContextType = {
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartItemCount
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
