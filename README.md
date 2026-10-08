# 🍔 FoodHub - Food Ordering Web App

A full-stack food ordering application where users can browse food items, add them to a cart, apply a coupon, place orders and track the order status. Admins can manage foods and update order status.

**Backend repo:** https://github.com/MSowbarnika/foodhub-backend

## Features
- User registration and login (token-based, passwords hashed with BCrypt)
- Browse menu with search and category filter
- Food details page
- Cart with quantity update and coupon code (`FOOD30` gives 30% off)
- Checkout with payment method selection (COD / UPI / Card - demo)
- My Orders page with status tracker (Placed → Preparing → Delivered)
- Admin panel (role-based access): add, edit, delete foods and update order status
- Prices and discount are calculated on the server for security

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), React Router, Axios, Context API, CSS |
| Backend | Java, Spring Boot, Spring Data JPA |
| Database | MySQL |

## Run Locally
1. Start the backend from the backend repo (runs on `http://localhost:8080`).
2. Then run the frontend:

```bash
npm install
npm run dev
```
3. Open `http://localhost:5173`

## Admin Access
The admin page is a hidden route at `/admin` and works only for users with the ADMIN role.

## Author
**Sowbarnika M** - Java Full Stack Developer (fresher)
