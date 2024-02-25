import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Playlist from './Playlist';

const GenrePage = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
    const { genre } = useParams();
    const genres = ['Soul', 'Pop', 'R&B', 'Rock'];
  
    console.log('Current Genre in GenrePage:', genre);
    console.log('Products in GenrePage:', products);

  return (
    <div>
      {genres.map((genreItem) => (
        <Box key={genreItem} mb={4}>
          <Playlist
            genre={genreItem}
            products={products}
            cartItems={cartItems}
            createLineItem={createLineItem}
            updateLineItem={updateLineItem}
            auth={auth}
            updateProduct={updateProduct}
          />
        </Box>
      ))}
    </div>
  );
};

export default GenrePage;