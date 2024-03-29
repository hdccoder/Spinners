import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Playlist from './Playlist';

const GenrePage = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct, createWishlistItem, deleteWishlistItem, isProductInWishlist,  }) => {
    const { genre } = useParams();
    const genres = [
        { name: 'Soul', image: '/public/assets/Soul.jpg' },
        { name: 'Pop', image: '/public/assets/Pop.jpg' },
        { name: 'RnB', image: '/public/assets/RnB.jpg' },
        { name: 'Rock', image: '/public/assets/Rock.jpg' },
    ];

    console.log('Current Genre in GenrePage:', genre);
    console.log('Products in GenrePage:', products);

    return (
        <div>
            <Typography variant="h2" align="center" padding={2}  marginBottom={2}>
                Shop Our Playlist
            </Typography>
            {genres.map((genreItem) => (
                <Box key={genreItem.name} mb={4}>
                  
                    <Playlist
                        genre={genreItem.name}
                        genreImage={genreItem.image}
                        products={products}
                        cartItems={cartItems}
                        createLineItem={createLineItem}
                        updateLineItem={updateLineItem}
                        auth={auth}
                        updateProduct={updateProduct}
                        createWishlistItem= {createWishlistItem}
                        deleteWishlistItem= {deleteWishlistItem} 
                        isProductInWishlist= {isProductInWishlist}
                    />
                </Box>
            ))}
        </div>
    );
};

export default GenrePage;