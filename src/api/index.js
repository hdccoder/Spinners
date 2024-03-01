import axios from 'axios';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const getHeaders = () => {
  return {
    headers: {
      authorization: window.localStorage.getItem('token')
    }
  };
};

const fetchProducts = async (setProducts) => {
  const response = await axios.get('/api/products');
  setProducts(response.data);
};

const fetchProductReviews = async (productId, setReviews) => {
  const response = await axios.get(`/api/products/${productId}/reviews`, getHeaders());
  setReviews(response.data);
};

const addProductReview = async (review, productId) => {
  const response = await axios.post(`/api/products/${productId}/reviews`,
    review,
    getHeaders());
};

//fetch all wishlist items for a user
const fetchWishlistItems = async (setWishlistItems) => {
  const response = await axios.get('/api/wishlist', getHeaders())
  setWishlistItems(response.data)
};

//add product to a users wishlist
const createWishlistItem = async (user, product, wishlistItems, setWishlistItems) => {
  const isProductAlreadyInWishlist = wishlistItems.some((wishlistItem) => wishlistItem.product_id === product.id);

  if (!isProductAlreadyInWishlist) {
    try {
      const response = await axios.post(`/api/wishlist`, {
        user_id: user.id,
        product_id: product.id,
      }, getHeaders());

      setWishlistItems([...wishlistItems, response.data]);
    } catch (error) {
      console.error('Error creating wishlist item:', error);
    }
  } else {
    console.warn('Product is already in the wishlist');
  }
};

//delete a product from a users wishlist
const deleteWishlistItem = async (product, wishlistItems, setWishlistItems) => {
  const response = await axios.delete(`/api/wishlist/${product.id}`, getHeaders());
  setWishlistItems(wishlistItems.filter(_wishlistItem => _wishlistItem.product_id !== product.id));
};

const fetchOrders = async (setOrders) => {
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const fetchLineItems = async (setLineItems) => {
  const response = await axios.get('/api/lineItems', getHeaders());
  setLineItems(response.data);
};

const createLineItem = async ({ product, cart, lineItems, setLineItems }) => {
  const response = await axios.post('/api/lineItems', {
    order_id: cart.id,
    product_id: product.id
  }, getHeaders());
  setLineItems([...lineItems, response.data]);
};

const updateLineItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity + 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id === response.data.id ? response.data : lineItem));
};

const updateOrder = async ({ order, setOrders }) => {
  await axios.put(`/api/orders/${order.id}`, order, getHeaders());
  const response = await axios.get('/api/orders', getHeaders());
  setOrders(response.data);
};

const updateProduct = async ({ product, products, setProducts }) => {
  const response = await axios.put(
    `/api/products/${product.id}`,
    {
      name: product.name,
      price: product.price,
      title: product.title,
      image: product.image,
      category: product.category,
      genre: product.genre, 
      is_preorder: product.is_preorder,
    },
    getHeaders()
  );

  setProducts(products.map((p) => (p.id === response.data.id ? response.data : p)));
};

const removeFromCart = async ({ lineItem, lineItems, setLineItems }) => {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter(_lineItem => _lineItem.id !== lineItem.id));
};

const removeOneItem = async ({ lineItem, cart, lineItems, setLineItems }) => {
  const response = await axios.put(`/api/lineItems/${lineItem.id}`, {
    quantity: lineItem.quantity - 1,
    order_id: cart.id
  }, getHeaders());
  setLineItems(lineItems.map(lineItem => lineItem.id == response.data.id ? response.data : lineItem));
};

const attemptLoginWithToken = async (setAuth) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/me', getHeaders());
      setAuth(response.data);
    }
    catch (ex) {
      if (ex.response.status === 401) {
        window.localStorage.removeItem('token');
      }
    }
  }
};

const submitContactForm = async (formData) => {
  try {
    // Replace 'https://your-backend-api.com/contact' with the actual endpoint for your contact form
    const response = await axios.post('/api/contacts', formData, getHeaders());
    return response.data; // Return the data if needed
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error; // Rethrow the error if needed
  }
};


// const createPreorder = async ({ product, cart, lineItems, setLineItems }) => {
//   try {
//     // Check if 'cart' is defined and has an 'id' property
//     if (!cart || !cart.id) {
//       throw new Error("Cart is undefined or does not have an 'id' property.");
//     }

//     const response = await axios.post('/api/preorders', {
//       order_id: cart.id,
//       product_id: product.id
//     }, getHeaders());

//     setLineItems([...lineItems, response.data]);
//   } catch (error) {
//     console.error(error.message);
//     // Handle the error or notify the user as needed
//   }
// };

const login = async ({ credentials, setAuth }) => {
  const response = await axios.post('/api/login', credentials);
  const { token } = response.data;
  window.localStorage.setItem('token', token);
  attemptLoginWithToken(setAuth);
};

const logout = (setAuth) => {
  window.localStorage.removeItem('token');
  setAuth({});
};

const api = {
  login,
  logout,
  fetchProducts,
  fetchProductReviews,
  addProductReview,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  updateOrder,
  removeFromCart,
  removeOneItem,
  updateProduct,
  attemptLoginWithToken,
  submitContactForm,
  fetchWishlistItems,
  createWishlistItem,
  deleteWishlistItem,
};

export default api;