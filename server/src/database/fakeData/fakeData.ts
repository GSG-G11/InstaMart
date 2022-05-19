const categories = [
  {
    name: 'Food',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/541/541836.png',
  },
  {
    name: 'Drinks',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3126/3126588.png',
  },
  {
    name: 'Vegetables',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2329/2329903.png',
  },
  {
    name: 'Fruits',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081887.png',
  },
];

const products = [
  {
    name: 'Cola',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola1',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola2',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola3',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola4',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola6',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Cola6',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Rice',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg',
    price: 10,
    details: '',
    categoryId: 1,
  },
  {
    name: 'Tomato',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-6.jpg',
    price: 30,
    details: '',
    categoryId: 3,
  },
  {
    name: 'Banana',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-4.jpg',
    price: 40,
    details: '',
    categoryId: 4,
  },
  {
    name: 'Cola',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Rice',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg',
    price: 10,
    details: '',
    categoryId: 1,
  },
  {
    name: 'Tomato',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-6.jpg',
    price: 30,
    details: '',
    categoryId: 3,
  },
  {
    name: 'Banana',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-4.jpg',
    price: 40,
    details: '',
    categoryId: 4,
  },
  {
    name: 'Cola',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Rice',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg',
    price: 10,
    details: '',
    categoryId: 1,
  },
  {
    name: 'Tomato',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-6.jpg',
    price: 30,
    details: '',
    categoryId: 3,
  },
  {
    name: 'Banana',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-4.jpg',
    price: 40,
    details: '',
    categoryId: 4,
  },
  {
    name: 'Cola',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Rice',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg',
    price: 10,
    details: '',
    categoryId: 1,
  },
  {
    name: 'Tomato',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-6.jpg',
    price: 30,
    details: '',
    categoryId: 3,
  },
  {
    name: 'Banana',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-4.jpg',
    price: 40,
    details: '',
    categoryId: 4,
  },
  {
    name: 'Cola',
    imageUrl: 'https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3720208_1.jpg',
    price: 20,
    details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    categoryId: 2,
  },
  {
    name: 'Rice',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-1.jpg',
    price: 10,
    details: '',
    categoryId: 1,
  },
  {
    name: 'Tomato',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-6.jpg',
    price: 30,
    details: '',
    categoryId: 3,
  },
  {
    name: 'Banana',
    imageUrl: 'http://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-16-4.jpg',
    price: 40,
    details: '',
    categoryId: 4,
  },
];

const users = [{
  id: 10,
  name: 'insta',
  email: 'yosra@gmail.com',
  mobile: '4525245',
  address: 'sgsggdgsg',
  password: '$2b$10$5Or.3zVU/tuQnKIVZXjjyObIgJvuhk/xHS41EaMBWXgK1LPQjpk0O',
  isAdmin: true,
}];

const productsOrders = [
  { quantity: 0, productId: 1 },
  { quantity: 0, productId: 2 },
  { quantity: 0, productId: 3 },
  { quantity: 0, productId: 4 },
  { quantity: 0, productId: 5 },
  { quantity: 0, productId: 6 },
  { quantity: 0, productId: 7 },
  { quantity: 0, productId: 8 },
  { quantity: 0, productId: 9 },
  { quantity: 0, productId: 10 },
  { quantity: 0, productId: 11 },
  { quantity: 0, productId: 12 },
  { quantity: 0, productId: 13 },
  { quantity: 0, productId: 14 },
  { quantity: 0, productId: 15 },
  { quantity: 0, productId: 16 },
  { quantity: 0, productId: 17 },
  { quantity: 0, productId: 18 },
  { quantity: 0, productId: 19 },
  { quantity: 0, productId: 20 },
  { quantity: 10, productId: 1 },
  { quantity: 5, productId: 1 },
  { quantity: 1, productId: 1, orderId: 1 },
  { quantity: 5, productId: 2, orderId: 1 },

];

const order = [{
  date: new Date(),
  totalPrice: 100,
  paidPrice: 200,
  status: 'pending',
  supplier: 'admin',
  isSupplied: false,
  mobile: '+970567444517',
  address: 'string',
},
{
  date: new Date(),
  totalPrice: 200,
  paidPrice: 200,
  status: 'pending',
  supplier: 'admin',
  isSupplied: false,
  mobile: '+970567444517',
  address: 'string',
},
{
  date: new Date(),
  totalPrice: 300,
  paidPrice: 200,
  status: 'approved',
  supplier: 'admin',
  isSupplied: false,
  mobile: '+970567444517',
  address: 'string',
}];

export {
  products, categories, users, productsOrders, order,
};
