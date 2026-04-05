/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Cpu, 
  Camera, 
  Battery, 
  ShieldCheck, 
  CheckCircle, 
  ChevronRight,
  Info,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [selectedColor, setSelectedColor] = useState('Graphite');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const colors = [
    { name: 'Graphite', hex: '#3c3d3a' },
    { name: 'Gold', hex: '#e5d1b8' },
    { name: 'Silver', hex: '#f1f2ed' },
    { name: 'Sierra Blue', hex: '#a7c1d9' }
  ];

  const features = [
    { icon: Smartphone, title: 'Super Retina XDR', desc: 'Edge-to-edge Liquid Retina display' },
    { icon: Cpu, title: 'A15 Bionic Chip', desc: 'Fastest chip in a smartphone' },
    { icon: Camera, title: 'Pro Camera System', desc: '12MP Wide and Ultra Wide cameras' },
    { icon: Battery, title: 'All-day Battery', desc: 'Up to 10 hours of web surfing' },
    { icon: ShieldCheck, title: 'Face ID', desc: 'Secure facial authentication' },
    { icon: CheckCircle, title: 'In Stock', desc: 'Only 3 units remaining!' }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl tracking-tight">iWin Rewards</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Specs</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
            Enter Now
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Special Offer: 3 in stock
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  The New <span className="text-blue-600">iPhone 13 Pro</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  It’s a magical piece of tech. It’s so fast most devices can’t catch up. 
                  Experience the newly developed cameras that transform reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all transform hover:scale-105">
                    Participate Now <ArrowRight className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-xl">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <img 
                          key={i}
                          src={`https://picsum.photos/seed/user${i}/32/32`} 
                          className="w-8 h-8 rounded-full border-2 border-white"
                          referrerPolicy="no-referrer"
                          alt="User"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">1.2k+ entered today</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-20 transform -rotate-12 scale-110"></div>
                <img 
                  src="https://picsum.photos/seed/iphone13pro/800/1000" 
                  alt="iPhone 13 Pro" 
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why iPhone 13 Pro?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A winner will be selected from all eligible entrants. 
                The lucky winner will be directly contacted by email.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Participation Form */}
        <section className="py-20 bg-gray-50" id="participation-form">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Fill Out Your Details</h2>
                  <p className="text-gray-600">Select your preferred color and enter to win.</p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4">Choose Your Color</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {colors.map((color) => (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => setSelectedColor(color.name)}
                              className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                                selectedColor === color.name 
                                  ? 'border-blue-600 bg-blue-50' 
                                  : 'border-gray-100 hover:border-gray-200'
                              }`}
                            >
                              <div 
                                className="w-8 h-8 rounded-full shadow-inner" 
                                style={{ backgroundColor: color.hex }}
                              ></div>
                              <span className="text-xs font-bold">{color.name}</span>
                              {selectedColor === color.name && (
                                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
                                  <CheckCircle className="w-3 h-3" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">First Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Last Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                        <input 
                          required
                          type="email" 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <input type="checkbox" required className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                        <p className="text-xs text-gray-500 leading-relaxed">
                          I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>. 
                          I understand that a winner will be selected from all eligible entrants.
                        </p>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                      >
                        Submit Entry
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Entry Received!</h3>
                      <p className="text-gray-600 mb-8">
                        Thank you for participating. We'll contact you at your email address if you're the lucky winner.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Submit another entry
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Dimensions</span>
                    <span className="font-medium">150.9 x 75.7 x 8.3 mm</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Display</span>
                    <span className="font-medium">6.1" Liquid Retina HD</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Resolution</span>
                    <span className="font-medium">1792 x 828 pixels</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Chip</span>
                    <span className="font-medium">A15 Bionic (64-bit)</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium">194 grams</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Info className="w-32 h-32" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Important Information</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Participation is free and open to all eligible residents. 
                  The winner will be selected randomly and notified via the provided email address. 
                  Make sure to check your spam folder!
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  Learn more about our selection process <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-gray-900">iWin Rewards</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
            </div>
            <p className="text-xs text-gray-400">
              © 2026 iWin Rewards. All rights reserved. Apple is a trademark of Apple Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
