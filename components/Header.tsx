// "use client";
// import Link from "next/link";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingBag, LayoutDashboard } from "lucide-react";

// export default function Header() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [mounted, setMounted] = useState(false);
//   const [token, setToken] = useState<string | undefined>();
//   const [role, setRole] = useState<string | undefined>();
//   const [cartCount, setCartCount] = useState(0);

//   const loadCart = async () => {
//     const currentToken = Cookies.get("token");
//     const currentRole = Cookies.get("role");

//     if (!currentToken || currentRole !== "customer") {
//       setCartCount(0);
//       return;
//     }

//     try {
//       const payload = JSON.parse(
//         atob(currentToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
//       );
//       const customerId = payload.sub;

//       const res = await axios.get(
//         `https://nexcart-backend-o86x.onrender.com/customer/cart/${customerId}`,
//         { headers: { Authorization: `Bearer ${currentToken}` } }
//       );

//       setCartCount(res.data.length);
//     } catch (err) {
//       console.log("loadCart error:", err);
//       setCartCount(0);
//     }
//   };

//   useEffect(() => {
//     setMounted(true);
//     setToken(Cookies.get("token"));
//     setRole(Cookies.get("role"));
//   }, [pathname]);

//   useEffect(() => {
//     loadCart();

//     window.addEventListener("cartUpdated", loadCart);
//     return () => {
//       window.removeEventListener("cartUpdated", loadCart);
//     };
//   }, [role, pathname]);

//   if (!mounted) return null;

//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "Products", href: "/products" },
//     { label: "Sellers", href: "/sellers" },
//     { label: "About", href: "/about" },
//   ];

//   const handleLogout = () => {
//     Cookies.remove("token");
//     Cookies.remove("role");
//     Cookies.remove("seller");
//     Cookies.remove("customer");

//     setToken(undefined);
//     router.push("/login");
//     router.refresh();
//   };

//   const goToDashboard = () => {
//     const path = role ? `/dashboard/${role}` : "/dashboard";
//     router.push(path);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between py-3">
//           <Link href="/" className="flex items-center gap-2.5 no-underline">
//             <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center">
//               <ShoppingBag size={22} />
//             </div>
//             <span className="text-2xl font-black text-slate-800 tracking-tight">
//               NexCart
//             </span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="text-slate-500 text-[15px] font-semibold no-underline hover:text-indigo-600 transition-colors"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           <div className="flex items-center gap-3">
//             {!token ? (
//               <>
//                 <Link
//                   href="/login"
//                   className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:border-green-600 hover:text-green-600 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {role === "customer" && cartCount > 0 && (
//                   <Link
//                     href="dashboard/customer/?tab=cart"
//                     className="relative px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
//                   >
//                     🛒 Cart
//                     <span className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   </Link>
//                 )}

//                 <button
//                   onClick={goToDashboard}
//                   className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm"
//                 >
//                   <LayoutDashboard size={15} />
//                   Dashboard
//                   {role && (
//                     <span className="ml-auto text-xs bg-indigo-100 text-green-600 font-bold px-2 py-0.5 rounded-md capitalize">
//                       {role}
//                     </span>
//                   )}
//                 </button>

//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loadCart = async () => {
    const currentToken = Cookies.get("token");
    const currentRole = Cookies.get("role");

    if (!currentToken || currentRole !== "customer") {
      setCartCount(0);
      return;
    }

    try {
      const payload = JSON.parse(
        atob(currentToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      const customerId = payload.sub;

      const res = await axios.get(
        `http://localhost:3000/customer/cart/${customerId}`,
        { headers: { Authorization: `Bearer ${currentToken}` } },
      );

      setCartCount(res.data.length);
    } catch (err) {
      console.log("loadCart error:", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    setToken(Cookies.get("token"));
    setRole(Cookies.get("role"));
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [role, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Sellers", href: "/sellers" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("seller");
    Cookies.remove("customer");

    setToken(undefined);
    router.push("/login");
    router.refresh();
  };

  const goToDashboard = () => {
    const path = role ? `/dashboard/${role}` : "/dashboard";
    router.push(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_0_rgba(15,23,42,0.06),0_10px_28px_-18px_rgba(22,101,52,0.35)]"
          : "border-b border-slate-200/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 no-underline shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 text-white flex items-center justify-center shadow-sm shadow-green-600/30 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:shadow-lg group-hover:shadow-green-600/40">
              <ShoppingBag size={19} strokeWidth={2.4} />
            </div>
            <span className="text-[22px] font-black text-slate-800 tracking-tight">
              Nex<span className="text-green-600">Cart</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[14.5px] font-semibold no-underline transition-colors duration-150 ${
                    active
                      ? "text-green-700"
                      : "text-slate-500 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] rounded-full bg-green-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {!token ? (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-slate-600 font-semibold text-sm no-underline hover:text-green-700 hover:bg-green-50 transition-colors duration-150"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm no-underline shadow-sm shadow-green-600/25 hover:bg-green-700 hover:shadow-md hover:shadow-green-600/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                {role === "customer" && (
                  <Link
                    href="dashboard/customer/?tab=cart"
                    aria-label={`Cart, ${cartCount} items`}
                    className="relative w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-green-50 hover:text-green-700 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ShoppingCart size={18} strokeWidth={2.2} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[19px] h-[19px] px-1 rounded-full bg-green-600 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}

                <button
                  onClick={goToDashboard}
                  className="group flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm border border-transparent hover:bg-green-50 hover:border-green-200 hover:text-green-800 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-green-600/15 active:translate-y-0 transition-all duration-200"
                >
                  <span className="w-6 h-6 rounded-md bg-green-600 text-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                    <LayoutDashboard size={13} strokeWidth={2.4} />
                  </span>
                  Dashboard
                  {role && (
                    <span className="text-[11px] bg-white text-green-700 font-bold px-2 py-0.5 rounded-full capitalize border border-green-200 transition-colors duration-200 group-hover:bg-green-100">
                      {role}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-600/30 active:translate-y-0 active:scale-[0.98] transition-all duration-200"
                >
                  <LogOut size={15} strokeWidth={2.2} />
                  Logout
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-slate-200/80 ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-2.5 rounded-lg text-[15px] font-semibold no-underline transition-colors duration-150 ${
                isActive(item.href)
                  ? "text-green-700 bg-green-50"
                  : "text-slate-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="h-px bg-slate-200 my-2" />

          {!token ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm no-underline text-center hover:border-green-600 hover:text-green-700 transition-colors duration-150"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2.5 rounded-lg bg-green-600 text-white font-semibold text-sm no-underline text-center hover:bg-green-700 transition-colors duration-150"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {role === "customer" && (
                <Link
                  href="dashboard/customer/?tab=cart"
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-green-50 text-green-700 font-semibold text-sm no-underline hover:bg-green-100 transition-colors duration-150"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} /> Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              <button
                onClick={goToDashboard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
              >
                <LayoutDashboard size={15} />
                Dashboard
                {role && (
                  <span className="ml-auto text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-md capitalize">
                    {role}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors duration-150"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
