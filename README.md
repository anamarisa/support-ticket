Setup and Workflow Instructions

Backend Setup:
1. Go to the backend folder and install the required dependencies by running composer install.
2. Start the Laravel development server by running php artisan serve.

Frontend Setup:
1. Go to the frontend folder and install the necessary dependencies by running npm install.
2. Start the frontend development server by running npm run dev.

- Initial Setup:
1. Run php artisan migrate:fresh --seed to refresh the database and seed it with the necessary data.
2. Login as Admin:
3. Log in as an admin using the provided credentials from the PDF document.

- Vendor Registration:
Open another tab and go to the vendor registration page to register as a vendor.

- Vendor Approval Process:
After registration, the admin can view the vendor in the admin dashboard and approve or reject the vendor.

- Post-Approval Actions:
If the vendor is approved, they will be automatically redirected to manage their products.
If the vendor is rejected, the admin will be prompted to log out.
