# 💻 I-computers

## Project is live and the live link is:
  https://i-computers-frontend-seven-kappa.vercel.app/

### I-computers is a personal MERN-stack e-commerce learning project with a modern Tailwind UI. It includes a full admin panel (product & user management, order management), customer shopping flow (product listing, cart, buy-now), Google OAuth, password reset via OTP (nodemailer), images stored in Supabase buckets, and MongoDB as the primary database.

## 📋 Table of Contents


* 1.Demo & Screenshots.
* 2.Key features.
* 3.Tech stack.
* 4.Architecture overview.
* 5.Quick start — local development.
* 6.Database & storage setup.
* 7.API overview (exact routes).
* 8.Admin account & usage.
* 9.Deployment notes.
* 10.Testing & troubleshooting.
* 11.Contributing & helpful commands.
* 12.License & contact.

## 📸 Demo & Screenshots

<img width="1920" height="1020" alt="Screenshot 2026-02-14 123151" src="https://github.com/user-attachments/assets/a69c76fa-7668-48ca-a870-2d1ca0b657c3" />
<img width="1815" height="1020" alt="Screenshot 2026-02-14 123137" src="https://github.com/user-attachments/assets/93d19646-9c53-4b6c-b471-c04ad5fd368f" />
<img width="1919" height="875" alt="Screenshot 2026-02-14 122837" src="https://github.com/user-attachments/assets/e31910eb-5870-41b2-9bec-a658b2edc704" />
<img width="1919" height="872" alt="Screenshot 2026-02-14 122704" src="https://github.com/user-attachments/assets/59d6251e-6534-4ad6-b867-cb9a831a20aa" />
<img width="1919" height="872" alt="Screenshot 2026-02-14 122631" src="https://github.com/user-attachments/assets/08bc1ae7-f5f6-478f-98bc-2e4facbace2a" />
<img width="1919" height="858" alt="Screenshot 2026-02-14 122548" src="https://github.com/user-attachments/assets/a108b7a8-aeeb-4aae-9036-dadb2ef66009" />
<img width="1919" height="855" alt="Screenshot 2026-02-14 122535" src="https://github.com/user-attachments/assets/4a1f4454-136d-496b-bf98-1c9228517f6f" />
<img width="1919" height="857" alt="Screenshot 2026-02-14 122523" src="https://github.com/user-attachments/assets/14e5086f-f4b2-4be1-bfcc-22f4efc9a41d" />
<img width="1919" height="861" alt="Screenshot 2026-02-14 121218" src="https://github.com/user-attachments/assets/5e7d953f-6154-424b-a24c-047a9963dfb3" />
<img width="1918" height="870" alt="Screenshot 2026-02-14 121140" src="https://github.com/user-attachments/assets/948353a5-3e10-4907-9add-17368545b677" />
<img width="1919" height="881" alt="Screenshot 2026-02-14 121120" src="https://github.com/user-attachments/assets/36da30e6-57da-468a-b748-f27d2a4963f7" />


## 🚀 Key Features

* **Responsive UI** built with Tailwind CSS.
* **Product Listing** with multiple images (images served from Supabase buckets).
* **Cart System:** add/remove items, quantity update, subtotal calculation.
* **Buy Now:** purchase a single item immediately.
* **Orders:** customers view orders + status; admins update status and add note
**Admin Panel:**
* Create / update / delete products.
* View all registered users; block/unblock users.
* View and manage orders (status updates, add notes).
* Filter unavailable products.

**Authentication:**
* Google sign-in for users.
* Email OTP for password reset (via nodemailer).

---

## ⚙️ Tech Stack

* **Backend:** Node.js + Express (REST API)
* **Database:** MongoDB
* **Storage:** Supabase (buckets for product images)
* **Frontend:** React (Vite) + Tailwind CSS
* **Auth & Mail:** Google (Google OAuth) and Nodemailer for OTP emails
* **Version Control:** Git & GitHub

---

## 🏗️ Architecture Overview

* **Frontend (`/frontend` or `/client`):** React (Vite) components and pages — product listings, product details, cart, checkout, login, admin pages (products, users, orders). Styling via Tailwind utilities.
* **Backend (`/backend`):** Express routes and controllers for users, products, orders, OTP logic. Uses Mongoose models. Uploads images to Supabase and stores image references in product documents.
* **Persistence:** MongoDB stores users, products, orders, OTP tokens.
* **Auth Flow:** JWT-based protected routes; Google OAuth for sign-in. Admin access controlled via `isAdmin` flag on user documents.

---

## 🤸 Quick Start — Local Development

**Prerequisites:** Node.js (v16+), npm/yarn, MongoDB connection string, Supabase project and keys, Google OAuth credentials.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd i-computers
```
## Backend

cd backend
npm install

### create .env (see below)
npm run dev   # starts nodemon / node server
* Deployed on render

##Frontend

cd frontend
npm install
create frontend .env (see below)
npm run dev   # starts Vite dev server (default: http://localhost:5173)
* Deployed on vercel



## Database & storage setup

MongoDB

Create a cluster (e.g., MongoDB Atlas) and set MONGO_URI.

Supabase

Create a Supabase project and storage bucket (e.g., project-images).

Create service key or anon key depending on your upload design and set SUPABASE_URL + SUPABASE_KEY.

## API overview (exact routes)

Routes are defined in: routes/userRouter.js, routes/productRouter.js, routes/orderRouter.js

User routes (/api/users)

POST /api/users/ — createUser — register a new user.

POST /api/users/login — loginUser — login (email/password).

GET /api/users/ — getUser — get current authenticated user (protected).

POST /api/users/google-login — googleLogin — Google OAuth sign-in.

GET /api/users/send-otp/:email — sendOTP — send OTP to :email for password reset.

POST /api/users/verify-otp — verifyOtpAndUpdatePassword — verify OTP and update password.

GET /api/users/all — getAllUsers — admin: list all users.

PUT /api/users/toggleBlock/:email — updateUserStatus — admin: block/unblock user by :email.

Product routes (/api/products)

GET /api/products/ — getAllProducts — list products (filters/pagination optional).

POST /api/products/ — createProduct — admin: create product (uploads handled to Supabase).

GET /api/products/search/:query — searchProducts — search by text query.

GET /api/products/:productID — getProductByID — get single product.

DELETE /api/products/:productID — deleteProduct — admin: delete product.

PUT /api/products/:productID — updateProduct — admin: update product.

Order routes (/api/orders)

POST /api/orders/ — createOrder — create an order (from cart or buy-now).

GET /api/orders/ — getOrders — get orders (admin: all orders; user: own orders).

PUT /api/orders/:orderID — updateOrderStatus — admin: update order status and add note.

Check controllers to confirm request/response body shapes and required headers (e.g., JWT). Protect admin routes with an isAdmin middleware.

## Admin account & usage

isAdmin boolean on user documents controls admin access. Seed an admin or set isAdmin:true manually in DB for your account (e.g., via MongoDB Atlas UI).

All admin APIs require valid JWT + admin middleware.

## Deployment notes

Frontend is deployed to Vercel and backend is deployed to Render.

Production checklist:

Use production Supabase and Google OAuth credentials, and configure OAuth redirect URIs to match your frontend domain.

Use HTTPS (Vercel/Render provide HTTPS).

Configure CORS to allow your frontend domain(s).

Secure Supabase keys: use server-side service key only on backend, not exposed in frontend.

## Testing & troubleshooting

Inspect server logs on Render and Vite logs locally.

Common problems:

MongoDB connection problems — check URI & network access.

Axios errors.

Google OAuth redirect mismatch — confirm redirect URIs in Google Cloud Console.

Email send failures — check SMTP host/port/credentials and test with a simple nodemailer script.

Contributing & helpful commands

## Dev scripts

### backend
npm run dev        # nodemon for development
npm run start      # production start

### frontend
npm run dev        # Vite dev server
npm run build
npm run preview

##File structure (high level)

/backend
  /controllers
  /models
  /routes
  server.js
/frontend (or /client)
  /src
    /components
    /pages
    /assets
README.md
.env.example

## License & contact

This project is for learning / portfolio use. Add an MIT license if you want to open source it.
