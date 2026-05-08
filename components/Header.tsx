"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

export default function Header() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Sellers", href: "/sellers" },
    { label: "About", href: "/about" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: 1.2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagIcon />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "text.primary",
                letterSpacing: "-0.5px",
              }}
            >
              NexCart
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "0.2s",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" spacing={1.5}>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
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
              Login
            </Button>

            <Button component={Link} href="/register" variant="contained">
              Register
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}