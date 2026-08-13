const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed initial data if necessary
    seedDatabase();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Define Schemas
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [String],
  rating: Number,
  reviews: Number,
  featured: Boolean,
  tags: [String],
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer_email: { type: String, required: true },
  shipping_details: { type: Object, required: true },
  items: { type: Array, required: true },
  subtotal: { type: Number, required: true },
  shipping_cost: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, default: 'customer' },
  created_at: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);

async function seedDatabase() {
  const count = await Product.countDocuments();
  if (count === 0) {
    console.log('Seeding initial products data...');
    
    const seedData = [
      {
        id: '1',
        name: 'Radiance Face Serum',
        description: 'Lightweight vitamin C serum with hyaluronic acid. Brightens skin tone and provides antioxidant protection.',
        price: 62.00,
        originalPrice: 85.00,
        category: 'Skincare',
        images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=75&fm=webp'],
        stock: 75,
        rating: 4.8,
        reviews: 445,
        featured: true,
        tags: ['skincare', 'serum', 'vitamin c']
      },
      {
        id: '2',
        name: 'Matte Lipstick Collection',
        description: 'A set of six richly pigmented matte lipsticks in everyday nudes. Enriched with shea butter.',
        price: 48.00,
        category: 'Makeup',
        images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=75&fm=webp'],
        stock: 100,
        rating: 4.6,
        reviews: 212,
        featured: false,
        tags: ['makeup', 'lips', 'lipstick']
      }
    ];

    await Product.insertMany(seedData);
    console.log('Database seeded.');
  }
}

module.exports = {
  connectDB,
  Product,
  Order,
  User,
};
