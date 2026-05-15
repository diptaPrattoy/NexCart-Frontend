"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Clock,
  Star,
  Leaf,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Package,
  Heart,
  Zap,
} from "lucide-react";

const categories = [
  { name: "Fresh Vegetables", emoji: "🥦", count: "120+ items", color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
  { name: "Fresh Fruits",     emoji: "🍎", count: "90+ items",  color: "bg-rose-50 border-rose-100 text-rose-700"       },
  { name: "Dairy & Eggs",     emoji: "🥛", count: "60+ items",  color: "bg-amber-50 border-amber-100 text-amber-700"    },
  { name: "Bakery",           emoji: "🍞", count: "40+ items",  color: "bg-orange-50 border-orange-100 text-orange-700" },
  { name: "Meat & Fish",      emoji: "🥩", count: "80+ items",  color: "bg-red-50 border-red-100 text-red-700"         },
  { name: "Beverages",        emoji: "🧃", count: "70+ items",  color: "bg-blue-50 border-blue-100 text-blue-700"      },
  { name: "Snacks",           emoji: "🍿", count: "100+ items", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { name: "Organic",          emoji: "🌿", count: "50+ items",  color: "bg-teal-50 border-teal-100 text-teal-700"      },
];

const features = [
  { icon: Truck,       title: "Free Delivery",     desc: "On all orders over $30. Same-day delivery available in your area.",       color: "bg-indigo-50 text-indigo-600" },
  { icon: Leaf,        title: "100% Fresh",        desc: "Farm-to-door freshness guaranteed. No middlemen, just fresh produce.",   color: "bg-emerald-50 text-emerald-600" },
  { icon: RefreshCw,   title: "Easy Returns",      desc: "Not happy? We'll replace or refund within 24 hours. No questions asked.", color: "bg-amber-50 text-amber-600" },
  { icon: ShieldCheck, title: "Secure Payment",    desc: "Bank-level encryption on all transactions. Multiple payment options.",    color: "bg-rose-50 text-rose-600" },
];

const steps = [
  { num: "01", icon: ShoppingBag, title: "Browse & Add",   desc: "Explore hundreds of fresh products and add them to your cart."       },
  { num: "02", icon: Package,     title: "Place Order",    desc: "Choose your payment method and confirm your order in seconds."        },
  { num: "03", icon: Truck,       title: "We Deliver",     desc: "Sit back and relax — your groceries arrive fresh at your doorstep."  },
];

const testimonials = [
  { name: "Sarah K.",    role: "Home Cook",       rating: 5, text: "NexCart completely changed how I grocery shop. Everything is always fresh and delivery is super fast!",        avatar: "SK" },
  { name: "Rahim M.",    role: "Busy Parent",     rating: 5, text: "As a parent of three, this saves me hours every week. The produce quality is genuinely better than my local store.", avatar: "RM" },
  { name: "Priya L.",    role: "Health Blogger",  rating: 5, text: "The organic section is amazing. I love that I can trust the sourcing and everything arrives perfectly packaged.", avatar: "PL" },
];

const stats = [
  { value: "50K+",  label: "Happy Customers" },
  { value: "500+",  label: "Products"         },
  { value: "98%",   label: "Satisfaction Rate" },
  { value: "2 hrs", label: "Avg. Delivery Time" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ─────────────── NAVBAR ─────────────── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight">NexCart</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#categories" className="hover:text-indigo-600 transition">Categories</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
            <a href="#about" className="hover:text-indigo-600 transition">About</a>
            <a href="#contact" className="hover:text-indigo-600 transition">Contact</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login/customer" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition">
              Sign In
            </Link>
            <Link
              href="/register/customer"
              className="text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition shadow-md shadow-indigo-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-4">
            {["#categories", "#how-it-works", "#about", "#contact"].map((href) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 capitalize">
                {href.replace("#", "").replace("-", " ")}
              </a>
            ))}
            <Link href="/login/customer" className="text-sm font-bold text-indigo-600">Sign In</Link>
            <Link href="/register/customer" className="text-sm font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl text-center">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-emerald-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center relative">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              <Zap size={12} /> Free delivery on your first order
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Fresh Groceries <br />
              <span className="text-indigo-600">Delivered Fast</span>
            </h1>

            <p className="text-slate-500 text-lg mt-4 leading-relaxed max-w-md">
              Shop from 500+ fresh products and get them delivered to your door in as little as 2 hours.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/register/customer"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-indigo-200"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-3.5 rounded-xl border border-slate-200 transition"
              >
                How it Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-5 mt-10">
              {["No hidden fees", "Fresh guarantee", "24/7 support"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                  <CheckCircle size={15} className="text-emerald-500" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Visual card stack */}
          <div className="flex flex-col gap-4">
            {/* Main card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-700">Today's Fresh Picks</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full">Live</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { e: "🥦", n: "Broccoli",  p: "$1.99" },
                  { e: "🍓", n: "Strawberry", p: "$3.49" },
                  { e: "🥕", n: "Carrots",   p: "$0.99" },
                  { e: "🍋", n: "Lemons",    p: "$1.29" },
                  { e: "🥑", n: "Avocado",   p: "$2.49" },
                  { e: "🍇", n: "Grapes",    p: "$4.99" },
                ].map((item) => (
                  <div key={item.n} className="bg-slate-50 rounded-2xl p-3 text-center hover:bg-indigo-50 transition cursor-pointer">
                    <div className="text-2xl mb-1">{item.e}</div>
                    <p className="text-xs font-semibold text-slate-700 truncate">{item.n}</p>
                    <p className="text-xs font-bold text-indigo-600 mt-0.5">{item.p}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery badge */}
            <div className="bg-indigo-600 text-white rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-white/20 rounded-xl p-2.5">
                <Truck size={22} />
              </div>
              <div>
                <p className="font-bold text-sm">Express delivery available</p>
                <p className="text-indigo-200 text-xs mt-0.5">Order before 6 PM · Get it today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-slate-400 text-sm mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── CATEGORIES ─────────────── */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Shop by Category</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Everything you need</h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto">From farm-fresh vegetables to pantry staples — all in one place.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/login/customer"
                className={`${cat.color} border rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-[1.02] transition-transform cursor-pointer`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div className="text-center">
                  <p className="font-bold text-sm">{cat.name}</p>
                  <p className="text-xs opacity-70 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── FEATURES ─────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Why NexCart</p>
            <h2 className="text-3xl font-extrabold text-slate-900">The smarter way to shop</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
                <div className={`${f.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon size={22} />
                </div>
                <h3 className="font-bold text-slate-800 text-base">{f.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <p className="text-slate-400 mt-3 max-w-md mx-auto">Three easy steps to get fresh groceries at your door.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-dashed border-t-2 border-dashed border-indigo-100" />

            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <step.icon size={30} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-slate-900 text-white text-xs font-extrabold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">{step.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/register/customer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-xl transition shadow-lg shadow-indigo-200"
            >
              Start Shopping <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── ABOUT ─────────────── */}
      <section id="about" className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <p className="text-indigo-200 font-bold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-3xl font-extrabold leading-tight">Built for people who care about what they eat</h2>
            <p className="text-indigo-100 mt-5 leading-relaxed">
              NexCart was founded in 2022 with a simple belief — everyone deserves access to fresh, affordable groceries without leaving their home. We work directly with local farms and trusted suppliers to bring you the best.
            </p>
            <p className="text-indigo-100 mt-4 leading-relaxed">
              No warehouses with week-old produce. No mystery suppliers. Just honest food, delivered fast.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Heart,       t: "Farmer-first",    d: "We pay fair prices to our partners" },
                { icon: Leaf,        t: "Eco-friendly",    d: "Biodegradable packaging only"       },
                { icon: Clock,       t: "Always on time",  d: "98% on-time delivery rate"          },
                { icon: ShieldCheck, t: "Quality checked", d: "Every item inspected before packing" },
              ].map((v) => (
                <div key={v.t} className="flex items-start gap-3">
                  <div className="bg-white/20 rounded-xl p-2 mt-0.5">
                    <v.icon size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{v.t}</p>
                    <p className="text-indigo-200 text-xs mt-0.5">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { e: "🌾", t: "Local Farms",      d: "Sourced within 50km"    },
              { e: "♻️",  t: "Zero Waste",       d: "100% recyclable packs"  },
              { e: "🧪",  t: "Quality Tested",   d: "Lab-certified freshness" },
              { e: "🚴",  t: "Green Delivery",   d: "E-bike delivery fleet"  },
            ].map((card) => (
              <div key={card.t} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="text-3xl mb-3">{card.e}</div>
                <p className="font-bold text-sm">{card.t}</p>
                <p className="text-indigo-200 text-xs mt-1">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Reviews</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Loved by thousands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">"{t.text}"</p>

                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-extrabold text-sm flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA BANNER ─────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Ready to eat fresh?</h2>
          <p className="text-slate-400 mt-3">Join 50,000+ customers who switched to smarter grocery shopping.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link
              href="/register/customer"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-xl transition shadow-lg shadow-indigo-200"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>
            <Link
              href="/login/customer"
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-7 py-3.5 rounded-xl transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-3">Contact Us</p>
            <h2 className="text-3xl font-extrabold text-slate-900">We're here to help</h2>
            <p className="text-slate-400 mt-3 leading-relaxed">Have a question or issue? Reach out — our team responds within an hour.</p>

            <div className="flex flex-col gap-4 mt-8">
              {[
                { icon: Phone,  label: "+880 1XXX-XXXXXX",          sub: "Mon–Sat, 8 AM – 10 PM" },
                { icon: Mail,   label: "support@nexcart.com",        sub: "We reply within 1 hour"  },
                { icon: MapPin, label: "Dhaka, Bangladesh",          sub: "Serving Dhaka & surrounds" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                    <c.icon size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{c.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h3 className="font-extrabold text-slate-800 text-lg mb-6">Send us a message</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1.5">Name</label>
                <input type="text" placeholder="Your name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white transition-all placeholder:text-slate-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1.5">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white transition-all placeholder:text-slate-300" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1.5">Message</label>
                <textarea rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white transition-all placeholder:text-slate-300 resize-none" />
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-200">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={16} className="text-white" />
                </div>
                <span className="text-lg font-extrabold">NexCart</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Fresh groceries delivered fast to your door.</p>
            </div>

            {/* Links */}
            {[
              { title: "Shop",    links: ["Vegetables", "Fruits", "Dairy", "Beverages"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press"]       },
              { title: "Support", links: ["Help Center", "Track Order", "Returns", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-slate-400 text-sm hover:text-white transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <p>© 2025 NexCart. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}