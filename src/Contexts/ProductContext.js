import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react'
import { firestore } from '../config/firebase';
import { useEffect } from 'react';

const ProductContext = createContext()



export default function ProductContextProvider({ children }) {

    const [products, setProducts] = useState([])

    const getProducts = async (items) => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "items"));
            const items = querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
            console.log("items=>" , items)

            setProducts(items);
        } catch (error) {
            console.error("Error fetching menu items", error)
        }
    }

    useEffect(() => {
        getProducts()

    }, [])


   
    return (
        <ProductContext.Provider value={{ getProducts, products }}>
            {children}
        </ProductContext.Provider>


    )
}

export const useProductContext = () => useContext(ProductContext)
