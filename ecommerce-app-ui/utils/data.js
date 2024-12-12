const products = [
  {
    url: "https://tienda.hk-industrial.com/cdn/shop/products/Productos-WebCH-rosa.png?v=1596020724&width=713",
    name: 'Desodorante Chiki Halka Rosa',
    description: "Afro Love es una línea capilar formulada libre de sales, sulfatos, parabenos, formol, dea, colorantes, aceites minerales y siliconas. Creada para cabellos naturales, afro o en transición. La línea conjuga una mezcla especial que estimula, refresca, hidrata, nutre y protege tu cabellera, aportándole brillo, definición y sedosidad a cada hebra.",
    category: 'Electronics',
    price: 73.00,
  },
  {
    url: "https://tienda.hk-industrial.com/cdn/shop/products/Productos-WebCH-rosa.png?v=1596020724&width=713",
    name: 'Desodorante Chiki Halka Rosa',
    description: "Afro Love es una línea capilar formulada libre de sales, sulfatos, parabenos, formol, dea, colorantes, aceites minerales y siliconas. Creada para cabellos naturales, afro o en transición. La línea conjuga una mezcla especial que estimula, refresca, hidrata, nutre y protege tu cabellera, aportándole brillo, definición y sedosidad a cada hebra.",
    category: 'Electronics',
    price: 73.00,
  },

  {
    url: "https://tienda.hk-industrial.com/cdn/shop/products/Productos-WebCH-Blue.png?v=1596020724&width=713",
    name: 'Desodorante Chiki Halka Azul',
    description: "Afro Love es una línea capilar formulada libre de sales, sulfatos, parabenos, formol, dea, colorantes, aceites minerales y siliconas. Creada para cabellos naturales, afro o en transición. La línea conjuga una mezcla especial que estimula, refresca, hidrata, nutre y protege tu cabellera, aportándole brillo, definición y sedosidad a cada hebra.",
    category: 'Electronics',
    price: 73.00,
  },
  {
    url: "https://tienda.hk-industrial.com/cdn/shop/products/Productos-WebCH-Blue.png?v=1596020724&width=713",
    name: 'Desodorante Chiki Halka Azul',
    description: "Afro Love es una línea capilar formulada libre de sales, sulfatos, parabenos, formol, dea, colorantes, aceites minerales y siliconas. Creada para cabellos naturales, afro o en transición. La línea conjuga una mezcla especial que estimula, refresca, hidrata, nutre y protege tu cabellera, aportándole brillo, definición y sedosidad a cada hebra.",
    category: 'Electronics',
    price: 73.00,
  },
];


const sliderImages = [
  require('../assets/slide1.png'),
  require('../assets/slide2.png'),
  require('../assets/slide3.png'),
  // require('../assets/slide4.png'),
  require('../assets/slide5.png'),
];

const categories = [
  {
    image: require('../assets/categories/all.png'),
    name: 'All',
  },
  {
    image: require('../assets/categories/shoe.png'),
    name: 'Shoes',
  },
  {
    image: require('../assets/categories/men.png'),
    name: "Men's",
  },
  {
    image: require('../assets/categories/watch.png'),
    name: 'Watches',
  },
  {
    image: require('../assets/categories/headphone.png'),
    name: 'Electronics',
  },
  {
    image: require('../assets/categories/beauty.png'),
    name: 'Beauty',
  },
  {
    image: require('../assets/categories/women.png'),
    name: "Women's",
  },
  {
    image: require('../assets/categories/jewelry.png'),
    name: 'Jewelry',
  },
];

const CATEGORIES = [
  'T-shirts',
  'Jackets',
  'Shirts',
  'Hoodies',
  'Jumpers',
  'Trousers',
  'Jeans',
  'Joggers',
  'Vests',
  'Sweatshirts',
  'Socks',
  'Shorts',
];

const STYLES = ['Regular', 'Oversized', 'Slim', 'Relaxed', 'Skinny', 'Muscie'];
const BRANDS = [
  'Nike',
  'Adidas',
  'Yeezy',
  'New Balance',
  'Supreme',
  'Gap',
  'Balenciaga',
  'Off White',
  'Vans',
  'Carhartt',
  'Asics',
  'Burberry',
];
const COLORS = [
  'Blue',
  'Red',
  'Green',
  'Yellow',
  'Brown',
  'Pink',
  'Purple',
  'Black',
  'White',
  'Gray',
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44', '46'];
const notifications = [
  {
    id: 1,
    title: 'Password changed',
    body: 'Your password was successfully changed on 2024-08-20.',
    date: '2024-08-20',
    isRead: true,
  },
  {
    id: 2,
    title: 'Login from a new device',
    body: "Your account was accessed from a new device. If this wasn't you, please secure your account.",
    date: '2024-08-19',
    isRead: true,
  },
  {
    id: 3,
    title: 'Payment method updated',
    body: 'Your payment method was successfully updated.',
    date: '2024-08-18',
    isRead: true,
  },
  {
    id: 4,
    title: 'New coupon code available',
    body: 'Use code SAVE20 to get 20% off on your next purchase. Valid till 2024-08-31.',
    date: '2024-08-17',
    isRead: true,
  },
  {
    id: 5,
    title: 'Points earned from your purchase',
    body: 'You earned 150 points from your recent purchase. Keep shopping to earn more!',
    date: '2024-08-16',
    isRead: false,
  },
  {
    id: 6,
    title: 'Free shipping offer expiring soon',
    body: "Your free shipping offer expires on 2024-08-22. Don't miss out!",
    date: '2024-08-15',
    isRead: false,
  },
  {
    id: 7,
    title: 'Order #12345 has been shipped',
    body: 'Your order #12345 has been shipped and is on its way.',
    date: '2024-08-14',
    isRead: false,
  },
  {
    id: 8,
    title: 'Order #12345 has been delivered',
    body: 'Your order #12345 has been delivered. Thank you for shopping with us!',
    date: '2024-08-13',
    isRead: false,
  },
  {
    id: 9,
    title: 'Wishlist item back in stock',
    body: "An item in your wishlist is back in stock. Grab it before it's gone!",
    date: '2024-08-12',
    isRead: false,
  },
  {
    id: 10,
    title: 'Exclusive offer just for you!',
    body: 'Enjoy an exclusive offer on your next purchase. Check the app for details.',
    date: '2024-08-11',
    isRead: false,
  },
  {
    id: 11,
    title: 'Referral reward credited',
    body: 'Your referral reward has been credited to your account. Keep sharing!',
    date: '2024-08-10',
    isRead: false,
  },
  {
    id: 12,
    title: 'New product launch',
    body: 'We’ve just launched a new product. Take a look and be the first to own it!',
    date: '2024-08-09',
    isRead: false,
  },
  {
    id: 13,
    title: 'Order #12346 is ready for pickup',
    body: 'Your order #12346 is ready for pickup. Visit the store to collect.',
    date: '2024-08-08',
    isRead: false,
  },
  {
    id: 14,
    title: 'Profile information updated',
    body: 'Your profile information was successfully updated.',
    date: '2024-08-07',
    isRead: false,
  },
  {
    id: 15,
    title: 'Special discount on your favorite items',
    body: "Get a special discount on the items you've been eyeing. Limited time only!",
    date: '2024-08-06',
    isRead: false,
  },
  {
    id: 16,
    title: 'Payment failed',
    body: 'Your recent payment attempt failed. Please update your payment details to complete the purchase.',
    date: '2024-08-05',
    isRead: false,
  },
  {
    id: 17,
    title: 'Cart abandoned',
    body: 'You left items in your cart. They are still available, but not for long!',
    date: '2024-08-04',
    isRead: false,
  },
  {
    id: 18,
    title: 'Seasonal sale starts now!',
    body: 'Our seasonal sale has begun. Enjoy huge discounts on your favorite items!',
    date: '2024-08-03',
    isRead: false,
  },
  {
    id: 19,
    title: 'Order #12347 has been canceled',
    body: 'Your order #12347 has been canceled as per your request.',
    date: '2024-08-02',
    isRead: false,
  },
  {
    id: 20,
    title: 'Points expiring soon',
    body: 'Some of your reward points are expiring soon. Redeem them before they’re gone!',
    date: '2024-08-01',
    isRead: false,
  },
];

export {
  products,
  sliderImages,
  categories,
  CATEGORIES,
  STYLES,
  BRANDS,
  COLORS,
  SIZES,
  notifications,
};
