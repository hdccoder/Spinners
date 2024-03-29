import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { displayPrice } from "./DisplayPrice";
import { Container, CardContent, Typography, Rating, Button, Box, Tooltip, IconButton, Card } from "@mui/material";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const SingleProduct = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  createWishlistItem,
  deleteWishlistItem,
  isProductInWishlist,
}) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  const selectedProduct = products?.find((product) => product.id === id);

  useEffect(() => {
    if (selectedProduct) {
      const fetchReviews = async (productId) => {
        await api.fetchProductReviews(productId, setReviews);
      };
      fetchReviews(selectedProduct.id);
    }
  }, [selectedProduct]);

  const productReviews = reviews?.map((review) => (
    <Card key={review.id} sx={{ mt: "1rem", border: "1px solid #ccc" }}>
      <CardContent>
        <Rating name="read-only" value={Number(review.ratings)} precision={0.5} readOnly style={{ color: 'yellow' }} />
        <Typography variant="h6">{review.title}</Typography>
        <Typography>{review.comments}</Typography>
      </CardContent>
    </Card>
  ));

  const cartItem = cartItems.find((lineItem) => lineItem.product_id === selectedProduct?.id);

  return (
    selectedProduct && (
      <>
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ p: "1rem", width: "500px", height: "500px" }}>
              <img src={selectedProduct?.image} alt={selectedProduct?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', p: "1rem", mt: '1rem' }}>
              <Typography gutterBottom variant="h5" component="span">
                {selectedProduct?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {selectedProduct?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayPrice.format(selectedProduct?.price)}
              </Typography>
              <Typography variant="caption" className="vipDiscount">
                {selectedProduct?.vip_price > 0 ? `${displayPrice.format(selectedProduct?.vip_price)}  **VIP only discount!**` : ""}
              </Typography>

              {auth.id && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: "auto" }}>
                  {cartItem ? (
                    <Tooltip title="Add Another">
                      <IconButton size="small" onClick={() => updateLineItem(cartItem)}><ShoppingCartIcon /></IconButton>
                    </Tooltip>
                  ) : (
                    selectedProduct.is_preorder && !cartItem ? (
                      <Tooltip title="Preorder">
                        <IconButton size="small" onClick={() => createLineItem(selectedProduct)}><AccessAlarmOutlinedIcon /></IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to Cart">
                        <IconButton size="small" onClick={() => createLineItem(selectedProduct)}><ShoppingCartIcon /></IconButton>
                      </Tooltip>
                    )
                  )}

                  {isProductInWishlist(selectedProduct) ? (
                    <Tooltip title="Remove from Wishlist.">
                      <IconButton
                        size="small"
                        sx={{ color: 'accentPink.dark' }}
                        onClick={() => {
                          deleteWishlistItem(selectedProduct);
                        }}
                      >
                        <FavoriteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add to Wishlist.">
                      <IconButton
                        size="small"
                        sx={{ color: 'accentPink.dark' }}
                        onClick={() => {
                          createWishlistItem(selectedProduct);
                        }}
                      >
                        <FavoriteBorderRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}

              {auth.id && (
                <Box sx={{ mt: "1rem" }}>
                  <Typography variant="h6">Review this product</Typography>
                  <Typography variant="body2">Share your thoughts with other customers</Typography>
                  <Button sx={{ width: "fit-content", m: "auto", color: "primary.dark" }} onClick={() => { navigate(`/products/${selectedProduct.id}/review`) }}>Write a product review</Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>

        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} maxWidth="xl">
          <Typography variant="h5">
            Customer Reviews
          </Typography>
          {productReviews?.length > 0 ? (
            productReviews
          ) : (
            <Typography sx={{ mt: "1rem" }}>
              There are no reviews for this product.
            </Typography>
          )}
        </Container>
      </>
    )
  );
};

export default SingleProduct;
