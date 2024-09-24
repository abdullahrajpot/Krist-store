import React from 'react'
import { Col, Row, Typography, Button } from 'antd'
import hero_img from '../../../data/assets/images/hero.png'
import bag_icon from '../../../data/assets/icons/bag.png'

const { Title, Text } = Typography

export default function Hero() {
  return (
    <section className='bg-light pt-5 pb-4'>
      <Row className='mx-5' >
        <Col xs={24} lg={12} className='d-flex align-items-center'>
          <div style={{marginLeft:'50px'}}>
            <Text style={{ color: 'gray', fontSize: '20px' }}>CLASSIC EXCLUSIVE </Text>
            <Title level={2} style={{ fontWeight: 'bolder', fontSize: '45px' }}>Women's Collection </Title>
            <Text style={{ fontSize: '30px', fontWeight: '500', display: "block", marginBottom: '12px' }}>UP TO 40% OFF </Text>
        <Button btn-dark style={{ borderRadius: '30px', width: '130px', height: '50px', borderColor: 'black', backgroundColor: 'black', color: 'white' }}>Shop Now <img src={bag_icon} alt="" style={{width:'20px'}} /></Button>
          </div>
        </Col>
        <Col xs={24} lg={12} style={{display:'flex', justifyContent:'center'}} >
          <img src={hero_img} alt="hero image" style={{ width: '60%',marginTop:'20px' }} />
        </Col>
      </Row>
    </section>
  )
}
