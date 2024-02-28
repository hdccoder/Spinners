import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductImageEditor from './ProductImageEditor';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  styled,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import ProductCard from './ProductCard';

const Preorder = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct,createWishlistItem,
  deleteWishlistItem,
  isProductInWishlist, }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  console.log(searchParams.get('search'));

  return (
    <div>
      <h2>Pre-Order</h2>
      <input
        placeholder='search'
        value={searchParams.get('search') || ''}
        onChange={(ev) => {
          setSearchParams(ev.target.value ? { search: ev.target.value } : {});
        }}
      />
      <Grid container spacing={2}>
      {products
  .filter(
    (product) =>
      (!searchParams.get('search') || product.name.indexOf(searchParams.get('search')) !== -1) &&
      product.is_preorder
  )
  .map((product) => {
    const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
    return (
      <Grid item key={product.id}>
        <ProductCard product={product} 
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
      </Grid>
    );
  })}
      </Grid>
    </div>
  );
};

    
    export default Preorder;