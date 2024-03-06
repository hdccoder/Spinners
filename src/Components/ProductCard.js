import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
  Button,
  styled,
} from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const StyledCard = styled(Card)({
  width: 300,
  height: '100%',
  margin: '8px',
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardMedia = styled(CardMedia)({
  height: 250,
  backgroundSize: 'contain',
});

const ProductCard = ({ product, cartItem, createLineItem, updateLineItem, auth, updateProduct,
  createWishlistItem,
  deleteWishlistItem,
  isProductInWishlist, }) => {
  return (
    <StyledCard>
      <StyledCardMedia
        image={product.image}
        title={product.name}
      />
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
                              <Tooltip title="Remove from Wishlist.">
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
                              <Tooltip title="Add to Wishlist.">
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
                              <Tooltip title="Remove from Wishlist.">
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
                              <Tooltip title="Add to Wishlist.">
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
            <ProductImageEditor updateProduct={updateProduct} product={product} />
          </div>
        )}
      </CardContent>
      <CardActions>
        <Link to={`/products/${product.id}`}>
          View Details
        </Link>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;