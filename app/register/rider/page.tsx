"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

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
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const riderRegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot be more than 100 characters"),

  email: z.string().email("Enter a valid email address"),

  phone: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(20, "Phone number cannot be more than 20 characters")
    .regex(/^01[0-9]{9}$/, "Enter a valid Bangladeshi phone number"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password cannot be more than 255 characters"),
});

type RiderRegisterData = z.infer<typeof riderRegisterSchema>;

export default function RiderRegisterPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RiderRegisterData>({
    resolver: zodResolver(riderRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RiderRegisterData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/riders/createRider",
        data
      );

      toast.success(
        response.data?.message || "Rider registered successfully"
      );

      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Backend Error:", error.response?.data);

        const message = error.response?.data?.message;

        // Backend sends array
        if (Array.isArray(message)) {
          message.forEach((msg) => toast.error(msg));
        }

        // Backend sends string
        else if (typeof message === "string") {
          toast.error(message);
        }

        // Fallback
        else {
          toast.error("Rider registration failed");
        }
      } else {
        console.log(error);
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
                width: 62,
                height: 62,
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
              <DirectionsBikeIcon fontSize="large" />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                letterSpacing: "-0.8px",
              }}
            >
              Rider Registration
            </Typography>

            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Join the NexCart delivery team
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
              label="Full Name"
              placeholder="Enter your name"
              fullWidth
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                label="Email"
                placeholder="Email address"
                fullWidth
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              <TextField
                label="Phone Number"
                placeholder="017XXXXXXXX"
                fullWidth
                {...register("phone")}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
              />
            </Box>

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{
                py: 1.6,
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Register as Rider"
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
            Already have a rider account?{" "}
            <Link
              href="/login/rider"
              style={{
                color: "#9c27b0",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}