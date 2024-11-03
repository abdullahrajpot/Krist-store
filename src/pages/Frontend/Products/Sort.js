import { Button, Col, Row } from 'antd';
import React from 'react';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useFilterContext } from '../../../Contexts/FilterContext';

export default function Sort() {
  const { filter_products, sorting } = useFilterContext();

  const handleSortChange = (e) => {
    sorting(e.target.value);  // Call sorting with selected value
  };

  return (
    <main className=" mt-5">
      <Row
        gutter={[16, 16]}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: '800px',
        }}
      >
        <Col span={8}>
          <Button className="fs-6 p-2 bg-light border-0 mx-2 text-black">
            <AppstoreOutlined />
          </Button>
          <Button className="fs-6 px-2 mt-1 bg-light border-0 text-black">
            <UnorderedListOutlined />
          </Button>
        </Col>
        <Col span={8}>
          {filter_products && filter_products.length > 0
            ? `${filter_products.length} Products Available`
            : 'No Products Available'}
        </Col>
        <Col span={8} style={{ alignItems: 'flex-end' }}>
          <form action="#">
            <label htmlFor="Sort"></label>
            <select name="sort" id="sort" onChange={handleSortChange}>
              <option value="lowest">Price (Lowest)</option>
              <option value="highest">Price (Highest)</option>
              <option value="a-z">Name (A-Z)</option>
              <option value="z-a">Name (Z-A)</option>
            </select>
          </form>
        </Col>
      </Row>
    </main>
  );
}
