import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-[80vh] bg-transparent pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="font-body text-berry text-sm tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-paper mb-6">
            We're Here for You
          </h1>
          <p className="font-body text-paper/70 text-lg max-w-2xl mx-auto">
            Whether you have a question about our premium cosmetics or need assistance with your order, our dedicated team is always ready to help.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Address Section */}
          <div className="bg-paper/5 border border-paper/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:bg-paper/10 transition-colors">
            <div className="w-14 h-14 bg-berry/20 rounded-full flex items-center justify-center mb-6 text-berry">
              <MapPin size={28} />
            </div>
            <h3 className="font-display text-xl text-bone mb-4">Visit Us</h3>
            <p className="font-body text-paper/70 leading-relaxed text-sm md:text-base">
              410, 4th Floor, Apollo Premier<br />
              Vijay Nagar, Indore<br />
              Madhya Pradesh
            </p>
          </div>

          {/* Email Section - Left empty for user to fill later */}
          <div className="bg-paper/5 border border-paper/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:bg-paper/10 transition-colors">
            <div className="w-14 h-14 bg-berry/20 rounded-full flex items-center justify-center mb-6 text-berry">
              <Mail size={28} />
            </div>
            <h3 className="font-display text-xl text-bone mb-4">Email Us</h3>
            <p className="font-body text-paper/40 leading-relaxed text-sm md:text-base italic">
              {/* TODO: Add email address here */}
              [ Your Email Here ]
            </p>
          </div>

          {/* Phone Section - Left empty for user to fill later */}
          <div className="bg-paper/5 border border-paper/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:bg-paper/10 transition-colors">
            <div className="w-14 h-14 bg-berry/20 rounded-full flex items-center justify-center mb-6 text-berry">
              <Phone size={28} />
            </div>
            <h3 className="font-display text-xl text-bone mb-4">Call Us</h3>
            <p className="font-body text-paper/40 leading-relaxed text-sm md:text-base italic">
              {/* TODO: Add phone number here */}
              [ Your Number Here ]
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
