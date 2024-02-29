import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Route, Routes, Link } from 'react-router-dom';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';
import api from './api';
import Cart from './Components/Cart';
import Products from './Components/Products';
import Orders from './Components/Orders';
import Banner from './Components/Banner';
import MonthSpins from './Components/MonthSpins';
import SpinClub from './Components/SpinClub';
import SingleProduct from './Components/SingleProduct';
import Bio from './Components/Bio';
import PreOrdersButton from './Components/PreOrdersButton';
import Preorder from './Components/Preorder';
import ContactUsForm from './Components/ContactUsForm';
import GenrePage from './Components/GenrePage';
import ProductReview from './Components/ProductReview';

const Home = ({ user , setUser }) => {


  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);
    
  const onContactFormSubmit = async (data) => {
    try {
      // Use the submitContactForm function from your API file
      await api.submitContactForm(data);
      console.log('Contact form submitted successfully!');
      // Add any additional logic or navigation after successful submission
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle the error or display an error message to the user
    }
  };  

  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const updateProduct = async(product) => {
    await api.updateProduct({product, products, setProducts})
  }

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const isProductInWishlist = (product) => {
    const item = wishlistItems.find((wishlistItem) => { return wishlistItem.product_id === product.id })
    //  if item is in wishlist, return true
    return !!item;
  }

  //create an api route to add an item to a users wishlist
  const createWishlistItem = async (product) => {
    await api.createWishlistItem(user, product, wishlistItems, setWishlistItems);
  };

  //create an api route to delete an item from a users wishlist
  const deleteWishlistItem = async (wishlistItem) => {
    await api.deleteWishlistItem(wishlistItem, wishlistItems, setWishlistItems)
  };


  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

      return (
        <Box>
          <Box sx={{ display: 'flex', minHeight: "100vh" }}>
       
            <AppHeader auth={auth} logout={logout} cartCount={cartCount} />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                // height: '100vh',
                overflow: 'auto',
                paddingTop: '5rem'
              }}
            >
    
              <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
                <Routes>
                  {/* display landing page as home page for all users */}
                  <Route path="/" element={
                    <>
                 <Banner/>
                 <MonthSpins products={ products }
                  />
                  <PreOrdersButton/>
                 <SpinClub/>
                    </>
                  }>
                     
                  </Route>
                
                  {/* display products and product details for all users */}
                  <Route path='/products' element={
                  <Products
                    auth = { auth }
                    products={ products }
                    cartItems = { cartItems }
                    createLineItem = { createLineItem }
                    updateLineItem = { updateLineItem }
                    updateProduct = {updateProduct}
                    createWishlistItem= {createWishlistItem}
                     deleteWishlistItem= {deleteWishlistItem} 
                     isProductInWishlist= {isProductInWishlist}
                  />
                    }
                  />
                 <Route
                path="/products/:id"
                element={
                  <SingleProduct
                    auth = { auth }
                    // isAdmin={isAdmin}
                    products={products}
                    cartItems={cartItems}
                    createLineItem={createLineItem}
                    updateLineItem={updateLineItem}
                    createWishlistItem={createWishlistItem}
                    deleteWishlistItem={deleteWishlistItem}
                    isProductInWishlist={isProductInWishlist}
                  />
                }
              />

              <Route path='/bio' element={<Bio/>}/>
              <Route path='/preorder' element={<Preorder
               products={products} 
               cartItems={cartItems} 
               createLineItem={createLineItem} 
               updateLineItem={updateLineItem} 
               auth={auth} 
               updateProduct={updateProduct}
               createWishlistItem= {createWishlistItem}
               deleteWishlistItem= {deleteWishlistItem} 
               isProductInWishlist= {isProductInWishlist}
              />}
              />
                   <Route
          path="/playlist/*"
          element={
            <GenrePage
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
          }
        />
              
              <Route path='/contact' element={<ContactUsForm onSubmit={onContactFormSubmit} />} />
                 
               \
                  { auth.id  &&
                    <>
    
                     
                   
    
                <Route path='/cart' element={
                  <Cart
                    cart = { cart }
                    lineItems = { lineItems }
                    products = { products }
                    updateOrder = { updateOrder }
                    removeFromCart = { removeFromCart }
                  />
                }/>
                <Route
                    path="/products/:id/review"
                    element={<ProductReview products={products} />}
                  />
                    
                      {/* added route for wishlist */}
                      {/* <Route
                        path="/wishlist"
                        element={<Wishlist wishlistItems={wishlistItems} products={products}/>}
                      /> */}
    
    
                        
                <Route path='/orders' element={
                  <Orders
                    orders = { orders }
                    products = { products }
                    lineItems = { lineItems }
                  />
                }/>
                    </>
                  }
    
                </Routes>
              </Container>
            </Box>
          </Box>
          <AppFooter />
        </Box >
      );


}


export default Home