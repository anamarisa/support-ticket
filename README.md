# Support Ticket

A simple support ticket system built with Laravel (backend) and React (frontend).

## 🛠️ Installation Steps

### 1. Backend Setup

```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan serve
```

> This will start the Laravel backend at `http://127.0.0.1:8000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> This will start the Vite development server at `http://localhost:5173`

---

## 🚀 How to Use

1. Open your browser and go to [http://localhost:5173](http://localhost:5173)
2. Log in as an agent using the credentials:
   - **Email**: `agent@example.com`
   - **Password**: `password`
3. You can now start creating and managing support tickets.

---

## 📦 Tech Stack

- **Backend**: Laravel 10
- **Frontend**: React + Vite + TailwindCSS + shadCN
- **Authentication**: Laravel Sanctum
- **State Management**: React Query

---

## Seeded Test Users

| Role     | Email                 | Password |
|----------|-----------------------|----------|
| Agent    | agent@example.com     | password |
| Customer | john.doe@example.com  | password1 |

---
