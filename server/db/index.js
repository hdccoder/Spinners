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

const {
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem,
} = require('./wishlist');

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
    DROP TABLE IF EXISTS wishlist;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS reviews; 
    DROP TABLE IF EXISTS contacts;
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
      genre VARCHAR(50), 
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

    CREATE TABLE contacts (
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL
    );

    CREATE TABLE wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT user_and_product_key UNIQUE(user_id, product_id)
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
  const V13Image = await loadImage('images/Brandy.jpg')
  const V14Image = await loadImage('images/UsherConfessions.jpeg')
  const V15Image = await loadImage('images/Alicia.jpg')
  const V16Image = await loadImage('images/MaxwellNow.jpeg')
  const V17Image = await loadImage('images/Boyz.jpg')
  const V18Image = await loadImage('images/LaurynHill.jpg')
  const V19Image = await loadImage('images/MariahCarey.jpg')
  const V20Image = await loadImage('images/DanielCaesar.jpg')
  const V21Image = await loadImage('images/Sza.jpg')
  const V22Image = await loadImage('images/JanetJackson.jpg')
  const V23Image = await loadImage('images/Khalid1.jpg')
  const V24Image = await loadImage('images/Beyonce.jpg')
  const V25Image = await loadImage('images/Giveon.jpg')
  const V26Image = await loadImage('images/MichaelJackson.jpg')
  const V27Image = await loadImage('images/LadyGaga.jpg')
  const V28Image = await loadImage('images/Madonna.jpg')
  const V29Image = await loadImage('images/NSYNC.jpg')
  const V30Image = await loadImage('images/JonasBrothers.jpeg')
  const V31Image = await loadImage('images/DuaLipa.jpeg')
  const V32Image = await loadImage('images/CamilaCabello.jpeg')
  const V33Image = await loadImage('images/Rihanna .jpeg')
  const V34Image = await loadImage('images/DojaCat.jpeg')
  const V35Image = await loadImage('images/Justin Bieber.jpeg')
  const V36Image = await loadImage('images/JazmineSullivan.jpeg')
  const V37Image = await loadImage('images/EDSHEERAN.jpeg')
  const V38Image = await loadImage('images/Her.jpg')
  const V39Image = await loadImage('images/AnitaBaker.jpg')
  const V40Image = await loadImage('images/MarvinGaye.jpg')
  const V41Image = await loadImage('images/EttaJames.jpg')
  const V42Image = await loadImage('images/AlGreen.jpg')
  const V43Image = await loadImage('images/Sade.jpg')
  const V44Image = await loadImage('images/James Brown.jpg')
  const V45Image = await loadImage('images/India Arie.jpeg')
  const V46Image = await loadImage('images/JAMESBROWN.jpg')
  const V47Image = await loadImage('images/NinaSimone.jpg')
  const V48Image = await loadImage('images/StevieWonder.jpg')
  const V49Image = await loadImage('images/BillieHoliday.jpg')
  const V50Image = await loadImage('images/LuckyDaye.jpg')
  const V51Image = await loadImage('images/Aerosmith.jpg')
  const V52Image = await loadImage('images/RHC.jpg')
  const V53Image = await loadImage('images/NIRVANA.jpg')
  const V54Image = await loadImage('images/FooFighters.jpg')
  const V55Image = await loadImage('images/PF.jpg')
  const V56Image = await loadImage('images/Paramore.jpg')
  const V57Image = await loadImage('images/Coldplay.jpg')

  let [foo, bar, bazz] = await Promise.all([
    createProduct({ name: 'Silk Sonic', price: 26.99, title: 'An Evening With Silk Sonic', image: V1Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Ray Charles', price: 36.99, title: 'Now Playing', image: V2Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'DOORS', price: 30.00, title: 'Alive She Cried (40TH ANNIVERSARY)', image: V3Image, category: 'regular', genre: 'Rock' }),
    createProduct({ name: 'Aretha Franklin', price: 149.98, title: 'A Portrait Of The Queen', image: V4Image, category: 'regular', genre: 'RnB' }),
    createProduct({ name: 'Blues Traveler', price: 16.98, title: 'Live And Acoustic Fall of 1997', image: V5Image, category: 'regular', genre: 'Rock' }),
    createProduct({ name: 'Paul McCartney', price: 37.99, title: 'Tug Of War', image: V6Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'Leon Bridges', price: 22.99, title: 'Good Thing', image: V7Image, category: 'preorder', is_preorder: true , genre: 'RnB' }),
    createProduct({ name: 'Billy Joel', price: 28.98, title: 'StreetLife Serenade', image: V8Image, category: 'preorder', is_preorder: true ,  genre: 'Rock'}),
    createProduct({ name: 'Beyonce', price: 54.98, title: 'HOMECOMING: The Live Album', image: V9Image, category: 'preorder', is_preorder: true,  genre: 'Pop' }),
    createProduct({ name: 'Tasian, Aaron Lee', price: 27.98, title: 'Stellar Evolution', image: V10Image, category: 'preorder', is_preorder: true , genre: 'Rock' }),
    createProduct({ name: 'Maggie Rogers', price: 29.99, title: "Don't Forget Me Evergreen", image: V11Image, category: 'preorder', is_preorder: true, genre: 'Indie-Pop'  }),
    createProduct({ name: 'B.T.EXPRESS', price: 35.98, title: 'DO IT TIL YOU\'RE SATISFIED', image: V12Image, category: 'preorder', is_preorder: true , genre: 'Soul' }),
    createProduct({ name: 'Brandy', price: 49.99, title: 'Never Say Never - Ltd Clear Edition', image: V13Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Usher', price: 239.94, title: 'Confessions', image: V14Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Alicia Keys', price: 32.98, title: 'The Diary Of Alicia Keys', image: V15Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Maxwell', price: 32.98, title: 'Now', image: V16Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Boyz II Men', price: 109.99, title: 'Legacy (Greatest Hits Collection) - Exclusive Limited Edition Purple Colored 2x Vinyl LP', image: V17Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Lauryn Hill', price: 58.99, title: 'The Miseducation Of Lauryn Hill', image: V18Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Mariah Carey', price: 99.99, title: 'Music Box: 30th Anniversary Expanded Edition', image: V19Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Daniel Caesar', price: 56.99, title: 'Freudian Exclusive Tan with White Splatter Colored Vinyl', image: V20Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'SZA', price: 21.95, title: 'Ctrl', image: V21Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Janet Jackson', price: 516.95, title: 'Design of a Decade: 1986-1996', image: V22Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Khalid', price: 21.97, title: 'Free Spirit', image: V23Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'BEYONCE', price: 250.99, title: 'Dangerously In Love', image: V24Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Giveon', price: 45.94, title: 'Give Or Take', image: V25Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Michael Jackson', price: 346.97, title: 'Thriller', image: V26Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Lady Gaga', price: 37.99, title: 'Joanne', image: V27Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Madonna', price: 47.94, title: 'True Blue The Silver Collection', image: V28Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'NYSNC', price: 245.99, title: 'Greatest Hits', image: V29Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Jonas Brothers', price: 32.99, title: 'Happiness Begins Vinyl LP', image: V30Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Dua Lipa', price: 24.98, title: 'Future Nostalgia Vinyl LP', image: V31Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Camila Cabello', price: 23.98, title: 'Familia', image: V32Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Rihanna', price: 35.98, title: 'ANTI VINYL LP', image: V33Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Doja Cat', price: 30.98, title: 'Planet Her', image: V34Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Justin Bieber', price: 32.99, title: 'Purpose', image: V35Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'Jazmine Sullivan', price: 20.98, title: 'HEAUX TALES VINYL LP', image: V36Image, category: 'regular', is_preorder: false , genre: 'RnB' }),
    createProduct({ name: 'Ed Sheeran', price: 34.98, title: 'COLLABORATIONS PROJECT VINYL LP', image: V37Image, category: 'regular', is_preorder: false , genre: 'Pop' }),
    createProduct({ name: 'H.E.R', price: 23.99, title: 'H.E.R', image: V38Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Anita Baker', price: 59.99, title: 'Rapture', image: V39Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Marvin Gaye', price: 27.97, title: 'Whats Going On', image: V40Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Etta James', price: 24.43, title: 'At Last!', image: V41Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Al Green', price: 24.26, title: 'Lets Stay Together', image: V42Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Sade', price: 34.96, title: 'The Best of Sade', image: V43Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'James Brown', price: 24.26, title: 'Live At The Apollo', image: V44Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'India Arie', price: 20.26, title: 'Acoustic Soul', image: V45Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'JAMES BROWN', price: 26.35, title: 'GREATEST', image: V46Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Nina Simone', price: 29.99, title: 'I Put A Spell On You', image: V47Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Stevie Wonder', price: 34.99, title: 'Songs in the Key of Life', image: V48Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Billie Holiday', price: 36.99, title: 'Lady Sings the Blues', image: V49Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Lucky Daye', price: 22.99, title: 'Painted', image: V50Image, category: 'regular', genre: 'Soul'  }),
    createProduct({ name: 'Aerosmith', price: 27.98, title: 'Greatest Hits', image: V51Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'RED HOT CHILLI PEPPERS', price: 27.98, title: 'Greatest Hits', image: V52Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'NIRVANA', price: 29.99, title: 'Nevermind', image: V53Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'Foo Fighters', price: 38.96, title: 'The Essential Foo Fighters', image: V54Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'Pink Floyd', price: 47.99, title: 'The Dark Side Of The Moon (50th Anniversary Remaster) (UV Edition)', image: V55Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'Paramore', price: 24.98, title: 'After Laughter', image: V56Image, category: 'regular',  genre: 'Rock' }),
    createProduct({ name: 'Coldplay', price: 42.99, title: 'Viva la Vida', image: V57Image, category: 'regular',  genre: 'Rock' }),
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

await Promise.all([
  createWishlistItem({ user_id: moe.id, product_id: bar.id }),
  createWishlistItem({ user_id: moe.id, product_id: bazz.id }),
  createWishlistItem({ user_id: lucy.id, product_id: bazz.id })
]);

};

 


module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchReviews,
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem,
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
