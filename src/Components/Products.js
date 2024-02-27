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
  IconButton,
  Tooltip,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const ProductCard = styled(Card)({
  width: 300,
  height: '100%',
  margin: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ProductMedia = styled(CardMedia)({
  height: 250,
  backgroundSize: 'contain',
});

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  updateProduct,
  createWishlistItem,
  deleteWishlistItem,
  isProductInWishlist,
}) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  console.log(searchParams.get('search'));

  return (
    <div>
      <h2>Shop Our Spins</h2>
      <input
        placeholder="search"
        value={searchParams.get('search') || ''}
        onChange={(ev) => {
          setSearchParams(ev.target.value ? { search: ev.target.value } : {});
        }}
      />
      <Grid container spacing={2}>
        {products
          .filter(
            (product) =>
              !searchParams.get('search') ||
              product.name.indexOf(searchParams.get('search')) !== -1
          )
          .map((product) => {
            const cartItem = cartItems.find(
              (lineItem) => lineItem.product_id === product.id
            );
            return (
              <Grid item key={product.id}>
                <ProductCard>
                  <ProductMedia image={product.image} title={product.name} />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.is_preorder ? 'Preorder' : 'In Stock'}
                    </Typography>
                    {auth.id && (
                      <div>
                        {product.is_preorder ? (
                          <div>
                            {cartItem ? (
                              <Button
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => updateLineItem(cartItem)}
                              >
                                Add Another
                              </Button>
                            ) : (
                              <Button
                                startIcon={<AccessAlarmOutlinedIcon />}
                                onClick={() => createLineItem(product)}
                              >
                                Preorder
                              </Button>
                            )}
                            {isProductInWishlist(product) ? (
                              <Tooltip title="I changed my mind! Remove from Wishlist.">
                                <IconButton
                                  size="small"
                                  sx={{ color: 'accentPink.dark' }}
                                  onClick={() => {
                                    deleteWishlistItem(product);
                                  }}
                                >
                                  <FavoriteRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="I want this cake someday! Add to Wishlist.">
                                <IconButton
                                  size="small"
                                  sx={{ color: 'accentPink.dark' }}
                                  onClick={() => {
                                    createWishlistItem(product);
                                  }}
                                >
                                  <FavoriteBorderRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        ) : (
                          <div>
                            {cartItem ? (
                              <Button
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => updateLineItem(cartItem)}
                              >
                                Add Another
                              </Button>
                            ) : (
                              <Button
                                startIcon={<ShoppingCartIcon />}
                                onClick={() => createLineItem(product)}
                              >
                                Add to Cart
                              </Button>
                            )}
                            {isProductInWishlist(product) ? (
                              <Tooltip title="I changed my mind! Remove from Wishlist.">
                                <IconButton
                                  size="small"
                                  sx={{ color: 'accentPink.dark' }}
                                  onClick={() => {
                                    deleteWishlistItem(product);
                                  }}
                                >
                                  <FavoriteRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="I want this cake someday! Add to Wishlist.">
                                <IconButton
                                  size="small"
                                  sx={{ color: 'accentPink.dark' }}
                                  onClick={() => {
                                    createWishlistItem(product);
                                  }}
                                >
                                  <FavoriteBorderRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {auth.is_admin && (
                      <div>
                        <Link to={`/products/${product.id}/edit`}>Edit</Link>
                        <ProductImageEditor
                          updateProduct={updateProduct}
                          product={product}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardActions>
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </CardActions>
                </ProductCard>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Products;