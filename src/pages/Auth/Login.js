import { Checkbox, Col, Image, Input, Row, Typography, Button, Form } from 'antd';
import React, { useState } from 'react';
import login_img from '../../data/assets/images/login.png';
import hello_img from '../../data/assets/images/hello.png';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../config/firebase';
import { useAuthContext } from '../../Contexts/AuthContext';


export default function Login() {

    const { Title, Text } = Typography;
    const { toastify } = window;
    const initialstate = { email: '', password: '' }


    const [signin, setSignIn] = useState(initialstate)
    const { dispatch, state} = useAuthContext()
    let navigate = useNavigate();

    const handlechange = (e) => setSignIn(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = (e) => {
        e.preventDefault();

        let { email, password } = signin


        if (!window.isemail(email)) return toastify("Enter valid email address", "error")
        if (password.length < 6) return toastify("Password must be atleast 6 characters ", "error")

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                dispatch({type: "SET_LOGGED_IN", payload:{user: user} } )
                console.log("is authenticated", state.isAuthenticated)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/email-already-in-use': return toastify("An account with this email already exists. Please log in.", "error");
                    case 'auth/invalid-email': return toastify("The email address is not valid.", "error");
                    case 'auth/operation-not-allowed': return toastify("Email/password accounts are not enabled. Please contact support.", "error");
                    case 'auth/weak-password': return toastify("The password is too weak. Please choose a stronger password.", "error");
                    default: return toastify("An error occurred during registration. Please try again.", "error");
                }
            });
    }
    


   

    return (
        <>
            <Row className="min-vh-100">
                <Col xs={24} md={12} lg={16} className="p-0 d-none d-md-block">
                    <Image src={login_img} alt="Krist brand image" preview={false} className="h-100 w-100 object-fit-cover" height={"100vh"} width={"100%"} />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} lg={8} className="d-flex flex-column justify-content-center p-4 p-md-5">
                    <div className="text-center text-md-start mb-3">
                        <Title level={2} className='fw-bold mb-1'><img src={hello_img} alt="" /> </Title>
                        <Text className='text-muted'> Please Login here</Text>
                    </div>

                    <Form className="w-100" layout='vertical' onSubmitCapture={handleSubmit} >

                        <Form.Item label="Email Address" className='mb-3 p-0'>
                            <Input type='email' placeholder='Enter your Email' className=' w-100' name='email' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item label="Password" className='mb-3'>
                            <Input.Password type='text' placeholder='Enter your Password' className='w-100' name='password' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item>
                            <div className="d-flex justify-content-between mb-3">
                                <Checkbox> <span className='fw-bold'>Remember me</span></Checkbox>
                                <Link to={"/auth/forgotpassword"} className='text-decoration-none text-dark'>Forgot Password</Link>
                            </div>
                        </Form.Item>
                        <div className="d-flex justify-content-center align-items-center mt-2 w-100">
                            <Button type="primary" htmlType="submit" className='w-100 bg-dark' size='large' classNames={"text-white"}>
                                Signin
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}