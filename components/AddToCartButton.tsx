"use client";

import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type AddToCartButtonProps = {
  productName: string;
  quantity: number;
};

export default function AddToCartButton({
  productName,
  quantity,
}: AddToCartButtonProps) {
  const isOutOfStock = quantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This product is out of stock");
      return;
    }

    toast.success(`${productName} added to cart`);
  };

  return (
    <Button
      fullWidth
      variant="contained"
      disabled={isOutOfStock}
      startIcon={<ShoppingCartIcon />}
      onClick={handleAddToCart}
      sx={{
        py: 1.2,
        fontWeight: 900,
        bgcolor: isOutOfStock ? "#9ca3af" : "primary.main",
      }}
    >
      {isOutOfStock ? "Unavailable" : "Add to Cart"}
    </Button>
  );
}
