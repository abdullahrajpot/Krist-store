import React from 'react';
import { Col, Row, Typography, Button } from 'antd';
import bag_icon from '../../../data/assets/icons/bag.png';

const { Title, Text } = Typography;

export default function Hero() {
  return (
    <main className='bg-light pt-5 pb-4 w-100'>
      <Row className='hero w-100' justify="center" align="middle">
        <Col xs={24} lg={16} className='text-center'>
          <div style={{ marginLeft: '30px' }}>
            <Title id='hero-title' level={2}>Taste the rich flavour of high quality meals</Title>
            <Text id='hero-text'>We only use five-star quality ingredients, come and experience the richness in every meal we serve.</Text>
            <Button className='order-now' style={{ borderRadius: '17px', width: '150px', height: '50px', borderColor: 'yellow', backgroundColor: 'black', color: 'white' }}>
              Order Now <img src={bag_icon} alt="" style={{ width: '20px' }} />
            </Button>
          </div>
        </Col>
      </Row>
    </main>
  );
}
