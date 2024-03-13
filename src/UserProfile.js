import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import Orders from './Components/Orders';
import Wishlist from './Wishlist';
import ProfileSettings from './ProfileSettings';

const UserProfile = ({
    user, 
    setUser,
    wishlistItems, 
    products, 
    cartItems, 
    createWishlistItem, 
    deleteWishlistItem, 
    orders, 
    lineItems, 
    getCartItem, 
    createLineItem, 
    updateLineItem,
    isProductInWishlist}) => {

    return (
    <Container>
        <Typography variant="h3" align="center" sx={{ m: 4 }} >
            Welcome {user.firstname} {user.lastname}
        </Typography>

        {/* Profile Section */}
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Box>
                <Typography variant='h4'>Profile</Typography>
                <Typography variant='h6'>View or update your personal information</Typography>
            </Box>
            <ProfileSettings user={user} setUser={setUser} />
     

        {/* Orders Section */}
        
            <Box>
                <Typography variant='h4'>Orders</Typography>
                <Typography variant='h6'>Track recent orders or buy again</Typography>
            </Box>
            <Orders orders={orders} products={products} lineItems={lineItems} getCartItem={getCartItem} 
            createLineItem={createLineItem} updateLineItem={updateLineItem} 
            createWishlistItem={createWishlistItem}
            deleteWishlistItem={deleteWishlistItem}
            isProductInWishlist={isProductInWishlist}
            />
      

        {/* Wishlist Section */}
      
            <Box>
                <Typography variant='h4'>Wishlist</Typography>
                <Typography variant='h6'>View your wishlist</Typography>
            </Box>
            <Wishlist wishlistItems={wishlistItems} products={products} getCartItem={getCartItem} 
            cartItems={cartItems} createLineItem={createLineItem} updateLineItem={updateLineItem} 
            deleteWishlistItem={deleteWishlistItem}
            />
        </Paper>
    </Container>
  );
}

export default UserProfile;