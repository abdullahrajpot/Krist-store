import React from 'react';
import Sort from './Sort';
import Productlist from './Productlist';
import { Col, Row } from 'antd';
import { useFilterContext } from '../../../Contexts/FilterContext';

export default function Products() {
  const { filter_products } = useFilterContext();
  console.log("filter_products", filter_products);
  
  return (
    <main style={{ overflowX: 'hidden', width: '100%' }}>
      <Row justify="center" style={{ width: '100%', margin: 0 }}>
        <Col lg={16} xs={24}>
          <Row>
            <Col>
              <Sort />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Productlist />
            </Col>
          </Row>
        </Col>
      </Row>
    </main>
  );
}
