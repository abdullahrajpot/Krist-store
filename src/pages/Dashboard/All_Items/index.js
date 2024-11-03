import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from 'antd';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

const { toastify } = window;
const initialState = { updatedName: "", updatedDescription: "", updatedCategory: "", updatedPrice: "" }

export default function All_Items() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showModal = (product) => {
        setCurrentProduct(product);
        setState({
            updatedName: product.name,
            updatedDescription: product.description,
            updatedCategory: product.category,
            updatedPrice: product.price
        });
        setIsModalOpen(true);
    };

    const showDeleteModal = (product) => {
        setCurrentProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleOk = () => {
        updateProduct(currentProduct);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

    const updateProduct = async (product) => {
        const { updatedName, updatedDescription, updatedCategory, updatedPrice } = state;

        const formData = { 
            name: updatedName, 
            description: updatedDescription, 
            category: updatedCategory, 
            price: updatedPrice, 
            dateUpdated: serverTimestamp() 
        };

        try {
            const docRef = doc(firestore, "items", product.id);
            await setDoc(docRef, formData, { merge: true });
            setData(s => s.map(item => item.id === product.id ? { ...item, ...formData } : item));
            toastify("Item updated successfully", "success");
        } catch (error) {
            console.error(error.code);
            toastify("Something went wrong while updating the menu item", "error");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(firestore, "menuItems", currentProduct.id));
            setData(s => s.filter(item => item.id !== currentProduct.id));
            toastify("Item deleted successfully", "success");
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.log(error.code);
            toastify("Something went wrong while deleting the item", "error");
        }
    };

    const columns = [
        { title: "#", dataIndex: "index", responsive: ['lg', 'md', 'sm', 'xs'], render: (_, __, index) => index + 1 },
        { title: 'Name', dataIndex: 'name', responsive: ['lg', 'md', 'sm', 'xs'], key: 'name' },
        { title: 'Description', dataIndex: 'description', responsive: ['lg', 'md', 'sm', 'xs'], key: 'description' },
        { title: 'Category', dataIndex: 'category', responsive: ['lg', 'md', 'sm', 'xs'], key: 'category' },
        { title: 'Price', dataIndex: 'price', responsive: ['lg', 'md', 'sm', 'xs'], key: 'price' },
        {
            title: 'Action', key: 'action',
            responsive: ['lg', 'md', 'sm', 'xs'],
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => showModal(record)}>Update</Button>
                    <Button type='primary' onClick={() => showDeleteModal(record)} danger>Delete</Button>
                </Space>
            )
        },
    ];

    const getData = async () => {
        setIsLoading(true);
        try {
            const querySnapshot = await getDocs(collection(firestore, "items"));
            const items = querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
            setData(items);
        } catch (error) {
            console.error("Error fetching menu items: ", error);
            toastify("Something went wrong while fetching menu items", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className='text-center p-5'>
                <h1>All Items</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <Card className="border rounded-2" style={{ overflowY: "auto", maxHeight: "80vh" }}>
                        <Table columns={columns} dataSource={data} loading={isLoading} pagination={false} />
                    </Card>
                </div>
            </div>

            {/* Update Modal */}
            <Modal title="Update Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type='primary' onClick={handleOk}>Update</Button>
                ]}
            >
                <Form layout='vertical'>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Input type='text' placeholder='Name' name='updatedName' value={state.updatedName} onChange={handleChange} />
                        </Col>
                        <Col span={24}>
                            <Input.TextArea rows={5} placeholder='Description' name='updatedDescription' value={state.updatedDescription} style={{ resize: "none" }} onChange={handleChange} />
                        </Col>
                        <Col span={24}>
                            <Input type='text' placeholder='Category' name='updatedCategory' value={state.updatedCategory} onChange={handleChange} />
                        </Col>
                        <Col span={24}>
                            <Input type='number' placeholder='Price' name='updatedPrice' value={state.updatedPrice} onChange={handleChange} />
                        </Col>
                    </Row>
                </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal title="Delete Confirmation" open={isDeleteModalOpen} onCancel={handleCancelDelete}
                footer={[
                    <Button key="cancel" onClick={handleCancelDelete}>Cancel</Button>,
                    <Button key="delete" type='primary' danger onClick={handleDelete}>Delete</Button>
                ]}
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>
        </>
    );
}
