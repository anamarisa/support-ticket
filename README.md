```md
## 🚀 Getting Started

### 🔧 Backend Setup
1. Go to the `backend` folder.

2. Install dependencies:
   ```bash
   composer install
   ```

3. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### 🎨 Frontend Setup
1. Go to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### ⚙️ Initial Setup
1. Refresh and seed the database:
   ```bash
   php artisan migrate:fresh --seed
   ```
2. **Log in as Admin**  
   Use the credentials provided in the PDF document.

---

### 📝 Vendor Registration
- Open a new browser tab and navigate to the vendor registration page.
- Fill in the required information to register as a vendor.

### ✅ Vendor Approval Process
- After registration, the admin can view pending vendors in the dashboard.
- Admin can **approve** or **reject** the vendor application.

### 📦 Post-Approval Actions
- **If approved:** Vendor is redirected to manage their products.
- **If rejected:** Admin is prompted to log out.
```
