import React from 'react';
import { Button, Space, Table } from 'antd';
import { useCartContext } from '../../../Contexts/CartContext';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useAuthContext } from '../../../Contexts/AuthContext';

const { toastify } = window;

export default function Cart() {
  const { cartProducts, removeFromCart } = useCartContext();
  const { state } = useAuthContext();
  const { user } = state; // This gives you the logged-in user
  console.log("id", user.uid)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['lg', 'md', 'sm', 'xs'],
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      responsive: ['lg', 'md', 'sm', 'xs']
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      responsive: ['lg', 'md', 'sm', 'xs']
    },
    {
      title: 'Total Price',
      dataIndex: 'Total_price',
      key: 'Total_price',
      responsive: ['lg', 'md', 'sm', 'xs']
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['lg', 'md', 'sm', 'xs'],
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => removeFromCart(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];



  const data = Array.isArray(cartProducts)
    ? cartProducts.flatMap(cart =>
      Array.isArray(cart.items)
        ? cart.items.map((item, index) => ({
          key: `${item.id}-${index}`, // Combining id with index for uniqueness
          name: item.name,
          price: item.price,
          quantity: item.quantity,

          Total_price: item.quantity * item.price,
        }))
        : []
    )
    : [];


  const grandTotal = data.reduce((total, item) => total + item.Total_price, 0);


  const confirmOrder = async () => {
    // Log user and grand total for debugging
    console.log("User:", user);
    console.log("Grand Total:", grandTotal);

    if (data.length === 0) {
      toastify("Your cart is empty. Please add items before confirming.", "warning");
      return;
    }

    // Check user and grandTotal validity
    if (!user || !user.uid || grandTotal <= 0) {
      toastify("Invalid order data", "warning");
      return;
    }

    try {
      const orderDocRef = doc(firestore, "orderPlaced", `order_${Date.now()}`);
      const orderData = {
        items: data.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: grandTotal,
        customer: user.uid,
        createdAt: new Date().toISOString(),
      };

      console.log("Order Data:", orderData); // Log order data for debugging

      await setDoc(orderDocRef, orderData);
      toastify("Order confirmed", "success");
    } catch (error) {
      console.error("Error confirming order:", error);
      toastify("Something went wrong while confirming the order", "error");
    }
  };


  return (
    <main>
      <div className='container mt-5'>
      <h1 className='text-center'>Your Orders</h1>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
      <div className='text-center p-3'>
        <Button className='p-4 fs-large' onClick={confirmOrder}>Confirm Order</Button>

      </div>
    </div>
    </main>
  );
}
