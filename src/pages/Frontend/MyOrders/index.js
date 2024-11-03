import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useAuthContext } from '../../../Contexts/AuthContext';

const { toastify } = window; // Adjust as necessary based on your setup

export default function MyOrders({ userId }) {
    const [orders, setOrders] = useState([]);
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    
    const columns = [
        { title: 'Order Date and Time', dataIndex: 'createdAt', key: 'createdAt', render: (text) => new Date(text).toLocaleString() },
        { title: 'Total Price', dataIndex: 'total', key: 'total', render: (text) => `Rs. ${text}` },
        { title: 'Items', dataIndex: 'items', key: 'items', render: (items) => items.map(item => item.name).join(', ') },
        { title: 'Status', dataIndex: 'status', key: 'status' }, // No interaction, just display the status
    ];

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Query to get orders for the logged-in user
            const q = query(collection(firestore, "orderPlaced"), where("customer", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({
                key: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
            toastify("Something went wrong while fetching orders", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]); // Re-fetch when userId changes

    return (
       <main>
         <div className='container mt-5'>
            <h1 className='text-center'>My Orders</h1>
            <Table columns={columns} dataSource={orders} loading={isLoading} />
        </div>
       </main>
    );
}
