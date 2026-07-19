# 🛒 NexCart - Multi-Vendor E-commerce Platform

<div align="center">

A modern full-stack **multi-vendor e-commerce platform** built with **Next.js**, **NestJS**, **TypeScript**, and **Supabase PostgreSQL**.

**🌐 Live :** https://nexcart-bd.vercel.app

</div>

---

# 📖 Overview

NexCart is a full-stack multi-vendor e-commerce platform developed collaboratively by a team of **four members**. The platform provides dedicated dashboards and functionalities for **Customers, Sellers, Riders, and Administrators**, enabling efficient marketplace management and seamless online shopping.

The application follows a scalable client-server architecture with a **Next.js frontend**, **NestJS REST API backend**, and **Supabase PostgreSQL** as the cloud-hosted database. It also includes **JWT-based authentication**, **role-based authorization**, and **real-time notifications powered by Pusher**.

---


# 🛠️ Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* React Hook Form
* Zod
* Lucide React

## Backend

* NestJS
* TypeScript
* TypeORM
* JWT Authentication
* Passport.js
* Bcrypt
* Multer
* Pusher

## Database

* Supabase PostgreSQL

## Deployment

* Frontend → Vercel
* Backend → render
* Database → Supabase

---

# ✨ Key Features

## 👤 Authentication & Security

* JWT Authentication
* Role-Based Authorization
* Secure Password Hashing using Bcrypt
* Protected API Routes

---

## 🛍 Customer Features

* Customer Registration & Login
* Browse Products
* Search & Filter Products
* Product Details
* Shopping Cart
* Place Orders
* Order History

---

## 🏪 Seller Features

* Seller Dashboard
* Product Management
* Inventory Management
* Shop Profile Management
* Order Management

---

## 🚚 Rider Features

* View Assigned Deliveries
* Update Delivery Status
* Manage Delivery Workflow

---

## ⚙️ Admin Features

* Platform Dashboard
* Seller Management
* Product Monitoring
* Order Monitoring
* Marketplace Management

---

## 🔔 Real-Time Notifications

The platform integrates **Pusher** to provide real-time notifications for all user roles.

Examples include:

* Customers receive instant order updates.
* Sellers receive notifications for new orders.
* Riders receive delivery assignment notifications.
* Administrators receive important platform activity updates.

---

## 🎨 User Experience

* Fully Responsive Design
* Modern UI/UX
* RESTful API Architecture
* Image Upload Support
* Fast Navigation
* Clean Dashboard Interfaces

---

# 📦 Main Dependencies

## Frontend

* next
* react
* axios
* tailwindcss
* typescript
* react-hook-form
* zod
* lucide-react
* js-cookie

## Backend

* @nestjs/core
* @nestjs/common
* @nestjs/typeorm
* typeorm
* bcrypt
* passport
* passport-jwt
* jsonwebtoken
* multer
* pusher
* class-validator
* class-transformer

---

# ⚙️ Getting Started

## 1. Clone the Repositories

### Frontend

```bash
git clone https://github.com/diptaPrattoy/NexCart-Frontend.git
```

### Backend

```bash
git clone https://github.com/hridoy-saha1/NexCart-Backend.git
```

---

## 2. Install Dependencies

### Frontend

```bash
cd NexCart-Frontend
npm install
```

### Backend

```bash
cd NexCart-Backend
npm install
```

---

## 3. Configure Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Backend (.env)

```env
PORT=3000

DATABASE_URL=

JWT_SECRET=

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=

MAIL_USER=
MAIL_PASS=
```

---

## 4. Run the Backend

```bash
npm run start:dev
```

Runs at:

```
http://localhost:3000
```

---

## 5. Run the Frontend

```bash
npm run dev
```

Runs at:

```
http://localhost:3000
```

(or another available port assigned by Next.js)

---

# 📂 Project Structure

```text
NexCart

├── Frontend
│   ├── app
│   ├── components
│   ├── public
│   └── styles
│
├── Backend
│   ├── src
│   │   ├── auth
│   │   ├── admin
│   │   ├── customer
│   │   ├── seller
│   │   ├── rider
│   │   ├── notification
│   │   └── uploads
│   └── ...
```


# 👥 Contributors

This project was collaboratively developed by a team of four members.

| GitHub                                           | Name                       | Role                 |
| ------------------------------------------------ | -------------------------- | -------------------- |
| [@diptaPrattoy](https://github.com/diptaPrattoy) | **Dipta Prattoy Karmakar** | Full Stack Developer |
| [@hridoy-saha1](https://github.com/hridoy-saha1) | **Hridoy Saha**            | Full Stack Developer |
| [@nur-hasin](https://github.com/nur-hasin)       | **Nur Hasin Ahammad**      | Full Stack Developer |
| [@asadul59](https://github.com/asadul59)         | **Asadul Haque**           | Full Stack Developer |

We collaborated on the project through planning, system design, frontend development, backend development, database integration, testing, and deployment.


# 🔗 Project Links

* 🌐 Live Demo: https://nexcart-bd.vercel.app
* 💻 Frontend Repository: https://github.com/diptaPrattoy/NexCart-Frontend
* ⚙️ Backend Repository: https://github.com/hridoy-saha1/NexCart-Backend

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome. Feel free to fork the repository, open an issue, or submit a pull request to help improve NexCart.

---

# 📄 License

This project was developed for educational, academic, and portfolio purposes.
