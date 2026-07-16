"use client";
// "use client";

import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, LayoutDashboard } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [role, setRole] = useState<string | undefined>();
  const [cartCount, setCartCount] = useState(0);

  const loadCart = async () => {
    const currentToken = Cookies.get("token");
    const currentRole = Cookies.get("role");

    if (!currentToken || currentRole !== "customer") {
      setCartCount(0);
      return;
    }

    try {
      const payload = JSON.parse(
        atob(currentToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      const customerId = payload.sub;

      const res = await axios.get(
        `http://localhost:3000/customer/cart/${customerId}`,
        { headers: { Authorization: `Bearer ${currentToken}` } }
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
  }, [pathname]);

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [role, pathname]);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Sellers", href: "/sellers" },
    { label: "About", href: "/about" },
  ];

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <ShoppingBag size={22} />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              NexCart
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-500 text-[15px] font-semibold no-underline hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {role === "customer" && cartCount > 0 && (
                  <Link
                    href="dashboard/customer/?tab=cart"
                    className="relative px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
                  >
                    🛒 Cart
                    <span className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  </Link>
                )}

                <button
                  onClick={goToDashboard}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm"
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                  {role && (
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 font-bold px-2 py-0.5 rounded-md capitalize">
                      {role}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
