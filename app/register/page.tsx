import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-[700px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Select Register Role
        </h1>

        <div className="grid grid-cols-4 gap-4">
          <Link href="/register/customer">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Customer
            </button>
          </Link>

          <Link href="/register/seller">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Seller
            </button>
          </Link>

          <Link href="/register/rider">
            <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
              Rider
            </button>
          </Link>

          <Link href="/register/admin">
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}