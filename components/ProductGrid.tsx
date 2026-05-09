"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TuneIcon from "@mui/icons-material/Tune";

type Product = {
  id: number;
  productName: string;
  category: string;
  description?: string | null;
  price: number;
  quantity: number;
  productImage?: string | null;
};

type PriceFilter = "default" | "lowToHigh" | "highToLow";

const API_BASE_URL = "http://localhost:3000";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("default");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_BASE_URL}/seller/products`);

        const productList = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setProducts(productList);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["all", ...Array.from(new Set(uniqueCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (priceFilter === "lowToHigh") {
      updatedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (priceFilter === "highToLow") {
      updatedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return updatedProducts;
  }, [products, selectedCategory, priceFilter]);

  const handleAddToCart = (product: Product) => {
    if (product.quantity <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    toast.success(`${product.productName} added to cart`);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setPriceFilter("default");
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#ffffff",
        py: {
          xs: 7,
          md: 10,
        },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: 5,
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "flex-start",
              md: "flex-end",
            },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Chip
              label="Latest Products"
              sx={{
                mb: 2,
                bgcolor: "#dcfce7",
                color: "primary.dark",
                fontWeight: 800,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: "-1px",
                color: "text.primary",
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
              }}
            >
              Shop New Arrivals
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                color: "text.secondary",
                maxWidth: 620,
                lineHeight: 1.7,
              }}
            >
              Explore products uploaded by NexCart sellers with real-time
              availability, category filter, and price sorting.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/products"
            variant="outlined"
            sx={{
              color: "text.primary",
              borderColor: "#d1d5db",
              bgcolor: "white",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "white",
              },
            }}
          >
            View All Products
          </Button>
        </Box>

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: 2.5,
            borderRadius: 4,
            border: "1px solid #e5e7eb",
            bgcolor: "#f9fafb",
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: {
              xs: "stretch",
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
              gap: 1,
              color: "text.primary",
            }}
          >
            <TuneIcon sx={{ color: "primary.main" }} />

            <Typography sx={{ fontWeight: 900 }}>Filter Products</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 190,
                },
                bgcolor: "white",
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 190,
                },
                bgcolor: "white",
              }}
            >
              <InputLabel>Price</InputLabel>
              <Select
                label="Price"
                value={priceFilter}
                onChange={(event) =>
                  setPriceFilter(event.target.value as PriceFilter)
                }
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="lowToHigh">Low to High</MenuItem>
                <MenuItem value="highToLow">High to Low</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={handleClearFilters}
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
              Clear
            </Button>
          </Box>
        </Paper>

        {loading && (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && products.length > 0 && (
          <Typography
            sx={{
              mb: 2,
              color: "text.secondary",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Showing {filteredProducts.length} of {products.length} products
          </Typography>
        )}

        {!loading && filteredProducts.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 5,
              textAlign: "center",
              bgcolor: "#f9fafb",
              border: "1px dashed #d1d5db",
            }}
          >
            <Inventory2OutlinedIcon
              sx={{
                fontSize: 58,
                color: "text.secondary",
                mb: 2,
              }}
            />

            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              No products found
            </Typography>

            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Try changing the category or price filter.
            </Typography>
          </Paper>
        )}

        {!loading && filteredProducts.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  const isOutOfStock = product.quantity <= 0;

  const imageUrl = product.productImage
    ? `${API_BASE_URL}/uploads/products/${product.productImage}`
    : "";

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        bgcolor: "white",
        border: "1px solid #e5e7eb",
        transition: "0.25s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
          borderColor: "#86efac",
        },
        "&:hover .cart-overlay": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover .product-image": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box
        sx={{
          height: 220,
          position: "relative",
          overflow: "hidden",
          bgcolor: "#f9fafb",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={product.productName}
            className="product-image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.35s ease",
            }}
          />
        ) : (
          <Box
            className="product-image"
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 55%, #ffffff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.35s ease",
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 58, color: "primary.main" }} />
          </Box>
        )}

        <Chip
          label={isOutOfStock ? "Out of Stock" : "In Stock"}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            bgcolor: isOutOfStock ? "#fee2e2" : "#dcfce7",
            color: isOutOfStock ? "#b91c1c" : "#15803d",
            fontWeight: 900,
          }}
        />

        <Box
          className="cart-overlay"
          sx={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
            opacity: 0,
            transform: "translateY(10px)",
            transition: "0.25s ease",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            disabled={isOutOfStock}
            startIcon={<ShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
            sx={{
              py: 1.2,
              fontWeight: 900,
              bgcolor: isOutOfStock ? "#9ca3af" : "primary.main",
            }}
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 2.5 }}>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: 13,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {product.category}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 0.8,
            fontWeight: 900,
            lineHeight: 1.35,
            color: "text.primary",
            minHeight: 52,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
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
            mt: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Price
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "text.primary",
              }}
            >
              ৳{Number(product.price).toLocaleString()}
            </Typography>
          </Box>

          <Button
            component={Link}
            href={`/products/${product.id}`}
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            sx={{
              borderColor: "#d1d5db",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "white",
              },
            }}
          >
            View
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}