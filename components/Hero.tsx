// "use client";

// import Link from "next/link";
// import type { ReactNode } from "react";

// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Chip from "@mui/material/Chip";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";

// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import PersonIcon from "@mui/icons-material/Person";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// export default function Hero() {
//   return (
//     <Box
//       sx={{
//         minHeight: "calc(100vh - 80px)",
//         background:
//           "linear-gradient(135deg, #f0fdf4 0%, #ffffff 45%, #ecfdf5 100%)",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Box
//           sx={{
//             minHeight: "calc(100vh - 80px)",
//             py: 8,
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               md: "1fr 1fr",
//             },
//             gap: 6,
//             alignItems: "center",
//           }}
//         >
//           {/* Left Section */}
//           <Box>
//             {/* <Chip
//               label="Smart Ecommerce Platform for Everyone"
//               sx={{
//                 mb: 3,
//                 bgcolor: "white",
//                 color: "primary.dark",
//                 fontWeight: 700,
//                 border: "1px solid #bbf7d0",
//                 px: 1,
//               }}
//             /> */}

//             <Typography
//               variant="h1"
//               sx={{
//                 fontSize: {
//                   xs: "2.7rem",
//                   md: "4.8rem",
//                 },
//                 lineHeight: 1.05,
//                 letterSpacing: "-2px",
//                 color: "text.primary",
//                 maxWidth: 700,
//               }}
//             >
//               Buy, Sell & Deliver Faster with{" "}
//               <Box component="span" sx={{ color: "primary.main" }}>
//                 NexCart
//               </Box>
//             </Typography>

//             <Typography
//               sx={{
//                 mt: 3,
//                 fontSize: "1.12rem",
//                 lineHeight: 1.8,
//                 color: "text.secondary",
//                 maxWidth: 620,
//               }}
//             >
//               NexCart is a modern ecommerce platform built for customers,
//               sellers, riders, and admins. Manage shopping, selling, delivery,
//               and platform control from one powerful system.
//             </Typography>

//             {/* Buttons */}
//             <Box
//               sx={{
//                 mt: 4,
//                 display: "flex",
//                 flexDirection: {
//                   xs: "column",
//                   sm: "row",
//                 },
//                 gap: 2,
//               }}
//             >
//               <Button
//                 component={Link}
//                 href="/products"
//                 variant="contained"
//                 size="large"
//                 sx={{
//                   px: 4,
//                   py: 1.7,
//                   fontSize: 15,
//                   boxShadow: "0 15px 35px rgba(22, 163, 74, 0.25)",
//                 }}
//               >
//                 Start Shopping
//               </Button>

//               <Button
//                 component={Link}
//                 href="/seller/register"
//                 variant="outlined"
//                 size="large"
//                 sx={{
//                   px: 4,
//                   py: 1.7,
//                   color: "text.primary",
//                   borderColor: "#d1d5db",
//                   bgcolor: "white",
//                   "&:hover": {
//                     borderColor: "primary.main",
//                     color: "primary.main",
//                     bgcolor: "white",
//                   },
//                 }}
//               >
//                 Become a Seller
//               </Button>
//             </Box>

//             {/* Stats */}
//             <Box
//               sx={{
//                 mt: 5,
//                 maxWidth: 550,
//                 display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)",
//                 gap: 3,
//               }}
//             >
//               <Box>
//                 <Typography variant="h4" sx={{ fontWeight: 900 }}>
//                   4+
//                 </Typography>
//                 <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//                   User Roles
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography variant="h4" sx={{ fontWeight: 900 }}>
//                   24/7
//                 </Typography>
//                 <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//                   Order Access
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography variant="h4" sx={{ fontWeight: 900 }}>
//                   Fast
//                 </Typography>
//                 <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//                   Delivery Flow
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* Right Section */}
//           <Box sx={{ position: "relative" }}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 width: 280,
//                 height: 280,
//                 borderRadius: "50%",
//                 bgcolor: "#bbf7d0",
//                 filter: "blur(70px)",
//                 top: -50,
//                 right: -30,
//               }}
//             />

//             <Box
//               sx={{
//                 position: "absolute",
//                 width: 260,
//                 height: 260,
//                 borderRadius: "50%",
//                 bgcolor: "#a7f3d0",
//                 filter: "blur(80px)",
//                 bottom: -40,
//                 left: -20,
//               }}
//             />

//             <Paper
//               elevation={0}
//               sx={{
//                 position: "relative",
//                 p: 3,
//                 borderRadius: 6,
//                 border: "1px solid #e5e7eb",
//                 boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
//               }}
//             >
//               <Box
//                 sx={{
//                   bgcolor: "#f9fafb",
//                   borderRadius: 5,
//                   p: 3,
//                 }}
//               >
//                 {/* Dashboard Header */}
//                 <Box
//                   sx={{
//                     mb: 3,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     gap: 2,
//                   }}
//                 >
//                   <Box>
//                     <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//                       Today&apos;s Overview
//                     </Typography>
//                     <Typography variant="h5" sx={{ fontWeight: 900 }}>
//                       NexCart Dashboard
//                     </Typography>
//                   </Box>

//                   <Chip
//                     icon={<TrendingUpIcon />}
//                     label="Live"
//                     sx={{
//                       bgcolor: "#dcfce7",
//                       color: "primary.dark",
//                       fontWeight: 800,
//                     }}
//                   />
//                 </Box>

//                 {/* Dashboard Cards */}
//                 <Box
//                   sx={{
//                     display: "grid",
//                     gridTemplateColumns: {
//                       xs: "1fr",
//                       sm: "1fr 1fr",
//                     },
//                     gap: 2,
//                   }}
//                 >
//                   <DashboardCard
//                     title="Orders"
//                     value="1,248"
//                     subtitle="+18% this week"
//                   />

//                   <DashboardCard
//                     title="Sellers"
//                     value="320"
//                     subtitle="Verified shops"
//                   />

//                   <DashboardCard
//                     title="Riders"
//                     value="85"
//                     subtitle="Active today"
//                   />

//                   <DashboardCard
//                     title="Revenue"
//                     value="৳2.4M"
//                     subtitle="Monthly sales"
//                   />
//                 </Box>

//                 {/* Roles */}
//                 <Box
//                   sx={{
//                     mt: 3,
//                     borderRadius: 4,
//                     bgcolor: "primary.main",
//                     color: "white",
//                     p: 3,
//                   }}
//                 >
//                   <Typography sx={{ color: "#dcfce7", fontWeight: 600 }}>
//                     Platform Roles
//                   </Typography>

//                   <Box
//                     sx={{
//                       mt: 1.5,
//                       display: "grid",
//                       gridTemplateColumns: {
//                         xs: "1fr 1fr",
//                         sm: "repeat(4, 1fr)",
//                       },
//                       gap: 1.5,
//                     }}
//                   >
//                     <RoleCard icon={<AdminPanelSettingsIcon />} label="Admin" />
//                     <RoleCard icon={<StorefrontIcon />} label="Seller" />
//                     <RoleCard icon={<LocalShippingIcon />} label="Rider" />
//                     <RoleCard icon={<PersonIcon />} label="Customer" />
//                   </Box>
//                 </Box>
//               </Box>
//             </Paper>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// function DashboardCard({
//   title,
//   value,
//   subtitle,
// }: {
//   title: string;
//   value: string;
//   subtitle: string;
// }) {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 2.5,
//         borderRadius: 4,
//         bgcolor: "white",
//         border: "1px solid #f3f4f6",
//       }}
//     >
//       <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//         {title}
//       </Typography>

//       <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
//         {value}
//       </Typography>

//       <Typography
//         sx={{
//           mt: 1,
//           color: "primary.main",
//           fontWeight: 700,
//           fontSize: 14,
//         }}
//       >
//         {subtitle}
//       </Typography>
//     </Paper>
//   );
// }

// function RoleCard({ icon, label }: { icon: ReactNode; label: string }) {
//   return (
//     <Box
//       sx={{
//         py: 1.5,
//         px: 1,
//         borderRadius: 3,
//         bgcolor: "rgba(255,255,255,0.16)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//         gap: 0.7,
//         fontSize: 13,
//         fontWeight: 800,
//         minHeight: 78,
//       }}
//     >
//       {icon}
//       {label}
//     </Box>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nexcart-backend-o86x.onrender.com";

type HeroStats = {
  orders: number;
  sellers: number;
  riders: number;
  availableRiders: number;
  revenue: number;
};

const defaultStats: HeroStats = {
  orders: 0,
  sellers: 0,
  riders: 0,
  availableRiders: 0,
  revenue: 0,
};

function extractStats(data: unknown): HeroStats {
  const value =
    data && typeof data === "object" && "data" in data
      ? (data as { data?: unknown }).data
      : data;

  if (!value || typeof value !== "object") {
    return defaultStats;
  }

  const stats = value as Partial<HeroStats>;

  return {
    orders: Number(stats.orders || 0),
    sellers: Number(stats.sellers || 0),
    riders: Number(stats.riders || 0),
    availableRiders: Number(stats.availableRiders || 0),
    revenue: Number(stats.revenue || 0),
  };
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-BD").format(value);
}

function formatRevenue(value: number) {
  if (value >= 1_000_000) {
    return `৳${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  }

  if (value >= 100_000) {
    return `৳${(value / 100_000).toFixed(value >= 1_000_000 ? 0 : 1)}L`;
  }

  if (value >= 1_000) {
    return `৳${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}K`;
  }

  return `৳${formatNumber(value)}`;
}

export default function Hero() {
  const [stats, setStats] = useState<HeroStats>(defaultStats);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/public-stats`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load hero stats");
        }

        const result = await response.json();
        setStats(extractStats(result));
      } catch (error) {
        console.error("Hero stats error:", error);
        setStats(defaultStats);
      } finally {
        setLoadingStats(false);
      }
    }

    loadStats();
  }, []);

  const statDisplay = {
    orders: loadingStats ? "..." : formatNumber(stats.orders),
    sellers: loadingStats ? "..." : formatNumber(stats.sellers),
    riders: loadingStats ? "..." : formatNumber(stats.riders),
    revenue: loadingStats ? "..." : formatRevenue(stats.revenue),
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 80px)",
        background:
          "linear-gradient(135deg, #f0fdf4 0%, #ffffff 45%, #ecfdf5 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "calc(100vh - 80px)",
            py: 8,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 6,
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2.7rem",
                  md: "4.8rem",
                },
                lineHeight: 1.05,
                letterSpacing: "-2px",
                color: "text.primary",
                maxWidth: 700,
              }}
            >
              Buy, Sell & Deliver Faster with{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                NexCart
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                fontSize: "1.12rem",
                lineHeight: 1.8,
                color: "text.secondary",
                maxWidth: 620,
              }}
            >
              NexCart is a modern ecommerce platform built for customers,
              sellers, riders, and admins. Manage shopping, selling, delivery,
              and platform control from one powerful system.
            </Typography>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                gap: 2,
              }}
            >
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.7,
                  fontSize: 15,
                  boxShadow: "0 15px 35px rgba(22, 163, 74, 0.25)",
                }}
              >
                Start Shopping
              </Button>

              <Button
                component={Link}
                href="/seller/register"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.7,
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
                Become a Seller
              </Button>
            </Box>

            <Box
              sx={{
                mt: 5,
                maxWidth: 550,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {loadingStats ? "..." : "4+"}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                  User Roles
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {statDisplay.orders}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                  Orders Placed
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {statDisplay.sellers}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                  Sellers
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: "50%",
                bgcolor: "#bbf7d0",
                filter: "blur(70px)",
                top: -50,
                right: -30,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 260,
                height: 260,
                borderRadius: "50%",
                bgcolor: "#a7f3d0",
                filter: "blur(80px)",
                bottom: -40,
                left: -20,
              }}
            />

            <Paper
              elevation={0}
              sx={{
                position: "relative",
                p: 3,
                borderRadius: 6,
                border: "1px solid #e5e7eb",
                boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#f9fafb",
                  borderRadius: 5,
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                      Live Overview
                    </Typography>

                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      NexCart Dashboard
                    </Typography>
                  </Box>

                  <Chip
                    icon={<TrendingUpIcon />}
                    label={loadingStats ? "Loading" : "Live"}
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "primary.dark",
                      fontWeight: 800,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "1fr 1fr",
                    },
                    gap: 2,
                  }}
                >
                  <DashboardCard
                    title="Orders"
                    value={statDisplay.orders}
                    subtitle="Total placed orders"
                  />

                  <DashboardCard
                    title="Sellers"
                    value={statDisplay.sellers}
                    subtitle="Registered shops"
                  />

                  <DashboardCard
                    title="Riders"
                    value={statDisplay.riders}
                    subtitle={`${formatNumber(stats.availableRiders)} available`}
                  />

                  <DashboardCard
                    title="Revenue"
                    value={statDisplay.revenue}
                    subtitle="Paid or delivered sales"
                  />
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    borderRadius: 4,
                    bgcolor: "primary.main",
                    color: "white",
                    p: 3,
                  }}
                >
                  <Typography sx={{ color: "#dcfce7", fontWeight: 600 }}>
                    Platform Roles
                  </Typography>

                  <Box
                    sx={{
                      mt: 1.5,
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr 1fr",
                        sm: "repeat(4, 1fr)",
                      },
                      gap: 1.5,
                    }}
                  >
                    <RoleCard icon={<AdminPanelSettingsIcon />} label="Admin" />
                    <RoleCard icon={<StorefrontIcon />} label="Seller" />
                    <RoleCard icon={<LocalShippingIcon />} label="Rider" />
                    <RoleCard icon={<PersonIcon />} label="Customer" />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function DashboardCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        bgcolor: "white",
        border: "1px solid #f3f4f6",
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
        {title}
      </Typography>

      <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "primary.main",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {subtitle}
      </Typography>
    </Paper>
  );
}

function RoleCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Box
      sx={{
        py: 1.5,
        px: 1,
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0.7,
        fontSize: 13,
        fontWeight: 800,
        minHeight: 78,
      }}
    >
      {icon}
      {label}
    </Box>
  );
}
