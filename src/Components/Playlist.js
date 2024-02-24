import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';

const Playlist = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const genre = searchParams.get('genre') || 'Soul'; // Default to 'Soul' if no genre parameter

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {genre} Playlist
      </Typography>
      <input
        placeholder='search'
        value={searchParams.get('search') || ''}
        onChange={(ev) => {
          setSearchParams(ev.target.value ? { ...searchParams, search: ev.target.value } : {});
        }}
      />
      <Grid container spacing={2}>
        {products
          .filter(
            (product) =>
              (!searchParams.get('search') || product.name.indexOf(searchParams.get('search')) !== -1) &&
              product.genre === genre
          )
          .map((product) => {
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