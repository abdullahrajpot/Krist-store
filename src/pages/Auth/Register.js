import { Checkbox, Col, Image, Input, Row, Typography, Button, Form } from 'antd';
import React, { useState } from 'react';
import register_img from '../../data/assets/images/register.png';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../config/firebase';
import { useAuthContext } from '../../Contexts/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


const { Title, Text } = Typography;
const { toastify } = window;
const initialstatte = { firstname: '', lastname: '', email: '', password: '' }

export default function Register() {
    
    const { dispatch } = useAuthContext()
    const [signup, setSignUp] = useState(initialstatte)
    let navigate = useNavigate();

    const handlechange = (e) => setSignUp(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleSubmit = e => {
        e.preventDefault();

        let { firstname, email, password } = signup

        if (firstname.length < 3) return toastify("Enter correct first name ", "error")
        if (!window.isemail(email)) return toastify("Enter valid email address", "error")
        if (password.length < 6) return toastify("Password must be atleast 6 characters ", "error")

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                createUserProfile(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/email-already-in-use': return toastify("An account with this email already exists. Please log in.", "error");
                    case 'auth/invalid-email': return toastify("The email address is not valid.", "error");
                    case 'auth/operation-not-allowed': return toastify("Email/password accounts are not enabled. Please contact support.", "error");
                    case 'auth/weak-password': return toastify("The password is too weak. Please choose a stronger password.", "error");
                    default: errorMessage ("An error occurred during registration. Please try again.");
                }
            });
    }


    const createUserProfile = async (userCredential) => {
        const { email, uid } = userCredential; // Correctly access user from userCredential
        const { firstname, lastname } = signup;
        const user = { 
            email, 
            uid, 
            status: 'active', 
            dateCreated: serverTimestamp(), 
            fullName: firstname + " " + lastname, 
            firstname, 
            lastname, 
            role: "customer"
        };
    
        try {
            await setDoc(doc(firestore, "users", user.uid), user);
            dispatch({ type: "SET_LOGGED_IN", payload: { user } }); // Dispatch action to context
            toastify("User Registered successfully", "success");
            navigate("/"); // Navigate to home page after registration
        } catch (e) {
            console.error("Error adding document: ", e);
            toastify("An error occurred while signing up new user.", "error");
        }
    }

    return (
        <>
            <Row className="min-vh-100">
                <Col xs={24} md={12} lg={16} className="p-0 d-none d-md-block">
                    <Image src={register_img} alt="Krist brand image" preview={false} className="h-100 w-100 object-fit-cover" height={"100vh"} width={"100%"} />
                </Col>
                <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} lg={8} className="d-flex flex-column justify-content-center p-4 p-md-5">
                    <div className="text-center text-md-start mb-3">
                        <Title level={2} className='fw-bold mb-0'>Create New Account </Title>
                        <Text className='text-muted'> Please enter details </Text>
                    </div>

                    <Form className="w-100" layout='vertical' onSubmitCapture={handleSubmit} >
                        <Form.Item label="First Name" className='mb-3 p-0'>
                            <Input type='text' placeholder='Enter your First Name' className=' w-100' name='firstname' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item label="Last Name" className='mb-3 p-0'>
                            <Input type='text' placeholder='Enter your Last Name' className=' w-100' name='lastname' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item label="Email Address" className='mb-3 p-0'>
                            <Input type='email' placeholder='Enter your Email' className=' w-100' name='email' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item label="Password" className='mb-3'>
                            <Input.Password type='text' placeholder='Enter your Password' className='w-100' name='password' size='large' onChange={handlechange} />
                        </Form.Item>
                        <Form.Item>
                            <div className="d-flex justify-content-between mb-3">
                                <Checkbox>I agree to the <span className='fw-bold'>Terms & Conditions</span></Checkbox>
                                <Link to={"/auth/login"} className='text-decoration-none text-dark'>Login</Link>
                            </div>
                        </Form.Item>
                        <div className="d-flex justify-content-center align-items-center mt-2 w-100">
                            <Button type="primary" htmlType="submit" className='w-100 bg-dark' size='large' classNames={"text-white"}>
                                Signup
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </>
    );
}