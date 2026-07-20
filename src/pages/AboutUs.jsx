import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-[80vh] bg-transparent pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="font-body text-berry text-sm tracking-[0.3em] uppercase mb-6">
            About Us
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-paper mb-8 leading-tight">
            Built on Trust. <br className="hidden md:block" /> Driven by Your Happiness.
          </h1>
          
          <p className="font-body text-paper/70 text-lg md:text-xl leading-relaxed mb-6">
            At Glam AURA, we believe that true beauty begins with trust. As a premium e-commerce destination, our foundation is built on an unwavering commitment to authenticity, quality, and complete customer satisfaction.
          </p>
          
          <p className="font-body text-paper/70 text-lg md:text-xl leading-relaxed mb-12">
            Every product we curate is selected with one singular goal: to make you feel confident, radiant, and deeply happy with your purchase. We aren't just delivering premium cosmetics; we are delivering a promise of excellence that you can always believe in.
          </p>
          
          <div className="inline-block p-8 rounded-2xl bg-paper/5 border border-paper/10 shadow-xl">
            <h3 className="font-display text-2xl text-bone mb-3">Our Core Promise</h3>
            <p className="font-body text-bone/60 text-lg">
              100% Satisfaction &bull; Uncompromising Quality &bull; Genuine Care
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
