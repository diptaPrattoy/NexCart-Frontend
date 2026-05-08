"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";

// Icons
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const riderLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type RiderLoginData = z.infer<typeof riderLoginSchema>;

export default function RiderLoginPage() {
  const [serverError, setServerError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiderLoginData>({
    resolver: zodResolver(riderLoginSchema),
  });

  const onSubmit = async (data: RiderLoginData) => {
    try {
      setLoading(true);
      setServerError("");
      setServerMessage("");

      const response = await axios.post("http://localhost:3000/rider/login", data);
      const token = response.data?.token || response.data?.accessToken;

      if (token) localStorage.setItem("rider_token", token);
      if (response.data?.rider) localStorage.setItem("rider", JSON.stringify(response.data.rider));

      setServerMessage(response.data?.message || "Success! Redirecting...");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        setServerError(Array.isArray(message) ? message.join(", ") : message || "Login failed");
      } else {
        setServerError("Connection error. Please check your internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", // Deep professional background
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(56, 189, 248, 0.1)",
          top: "-100px",
          right: "-100px",
        },
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 5,
            borderRadius: 7,
            bgcolor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: 5,
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
              color: "white",
              mb: 3,
              boxShadow: "0 10px 20px rgba(2, 132, 199, 0.3)",
            }}
          >
            <DeliveryDiningIcon sx={{ fontSize: 48 }} />
          </Box>

          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}
          >
            Rider Login
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", mt: 1, mb: 4 }}>
            Welcome back! Please enter your details.
          </Typography>

          {serverMessage && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{serverMessage}</Alert>}
          {serverError && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{serverError}</Alert>}

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
              variant="filled"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailTwoToneIcon sx={{ color: "#0284c7" }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: "#f8fafc" },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <LockTwoToneIcon sx={{ color: "#0284c7" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: "#f8fafc" },
              }}
            />

            <Box sx={{ textAlign: "right" }}>
              <Typography
                component={Link}
                href="/rider/forgot-password"
                sx={{
                  fontSize: "0.85rem",
                  color: "#0284c7",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon />}
              sx={{
                py: 1.8,
                borderRadius: 3,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  background: "#000",
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="caption" sx={{ color: "#cbd5e1", px: 1 }}>
              OR
            </Typography>
          </Divider>

          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Don't have an account?{" "}
            <Typography
              component={Link}
              href="/rider/register"
              sx={{
                color: "#0284c7",
                textDecoration: "none",
                fontWeight: 700,
                ml: 0.5,
                "&:hover": { color: "#0369a1" },
              }}
            >
              Join the Fleet
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}