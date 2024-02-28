import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Box, Container, Button } from '@mui/material';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Playlist = ({
  genre, 
  genreImage, 
  products,
  cartItems, 
  createLineItem, 
  updateLineItem,
  auth,
  updateProduct, 
  createWishlistItem,
  deleteWishlistItem,
  isProductInWishlist, 
  }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showImage, setShowImage] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleButtonClick = () => {
    setShowImage(!showImage);
    setShowButton(false);
  };

  console.log('Genre in Playlist:', genre);
  console.log('Products in Playlist:', products);

  const filteredProducts = products.filter(
    (product) =>
      (!searchParams.get('search') || product.name.toLowerCase().includes(searchParams.get('search').toLowerCase())) &&
      (!genre || product.genre === genre)
  );

  return (
    <Box position="relative" marginLeft={10} >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          height: '25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showImage && (
          <img
            src={genreImage}
            alt={`${genre} Playlist`}
            style={{ maxWidth: '100%', height: '425px', width: '662px', position: 'absolute', zIndex: 1, marginLeft: -42, cursor: 'pointer' }}
          />
        )}
        {showButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            {showImage ? 'Hide Image' : 'Show Image'}
          </Button>
        )}
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={5}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          style={{ zIndex: 0 }}
        >
          {filteredProducts.map((product, index) => {
            const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
            return (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  cartItem={cartItem}
                  createLineItem={createLineItem}
                  updateLineItem={updateLineItem}
                  auth={auth}
                  updateProduct={updateProduct}
                  createWishlistItem={createWishlistItem}
                  deleteWishlistItem={deleteWishlistItem}
                  isProductInWishlist={isProductInWishlist}
                />
                {/* ... (other card content) */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Playlist;