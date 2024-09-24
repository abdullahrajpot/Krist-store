import React from 'react'
import { Col, Row, Typography, Button } from 'antd'
import hero_img from '../../../data/assets/images/hero.png';
import arrow_icon from '../../../data/assets/icons/arrow.png';


const { Title, Text } = Typography

export default function Deals() {
  return (
    <section className='bg-light pt-3 pb-4, mt-5'>
      <Row className='mx-5' >
        <Col xs={24} lg={12} className='d-flex align-items-center'>
          <div style={{marginLeft:'50px'}}>
            <Title level={2} style={{ fontWeight: 'bold', fontSize: '25px' }}>Deals of the Month </Title>
            <Text style={{ fontSize: '20px', fontWeight: '200', display: "block", marginBottom: '8px', lineHeight:'20px' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters. </Text>
            <Button btn-dark style={{ borderRadius: '10px', padding:'6px', width: '140px', height: '40px', borderColor: 'black', backgroundColor: 'black', color: 'white' }}>All Products <img src={arrow_icon} alt="" style={{width:'20px'}} /> </Button>
          </div>
        </Col>
        <Col xs={24} lg={12} style={{display:'flex', justifyContent:'center'}} >
          <img src={hero_img} alt="hero image" style={{ width: '60%',marginTop:'20px' }} />
        </Col>
      </Row>
    </section>
  )
}
