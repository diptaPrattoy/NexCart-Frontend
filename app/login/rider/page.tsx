"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

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

const riderLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type RiderLoginData = z.infer<typeof riderLoginSchema>;

export default function RiderLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

      const response = await axios.post(
        "http://localhost:3000/riders/login",
        data
      );

      console.log(response.data);

      // Get Token
      const token =
        response.data?.access_token ||
        response.data?.accessToken ||
        response.data?.token;

      // Save Token
      if (token) {
        localStorage.setItem("token", token);
      }

      // Save Rider Data
      if (response.data?.rider) {
        localStorage.setItem(
          "rider",
          JSON.stringify(response.data.rider)
        );

        localStorage.setItem(
          "riderId",
          response.data.rider.id.toString()
        );
      }

      toast.success(
        response.data?.message || "Login successful"
      );

      // Redirect Dashboard
      router.push("/dashboard/rider");

    } catch (error: unknown) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
          toast.error(message.join(", "));
        } else {
          toast.error(message || "Login failed");
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
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mb: 2,
                borderRadius: 4,
                bgcolor: "secondary.main",
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
              Rider Login
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
              }}
            >
              Access your rider dashboard
            </Typography>
          </Box>

          {/* Form */}
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
                bgcolor: "secondary.main",

                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{ color: "white" }}
                />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            Don’t have a rider account?{" "}
            <Typography
              component={Link}
              href="/rider/register"
              sx={{
                color: "secondary.main",
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