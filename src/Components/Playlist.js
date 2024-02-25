import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const Playlist = ({ genre, products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
    const [searchParams, setSearchParams] = useSearchParams();
  
    console.log('Genre in Playlist:', genre);
    console.log('Products in Playlist:', products);
  

  
    const filteredProducts = products
      .filter(
        (product) =>
          (!searchParams.get('search') || product.name.toLowerCase().includes(searchParams.get('search').toLowerCase())) &&
          (!genre || product.genre === genre)
      );
  
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          {genre} Playlist
        </Typography>
        {/* ... (search bar) */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => {
            const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
            return (
              <Grid item key={product.id}>
                <ProductCard
                  product={product}
                  cartItem={cartItem}
                  createLineItem={createLineItem}
                  updateLineItem={updateLineItem}
                  auth={auth}
                  updateProduct={updateProduct}
                />
                {/* ... (other card content) */}
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };
  
  export default Playlist;