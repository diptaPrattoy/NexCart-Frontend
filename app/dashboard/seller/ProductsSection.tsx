"use client";

import { Plus, Upload, Package } from "lucide-react";
import ProductCard from "./ProductCard";

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
];

const inputCls =
  "w-full bg-green-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition";

const labelCls =
  "block text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5";

type ProductForm = {
  productName: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
};

type Product = {
  id: number;
  productName: string;
  category: string;
  description?: string | null;
  price: number;
  quantity: number;
  productImage?: string | null;
};

type Props = {
  products: Product[];
  productsLoading: boolean;

  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  handleSubmitProduct: (e: React.FormEvent<HTMLFormElement>) => void;

  productImage: File | null;
  setProductImage: React.Dispatch<React.SetStateAction<File | null>>;

  submitting: boolean;

  editingProductId: number | null;
  resetForm: () => void;

  handleEdit: (product: Product) => void;
};

export default function ProductsSection({
  products,
  productsLoading,
  form,
  setForm,
  handleChange,
  handleSubmitProduct,
  productImage,
  setProductImage,
  submitting,
  editingProductId,
  resetForm,
  handleEdit,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 items-start xl:grid-cols-[340px_minmax(0,1fr)]">
      {" "}
      {/* Form card */}
      <div className="bg-white border border-black/[0.07] rounded-2xl p-6">
        <h2 className="flex items-center gap-2 text-[17px] font-bold text-gray-900 mb-5">
          <Plus size={17} className="text-green-600" />
          {editingProductId ? "Edit Product" : "New Product"}
        </h2>

        <form onSubmit={handleSubmitProduct} className="flex flex-col gap-3.5">
          <div>
            <label className={labelCls}>Product Name</label>

            <input
              className={inputCls}
              type="text"
              name="productName"
              placeholder="e.g. Wireless Headphones"
              value={form.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className={labelCls}>Category</label>

            <select
              className={inputCls}
              name="category"
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              required
            >
              <option value="">Select Category</option>

              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Description</label>

            <textarea
              className={`${inputCls} resize-y min-h-[90px]`}
              name="description"
              placeholder="Describe the product..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Price ৳</label>

              <input
                className={inputCls}
                type="number"
                min="0"
                name="price"
                placeholder="0.00"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className={labelCls}>Quantity</label>

              <input
                className={inputCls}
                type="number"
                name="quantity"
                min="0"
                placeholder="0"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl p-4 cursor-pointer text-center hover:border-green-500 hover:bg-green-50 transition group">
            <Upload
              size={20}
              className="text-gray-400 group-hover:text-green-600 transition"
            />

            <span className="text-[13px] font-medium text-gray-500 break-all">
              {productImage ? productImage.name : "Upload Product Image"}
            </span>

            <span className="text-[11px] text-gray-400">
              PNG, JPG, JPEG, WEBP accepted
            </span>

            <input
              hidden
              type="file"
              name="productImage"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={(e) => setProductImage(e.target.files?.[0] || null)}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition hover:shadow-lg hover:shadow-green-200"
          >
            {submitting
              ? "Saving..."
              : editingProductId
                ? "Update Product"
                : "Create Product"}
          </button>

          {editingProductId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full flex items-center justify-center text-sm font-semibold text-gray-500 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      {/* Product list */}
      <div className="bg-white border border-black/[0.07] rounded-2xl p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
              My Products
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Products can be edited, but delete is disabled to protect order
              history.
            </p>
          </div>

          <span className="w-fit text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
            {products.length} items
          </span>
        </div>

        {productsLoading ? (
          <div className="flex items-center justify-center gap-1.5 py-10">
            {[0, 200, 400].map((delay) => (
              <span
                key={delay}
                className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-300">
              <Package size={28} />
            </div>

            <p className="text-lg font-bold text-gray-800">No Products Yet</p>

            <p className="text-sm text-gray-400">
              Create your first product using the form.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
