
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
  const response = await axios.put(`/api/products/${product.id}`, product, getHeaders());
  setProducts(products.map(product => product.id === response.data.id ? response.data : product));
};

const removeFromCart = async ({ lineItem, lineItems, setLineItems }) => {
  const response = await axios.delete(`/api/lineItems/${lineItem.id}`, getHeaders());
  setLineItems(lineItems.filter(_lineItem => _lineItem.id !== lineItem.id));
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
  updateProduct,
  attemptLoginWithToken,
};

export default api;