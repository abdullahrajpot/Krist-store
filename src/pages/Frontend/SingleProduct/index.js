import React, { useEffect, useState } from 'react'
import { Button, Col, Image, InputNumber, Row, Tag, Typography } from 'antd'
import { collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import start_icon from '../../../data/assets/icons/stars.png'
import { useCartContext } from '../../../Contexts/CartContext';
import { useAuthContext } from '../../../Contexts/AuthContext';


const { Title, Text } = Typography
const { toastify } = window
export default function SingleProduct() {
    const location = useLocation();
    const [product, setProduct] = useState('');
    const [mainImage, setMainImage] = useState('')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const { addToCart } = useCartContext()
    const { state } = useAuthContext()
    let navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const searchParams = new URLSearchParams(location.search);
            const id = searchParams.get('id');

            if (id) {
                try {
                    const productsRef = collection(firestore, 'items');
                    const q = query(productsRef, where("id", "==", id));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const productData = querySnapshot.docs[0].data();
                        setProduct(productData);
                        setMainImage(productData.imageUrl);
                    } else {
                        toastify('Product not found', 'error');
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };

        fetchProduct();
    }, [location]);

   

    const handleQuantity = (value) => {
        setQuantity(value)
    }
    const handelNotLogin = () => {
      toastify("Login to add Product", "error")
      return
    }

const addItem = () => {
    if ( !quantity) {
        toastify("select quantity" , "error")

        // Handle error if not all selections are made
        return;
    }

    addToCart({
        ...product,
        quantity,
        });
    toastify("Product added to cart" , "success")
};


    return (
        <main style={{ margin: '60px', width: '80%' }}>
            <Row gutter={[32, 32]}>
                <Col xs={24} lg={12}>
                    <Row>
                        <Image src={mainImage} className='' width={'80%'} height={'450px'}  ></Image>
                    </Row>
                </Col>


                <Col xs={24} lg={12}>
                    <div className='d-flex justify-content-between'>
                        <Title level={2}>{product.brand}</Title>
                        <Tag color='success' height='2px' style={{ height: '25px' }}>In Stock</Tag>
                    </div>


                    <Title level={4}>{product.name}</Title>
                    <img src={start_icon} alt="" width={'70px'} height={'70px'} />
                    <Text>4.0(120 reviewed)</Text>
                    <div >
                        <Title level={3} >$ {product.price}</Title>
                        <Text style={{ textDecoration: 'line-through', color: 'gray' }}>$ {product.oldPrice}</Text>
                    </div>
                    <Text>{product.description}</Text>

                   
                   
                    <div className='w-100 mt-4' >
                        <div className='border' style={{ width: '130px', height: '398x', borderRadius: '5px', display: 'inline-block' }} >
                            <Button shape='square' style={{ fontSize: '17px', border: 'none' }} onClick={() => handleQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} >-</Button>
                            <InputNumber min={1} value={quantity} onchange={handleQuantity} controls={false} style={{ border: 'none', width: '37px ', height: '30px' }} />
                            <Button shape='square' style={{ fontSize: '17px', border: 'none' }} onClick={() => handleQuantity((quantity + 1))} >+</Button>
                        </div>
                        <Button className='bg-dark text-white fs-4 h-75 mx-2' shape='square' style={{ width: '220px' }}  onClick={state.isAuthenticated ? addItem : handelNotLogin} >Add to Cart</Button>

                    </div>


                </Col>
            </Row>

        </main>
    )
}
