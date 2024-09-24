import React from 'react';
import { Button, Carousel, Typography } from 'antd';
import men from '../../../data/assets/images/men.png'
import women from '../../../data/assets/images/women.png'
import kid from '../../../data/assets/images/kid.png'
import footwear from '../../../data/assets/images/footwear.jpg'


const {Title} = Typography

const contentStyle = {
 
};


const CarouselSection = () => (
  <>
  <div>
  <Title level={2} className='mb-4 mt-5'>Shop by Categories</Title>
  </div>
    
    <Carousel arrows infinite={false} style={{width:'100%', display:"flex", justifyContent:'center' ,alignItems:'center'}} slidesToShow={4} dots={false} >

      <div className='categoryDiv'>
        <Button className=' btn-category btn-light ' >Men Wear</Button>
        <img className=' img-category'  src={men} alt=""  />
      </div>
      <div className='categoryDiv' >
        <Button className=' btn-category btn-light '>Women Wear</Button>
        <img className=' img-category'   src={women} alt=""  />

      </div>
      <div className='categoryDiv' >
        <Button className=' btn-category btn-light '>Kids Wear</Button>
        <img className=' img-category'  src={kid} alt="" />

      </div>
      <div className='categoryDiv' >
      <Button className=' btn-category btn-light '>FootWear</Button>
      <img className=' img-category'  src={footwear} alt="" />
      </div>
      <div className='categoryDiv'>
        <h3 >5</h3>
      </div>
      <div>
        <h3 >6</h3>
      </div>
    </Carousel>
    
  </>
);
export default CarouselSection;