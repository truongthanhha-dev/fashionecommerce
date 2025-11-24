# Rubies Fashion E-commerce Website 

A full-stack fashion e-commerce website built as a self-learning individual project.  
The system includes a customer-facing store and an admin dashboard for managing products, collections, orders, customers, and revenue.

---

##  Live Demo

- **Frontend Live Demo:** https://fashionecommerce-nni9.vercel.app/
- **Backend API Live:** https://fashionecommerce-ashy.vercel.app/
- **Source Code:** https://github.com/truongthanhha-dev/fashionecommerce.git

> Team size: **01** (self-learning). Source code managed with Git and hosted on GitHub.

---

##  Main Features

###  Customer-facing Store

- Browse products by collections and categories  
- View detailed product information (images, sizes, prices, descriptions)  
- Search products by keyword  
- **Shopping cart**: add / update / remove items  
- **Checkout & order creation**  
- **Wishlist / Favourites**  
- View **order history** and purchase details  
- Fully responsive UI (mobile-friendly)

---

###  Admin Dashboard

- **Product management** (CRUD)  
- **Collection management** (CRUD)  
- **Customer management** (view customers)  
- **Order management** (update status)  
- **Revenue statistics** dashboard

---

##  Tech Stack

### Frontend
- **Next.js**
- **React.js**
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Next.js API Routes** (server-side REST API)
- **MongoDB / Mongoose**

### Tools & Technologies
- **Git & GitHub** (version control)
- **Vercel** (deployment)
- **Figma** (UI design)
- **RESTful API** architecture

---

## 📁 Project Structure (Monorepo)

```
fashionecommerce/
├── FRONTEND/        # Store + Admin UI (Next.js)
├── BACKEND/         # API, models, business logic (Next.js API Routes)
└── README.md
```

---

##  Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/truongthanhha-dev/fashionecommerce.git
cd fashionecommerce
```

---

### 2. Setup the Backend

```bash
cd BACKEND
npm install
```

Create a `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup the Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

> Make sure the backend is running so the frontend can fetch data properly.

---


##  Project Goals & Learning Outcomes

- Apply full-stack development skills (Next.js + MongoDB)  
- Understand e-commerce workflows (products → cart → checkout → orders)  
- Build and structure REST APIs using Next.js API Routes  
- Improve UI/UX skills with Tailwind CSS  
- Deploy full-stack applications using Vercel  
- Strengthen Git & GitHub workflow, using a monorepo structure  
- Gain hands-on experience building a real production-like system  

---

##  Author

**Trương Thanh Hạ – Web Developer**  
- GitHub: https://github.com/truongthanhha-dev  
- Email: **hatruongdev@gmail.com**
