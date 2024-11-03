import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; // Favorite icons
import { useAuthContext } from '../../../Contexts/AuthContext'; // Auth context
import { doc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { useProductContext } from '../../../Contexts/ProductContext';

const { Title, Text } = Typography;

export default function Productlist() {
  const { products } = useProductContext();
  const { state } = useAuthContext();
  const { user } = state;
  const [favorites, setFavorites] = useState(new Set());

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
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [state.isAuthenticated, user?.uid]);

  const handleToggleFavorite = async (items) => {
    const isFavorited = favorites.has(items.key);
    const updatedFavorites = new Set(favorites);

    try {
        if (isFavorited) {
            // Remove from favorites
            updatedFavorites.delete(items.key);
            const favoriteDocRef = doc(firestore, "favorites", `${user.uid}_${items.key}`);
            await deleteDoc(favoriteDocRef);
            console.log("Item removed from favorites");
        } else {
            // Add to favorites
            updatedFavorites.add(items.key);
            const favoriteDocRef = doc(firestore, "favorites", `${user.uid}_${items.key}`);
            await setDoc(favoriteDocRef, {
                item_id: items.key, // ID of the item
                user_id: user.uid, // User ID
                name: items.name,   // Name of the item
                price: items.price, // Price of the item
                description: items.description, // Description of the item
                imageUrl: items.imageUrl // Image URL of the item
            });
            console.log("Item added to favorites");
        }
    } catch (error) {
        console.error("Error toggling favorite: ", error);
    }

    setFavorites(updatedFavorites);
};


  return (
    <main className='mt-5 mb-5'>
      <Row gutter={[16, 16]}>
        {products.map((item) => (
          <Col key={item.key} xs={24} md={12} lg={8}>
            <Card className='product-card' hoverable>
              <div className="image-container">
                <img className='product-img' alt="example" src={item.imageUrl} />
                <Button className='cart-button'>
                  <Link to={`/singleproduct?id=${encodeURIComponent(item.id)}`}>Product Detail</Link>
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
        ))}
      </Row>
    </main>
  );
}
