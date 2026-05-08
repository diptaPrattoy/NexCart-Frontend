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
  MenuItem,
  Avatar,
} from "@mui/material";

// Icons
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"; 
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const riderRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^01[0-9]{9}$/, "Enter a valid Bangladeshi phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  vehicle_type: z.string().min(1, "Please select your vehicle type"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Profile image is required")
    .refine(
      (files) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Only JPG, PNG, or WEBP allowed"
    ),
});

type RiderRegisterData = z.infer<typeof riderRegisterSchema>;

export default function RiderRegisterPage() {
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RiderRegisterData>({
    resolver: zodResolver(riderRegisterSchema),
  });

  const imageFile = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: RiderRegisterData) => {
    try {
      setLoading(true);
      setServerMessage("");
      setServerError("");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("vehicle_type", data.vehicle_type);
      formData.append("image", data.image[0]); 

      const response = await axios.post(
        "http://localhost:3000/riders/createRider", 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setServerMessage("Success! Your rider account has been created.");
      setPreview(null);
      reset();
    } catch (error: any) {
      const message = error.response?.data?.message;
      setServerError(Array.isArray(message) ? message.join(", ") : message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", py: 6 }}>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ p: { xs: 4, sm: 6 }, borderRadius: 8, bgcolor: "rgba(255, 255, 255, 0.98)" }}>
          
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ width: 70, height: 70, mx: "auto", mb: 2, borderRadius: "20px", background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(2, 132, 199, 0.3)" }}>
              <DirectionsBikeIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}>Join the Fleet</Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>Create your profile and start earning</Typography>
          </Box>

          {serverMessage && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{serverMessage}</Alert>}
          {serverError && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{serverError}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField 
                label="Full Name" 
                fullWidth 
                variant="filled" 
                {...register("name")} 
                error={!!errors.name} 
                helperText={errors.name?.message}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: { borderRadius: 3 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlinedIcon sx={{color: '#0284c7'}}/>
                      </InputAdornment>
                    )
                  }
                }}
              />
              <TextField 
                label="Phone" 
                fullWidth 
                variant="filled" 
                placeholder="017XXXXXXXX" 
                {...register("phone")} 
                error={!!errors.phone} 
                helperText={errors.phone?.message}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: { borderRadius: 3 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIphoneIcon sx={{color: '#0284c7'}}/>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Box>

            <TextField 
              label="Email Address" 
              fullWidth 
              variant="filled" 
              {...register("email")} 
              error={!!errors.email} 
              helperText={errors.email?.message}
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: { borderRadius: 3 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{color: '#0284c7'}}/>
                    </InputAdornment>
                  )
                }
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField 
                select 
                label="Vehicle Type" 
                fullWidth 
                variant="filled" 
                defaultValue="" 
                {...register("vehicle_type")} 
                error={!!errors.vehicle_type} 
                helperText={errors.vehicle_type?.message}
                // Specific fix for React 19 Select component warning
                slotProps={{
                  select: {
                    sx: { borderRadius: 3 }
                  },
                  input: {
                    disableUnderline: true
                  }
                }}
              >
                <MenuItem value="bicycle">Bicycle</MenuItem>
                <MenuItem value="bike">Motorcycle</MenuItem>
                <MenuItem value="van">Delivery Van</MenuItem>
              </TextField>

              <TextField 
                label="Password" 
                type="password" 
                fullWidth 
                variant="filled" 
                {...register("password")} 
                error={!!errors.password} 
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    disableUnderline: true,
                    sx: { borderRadius: 3 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{color: '#0284c7'}}/>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '2px dashed #cbd5e0', borderRadius: 3, borderColor: errors.image ? 'error.main' : '#cbd5e0', bgcolor: '#f8fafc' }}>
              <Avatar src={preview || ""} sx={{ width: 56, height: 56, bgcolor: '#e0f2fe', color: '#0284c7' }}>
                {!preview && <PersonOutlinedIcon />}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Button component="label" variant="text" startIcon={<CloudUploadIcon />} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  {imageFile?.[0] ? imageFile[0].name : "Upload Photo"}
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*" 
                    {...register("image")} 
                    onChange={(e) => { 
                      register("image").onChange(e); 
                      handleImageChange(e); 
                    }} 
                  />
                </Button>
                {errors.image && <Typography variant="caption" color="error" display="block">{String(errors.image.message)}</Typography>}
              </Box>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading} 
              fullWidth 
              sx={{ 
                py: 2, 
                borderRadius: 4, 
                fontWeight: 700, 
                textTransform: "none", 
                background: "linear-gradient(135deg, #0f172a 0%, #334155 100%)", 
                '&:hover': { background: '#000' } 
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Rider Account"}
            </Button>
          </Box>

          <Typography sx={{ mt: 4, textAlign: "center", color: "#64748b", fontSize: 14 }}>
            Already a rider? <Link href="/rider/login" style={{ color: "#0284c7", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}