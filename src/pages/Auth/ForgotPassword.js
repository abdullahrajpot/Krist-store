import { Col, Image, Input, Row, Typography, Button, Form } from 'antd';
import React, { useState } from 'react';
import forgot_img from '../../data/assets/images/forgot_img.png';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../config/firebase';
import {LeftOutlined} from '@ant-design/icons'


export default function ForgotPassword() {

  const { Title, Text } = Typography;
  const { toastify } = window;
  const initialstatte = { email: '' }


  const [forgotpassword, setForgotPassword] = useState(initialstatte)
  let navigate = useNavigate();

  const handlechange = (e) => setForgotPassword(s => ({ ...s, [e.target.name]: e.target.value }))

  const handelBack = () => {
    navigate(-1)
  }

  const handleSubmit = e => {
    e.preventDefault();

    let { email } = forgotpassword


    if (!window.isemail(email)) return toastify("Enter valid email address", "error")
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastify("Password reset email successfully send.", "success");
        navigate('/auth/login')
      })
      .catch((error) => {
        toastify("Error while resetting passoword.", "error");

      });

  }




  return (
    <>
      <Row className="min-vh-100">


        <Col xs={24} md={12} lg={17} className="p-0 d-none d-md-block">
          <Image src={forgot_img} alt="Krist brand image" preview={false} className="h-100 w-100 object-fit-cover" height={"100vh"} width={"100%"} />
        </Col>
        <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} lg={7} className="d-flex flex-column justify-content-center p-4 p-md-5">
          <p onClick={handelBack} style={{display:'flex', alignItems:'flex-start' , cursor:'pointer', fontSize:'20px'}}><LeftOutlined className='mt-1'/> Back</p>

          <div className="text-center text-md-start mb-4">
            <Title level={2} className='fw-bold mb-1'>Forgot Password</Title>
            <Text className='text-muted'>Enter your registered email address. we’ll send you a code to reset your password.</Text>
          </div>

          <Form className="w-100" layout='vertical' onSubmitCapture={handleSubmit} >

            <Form.Item label="Email Address" className='mb-4 p-0'>
              <Input type='email' placeholder='Enter your Email' className=' w-100' name='email' size='large' onChange={handlechange} />
            </Form.Item>


            <div className="d-flex justify-content-center align-items-center mt-2 w-100">
              <Button type="primary" htmlType="submit" className='w-100 bg-dark' size='large' classNames={"text-white"}>
                Verify
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}