import React, { useEffect, useState } from 'react';
import { Table, Select, message } from 'antd';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { Option } = Select;

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        { title: 'Order Date and Time', dataIndex: 'createdAt', key: 'createdAt', render: (text) => new Date(text).toLocaleString() },
        { title: 'Customer ID', dataIndex: 'customer', key: 'customer' },
        { title: 'Total Price', dataIndex: 'total', key: 'total', render: (text) => `Rs. ${text}` },
        { title: 'Items', dataIndex: 'items', key: 'items', render: (items) => items.map(item => item.name).join(', ') },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Select defaultValue={text} style={{ width: 120 }} onChange={(value) => handleStatusChange(record.key, value)}>
                    <Option value="Preparing">Preparing</Option>
                    <Option value="Ready to Deliver">Ready to Deliver</Option>
                    <Option value="Delivered">Delivered</Option>
                </Select>
            ),
        },
    ];

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(firestore, "orderPlaced"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({
                key: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
            message.error("Something went wrong while fetching orders");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (key, newStatus) => {
        const orderRef = doc(firestore, "orderPlaced", key);
        try {
            await updateDoc(orderRef, { status: newStatus });
            setOrders(prevOrders => prevOrders.map(order => order.key === key ? { ...order, status: newStatus } : order));
            message.success(`Status updated to "${newStatus}"`);
        } catch (error) {
            console.error("Error updating order status: ", error);
            message.error("Failed to update status");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Recent Orders</h1>
            <Table columns={columns} dataSource={orders} loading={isLoading} />
        </div>
    );
}
