import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useAuthContext } from './AuthContext';

const Cart = createContext();
const max_limit = 10;
// const {toastify}=window
export default function CartContextProvider({ children }) {
    const { user } = useAuthContext();
    console.log("object=>", user)
  
    const [cartProducts, setCartProducts] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [cartItems, setCartItems] = useState([]); // Corrected state initialization

    const addToCart = async (product) => {
        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
        let updatedCart;
    
        if (existingProductIndex !== -1) {
            // Update existing product's quantity
            updatedCart = cartItems.map((item, index) =>
                index === existingProductIndex ? { ...item, quantity: Math.min(item.quantity + product.quantity, 99) } : item
            );
        } else {
            // New product
            if (cartItems.length >= max_limit) {
                return; // Handle cart full case (e.g., show a message)
            }
            updatedCart = [...cartItems, product]; // Add new product with its details
        }
    
        setCartItems(updatedCart);
    
        // Save to Firestore if the user is authenticated
        if (user && user.uid) {
            await setDoc(doc(firestore, "carts", user.uid), { items: updatedCart });
        }
    };

    // const removeFromCart = (itemId) => {
    //     setCartItem((prev)=> ({...prev , [itemId]: prev[itemId]-1}))
    // }


    const removeFromCart = async (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        if (user && user.uid) {
            await setDoc(doc(firestore, "carts", user.uid), { items: updatedCart });
        }
    };

    
      
    



    const getCartProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "carts"));
            const fetchedCarts = querySnapshot.docs.map(doc => ({
                key: doc.id, 
                items: doc.data().items || [] // Ensure items is an array
            }));
            setCartProducts(fetchedCarts);
            console.log("Fetched carts:", fetchedCarts);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };
    
    

    useEffect(() => {
        getCartProducts()

    }, [])

    return (
        <Cart.Provider value={{ cartItems, addToCart, getCartProducts, cartProducts, removeFromCart}}>
            {children}
        </Cart.Provider>
    );
}

export const useCartContext = () => useContext(Cart);
