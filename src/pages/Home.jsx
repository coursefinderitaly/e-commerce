import { motion } from 'framer-motion';
import CategoryShowcase from '../components/home/CategoryShowcase';
import Hero from '../components/home/Hero';
import TrustBadges from '../components/home/TrustBadges';
import FlashDeals from '../components/home/FlashDeals';
import CategorySpotlight from '../components/home/CategorySpotlight';
import BestSellers from '../components/home/BestSellers';
import PromoBanners from '../components/home/PromoBanners';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* 1. Category Row (Flipkart / Meesho Stories style) */}
      <CategoryShowcase />

      {/* 2. Main Hero Banner Carousel Slider */}
      <Hero />

      {/* 3. Trust Badges (Shipping, Genuine, Returns, Derm Tested) */}
      <TrustBadges />

      {/* 4. Deals of the Day / Flash Sale with Ticking Timer */}
      <FlashDeals />

      {/* 5. Shop by Category Visual Spotlight (Hair, Skin, Body, Face) */}
      <CategorySpotlight />

      {/* 6. Mid-Page Dual Promo Banners */}
      <PromoBanners />

      {/* 7. Most Loved / Best Sellers with Interactive Category Tabs */}
      <BestSellers />

      {/* 8. Social Proof & Customer Reviews with Satisfaction Stats */}
      <Testimonials />

      {/* 9. VIP Club & 15% Off Newsletter */}
      <Newsletter />
    </motion.div>
  );
}
