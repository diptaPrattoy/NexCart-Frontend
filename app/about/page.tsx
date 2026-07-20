// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   ShoppingBag, MapPin, Star, Users, Package, Truck,
//   Shield, Leaf, ArrowRight, CheckCircle, Store,
//   Smartphone, Dumbbell, Shirt, Home, Sparkles, Watch,
//   ChevronRight, Heart, Award, Clock, Headphones,
// } from "lucide-react";

// const stats = [
//   { value: "500+",  label: "Products",         icon: Package },
//   { value: "50K+",  label: "Happy Customers",  icon: Users   },
//   { value: "3+",    label: "Trusted Sellers",  icon: Store   },
//   { value: "98%",   label: "Satisfaction",     icon: Star    },
// ];

// const categories = [
//   { name: "Electronics",   icon: Smartphone, count: 4,  color: "bg-indigo-50 text-indigo-600 border-indigo-100",  emoji: "📱" },
//   { name: "Sports",        icon: Dumbbell,   count: 3,  color: "bg-emerald-50 text-emerald-600 border-emerald-100", emoji: "⚽" },
//   { name: "Beauty",        icon: Sparkles,   count: 4,  color: "bg-pink-50 text-pink-600 border-pink-100",        emoji: "✨" },
//   { name: "Fashion",       icon: Shirt,      count: 3,  color: "bg-amber-50 text-amber-600 border-amber-100",     emoji: "👕" },
//   { name: "Home & Living", icon: Home,       count: 3,  color: "bg-teal-50 text-teal-600 border-teal-100",        emoji: "🏠" },
//   { name: "Smartwatch",    icon: Watch,      count: 2,  color: "bg-purple-50 text-purple-600 border-purple-100",  emoji: "⌚" },
// ];

// const sellers = [
//   {
//     name:     "STAR TECH",
//     location: "Dhaka, Bangladesh",
//     badge:    "Top Seller",
//     badgeColor: "bg-amber-100 text-amber-700",
//     products: ["Smartwatch", "Facewash", "Electronics"],
//     rating:   4.9,
//     since:    "2021",
//     initials: "ST",
//     color:    "bg-indigo-600",
//     desc:     "One of Bangladesh's most trusted tech & lifestyle retailers, offering premium electronics and beauty products at competitive prices.",
//   },
//   {
//     name:     "TECHLAND-BD Store",
//     location: "Dhaka, Bangladesh",
//     badge:    "Verified",
//     badgeColor: "bg-emerald-100 text-emerald-700",
//     products: ["Sports", "Beauty", "Home & Living", "Fashion"],
//     rating:   4.8,
//     since:    "2020",
//     initials: "TL",
//     color:    "bg-emerald-600",
//     desc:     "Your go-to destination for sports gear, beauty essentials, home decor, and fashion — all under one roof with guaranteed quality.",
//   },
//   {
//     name:     "PCB-BD Store",
//     location: "Dhaka, Bangladesh",
//     badge:    "Certified",
//     badgeColor: "bg-blue-100 text-blue-700",
//     products: ["Electronics", "Fashion", "Home & Living"],
//     rating:   4.7,
//     since:    "2022",
//     initials: "PCB",
//     color:    "bg-blue-600",
//     desc:     "Specialist in cutting-edge electronics and modern lifestyle products, bringing the latest gadgets and trends to Bangladesh.",
//   },
// ];

// const featured = [
//   { name: "Smart Watch Pro",           price: "৳4,200", category: "Electronics", seller: "PCB-BD Store",      emoji: "⌚", tag: "Best Seller" },
//   { name: "Wireless Headphones",       price: "৳3,500", category: "Electronics", seller: "PCB-BD Store",      emoji: "🎧", tag: "New Arrival" },
//   { name: "Dumbbell Set 10KG",         price: "৳2,900", category: "Sports",      seller: "TECHLAND-BD Store", emoji: "🏋️", tag: "Popular"     },
//   { name: "Premium Perfume Bottle",    price: "৳3,500", category: "Beauty",      seller: "TECHLAND-BD Store", emoji: "🌸", tag: "Top Rated"   },
//   { name: "Men Casual Sneakers",       price: "৳3,200", category: "Fashion",     seller: "PCB-BD Store",      emoji: "👟", tag: "Trending"    },
//   { name: "Football Training Ball",    price: "৳1,600", category: "Sports",      seller: "TECHLAND-BD Store", emoji: "⚽", tag: "Popular"     },
// ];

// const values = [
//   { icon: Shield,  title: "Quality Assured",   desc: "Every product is verified by our team before listing. No fakes, no compromises.",         color: "bg-indigo-50 text-indigo-600" },
//   { icon: Truck,   title: "Fast Delivery",     desc: "We deliver across Dhaka and beyond. Same-day and next-day delivery available.",           color: "bg-emerald-50 text-emerald-600" },
//   { icon: Heart,   title: "Customer First",    desc: "Our 24/7 support team is always ready to help. Your satisfaction is our top priority.",    color: "bg-rose-50 text-rose-600" },
//   { icon: Leaf,    title: "Ethical Sourcing",  desc: "We work only with sellers who meet our standards for fair pricing and honest listings.",    color: "bg-teal-50 text-teal-600" },
//   { icon: Award,   title: "Best Prices",       desc: "Competitive pricing across all categories. We price-match and run regular deals.",         color: "bg-amber-50 text-amber-600" },
//   { icon: Clock,   title: "Easy Returns",      desc: "Not satisfied? Return within 7 days. No long forms, no hassle — just a simple process.",   color: "bg-purple-50 text-purple-600" },
// ];

// const tagColors: Record<string, string> = {
//   "Best Seller":  "bg-amber-100 text-amber-700",
//   "New Arrival":  "bg-indigo-100 text-indigo-700",
//   "Popular":      "bg-emerald-100 text-emerald-700",
//   "Top Rated":    "bg-rose-100 text-rose-700",
//   "Trending":     "bg-purple-100 text-purple-700",
// };

// export default function AboutPage() {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filteredProducts =
//     activeCategory === "All"
//       ? featured
//       : featured.filter((p) => p.category === activeCategory);

//   return (
//     <div className="min-h-screen bg-white">

//       {/* ─── HERO ─── */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-6">
//         {/* Grid pattern */}
//         <div className="absolute inset-0 opacity-10"
//           style={{ backgroundImage: "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
//         {/* Glow blobs */}
//         <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

//         <div className="relative max-w-5xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-semibold px-4 py-2 rounded-full mb-8">
//             <MapPin size={14} className="text-indigo-300" />
//             Proudly serving Dhaka, Bangladesh
//           </div>

//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
//             About <span className="text-indigo-400">NexCart</span>
//           </h1>
//           <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
//             Bangladesh fastest-growing online marketplace — connecting trusted local sellers
//             with thousands of happy shoppers across Electronics, Fashion, Sports, Beauty, and more.
//           </p>

//           <div className="flex flex-wrap justify-center gap-3 mt-10">
//             <Link
//               href="/products"
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-indigo-900/50"
//             >
//               Browse Products <ArrowRight size={16} />
//             </Link>
//             <Link
//               href="/register/customer"
//               className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition"
//             >
//               Join Free
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ─── STATS ─── */}
//       <section className="bg-indigo-600 py-10">
//         <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((s) => (
//             <div key={s.label} className="text-center text-white">
//               <s.icon size={22} className="mx-auto mb-2 text-indigo-200" />
//               <p className="text-3xl font-extrabold">{s.value}</p>
//               <p className="text-indigo-200 text-sm font-medium mt-0.5">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ─── OUR STORY ─── */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
//           <div>
//             <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">Our Story</p>
//             <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
//               Built for Bangladesh, <br />by Bangladeshis
//             </h2>
//             <p className="text-slate-500 mt-5 leading-relaxed">
//               NexCart started with a simple idea — make online shopping in Bangladesh easier, safer, and more affordable. We saw that customers struggled to find trusted sellers, and small businesses struggled to reach buyers online.
//             </p>
//             <p className="text-slate-500 mt-4 leading-relaxed">
//               So we built a platform that bridges that gap. Today we host verified sellers across Dhaka offering everything from smartphones and smartwatches to football kits, perfumes, and home decor — all at honest prices.
//             </p>
//             <div className="flex flex-col gap-3 mt-8">
//               {[
//                 "Verified sellers only — no unverified listings",
//                 "All products in BDT (Bangladeshi Taka)",
//                 "Cash on delivery + bKash + Nagad + Card",
//                 "Covering all of Dhaka with fast delivery",
//               ].map((t) => (
//                 <div key={t} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
//                   <CheckCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" /> {t}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Visual grid */}
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { e: "🛍️", t: "Multi-category",  d: "6+ product categories" },
//               { e: "🏪", t: "Local Sellers",   d: "All based in Dhaka"    },
//               { e: "💳", t: "Easy Payment",    d: "4 payment methods"      },
//               { e: "🚚", t: "Fast Shipping",   d: "Same-day available"     },
//             ].map((c) => (
//               <div key={c.t} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
//                 <div className="text-3xl mb-3">{c.e}</div>
//                 <p className="font-bold text-slate-800 text-sm">{c.t}</p>
//                 <p className="text-slate-400 text-xs mt-1">{c.d}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CATEGORIES ─── */}
//       <section className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">What We Sell</p>
//             <h2 className="text-3xl font-extrabold text-slate-900">Shop by Category</h2>
//             <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
//               From gadgets to gym gear — we carry everything you need for modern life in Bangladesh.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {categories.map((cat) => (
//               <div
//                 key={cat.name}
//                 className={`border ${cat.color} rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer`}
//               >
//                 <span className="text-3xl">{cat.emoji}</span>
//                 <div>
//                   <p className="font-bold text-sm">{cat.name}</p>
//                   <p className="text-xs opacity-60 mt-0.5">{cat.count} products</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FEATURED PRODUCTS ─── */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-10">
//             <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">What's Available</p>
//             <h2 className="text-3xl font-extrabold text-slate-900">Featured Products</h2>
//             <p className="text-slate-400 mt-3 text-sm">A glimpse of what our sellers offer — real products, real prices.</p>
//           </div>

//           {/* Filter pills */}
//           <div className="flex flex-wrap gap-2 justify-center mb-8">
//             {["All", "Electronics", "Sports", "Beauty", "Fashion"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setActiveCategory(f)}
//                 className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
//                   ${activeCategory === f
//                     ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
//                     : "bg-slate-100 text-slate-500 hover:bg-slate-200"
//                   }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {filteredProducts.map((p) => (
//               <div
//                 key={p.name}
//                 className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden"
//               >
//                 {/* Product image placeholder */}
//                 <div className="bg-gradient-to-br from-slate-50 to-slate-100 h-36 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
//                   {p.emoji}
//                 </div>
//                 <div className="p-4">
//                   <div className="flex items-start justify-between gap-2 mb-2">
//                     <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColors[p.tag]}`}>{p.tag}</span>
//                     <span className="text-xs text-slate-400 font-medium">{p.category}</span>
//                   </div>
//                   <h3 className="font-bold text-slate-800 text-sm mt-1 leading-tight">{p.name}</h3>
//                   <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                     <Store size={11} /> {p.seller}
//                   </p>
//                   <div className="flex items-center justify-between mt-3">
//                     <span className="font-extrabold text-indigo-600 text-base">{p.price}</span>
//                     <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">In Stock</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-10">
//             <Link
//               href="/products"
//               className="inline-flex items-center gap-2 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition text-sm"
//             >
//               See All Products <ChevronRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ─── OUR SELLERS ─── */}
//       <section className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">Who Sells Here</p>
//             <h2 className="text-3xl font-extrabold text-slate-900">Our Trusted Sellers</h2>
//             <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
//               Every seller on NexCart is manually verified. We check their products, pricing, and service quality before they go live.
//             </p>
//           </div>

//           <div className="flex flex-col gap-5">
//             {sellers.map((seller) => (
//               <div
//                 key={seller.name}
//                 className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-start gap-5"
//               >
//                 {/* Avatar */}
//                 <div className={`${seller.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0`}>
//                   {seller.initials}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h3 className="font-extrabold text-slate-800 text-base">{seller.name}</h3>
//                     <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${seller.badgeColor}`}>
//                       {seller.badge}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
//                     <MapPin size={11} /> {seller.location}
//                     <span className="mx-1">·</span>
//                     <Star size={11} className="text-amber-400" />
//                     <span className="font-semibold text-slate-600">{seller.rating}</span>
//                     <span className="mx-1">·</span>
//                     Since {seller.since}
//                   </div>
//                   <p className="text-slate-500 text-sm leading-relaxed">{seller.desc}</p>

//                   {/* Category tags */}
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {seller.products.map((p) => (
//                       <span key={p} className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">
//                         {p}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Rating block */}
//                 <div className="text-center shrink-0 hidden sm:block">
//                   <p className="text-3xl font-extrabold text-slate-800">{seller.rating}</p>
//                   <div className="flex gap-0.5 mt-1 justify-center">
//                     {[1,2,3,4,5].map((i) => (
//                       <Star key={i} size={12} className={i <= Math.floor(seller.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
//                     ))}
//                   </div>
//                   <p className="text-xs text-slate-400 mt-1">Rating</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <Link
//               href="/sellers"
//               className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition text-sm"
//             >
//               View All Sellers <ChevronRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ─── VALUES ─── */}
//       <section className="py-20 px-6 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">Why Choose Us</p>
//             <h2 className="text-3xl font-extrabold text-slate-900">Our Promises to You</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {values.map((v) => (
//               <div key={v.title} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
//                 <div className={`${v.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
//                   <v.icon size={22} />
//                 </div>
//                 <h3 className="font-bold text-slate-800 text-base">{v.title}</h3>
//                 <p className="text-slate-400 text-sm mt-2 leading-relaxed">{v.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── LOCATION BANNER ─── */}
//       <section className="py-16 px-6 bg-slate-900 text-white">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
//           <div>
//             <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3">
//               <MapPin size={16} /> Based in Dhaka, Bangladesh
//             </div>
//             <h2 className="text-2xl font-extrabold">Serving customers across Dhaka</h2>
//             <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-md">
//               All our sellers are located in Dhaka. We offer fast local delivery with multiple payment options including bKash, Nagad, and Cash on Delivery.
//             </p>
//             <div className="flex flex-wrap gap-3 mt-5">
//               {["Cash on Delivery 💵", "bKash 📱", "Nagad 🔴", "Card 💳"].map((m) => (
//                 <span key={m} className="bg-white/10 border border-white/10 text-sm font-semibold px-3 py-1.5 rounded-xl">
//                   {m}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-w-[200px]">
//             <p className="text-4xl font-extrabold text-indigo-400">2 hrs</p>
//             <p className="text-slate-400 text-sm mt-1">Avg. delivery time</p>
//             <div className="border-t border-white/10 my-4" />
//             <p className="text-2xl font-extrabold text-emerald-400">Free</p>
//             <p className="text-slate-400 text-sm mt-1">On orders over ৳1,000</p>
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─── */}
//       <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center">
//         <div className="max-w-2xl mx-auto">
//           <ShoppingBag size={40} className="mx-auto mb-5 text-indigo-200" />
//           <h2 className="text-3xl font-extrabold">Ready to start shopping?</h2>
//           <p className="text-indigo-200 mt-3 leading-relaxed">
//             Join thousands of Bangladeshi shoppers getting great deals on electronics, fashion, sports gear, and more — all delivered to your door.
//           </p>
//           <div className="flex flex-wrap justify-center gap-3 mt-8">
//             <Link
//               href="/register/customer"
//               className="flex items-center gap-2 bg-white text-indigo-700 font-extrabold px-7 py-3.5 rounded-xl hover:bg-indigo-50 transition shadow-lg"
//             >
//               Create Free Account <ArrowRight size={16} />
//             </Link>
//             <Link
//               href="/products"
//               className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition"
//             >
//               Browse Products
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  Star,
  Users,
  Package,
  Truck,
  Shield,
  Leaf,
  ArrowRight,
  CheckCircle,
  Store,
  Smartphone,
  Dumbbell,
  Shirt,
  Home,
  Sparkles,
  Watch,
  ChevronRight,
  Heart,
  Award,
  Clock,
  Code2,
} from "lucide-react";
const stats = [
  { value: "500+", label: "Products", icon: Package },
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "3+", label: "Trusted Sellers", icon: Store },
  { value: "98%", label: "Satisfaction", icon: Star },
];

const contributors = [
  {
    name: "Dipta Prattoy Karmakar",
    username: "diptaPrattoy",
    role: "Contributor",
    initials: "DP",
  },
  {
    name: "Hridoy Saha",
    username: "hridoy-saha1",
    role: "Contributor",
    initials: "HS",
  },
  {
    name: "Nur Hasin Ahammad",
    username: "nur-hasin",
    role: "Contributor",
    initials: "NH",
  },
  {
    name: "Asadul Haque",
    username: "asadul59",
    role: "Contributor",
    initials: "AH",
  },
];

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 4,
    color: "bg-green-50 text-green-700 border-green-100",
    emoji: "📱",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    count: 3,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    emoji: "⚽",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    count: 4,
    color: "bg-lime-50 text-lime-700 border-lime-100",
    emoji: "✨",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 3,
    color: "bg-teal-50 text-teal-700 border-teal-100",
    emoji: "👕",
  },
  {
    name: "Home & Living",
    icon: Home,
    count: 3,
    color: "bg-green-50 text-green-700 border-green-100",
    emoji: "🏠",
  },
  {
    name: "Smartwatch",
    icon: Watch,
    count: 2,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    emoji: "⌚",
  },
];

const sellers = [
  {
    name: "STAR TECH",
    location: "Dhaka, Bangladesh",
    badge: "Top Seller",
    badgeColor: "bg-amber-100 text-amber-700",
    products: ["Smartwatch", "Facewash", "Electronics"],
    rating: 4.9,
    since: "2021",
    initials: "ST",
    color: "bg-green-600",
    desc: "One of Bangladesh's most trusted tech & lifestyle retailers, offering premium electronics and beauty products at competitive prices.",
  },
  {
    name: "TECHLAND-BD Store",
    location: "Dhaka, Bangladesh",
    badge: "Verified",
    badgeColor: "bg-emerald-100 text-emerald-700",
    products: ["Sports", "Beauty", "Home & Living", "Fashion"],
    rating: 4.8,
    since: "2020",
    initials: "TL",
    color: "bg-emerald-600",
    desc: "Your go-to destination for sports gear, beauty essentials, home decor, and fashion — all under one roof with guaranteed quality.",
  },
  {
    name: "PCB-BD Store",
    location: "Dhaka, Bangladesh",
    badge: "Certified",
    badgeColor: "bg-green-100 text-green-700",
    products: ["Electronics", "Fashion", "Home & Living"],
    rating: 4.7,
    since: "2022",
    initials: "PCB",
    color: "bg-teal-600",
    desc: "Specialist in cutting-edge electronics and modern lifestyle products, bringing the latest gadgets and trends to Bangladesh.",
  },
];

const featured = [
  {
    name: "Smart Watch Pro",
    price: "৳4,200",
    category: "Electronics",
    seller: "PCB-BD Store",
    emoji: "⌚",
    tag: "Best Seller",
  },
  {
    name: "Wireless Headphones",
    price: "৳3,500",
    category: "Electronics",
    seller: "PCB-BD Store",
    emoji: "🎧",
    tag: "New Arrival",
  },
  {
    name: "Dumbbell Set 10KG",
    price: "৳2,900",
    category: "Sports",
    seller: "TECHLAND-BD Store",
    emoji: "🏋️",
    tag: "Popular",
  },
  {
    name: "Premium Perfume Bottle",
    price: "৳3,500",
    category: "Beauty",
    seller: "TECHLAND-BD Store",
    emoji: "🌸",
    tag: "Top Rated",
  },
  {
    name: "Men Casual Sneakers",
    price: "৳3,200",
    category: "Fashion",
    seller: "PCB-BD Store",
    emoji: "👟",
    tag: "Trending",
  },
  {
    name: "Football Training Ball",
    price: "৳1,600",
    category: "Sports",
    seller: "TECHLAND-BD Store",
    emoji: "⚽",
    tag: "Popular",
  },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "Every product is verified before listing. No fakes, no compromises.",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "We deliver across Dhaka and beyond with fast local delivery options.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "Our support team is always ready to help customers and sellers.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Leaf,
    title: "Ethical Sourcing",
    desc: "We work with sellers who maintain fair pricing and honest listings.",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: Award,
    title: "Best Prices",
    desc: "Competitive pricing across all categories with reliable product quality.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: Clock,
    title: "Easy Returns",
    desc: "A simple and customer-friendly return process for better shopping confidence.",
    color: "bg-lime-50 text-lime-700",
  },
];

const tagColors: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-700",
  "New Arrival": "bg-green-100 text-green-700",
  Popular: "bg-emerald-100 text-emerald-700",
  "Top Rated": "bg-rose-100 text-rose-700",
  Trending: "bg-teal-100 text-teal-700",
};

export default function AboutPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? featured
      : featured.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 px-6 py-24 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#22c55e 1px,transparent 1px),linear-gradient(90deg,#22c55e 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
            <MapPin size={14} className="text-green-300" />
            Proudly serving Dhaka, Bangladesh
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            About <span className="text-green-400">NexCart</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-green-50/75 md:text-xl">
            Bangladesh&apos;s growing online marketplace — connecting trusted
            local sellers with shoppers across Electronics, Fashion, Sports,
            Beauty, Home & Living, and more.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-bold text-white shadow-lg shadow-green-950/40 transition hover:bg-green-400"
            >
              Browse Products <ArrowRight size={16} />
            </Link>

            <Link
              href="/register/customer"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/20"
            >
              Join Free
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-600 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center text-white">
              <stat.icon size={22} className="mx-auto mb-2 text-green-100" />
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="mt-0.5 text-sm font-medium text-green-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-green-600">
              Our Story
            </p>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900">
              Built for Bangladesh, <br />
              by passionate developers
            </h2>

            <p className="mt-5 leading-relaxed text-slate-500">
              NexCart started with a simple idea — make online shopping in
              Bangladesh easier, safer, and more accessible. Customers need
              trusted sellers, and sellers need a clean digital platform to
              reach buyers.
            </p>

            <p className="mt-4 leading-relaxed text-slate-500">
              We built NexCart as a complete ecommerce marketplace with
              customer, seller, rider, and admin workflows. From product
              discovery to order tracking, our goal is to make the shopping
              journey smooth and reliable.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {[
                "Verified sellers and organized product listings",
                "Products priced in BDT",
                "Support for Cash on Delivery and digital payments",
                "Designed for local shopping and delivery workflows",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-start gap-2.5 text-sm font-medium text-slate-600"
                >
                  <CheckCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-green-500"
                  />
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                emoji: "🛍️",
                title: "Marketplace",
                desc: "Multi-role platform",
              },
              { emoji: "🏪", title: "Local Sellers", desc: "Seller dashboard" },
              { emoji: "💳", title: "Easy Payment", desc: "Flexible options" },
              { emoji: "🚚", title: "Delivery Flow", desc: "Rider support" },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-green-100 bg-green-50/60 p-5"
              >
                <div className="mb-3 text-3xl">{card.emoji}</div>
                <p className="text-sm font-bold text-slate-800">{card.title}</p>
                <p className="mt-1 text-xs text-slate-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRIBUTORS */}
      <section className="bg-green-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-600">
              Project Team
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Meet the Contributors
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
              NexCart was built collaboratively by our development team, with
              contributions across frontend, backend, dashboard features, and
              ecommerce workflow implementation.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contributors.map((contributor) => (
              <div
                key={contributor.username}
                className="group rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-100"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-lg font-extrabold text-white shadow-md shadow-green-200">
                  {contributor.initials}
                </div>

                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  {contributor.name}
                </h3>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-green-700">
                  <Code2 size={14} />
                  {contributor.username}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  <Code2 size={13} />
                  {contributor.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-600">
              What We Sell
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Shop by Category
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
              From gadgets to gym gear — NexCart carries products for modern
              everyday life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition-transform hover:scale-[1.02] ${category.color}`}
              >
                <span className="text-3xl">{category.emoji}</span>

                <div>
                  <p className="text-sm font-bold">{category.name}</p>
                  <p className="mt-0.5 text-xs opacity-60">
                    {category.count} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-600">
              What&apos;s Available
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Featured Products
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              A glimpse of what our sellers offer — real products, real prices.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["All", "Electronics", "Sports", "Beauty", "Fashion"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveCategory(filter)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                    activeCategory === filter
                      ? "bg-green-600 text-white shadow-md shadow-green-200"
                      : "bg-white text-slate-500 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 text-6xl transition-transform group-hover:scale-105">
                  {product.emoji}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        tagColors[product.tag]
                      }`}
                    >
                      {product.tag}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="mt-1 text-sm font-bold leading-tight text-slate-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                    <Store size={11} /> {product.seller}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-extrabold text-green-600">
                      {product.price}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-green-200 px-6 py-3 text-sm font-bold text-green-700 transition hover:bg-green-50"
            >
              See All Products <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR SELLERS */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-600">
              Who Sells Here
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Our Trusted Sellers
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
              Every seller on NexCart is checked before they go live.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {sellers.map((seller) => (
              <div
                key={seller.name}
                className="flex flex-col items-start gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row"
              >
                <div
                  className={`${seller.color} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white`}
                >
                  {seller.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-800">
                      {seller.name}
                    </h3>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${seller.badgeColor}`}
                    >
                      {seller.badge}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={11} /> {seller.location}
                    <span className="mx-1">·</span>
                    <Star size={11} className="text-amber-400" />
                    <span className="font-semibold text-slate-600">
                      {seller.rating}
                    </span>
                    <span className="mx-1">·</span>
                    Since {seller.since}
                  </div>

                  <p className="text-sm leading-relaxed text-slate-500">
                    {seller.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {seller.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-lg bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden shrink-0 text-center sm:block">
                  <p className="text-3xl font-extrabold text-slate-800">
                    {seller.rating}
                  </p>

                  <div className="mt-1 flex justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <Star
                        key={index}
                        size={12}
                        className={
                          index <= Math.floor(seller.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-xs text-slate-400">Rating</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/sellers"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              View All Sellers <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-green-600">
              Why Choose Us
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Our Promises to You
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`${value.color} mb-4 flex h-12 w-12 items-center justify-center rounded-xl`}
                >
                  <value.icon size={22} />
                </div>

                <h3 className="text-base font-bold text-slate-800">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION BANNER */}
      <section className="bg-green-950 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-green-300">
              <MapPin size={16} /> Based in Dhaka, Bangladesh
            </div>

            <h2 className="text-2xl font-extrabold">
              Serving customers across Dhaka
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-green-50/60">
              NexCart is designed for local ecommerce workflows with seller,
              customer, rider, and admin support.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Cash on Delivery 💵", "bKash 📱", "Nagad 🔴", "Card 💳"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-semibold"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="min-w-[200px] rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-4xl font-extrabold text-green-300">2 hrs</p>
            <p className="mt-1 text-sm text-green-50/60">Avg. delivery time</p>

            <div className="my-4 border-t border-white/10" />

            <p className="text-2xl font-extrabold text-emerald-300">Free</p>
            <p className="mt-1 text-sm text-green-50/60">
              On orders over ৳1,000
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <ShoppingBag size={40} className="mx-auto mb-5 text-green-100" />

          <h2 className="text-3xl font-extrabold">Ready to start shopping?</h2>

          <p className="mt-3 leading-relaxed text-green-100">
            Join shoppers discovering electronics, fashion, sports gear, beauty
            products, and more — all from trusted sellers.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register/customer"
              className="flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-extrabold text-green-700 shadow-lg transition hover:bg-green-50"
            >
              Create Free Account <ArrowRight size={16} />
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/20"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
