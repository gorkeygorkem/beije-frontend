# 🩸 Beije Frontend Assignment

This is a frontend assignment project built for Beije, implementing a login system and dynamic product packet customization interface based on real API responses. The app is responsive, production-structured, and uses Redux for state management.

---

## 🚀 Tech Stack

- **Next.js (App Router)** – React-based SSR framework
- **TypeScript** – Strong typing and better DX
- **Redux Toolkit** – State management for auth, cart, products
- **MUI (v7)** – UI component library
- **Axios** – For API requests
- **Postman Mock APIs** – For simulated backend interaction

---

## 📸 Features

### 🔐 Login Page

- Styled to match Beije's design system
- Validates email/password input
- Shows inline error messages and toast feedback
- On success, fetches profile and stores it in Redux

### 🛍️ Packet Builder Page

- Product and packet listing fetched from mock API
- Two categories: `Menstrual Ürünler` and `Destekleyici Ürünler`
- Users can:
  - Add/remove product quantities
  - View a summary card of selected items
  - See total price and send it to backend to verify
  - See green info banners per product (customizable)
- Cart count updates globally in the navbar

### 🧭 Global Navigation

- Sticky responsive navbar with full-width dropdown menu
- Hovered menu fetches products & packets from Redux
- Cart icon shows current item count

### 🦶 Footer

- Newsletter subscription input
- Legal links and social media
- Payment methods and responsive layout

---

## 🛠️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/beije-frontend.git
cd beije-frontend

# 2. Install dependencies
npm install

# 3. Run the app locally
npm run dev
