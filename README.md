# 🌟 Contact Us App - Frontend
This Contact Us App (Frontend) is a user interface application to manage contacts and messages submitted by users. Built using **React**, **Redux Toolkit**, **Tailwind CSS**, **Axios**, and **Vite**.

---

# 📌 Main Features
- User Authentication: Register, Login, Logout with token handling via Redux.

- Contact Form: Users can send messages to the admin.

- User Dashboard: Display messages sent by the user.

- Admin Dashboard: Display all messages sent by users, delete and update message status.

- Form Detail: Admin can view message details.

---

# 🔨 Tech Stack
- React (Frontend Framework)

- Redux Toolkit (State Management)

- Tailwind CSS (Styling)

- Axios (HTTP Client)

- Vite (Build Tool)

---

# 📂 Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ContactForm.jsx
│   │   └── FormDetail.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Dashboard.jsx
│   └── redux/
│       ├── auth.js
│       ├── form.js
│       └── store.js
├── App.jsx
├── main.jsx
├── index.css
├── tailwind.config.js
├── vite.config.js
└── .env
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rayfrandi/contact-form-api.git
cd contact-form-Fe
```
 ## Install Dependencies
 ```bash
 npm install
```
## Create `.env` File
 

 ```
VITE_API_URL = "http://yourBackendLink/api"

 ```
## Run the App
```
npm run dev

```

# 📦 State Management (Redux Toolkit)
```
{
  auth: {
    user: null,
    token: null,
    loading: false,
    error: null
  },
  form: {
    forms: [],
    formDetail: null,
    loading: false,
    error: null
  }
}

```

## Contributing

Contributions are always welcome!

## Authors

- [@rayfarandi](https://github.com/rayfarandi)

## Feedback

If you have any feedback, please reach out to us at rayfarandi1994@gmail.com
