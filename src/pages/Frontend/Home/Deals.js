import React from 'react';
import { Col, Row, Typography, Button } from 'antd';
import side_img from '../../../data/assets/images/side_img.jpg';
import arrow_icon from '../../../data/assets/icons/arrow.png';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Deals() {
  return (
    <main className='bg-dark pt-3 pb-4 mt-5 mb-2'>
      <Row className='mx-5 mb-5 pb-5'>
        {/* Image Column */}
        <Col xs={24} lg={12} style={{ display: 'flex', justifyContent: 'center', order: 1 }}>
          <img src={side_img} alt="side" style={{ width: '80%', marginTop: '20px', height: '280px' }} />
        </Col>

        {/* Text Column */}
        <Col xs={24} lg={12} className='d-flex align-items-center' style={{ order: 2 }}>
          <div style={{ marginLeft: '50px' }} className='text-white'>
            <Title level={2} className='text-white' style={{ fontWeight: 'bold', fontSize: '25px' }}>
              Deals of the Month
            </Title>
            <Text className='text-white' style={{ fontSize: '20px', fontWeight: '200', display: "block", marginBottom: '8px', lineHeight: '20px' }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
            </Text>
            <Button btn-dark style={{ borderRadius: '10px', padding: '8px', width: '140px', height: '50px', borderColor: 'yellow', backgroundColor: 'black', color: 'white', fontSize: '15px', fontWeight: 'bold', marginTop: '20px' }}>
              <Link to='./products' style={{ textDecoration: 'none', color: 'white' }}>
                All Products <img src={arrow_icon} alt="" style={{ width: '20px' }} />
              </Link>
            </Button>
          </div>
        </Col>
      </Row>
    </main>
  );
}
