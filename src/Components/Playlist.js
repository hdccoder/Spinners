import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Playlist = ({ genre, products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('Genre in Playlist:', genre);
  console.log('Products in Playlist:', products);

  const filteredProducts = products.filter(
    (product) =>
      (!searchParams.get('search') || product.name.toLowerCase().includes(searchParams.get('search').toLowerCase())) &&
      (!genre || product.genre === genre)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {genre} Playlist
      </Typography>
      {/* ... (search bar) */}
      <Container maxWidth="xl" sx={{ height: "25rem" }}>
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