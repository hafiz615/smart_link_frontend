Here’s your updated, cleaned-up, and more professional **README.md** for the Smart Link Frontend:

---

# Smart Link Frontend (Next.js 14 - App Router)

## 🚀 Features

- **Next.js 14** with App Router (`/app` directory structure)
- **Redux Toolkit** for state management with async thunks
- **Custom Hooks** for reusable logic
- **Styled Components** for modular styling
- **Client-side rendering** using `'use client'` directive
- **Responsive Design** for all screen sizes

---

## 📂 App Router Structure

```
/app
  layout.js          # Root layout with Redux Provider
  page.js            # Home page (/)
  /login
    page.js          # Login page (/login)
  /signup
    page.js          # Signup page (/signup)
  /admin
    /dashboard
      page.js        # Admin dashboard (/admin/dashboard)
```

---

## 📦 Installation

### 1. Prerequisites

Make sure you have:

- **Node.js**: v18.20.8
- **npm**: v10.8.2

Check versions:

```bash
node -v
# v18.20.8
npm -v
# 10.8.2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```
NEXT_PUBLIC_API_URL=<your_api_url>
```

_(Add other environment variables as needed)_

### 4. Start Development Server

```bash
npm run dev
```

---

## 🌐 Routes

| Route              | Description                   |
| ------------------ | ----------------------------- |
| `/`                | Home page with site directory |
| `/login`           | User authentication           |
| `/signup`          | User registration             |
| `/admin/dashboard` | Admin panel (protected route) |

---

## 🧩 Client Components

All pages are client components (`'use client'`) because they:

- Use React hooks (`useState`, `useEffect`)
- Access Redux Toolkit store
- Handle browser interactions
- Use browser APIs
- Implement custom hooks

---

## 📱 Responsive Design

- **Mobile-first** approach
- Flexible layouts using **CSS Grid** & **Flexbox**
- Touch-friendly components
- Consistent breakpoints across all views

---

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
