const client = require('./client')
const path = require('path')
const fs = require('fs')

const {
  fetchProducts,
  createProduct,
  updateProduct
} = require('./products');

const {
  createReview,
  fetchReviews
} = require('./reviews')

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');

const loadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filePath)
    fs.readFile(fullPath, 'base64', (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(`data:image/png;base64,${result}`)
      }
    })
  })
}


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS reviews; 
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC NOT NULL,
      title VARCHAR(100),
      image TEXT,
      category VARCHAR(50) DEFAULT 'regular' NOT NULL,
      is_preorder BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      title VARCHAR(255) NOT NULL,
      comments VARCHAR(255) NOT NULL,
      ratings NUMERIC NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CHECK (ratings > 0 AND ratings < 6)
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true})
  ]);

  const V1Image = await loadImage('images/Silk Sonic.png')
  const V2Image = await loadImage('images/Ray C.png')
  const V3Image = await loadImage('images/DOORS.png')
  const V4Image = await loadImage('images/Aretha Franklin.png')
  const V5Image = await loadImage('images/Blues Traveler.png')
  const V6Image = await loadImage('images/Paul McCartney.png')
  const V7Image = await loadImage('images/LeonBridges.jpeg')
  const V8Image = await loadImage('images/BillyJoel.jpg')
  const V9Image = await loadImage('images/Beyonce.jpeg')
  const V10Image = await loadImage('images/AARONLEE.jpeg')
  const V11Image = await loadImage('images/MaggieRodgers.jpeg')
  const V12Image = await loadImage('images/B.T.Express.jpeg')


  let [foo, bar, bazz] = await Promise.all([
    createProduct({ name: 'Silk Sonic', price: 26.99, title: 'An Evening With Silk Sonic', image: V1Image, category: 'regular' }),
    createProduct({ name: 'Ray Charles', price: 36.99, title: 'Now Playing', image: V2Image, category: 'regular' }),
    createProduct({ name: 'DOORS', price: 30.00, title: 'Alive She Cried (40TH ANNIVERSARY)', image: V3Image, category: 'regular' }),
    createProduct({ name: 'Aretha Franklin', price: 149.98, title: 'A Portrait Of The Queen', image: V4Image, category: 'regular' }),
    createProduct({ name: 'Blues Traveler', price: 16.98, title: 'Live And Acoustic Fall of 1997', image: V5Image, category: 'regular' }),
    createProduct({ name: 'Paul McCartney', price: 37.99, title: 'Tug Of War', image: V6Image, category: 'regular' }),
    createProduct({ name: 'Leon Bridges', price: 22.99, title: 'Good Thing', image: V7Image, category: 'preorder', is_preorder: true }),
    createProduct({ name: 'Billy Joel', price: 28.98, title: 'StreetLife Serenade', image: V8Image, category: 'preorder', is_preorder: true }),
    createProduct({ name: 'Beyonce', price: 54.98, title: 'HOMECOMING: The Live Album', image: V9Image, category: 'preorder', is_preorder: true }),
    createProduct({ name: 'Tasian, Aaron Lee', price: 27.98, title: 'Stellar Evolution', image: V10Image, category: 'preorder', is_preorder: true }),
    createProduct({ name: 'Maggie Rogers', price: 29.99, title: "Don't Forget Me Evergreen", image: V11Image, category: 'preorder', is_preorder: true }),
    createProduct({ name: 'B.T.EXPRESS', price: 35.98, title: 'DO IT TIL YOU\'RE SATISFIED', image: V12Image, category: 'preorder', is_preorder: true }),
  ]);

  bazz = await updateProduct({...bazz, image: V3Image})

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);

  await Promise.all([
  createReview({title:'Best Vinyl Store', comments: 'I am a Vinyl Club member and Proud to be, Spinners is more than a store it is a Community.',ratings : 5,product_id: foo.id}),
  createReview({ title:'Awesome',comments: 'Somehow they always have the records noone else has.',ratings : 5,product_id: foo.id }),
    createReview({ title:'The Sound, The Quailty, The Culture',comments: 'If your looking for an amazing experience you have come to the right place, there is always good vibes at Spinners one of the best place in the City.',ratings : 5,product_id: bar.id }),
    createReview({ title:'I love this place',comments: 'I love the Thursdays here and they really have the BEST events for Vinyl lovers.',ratings : 5 ,product_id: bazz.id}),
])
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchReviews,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  createUser,
  updateProduct,
  seed,
  client
};
