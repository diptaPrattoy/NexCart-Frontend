"use client";

import axios from "axios";
import Cookies from "js-cookie";

import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          window.location.href = "/login/customer";

          return;
        }

        // DECODE TOKEN
        const payload = JSON.parse(atob(token.split(".")[1]));

        const customerId = payload.sub;

        // API
        const res = await axios.get(
          `http://localhost:3000/customer/my-orders/${customerId}`,
        );

        console.log(res.data);

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={900} mb={5}>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Card
            sx={{
              borderRadius: 5,
              py: 10,
              textAlign: "center",
            }}
          >
            <Typography variant="h5">No orders found</Typography>
          </Card>
        ) : (
          <Stack spacing={4}>
            {orders.map((order) => (
              <Card
                key={order.id}
                sx={{
                  borderRadius: 5,
                }}
              >
                <CardContent>
                  {/* ORDER INFO */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      flexWrap: "wrap",
                    }}
                    mb={4}
                  >
                    <Box>
                      <Typography fontWeight={900} fontSize={20}>
                        Order #{order.id}
                      </Typography>

                      <Typography color="text.secondary">
                        Payment: {order.paymentMethod}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography fontWeight={700}>
                        Status: {order.status}
                      </Typography>

                      <Typography color="primary" fontWeight={900}>
                        ${order.totalAmount}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* PRODUCTS */}
                  <Stack spacing={3}>
                    {order.orderItems.map((item: any) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          border: "1px solid #e5e7eb",
                          p: 2,
                          borderRadius: 3,
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
                          className="w-24 h-24 rounded-xl object-cover"
                        />

                        {/* INFO */}
                        <Box>
                          <Typography fontWeight={800} fontSize={18}>
                            {item.product?.productName}
                          </Typography>

                          <Typography>Quantity: {item.quantity}</Typography>

                          <Typography color="primary" fontWeight={900}>
                            ${item.price}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
