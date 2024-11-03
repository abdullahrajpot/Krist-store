import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; 
import { useAuthContext } from '../../../Contexts/AuthContext'; 
import { doc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useProductContext } from '../../../Contexts/ProductContext';

const { Title, Text } = Typography;

export default function Favorites() {
  const { products } = useProductContext();
  const { state } = useAuthContext();
  const { user } = state;
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch favorites from Firestore
  const fetchFavorites = async () => {
    if (state.isAuthenticated && user?.uid) {
      try {
        const favoritesQuery = query(
          collection(firestore, "favorites"),
          where("user_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(favoritesQuery);
        const favoriteItems = querySnapshot.docs.map(doc => doc.data().item_id);
        setFavorites(new Set(favoriteItems));
      } catch (error) {
        console.error("Error fetching favorites: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [state.isAuthenticated, user?.uid]);

  const handleToggleFavorite = async (item) => {
    const isFavorited = favorites.has(item.key);
    const updatedFavorites = new Set(favorites);

    try {
      if (isFavorited) {
        updatedFavorites.delete(item.key);
        const favoriteDocRef = doc(firestore, "favorites", `${user.uid}_${item.key}`);
        await deleteDoc(favoriteDocRef);
      } else {
        updatedFavorites.add(item.key);
        const favoriteDocRef = doc(firestore, "favorites", `${user.uid}_${item.key}`);
        await setDoc(favoriteDocRef, {
          item_id: item.key, 
          user_id: user.uid, 
          name: item.name,   
          price: item.price, 
          description: item.description, 
          imageUrl: item.imageUrl 
        });
      }
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }

    setFavorites(updatedFavorites);
  };

  const favoriteProducts = products.filter(item => favorites.has(item.key));

  return (
    <section style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Your Favorite Products</Title>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((item) => (
              <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
                <Card
                  className='product-card'
                  hoverable
                  style={{ borderRadius: '12px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="image-container" style={{ position: 'relative' }}>
                    <img className='product-img' alt="example" src={item.imageUrl} style={{ borderRadius: '12px', width: '100%', height: '200px', objectFit: 'cover' }} />
                    <Button className='cart-button' style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
                      <Link to={`/singleproduct?id=${encodeURIComponent(item.id)}`}>View Details</Link>
                    </Button>
                  </div>
                  <Title level={4} className='mt-3'>{item.name}</Title>
                  <Text className='d-block mb-2'>{item.description}</Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text className='fw-bold '>${item.price}</Text>
                    <Button
                      className='favorite-button'
                      type="text"
                      onClick={() => handleToggleFavorite(item)}
                      style={{ padding: 0 }}
                    >
                      {favorites.has(item.key) ? (
                        <HeartFilled style={{ color: 'red', fontSize: '20px' }} />
                      ) : (
                        <HeartOutlined style={{ fontSize: '20px' }} />
                      )}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Text style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>No favorite products found.</Text>
            </Col>
          )}
        </Row>
      )}
    </section>
  );
}
