import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductImageEditor from './ProductImageEditor';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

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
      <ul>
        {products
          .filter(
            (product) =>
              !searchParams.get('search') || product.name.indexOf(searchParams.get('search')) !== -1
          )
          .map((product) => {
            const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);
            return (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  {/* Render the product image */}
                  {product.image ? <img src={product.image} alt={product.name} /> : null}
                  {product.name}
                </Link>
                {auth.id ? (
                  <div>
                    {product.is_preorder ? (
                      // Display "Add Another" button if the item is in the cart
                      cartItem ? (
                        <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                      ) : (
                        <button onClick={() => createLineItem(product)}>Preorder</button>
                      )
                    ) : (
                      // Display "Add Another" button if the item is in the cart
                      cartItem ? (
                        <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                      ) : (
                        <button onClick={() => createLineItem(product)}>Add to Cart</button>
                      )
                    )}
                  </div>
                ) : null}
                {auth.is_admin ? (
                  <div>
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                    <ProductImageEditor updateProduct={updateProduct} product={product} />
                  </div>
                ) : null}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Products;