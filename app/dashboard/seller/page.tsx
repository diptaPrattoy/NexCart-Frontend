"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CategoryIcon from "@mui/icons-material/Category";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaidIcon from "@mui/icons-material/Paid";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const API_BASE_URL = "http://localhost:3000";

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
];

type Seller = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string | null;
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

type ProductForm = {
  productName: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
};

const emptyForm: ProductForm = {
  productName: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
};

export default function SellerDashboardPage() {
  const [seller, setSeller] = useState<Seller | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const statistics = useMemo(() => {
    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, product) => sum + Number(product.quantity || 0),
      0
    );

    const outOfStock = products.filter(
      (product) => Number(product.quantity) <= 0
    ).length;

    const totalInventoryValue = products.reduce((sum, product) => {
      return sum + Number(product.price || 0) * Number(product.quantity || 0);
    }, 0);

    const activeCategories = new Set(
      products.map((product) => product.category).filter(Boolean)
    ).size;

    return {
      totalProducts,
      totalStock,
      outOfStock,
      totalInventoryValue,
      activeCategories,
    };
  }, [products]);

  useEffect(() => {
    const savedToken = localStorage.getItem("seller_token");
    const savedSeller = localStorage.getItem("seller");

    if (!savedToken || !savedSeller) {
      toast.error("Please login first");
      window.location.href = "/login/seller";
      return;
    }

    try {
      const parsedSeller = JSON.parse(savedSeller) as Seller;

      if (!parsedSeller?.id) {
        localStorage.removeItem("seller_token");
        localStorage.removeItem("seller");
        toast.error("Invalid seller session. Please login again.");
        window.location.href = "/login/seller";
        return;
      }

      setSeller(parsedSeller);
      loadSellerProducts(parsedSeller.id);
    } catch {
      localStorage.removeItem("seller_token");
      localStorage.removeItem("seller");
      toast.error("Session error. Please login again.");
      window.location.href = "/login/seller";
    }
  }, []);

  const getSellerInitials = (name?: string) => {
    if (!name) return "S";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem("seller_token");
      localStorage.removeItem("seller");

      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        window.location.href = "/login/seller";
      }, 1000);

      return true;
    }

    return false;
  };

  const loadSellerProducts = async (sellerId: number) => {
    try {
      setProductsLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/seller/${sellerId}/products`
      );

      const productList = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      setProducts(productList);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setProductImage(null);
    setEditingProductId(null);
  };

  const handleSubmitProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const savedToken = localStorage.getItem("seller_token");

    if (!savedToken) {
      toast.error("Please login first");
      window.location.href = "/login/seller";
      return;
    }

    if (!seller) {
      toast.error("Seller information not found");
      return;
    }

    if (!form.productName || !form.category || !form.price || !form.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!PRODUCT_CATEGORIES.includes(form.category)) {
      toast.error("Please select a valid category");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("productName", form.productName);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);

      if (productImage) {
        formData.append("productImage", productImage);
      }

      if (editingProductId) {
        await axios.patch(
          `${API_BASE_URL}/seller/products/${editingProductId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        toast.success("Product updated successfully");
      } else {
        await axios.post(
          `${API_BASE_URL}/seller/${seller.id}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        toast.success("Product created successfully");
      }

      resetForm();
      loadSellerProducts(seller.id);
    } catch (error: unknown) {
      if (handleAuthError(error)) return;

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          toast.error(message.join(", "));
        } else {
          toast.error(message || "Product operation failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);

    setForm({
      productName: product.productName,
      category: product.category,
      description: product.description || "",
      price: String(product.price),
      quantity: String(product.quantity),
    });

    setProductImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (productId: number) => {
    const savedToken = localStorage.getItem("seller_token");

    if (!savedToken) {
      toast.error("Please login first");
      window.location.href = "/login/seller";
      return;
    }

    if (!seller) return;

    const isConfirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/seller/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      toast.success("Product deleted successfully");
      loadSellerProducts(seller.id);
    } catch (error: unknown) {
      if (handleAuthError(error)) return;

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          toast.error(message.join(", "));
        } else {
          toast.error(message || "Failed to delete product");
        }
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("seller_token");
    localStorage.removeItem("seller");

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login/seller";
    }, 700);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={seller?.profileImage || undefined}
              sx={{
                width: 72,
                height: 72,
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 900,
                fontSize: 24,
                borderRadius: 2,
              }}
            >
              {getSellerInitials(seller?.name)}
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "text.primary",
                }}
              >
                Seller Dashboard
              </Typography>

              <Typography sx={{ mt: 0.5, color: "text.secondary" }}>
                Manage your products, images, stock, and pricing.
              </Typography>

              {seller && (
                <Typography
                  sx={{ mt: 1, color: "text.secondary", fontSize: 14 }}
                >
                  Logged in as <strong>{seller.name}</strong> · {seller.email}
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: "#fecaca",
              color: "#b91c1c",
              bgcolor: "white",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "#fef2f2",
              },
            }}
          >
            Logout
          </Button>
        </Paper>

        <Box
          sx={{
            mb: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 2,
          }}
        >
          <StatCard
            icon={<StorefrontIcon />}
            label="Total Products"
            value={statistics.totalProducts}
            helper="Products listed"
          />

          <StatCard
            icon={<Inventory2Icon />}
            label="Total Stock"
            value={statistics.totalStock}
            helper="Available units"
          />

          <StatCard
            icon={<WarningAmberIcon />}
            label="Out of Stock"
            value={statistics.outOfStock}
            helper="Need restock"
          />

          <StatCard
            icon={<PaidIcon />}
            label="Inventory Value"
            value={`৳${statistics.totalInventoryValue.toLocaleString()}`}
            helper="Price × quantity"
          />

          <StatCard
            icon={<CategoryIcon />}
            label="Categories"
            value={statistics.activeCategories}
            helper="Active categories"
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "390px 1fr",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              bgcolor: "white",
              position: {
                lg: "sticky",
              },
              top: {
                lg: 90,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AddBoxIcon sx={{ color: "primary.main" }} />

              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {editingProductId ? "Update Product" : "Create Product"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Box
              component="form"
              onSubmit={handleSubmitProduct}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Product Name"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                required
              >
                {PRODUCT_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />

              <TextField
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                fullWidth
                required
                type="number"
              />

              <TextField
                label="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                fullWidth
                required
                type="number"
              />

              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{
                  py: 1.4,
                  borderColor: "#d1d5db",
                  color: "text.primary",
                  bgcolor: "white",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "primary.main",
                    bgcolor: "white",
                  },
                }}
              >
                {productImage ? productImage.name : "Upload Product Image"}
                <input
                  hidden
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setProductImage(file || null);
                  }}
                />
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  py: 1.5,
                  fontWeight: 900,
                }}
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : editingProductId ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>

              {editingProductId && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={resetForm}
                  sx={{
                    borderColor: "#d1d5db",
                    color: "text.primary",
                    bgcolor: "white",
                    "&:hover": {
                      borderColor: "#6b7280",
                      bgcolor: "white",
                    },
                  }}
                >
                  Cancel Update
                </Button>
              )}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Inventory2Icon sx={{ color: "primary.main" }} />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  My Products
                </Typography>
              </Box>

              <Chip
                label={`${products.length} items`}
                sx={{
                  bgcolor: "#dcfce7",
                  color: "primary.dark",
                  fontWeight: 800,
                }}
              />
            </Box>

            {productsLoading && (
              <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}

            {!productsLoading && products.length === 0 && (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  bgcolor: "#f9fafb",
                  border: "1px dashed #d1d5db",
                  borderRadius: 2,
                }}
              >
                <Inventory2Icon
                  sx={{
                    fontSize: 56,
                    color: "text.secondary",
                    mb: 1,
                  }}
                />

                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  No products yet
                </Typography>

                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  Create your first product using the form.
                </Typography>
              </Box>
            )}

            {!productsLoading && products.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                  },
                  gap: 2.5,
                }}
              >
                {products.map((product) => (
                  <SellerProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 2,
          bgcolor: "#dcfce7",
          color: "primary.dark",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
        }}
      >
        {icon}
      </Box>

      <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
        {label}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mt: 0.5,
          fontWeight: 900,
          color: "text.primary",
        }}
      >
        {value}
      </Typography>

      <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: 12 }}>
        {helper}
      </Typography>
    </Paper>
  );
}

function SellerProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}) {
  const imageUrl = product.productImage
    ? `${API_BASE_URL}/uploads/products/${product.productImage}`
    : "";

  const isOutOfStock = product.quantity <= 0;

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        bgcolor: "white",
        transition: "0.2s ease",
        "&:hover": {
          borderColor: "#86efac",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          height: 155,
          bgcolor: "#f9fafb",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={product.productName}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2Icon sx={{ fontSize: 48, color: "primary.main" }} />
          </Box>
        )}

        <Chip
          label={isOutOfStock ? "Out of Stock" : "In Stock"}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            bgcolor: isOutOfStock ? "#fee2e2" : "#dcfce7",
            color: isOutOfStock ? "#b91c1c" : "#15803d",
            fontWeight: 800,
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 12,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.4px",
          }}
        >
          {product.category}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 0.5,
            fontWeight: 900,
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {product.productName}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
            fontSize: 14,
            lineHeight: 1.6,
            minHeight: 44,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description || "No description available."}
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              Price
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>
              ৳{Number(product.price).toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              Quantity
            </Typography>

            <Typography sx={{ fontWeight: 900 }}>{product.quantity}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => onEdit(product)}
            sx={{
              borderColor: "#d1d5db",
              color: "text.primary",
              bgcolor: "white",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "white",
              },
            }}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(product.id)}
            sx={{
              borderColor: "#fecaca",
              color: "#b91c1c",
              bgcolor: "white",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "#fef2f2",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}