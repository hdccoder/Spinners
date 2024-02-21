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

const ProductCard = styled(Card)({
  width: 300, // Set a fixed width for all cards
  height: '100%', // Set a fixed height for all cards
  margin: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const ProductMedia = styled(CardMedia)({
  height: 250, // Adjust the height of the media
  backgroundSize: 'contain', // Make the image take up more space
});

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth, updateProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  console.log(searchParams.get('search'));

  return (
    <div>
      <h2>Spins of the Month</h2>
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
              !searchParams.get('search') || product.name.indexOf(searchParams.get('search')) !== -1
          )
          .map((product) => {
            const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
            return (
              <Grid item key={product.id}>
                <ProductCard>
                  <ProductMedia
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
                          cartItem ? (
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
                          )
                        ) : (
                          cartItem ? (
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
                          )
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
                </ProductCard>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Products;