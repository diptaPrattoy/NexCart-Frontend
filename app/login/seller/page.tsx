"use client";


import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import LoginIcon from "@mui/icons-material/Login";

const sellerLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

type SellerLoginData = z.infer<typeof sellerLoginSchema>;

export default function SellerLoginPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerLoginData>({
    resolver: zodResolver(sellerLoginSchema),
  });

  const onSubmit = async (data: SellerLoginData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/seller/login",
        data
      );

      const token =
        response.data?.access_token ||
        response.data?.accessToken ||
        response.data?.token;

      if (token) {
        localStorage.setItem("seller_token", token);
      }

      if (response.data?.seller) {
        localStorage.setItem("seller", JSON.stringify(response.data.seller));
      }

      toast.success(response.data?.message || "Seller login successful");

      // Redirect after login
      // setTimeout(() => {
      //   window.location.href = "/seller/dashboard";
      // }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          toast.error(message.join(", "));
        } else {
          toast.error(message || "Seller login failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 5,
            border: "1px solid #e5e7eb",
            boxShadow: "0 25px 70px rgba(15, 23, 42, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                borderRadius: 4,
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginIcon fontSize="large" />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                letterSpacing: "-0.8px",
              }}
            >
              Seller Login
            </Typography>

            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Access your NexCart seller account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <TextField
              label="Email"
              placeholder="Enter your email"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              placeholder="Enter your password"
              type="password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.6,
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            Do not have a seller account?{" "}
            <Typography
              component={Link}
              href="/register/seller"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Register
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}