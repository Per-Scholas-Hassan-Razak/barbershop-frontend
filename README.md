# 💈 Barbershop Frontend

Frontend for the **Barbershop Queue Management App**, built with **React + TypeScript + Material UI (MUI)**.  
This project provides separate dashboards for **barbers** and **customers**, allowing real-time queue management, haircut customization, and a clean modern UI.

---

## 🚀 Features

### 🔑 Authentication
- Register new users (barber or customer).
- Login and persist sessions with JWT authentication.
- Role-based dashboard routing (barber vs customer).

### 💈 Barber Dashboard
- **Side Navigation** with themed styling.
- **Manage Templates**: View base haircut templates, create customized haircuts.
- **Custom Cuts**: Edit and delete custom cuts with enhanced buttons & filtering by type.
- **Queue Management**: Open/close queue, view state, and track customers in line.

### 👤 Customer Dashboard
- **Side Navigation** with wait-time panel.
- **Customer Home**: Background image with centered feature cards (All Queues, My Active Queue).
- **All Queues**: Displays all currently open barber queues with stock images, styled cards, and better typography.
- **Barber Queue View**: Select haircut, join queue, and view queue entries with styled cards and highlighted customer position.

### 🎨 UI/UX Improvements
- Background images (Unsplash stock) with brightness filter for contrast.
- Cards aligned and centered horizontally/vertically where needed.
- Improved typography contrast for better readability.
- Larger modals with blurred backgrounds for forms (registration, login, haircut customization).
- Consistent Material UI theming across dashboards.

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Material UI (MUI)**
- **React Router DOM v6**
- **Axios** for API requests
- **Context API** (Auth + Queue providers)

---

## 🔗 Backend API

This frontend connects to the backend deployed at:  
👉 [Barbershop Backend on Render](https://barbershop-backend-hkms.onrender.com/api/v1)

Full backend repo (with routes overview):  
👉 [barbershop-backend](https://github.com/Per-Scholas-Hassan-Razak/barbershop-backend)

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Per-Scholas-Hassan-Razak/barbershop-frontend.git
cd barbershop-frontend

npm install 

# for dev local running 
npm run dev

# for production 
npm run build 
npm run preview
```


### Create an ENV file
VITE_API_URL=https://barbershop-backend-hkms.onrender.com/api/v1

