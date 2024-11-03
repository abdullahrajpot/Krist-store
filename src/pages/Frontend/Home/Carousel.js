import React from 'react';
import { Button, Carousel, Typography } from 'antd';
import pizza from '../../../data/assets/images/pizza.jpg';
import burger from '../../../data/assets/images/burger.jpg';
import pasta from '../../../data/assets/images/pasta.jpg';
import wings from '../../../data/assets/images/wings.jpg';
import cake from '../../../data/assets/images/cake.jpg';
import drinks from '../../../data/assets/images/cocktail.jpg';

const { Title } = Typography;

const CarouselSection = () => {
  const responsiveSettings = [
    {
      breakpoint: 1200, 
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 992, 
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768, 
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 576, 
      settings: { slidesToShow: 1 },
    },
  ];

  return (
    <>
      <div>
        <Title level={2} className="mb-4 mt-5" style={{textAlign:'center'}}>Menu by Category</Title>
      </div>

      <div className="carousel-wrapper " style={{ width: '90%', margin: '0 auto', marginBottom: '40px' }}>
        <Carousel className='mt-5' arrows infinite={false} responsive={responsiveSettings} slidesToShow={4} dots={false}>
          <div className="categoryDiv px-1 ">
            <Button className="btn-category btn-light">Pizza</Button>
            <img className="img-category" src={pizza} alt="Men Wear" />
          </div>
          <div className="categoryDiv px-1">
            <Button className="btn-category btn-light">Burger</Button>
            <img className="img-category" src={burger} alt="Women Wear" />
          </div>
          <div className="categoryDiv px-1">
            <Button className="btn-category btn-light">Pasta</Button>
            <img className="img-category" src={pasta} alt="Kids Wear" />
          </div>
          <div className="categoryDiv px-1">
            <Button className="btn-category btn-light">Chiken Wings</Button>
            <img className="img-category" src={wings} alt="Footwear" />
          </div>
          <div className="categoryDiv px-1">
            <Button className="btn-category btn-light">Deseart</Button>
            <img className="img-category" src={cake} alt="Footwear" />
          </div>
          <div className="categoryDiv px-1">
            <Button className="btn-category btn-light">Drinks</Button>
            <img className="img-category" src={drinks} alt="Footwear" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export default CarouselSection;
