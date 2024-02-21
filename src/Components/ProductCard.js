import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  styled,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const StyledCard = styled(Card)({
  width: 300,
  height: '100%',
  margin: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardMedia = styled(CardMedia)({
  height: 250,
  backgroundSize: 'contain',
});

const ProductCard = ({ product, cartItem, createLineItem, updateLineItem, auth, updateProduct }) => {
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
    </StyledCard>
  );
};

export default ProductCard;