import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import Playlist from './Playlist';

const GenrePage = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
  const { genre } = useParams(); // Get the genre from URL parameters
  const [searchParams, setSearchParams] = useSearchParams({});
  const genres = ['Soul', 'Pop', 'R&B'];

  return (
    <div>
      {genres.map((genre) => (
        <Playlist
          key={genre}
          genre={genre}  // Pass the genre prop
          products={products}
          cartItems={cartItems}
          createLineItem={createLineItem}
          updateLineItem={updateLineItem}
          auth={auth}
          updateProduct={updateProduct}
        />
      ))}
    </div>
  );
};

export default GenrePage;