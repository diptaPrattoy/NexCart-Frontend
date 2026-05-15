"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleCheckout = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        toast.error("Please login");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      const customerId = payload.sub;

      // API CALL
      const res = await axios.post(
        `http://localhost:3000/customer/orders/${customerId}`,
        {
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      toast.success("Order placed successfully 🎉");

      // CLEAR CART UI
      setCartItems([]);
    } catch (error: any) {
      console.log(error);

      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  // FETCH CART
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = Cookies.get("token");
        const role = Cookies.get("role");

        // AUTH CHECK
        if (!token || role !== "customer") {
          window.location.href = "/login/customer";

          return;
        }

        // DECODE TOKEN
        const payload = JSON.parse(atob(token.split(".")[1]));

        const customerId = payload.sub;

        // GET CART
        const res = await axios.get(
          `http://localhost:3000/customer/cart/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(res.data);

        setCartItems(res.data);
      } catch (error: any) {
        console.log(error);

        toast.error(error.response?.data?.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // REMOVE ITEM
  const handleRemove = async (id: number) => {
    try {
      const token = Cookies.get("token");

      await axios.delete(
        `http://localhost:3000/customer/cart/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // UPDATE UI
      setCartItems((prev: any) => prev.filter((item: any) => item.id !== id));

      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);

      toast.error("Failed to remove item");
    }
  };

  //increase decrease quantity

  const increaseQuantity = async (id: number) => {
    try {
      const token = Cookies.get("token");

      const item = cartItems.find((i: any) => i.id === id);

      const newQuantity = item.quantity + 1;

      await axios.patch(
        `http://localhost:3000/customer/cart/${id}`,

        {
          quantity: newQuantity,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCartItems((prev: any) =>
        prev.map((item: any) =>
          item.id === id
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity =
  async (id: number) => {

    try {

      const token =
        Cookies.get("token");

      const item =
        cartItems.find(
          (i: any) =>
            i.id === id,
        );

      if (
        item.quantity <= 1
      ) return;

      const newQuantity =
        item.quantity - 1;

      await axios.patch(

        `http://localhost:3000/customer/cart/${id}`,

        {
          quantity:
            newQuantity,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      setCartItems((prev: any) =>

        prev.map((item: any) =>

          item.id === id

            ? {
                ...item,
                quantity:
                  newQuantity,
              }

            : item,
        ),
      );

    } catch (error) {

      console.log(error);
    }
  };

  // TOTAL
  const total = cartItems.reduce(
    (acc, item) => acc + Number(item.product.price) * Number(item.quantity),
    0,
  );

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Cart...
      </div>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* TITLE */}
        <Typography variant="h3" fontWeight={900} mb={5}>
          My Cart
        </Typography>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <Card
            sx={{
              borderRadius: 5,
              py: 10,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Your cart is empty
            </Typography>
          </Card>
        ) : (
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 5,
                  boxShadow: "0 4px 25px rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  {/* MAIN ROW */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* LEFT SIDE */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {/* IMAGE */}
                      <img
                        src={
                          item.product?.productImage
                            ? `http://localhost:3000/uploads/products/${item.product.productImage}`
                            : "/no-image.png"
                        }
                        alt={item.product?.productName}
                        className="w-28 h-28 rounded-2xl object-cover"
                      />

                      {/* INFO */}
                      <Box>
                        <Typography variant="h6" fontWeight={800}>
                          {item.product?.productName}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 2,
                          }}
                        >
                          {/* DECREASE */}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </Button>

                          {/* QUANTITY */}
                          <Typography fontWeight={700}>
                            {item.quantity}
                          </Typography>

                          {/* INCREASE */}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </Button>
                        </Box>

                        <Typography color="primary" fontWeight={900} mt={2}>
                          ${item.product?.price}
                        </Typography>
                      </Box>
                    </Box>

                    {/* REMOVE BUTTON */}
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {/* TOTAL CARD */}
            <Card
              sx={{
                borderRadius: 5,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography variant="h5" fontWeight={900}>
                    Total: ${total}
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>

                    <Select
                      value={paymentMethod}
                      label="Payment Method"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <MenuItem value="cash">Cash On Delivery</MenuItem>

                      <MenuItem value="bkash">bKash</MenuItem>

                      <MenuItem value="nagad">Nagad</MenuItem>

                      <MenuItem value="card">Card Payment</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
