# ShuqStay – Rental Property Platform (React + Supabase)
# Access the website via the link below 
https://musksoft.github.io/Shuqstay/ 
**ShuqStay** is a modern full-stack web application built with **React** and **Supabase** that connects tenants and landlords in a seamless rental experience. The platform includes role-based access for **Tenants**, **Landlords**, and **Admins**, allowing personalized dashboards, property listings, messaging, and more.

---

##  Features

### Home Page
- Search bar with filters for location, price, type, and availability.
- Categorized display of available listings.
- Featured properties section.
- Responsive UI for all device sizes.

---

### Authentication & User Roles
- Powered by Supabase Auth.
- **Three roles**:
  - **Tenant** – browse listings, communicate with landlords, manage calendar.
  - **Landlord** – post/manage listings, communicate with tenants, manage calendar.
  - **Admin** – manage users, delete accounts based on tenant complaints.
- Role-based redirection to specific dashboards post-login.

---

### Landlord Dashboard
- Post new rental listings with images, descriptions, pricing, and availability.
- View and manage existing listings.
- Message system with tenants.
- Calendar for scheduling appointments or availability.
- Profile management.

---

### Tenant Dashboard
- Browse listings with full details.
- Save and track favorite listings.
- Message system with landlords.
- Schedule viewings or move-in/out dates via calendar.
- File complaints or feedback.
- Profile management.

---

### Admin Dashboard
- View all users.
- Delete users (especially after verified complaints).
- Manage platform complaints and enforce moderation policies.

---

### Messaging System
- Real-time chat between tenants and landlords.
- Notifications for new messages.
- Secure and private communication stored via Supabase.

---

### Calendar Functionality
- Both tenants and landlords can set and manage calendar events.
- Useful for scheduling property viewings, rent due reminders, etc.

---

## Tech Stack

| Tech         | Description                          |
|--------------|--------------------------------------|
| React        | Frontend Framework                   |
| Supabase     | Backend (DB, Auth, Realtime Storage) |
| Tailwind CSS | Styling                              |
| React Router | Page routing                         |
| Supabase Auth| User login and role management       |
| PostgreSQL   | Database via Supabase                |

---

## Project Structure

/shuqstay-app
│
├── /src
│ ├── /components
│ │ ├── BrandCarousel.jsx
│ │ ├── ComplaintBox.jsx
│ │ ├── EditPropertyModal.jsx
│ │ ├── Entry.jsx
│ │ ├── Hero.jsx
│ │ ├── LandlordEvents.jsx
│ │ ├── LandlordProfile.jsx
│ │ ├── LandlordPropertyList.jsx
│ │ ├── LoginForm.jsx
│ │ ├── ManagePropertyForm.jsx
│ │ ├── Messages.jsx
│ │ ├── Navbar.jsx
│ │ ├── PropertyCard.jsx
│ │ ├── PropertyList.jsx
│ │ ├── PropertyModal.jsx
│ │ ├── RentalRooms.jsx
│ │ ├── Reviews.jsx
│ │ ├── StatsSection.jsx
│ │ ├── TenantEvents.jsx
│ │ ├── TenantProfile.jsx
│ ├── /pages
│ │ ├── About.jsx
│ │ ├── Home.jsx
│ │ ├── LandlordAdmin.jsx
│ │ ├── TenantPanel.jsx
│ │ ├── Login.jsx
│ │ ├── Tenants.jsx
│ │ ├── Landlord.jsx
│ │ ├── AdminPanel.jsx
│ ├── /config
│ │ └── supabaseClient.js
│ ├── /test
│ │ └── Admintest.jsx
│ │ └── RegisterForm.jsx
│ │ └── Tenant.jsx
│ ├── /utils
│ └── App.jsx
│ └── calendarStyles.css
│ └── index.css
│ └── main.jsx
│
├── .env
├── package.json
├── vite.config.json
├── tailwind.config.js
└── README.md




---

## Role-Based Access (Supabase Auth)

- Users are tagged with a `role` field in their profile on signup.
- Middleware or route guards check the user role and redirect accordingly:
  - `/tenant-dashboard`
  - `/landlord-dashboard`
  - `/admin-dashboard`

---

