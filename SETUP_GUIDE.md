# 🚀 FastDial — Complete Setup Guide (Beginner Friendly)

> **What is FastDial?**
> FastDial is a full-stack web application — like Urban Company / JustDial.
> - **Customers** can find and book local services (plumber, electrician, etc.)
> - **Vendors** (service providers) can list their business, accept bookings, chat with customers
> - **Admin** can manage everything from a dashboard
>
> It has 3 parts: **Backend (API server)** + **User/Vendor Frontend** + **Admin Frontend**

---

## 📋 Table of Contents

| Step | What You'll Do |
|------|---------------|
| [Step 1](#step-1--install-required-software) | Install required software on your computer |
| [Step 2](#step-2--download-the-project) | Download/Clone the project files |
| [Step 3](#step-3--understand-the-project-structure) | Understand what each folder does |
| [Step 4](#step-4--install-and-start-mysql-database) | Install and start MySQL database |
| [Step 5](#step-5--create-the-database-and-tables) | Create the database and all tables |
| [Step 6](#step-6--setup-the-backend-api-server) | Setup the Backend (API server) |
| [Step 7](#step-7--setup-the-uservendor-frontend) | Setup the User/Vendor Frontend |
| [Step 8](#step-8--setup-the-admin-frontend) | Setup the Admin Frontend |
| [Step 9](#step-9--run-the-complete-project) | Run everything together |
| [Step 10](#step-10--how-to-stop-the-project) | How to stop the project |
| [Step 11](#step-11--all-environment-variables-explained) | All environment variables explained |
| [Step 12](#step-12--troubleshooting--common-errors) | Fix common errors |
| [Step 13](#step-13--tech-stack--database-tables) | Tech stack & database tables |

---

## Step 1 — Install Required Software

Before you start, you need to install some software on your computer. Think of these as "tools" your computer needs to run this project.

### 1.1 Install Node.js (JavaScript Runtime)

**What is Node.js?** It lets you run JavaScript code outside of a browser. The backend server is built with Node.js.

1. Go to: **https://nodejs.org/en/download**
2. Download the **LTS** version (the big green button)
3. Run the installer → Click "Next" → Accept terms → Click "Install"
4. **IMPORTANT:** During installation, check the box that says **"Add to PATH"** (it's usually checked by default)

**npm** (Node Package Manager) comes automatically with Node.js. You don't need to install it separately. npm is used to install project libraries/packages.

### 1.2 Install MySQL Server (Database)

**What is MySQL?** It's a database — it stores all the data (users, vendors, bookings, etc.) in tables.

1. Go to: **https://dev.mysql.com/downloads/mysql/**
2. Select your operating system (Windows / macOS / Linux)
3. Download the **MySQL Installer** (for Windows, choose "mysql-installer-community")
4. Run the installer:
   - Choose **"Developer Default"** or **"Server Only"** setup type
   - Click "Next" through the steps
   - **When it asks for root password** → Set it to something you'll remember (e.g., `root` or `password123`)
   - **WRITE DOWN YOUR ROOT PASSWORD** — you'll need it later!
   - Finish the installation

> **💡 TIP:** On Windows, MySQL may install at: `C:\Program Files\MySQL\MySQL Server 8.4\`

### 1.3 Install Git (Version Control)

**What is Git?** It lets you download (clone) project code from GitHub/GitLab.

1. Go to: **https://git-scm.com/downloads**
2. Download for your OS and install with default settings

### 1.4 Install a Code Editor (Optional but Recommended)

**VS Code** is the best free code editor:
1. Go to: **https://code.visualstudio.com/**
2. Download and install

### 1.5 ✅ Verify Everything is Installed

Open a terminal:
- **Windows:** Press `Win + R`, type `cmd`, press Enter  
  OR search for "PowerShell" in Start menu
- **macOS:** Press `Cmd + Space`, type "Terminal", press Enter
- **Linux:** Press `Ctrl + Alt + T`

Type these commands one by one and press Enter:

```bash
node --version
```
✅ You should see something like: `v18.17.0` or `v20.x.x` or `v24.x.x`

```bash
npm --version
```
✅ You should see something like: `9.x.x` or `10.x.x` or `11.x.x`

```bash
git --version
```
✅ You should see something like: `git version 2.x.x`

**If any command shows "not recognized" or "command not found":**
- That software is not installed properly
- Re-install it and make sure you check "Add to PATH" during installation
- After re-installing, close and reopen the terminal

---

## Step 2 — Download the Project

You have 2 options:

### Option A: Clone with Git (Recommended)

Open terminal and run:
```bash
git clone <your-repository-url> FASTDIAL-main
```
Replace `<your-repository-url>` with the actual URL of your GitHub/GitLab repository.

Then enter the project folder:
```bash
cd FASTDIAL-main
```

### Option B: Download as ZIP

1. Go to the repository on GitHub/GitLab
2. Click the green **"Code"** button → **"Download ZIP"**
3. Extract the ZIP file to a folder on your computer
4. Open terminal and navigate to that folder:

```bash
cd C:\path\to\FASTDIAL-main
```
(Replace with the actual path where you extracted the ZIP)

---

## Step 3 — Understand the Project Structure

Here's what each folder does. **You don't need to memorize this**, just understand the big picture:

```
FASTDIAL-main/                  ← This is the main project folder
│
├── backend/                    ← 🖥️ THE API SERVER (Node.js + Express)
│   │                              This is the "brain" of the app.
│   │                              It handles all the logic, database
│   │                              queries, authentication, payments, etc.
│   │
│   ├── controllers/            ← Functions that handle each API request
│   │   ├── admin/              ← Admin-related logic
│   │   ├── customers/          ← Customer-related logic  
│   │   ├── vendors/            ← Vendor-related logic
│   │   ├── chatController.js   ← Chat message logic
│   │   └── errorController.js  ← Error handling
│   │
│   ├── database/               ← Database connection + SQL schema
│   │   ├── db.js               ← Connects to MySQL database
│   │   └── fast_dial_schema.sql← ⭐ THE SQL FILE that creates all tables
│   │
│   ├── middlewares/            ← Code that runs before API requests
│   │   ├── blockunsubscribe.js ← Blocks unauthorized users
│   │   ├── fast2sms.js         ← OTP/SMS sending
│   │   └── s3bucket.js         ← File upload to AWS S3
│   │
│   ├── models/                 ← Data structures for chat
│   ├── router/                 ← URL route definitions (which URL does what)
│   ├── socket/                 ← Real-time chat & location tracking
│   ├── uploads/                ← Where uploaded files are stored locally
│   ├── utils/                  ← Helper functions (email, errors)
│   ├── .env                    ← ⚠️ SECRET CONFIG FILE (you create this)
│   ├── app.js                  ← Main Express app setup
│   ├── server.js               ← Starts the server
│   └── package.json            ← Lists all required npm packages
│
├── user_vendor_frontend/       ← 🌐 THE WEBSITE (React + Vite)
│   │                              This is what customers and vendors see
│   │                              in their browser.
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── User/           ← Customer pages (home, login, bookings, etc.)
│   │   │   ├── vendor/         ← Vendor pages (dashboard, requests, etc.)
│   │   │   └── common/         ← Landing page (shared)
│   │   ├── components/         ← Reusable UI pieces (buttons, cards, etc.)
│   │   ├── saga/               ← Redux Saga (manages API calls & state)
│   │   ├── App.jsx             ← All routes defined here
│   │   └── main.jsx            ← Starting point of React app
│   ├── .env                    ← ⚠️ SECRET CONFIG FILE (you create this)
│   └── package.json            ← Lists all required npm packages
│
├── admin_frontend/             ← 👑 THE ADMIN PANEL (React + Vite)
│   │                              This is what the admin uses to manage
│   │                              vendors, categories, complaints, etc.
│   │
│   ├── src/                    ← Same structure as user frontend
│   ├── .env                    ← ⚠️ SECRET CONFIG FILE (you create this)
│   └── package.json            ← Lists all required npm packages
│
├── data/                       ← Extra SQL files (additional schemas)
├── setup_mysql.bat             ← Windows batch file to auto-setup MySQL
├── start_mysql.bat             ← Windows batch file to start MySQL
└── SETUP_GUIDE.md              ← 📖 THIS FILE YOU'RE READING NOW
```

### 🔑 Key Concept: What is a `.env` file?

A `.env` file stores **secret configuration** like:
- Database password
- API keys
- Secret tokens

**Why is it not included in the project?** Because these files contain sensitive information. Each person must create their own `.env` file with their own credentials. The `.gitignore` file tells Git to **never upload** `.env` files to the repository.

### 🔑 Key Concept: What is `package.json`?

Every Node.js project has a `package.json` file. It lists all the **libraries/packages** the project needs. When you run `npm install`, npm reads this file and downloads all the required packages into a `node_modules` folder.

### 🔑 Key Concept: What is `node_modules`?

This folder contains all the downloaded libraries. It's **huge** (100s of MB) and is **never** uploaded to Git. You always regenerate it by running `npm install`.

---

## Step 4 — Install and Start MySQL Database

### 4.1 Check if MySQL is Already Running

**Windows:**
```bash
net start MySQL
```
If you see "The MySQL service is starting / already started" → MySQL is running! Skip to Step 5.

If you see "service name is invalid" → MySQL is installed but not set up as a service. Try:
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --console
```
This starts MySQL manually. **Keep this terminal window open** (closing it stops MySQL).

**macOS:**
```bash
brew services start mysql
```
OR if you installed MySQL from the .dmg installer:
```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

**Linux (Ubuntu/Debian):**
```bash
sudo systemctl start mysql
```
OR
```bash
sudo service mysql start
```

### 4.2 Test if MySQL is Working

Open a **new terminal** (keep the MySQL one open if you started it manually) and run:

```bash
mysql -u root -p
```

It will ask: `Enter password:`  
Type the password you set during MySQL installation and press Enter.

**If you see this prompt, MySQL is working:**
```
mysql>
```

Type `exit;` and press Enter to come out.

**If you get "Access denied":**
- You're using the wrong password
- Try the password you set during MySQL installation

**If you get "mysql is not recognized" (Windows):**
- MySQL is not in your system PATH
- Use the full path instead:
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p
```

### 4.3 (Windows Only) Add MySQL to PATH (So You Can Use `mysql` Command Anywhere)

1. Press `Win + S`, search for **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables..."** button
4. Under **"System variables"**, find `Path` and click **"Edit"**
5. Click **"New"** and add: `C:\Program Files\MySQL\MySQL Server 8.4\bin`
6. Click OK → OK → OK
7. **Close and reopen** your terminal
8. Now `mysql -u root -p` should work from anywhere

---

## Step 5 — Create the Database and Tables

### 5.1 Login to MySQL

```bash
mysql -u root -p
```
Enter your password when prompted.

### 5.2 Create the Database

Once you see the `mysql>` prompt, type:

```sql
CREATE DATABASE IF NOT EXISTS fast_dial;
```
Press Enter. You should see: `Query OK, 1 row affected`

### 5.3 Verify the Database Was Created

```sql
SHOW DATABASES;
```

You should see `fast_dial` in the list:
```
+--------------------+
| Database           |
+--------------------+
| fast_dial          |
| information_schema |
| mysql              |
| ...                |
+--------------------+
```

### 5.4 Exit MySQL

```sql
exit;
```

### 5.5 Import the Schema (Create All 26 Tables)

**What is a schema?** It's the structure of your database — it defines what tables exist and what columns each table has. The project includes a ready-made schema file.

Now run this command from the **project root folder** (where you see the `backend` folder):

**Windows (Command Prompt):**
```bash
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p fast_dial < backend\database\fast_dial_schema.sql
```

**Windows (PowerShell):**
```bash
Get-Content backend\database\fast_dial_schema.sql | & "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p fast_dial
```

**macOS / Linux:**
```bash
mysql -u root -p fast_dial < backend/database/fast_dial_schema.sql
```

Enter your MySQL password when prompted. If no errors appear, the tables were created!

### 5.6 Verify Tables Were Created

```bash
mysql -u root -p -e "USE fast_dial; SHOW TABLES;"
```

You should see **26 tables**:
```
+------------------------+
| Tables_in_fast_dial    |
+------------------------+
| admins                 |
| chat_messages          |
| chat_room              |
| chat_rooms             |
| customer_addresses     |
| customer_service_details|
| customercomplaints     |
| customerpayments       |
| customers              |
| favourites             |
| location_tracking      |
| messages               |
| notifications          |
| otp                    |
| reviews                |
| service_categories     |
| service_with_category  |
| servicebookings        |
| services               |
| slider_images          |
| subscriptionpaymentsbyvendor |
| subscriptions          |
| vendor_services        |
| vendor_subscriptions   |
| vendors                |
| vendorscomplaints      |
+------------------------+
```

✅ If you see all these tables, your database is ready!

---

## Step 6 — Setup the Backend (API Server)

### 6.1 Open Terminal and Go to the Backend Folder

```bash
cd backend
```

### 6.2 Install All Dependencies (Libraries)

```bash
npm install
```

**What does this do?** It reads the `package.json` file and downloads all the required libraries into a `node_modules` folder. This may take 1-3 minutes.

You should see output ending with something like:
```
added 250 packages in 30s
```

**If you get errors:** Try running as administrator (Windows: right-click terminal → "Run as Administrator")

Here's what each library does:

| Library | What It Does | Why We Need It |
|---------|-------------|----------------|
| `express` | Web framework | Creates the API server, handles HTTP requests |
| `mysql2` | MySQL driver | Connects Node.js to MySQL database |
| `socket.io` | WebSocket library | Real-time chat and live location tracking |
| `jsonwebtoken` (JWT) | Token authentication | Keeps users logged in securely |
| `bcrypt` | Password encryption | Hashes passwords before saving to database |
| `multer` | File upload handler | Handles vendor image/document uploads |
| `razorpay` | Payment SDK | Processes online payments via Razorpay |
| `cors` | Cross-Origin Resource Sharing | Allows frontend (port 5173) to talk to backend (port 3000) |
| `helmet` | Security middleware | Adds security headers to HTTP responses |
| `dotenv` | Environment loader | Reads the `.env` file and loads secrets into the app |
| `nodemon` | Dev auto-restart | Automatically restarts server when you save code changes |
| `nodemailer` | Email sender | Sends emails (OTP verification, notifications) |
| `axios` | HTTP client | Makes HTTP requests to external APIs (SMS, maps) |
| `aws-sdk` | AWS SDK | Uploads files to Amazon S3 cloud storage (optional) |
| `resend` | Email API | Alternative email sending service |

### 6.3 Create the `.env` File

The `.env` file stores all your secret configuration. **You must create this file yourself.**

**Windows (Command Prompt):**
```bash
copy NUL .env
```

**Windows (PowerShell):**
```bash
New-Item .env
```

**macOS / Linux:**
```bash
touch .env
```

### 6.4 Fill in the `.env` File

Open the `.env` file in your code editor (VS Code, Notepad, etc.) and paste this:

```env
PORT=3000
NODE_ENV=development

# ============================================
# MySQL Database Connection
# ============================================
# DB_SERVER = Where is MySQL running?
#   → If MySQL is on your same computer, use: localhost
#   → If MySQL is on another server, use that server's IP address
DB_SERVER=localhost

# DB_USER = Your MySQL username
#   → If you didn't create a special user, it's usually: root
DB_USER=root

# DB_PASSWORD = Your MySQL password
#   → This is the password you set when installing MySQL
#   → If you set it to "root" during installation, use: root
DB_PASSWORD=root

# DB_NAME = Name of the database you created in Step 5
#   → We created it as: fast_dial
DB_NAME=fast_dial

# ============================================
# JWT Authentication (Login System)
# ============================================
# JWT_SECRET = A long random secret key used to generate login tokens
#   → You can use any long random string
#   → To generate one, run in terminal: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=fast_dial_jwt_secret_key_2026_super_secure
JWT_EXPIRES_IN=7d

# ============================================
# Razorpay Payment Gateway (TEST MODE)
# ============================================
# Get your test keys from: https://razorpay.com
#   1. Create a free Razorpay account
#   2. Go to Dashboard → Settings → API Keys
#   3. Generate "Test Mode" keys
#   → If you don't have Razorpay keys, leave these as-is.
#     Payment features just won't work, but rest of the app will.
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXX

# ============================================
# Google Maps API
# ============================================
# Get your key from: https://console.cloud.google.com
#   1. Create a project
#   2. Enable "Maps JavaScript API" and "Geocoding API"
#   3. Create credentials → API Key
#   → If you don't have a key, leave as-is. Maps features won't work.
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# ============================================
# OTP / SMS Service (MessageCentral)
# ============================================
# Get credentials from: https://www.messagecentral.com
#   → If you don't have these, leave as-is. SMS OTP won't work,
#     but you can still use email OTP or direct login.
SMS_ID=your_messagecentral_customer_id
SMS_PASS=your_messagecentral_api_key
SMS_EMAIL=your_messagecentral_email

# ============================================
# AWS S3 Cloud Storage (DISABLED — NOT IN USE)
# ============================================
# This feature is disabled in the current code.
# Files are stored locally in the /uploads folder instead.
# You can leave these as-is.
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
BUCKET_NAME=your_s3_bucket_name

# ============================================
# Gmail SMTP (Email Sending)
# ============================================
# To send emails (OTP, notifications), you need Gmail SMTP credentials.
# How to set up:
#   1. Use a Gmail account
#   2. Enable 2-Factor Authentication on that Gmail account
#   3. Go to: https://myaccount.google.com/apppasswords
#   4. Generate an "App Password" for "Mail"
#   5. Use that 16-character password below
#   → If you don't set this up, email features won't work.
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
```

### ⚡ MINIMUM Required Values (To Just Get It Running)

If you just want to get the project running quickly for development, you **only need** these 4 database values to be correct:

```env
DB_SERVER=localhost
DB_USER=root
DB_PASSWORD=<your-mysql-password>
DB_NAME=fast_dial
```

Everything else (Razorpay, Google Maps, SMS, Email) can stay as placeholder values. Those features just won't work until you fill in real API keys, but **the app will still start and run**.

### 6.5 Start the Backend Server

```bash
npm run dev
```

**What does `npm run dev` do?** It runs the `dev` script from `package.json`, which starts the server using `nodemon`. Nodemon watches your files — if you edit any code, it automatically restarts the server.

✅ **SUCCESS! You should see:**
```
[nodemon] 3.1.9
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
Socket.IO initialized two on /socket.io
Server running on port 3000
```

### 6.6 Test if Backend is Working

Open your web browser and go to:

**http://localhost:3000/health**

✅ You should see the text: **`API server up`**

If you see this, your backend is running perfectly! 🎉

**⚠️ KEEP THIS TERMINAL OPEN** — closing it will stop the backend server.

---

## Step 7 — Setup the User/Vendor Frontend

### 7.1 Open a NEW Terminal Window

**IMPORTANT:** Don't close the backend terminal! Open a **brand new** terminal window.

- **Windows:** Right-click on the terminal in taskbar → open new window
- **VS Code:** Click the `+` button in the terminal panel
- **macOS:** Press `Cmd + T` for a new tab in Terminal

### 7.2 Navigate to the Frontend Folder

```bash
cd path/to/FASTDIAL-main/user_vendor_frontend
```

For example:
```bash
cd "E:\Antigravity project\Web Development\BACKEND task by flutter flirt\FASTDIAL-main\user_vendor_frontend"
```

### 7.3 Install Dependencies

```bash
npm install
```

This downloads all frontend libraries. Key ones:

| Library | What It Does |
|---------|-------------|
| `react` | The UI library — renders all the pages and components |
| `react-dom` | Connects React to the browser DOM |
| `react-router-dom` | Handles page navigation (when you click links, it shows different pages) |
| `@reduxjs/toolkit` | State management — keeps track of app data (logged in user, bookings, etc.) |
| `redux-saga` | Manages side effects — handles API calls in the background |
| `axios` | Makes HTTP requests to the backend API |
| `socket.io-client` | Connects to the Socket.IO server for real-time chat |
| `framer-motion` | Adds smooth animations to the UI |
| `lucide-react` | Beautiful icon library |
| `react-icons` | Another icon library with 1000s of icons |
| `@react-google-maps/api` | Shows Google Maps in the app |
| `zod` | Validates form data (checks if email is valid, phone number format, etc.) |
| `jwt-decode` | Reads the JWT token to get user info |
| `tailwindcss` | CSS framework — makes styling fast with utility classes |
| `vite` | Build tool — bundles all your code and serves it in development |

### 7.4 Create the `.env` File

```bash
# Windows (Command Prompt):
copy NUL .env

# Windows (PowerShell):
New-Item .env

# macOS / Linux:
touch .env
```

### 7.5 Fill in the `.env` File

Open `user_vendor_frontend/.env` and paste:

```env
# This tells the frontend where the backend API is running
# If your backend is on the same computer on port 3000, use this:
VITE_API_URL=http://localhost:3000/api/v1

# Google Maps API Key (same key as backend)
# If you don't have one, leave the placeholder — maps just won't load
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Razorpay Public Key (same as RAZORPAY_KEY_ID in backend)
# If you don't have one, leave the placeholder — payments just won't work
VITE_RAZORPAY_KEY=rzp_test_XXXXXXXXXX
```

> **💡 Why does it say `VITE_` before each variable?** Vite (the build tool) only exposes environment variables that start with `VITE_` to the frontend code. This is a security feature — it prevents accidentally leaking backend secrets to the browser.

### 7.6 Start the Frontend Dev Server

```bash
npm run dev
```

✅ **SUCCESS! You should see:**
```
  VITE v6.4.3  ready in 339 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 7.7 Open in Browser

Go to: **http://localhost:5173/**

You should see the FastDial landing page! 🎉

**⚠️ KEEP THIS TERMINAL OPEN TOO** — closing it stops the frontend.

---

## Step 8 — Setup the Admin Frontend

### 8.1 Open ANOTHER New Terminal Window

You should now have 2 terminals open (backend + user frontend). Open a **3rd one**.

### 8.2 Navigate to Admin Frontend Folder

```bash
cd path/to/FASTDIAL-main/admin_frontend
```

### 8.3 Install Dependencies

```bash
npm install
```

### 8.4 Create the `.env` File

```bash
# Windows (Command Prompt):
copy NUL .env

# Windows (PowerShell):
New-Item .env

# macOS / Linux:
touch .env
```

### 8.5 Fill in the `.env` File

Open `admin_frontend/.env` and paste:

```env
# Backend API URL — same as user frontend
VITE_API_URL=http://localhost:3000/api/v1
```

### 8.6 Start the Admin Frontend (on Port 5174)

```bash
npm run dev -- --port 5174
```

> **Why `-- --port 5174`?** The user frontend is already using port 5173. We need to use a different port. The `--` tells npm to pass `--port 5174` to the `vite` command.

✅ **SUCCESS! You should see:**
```
  VITE v6.4.3  ready in 336 ms

  ➜  Local:   http://localhost:5174/
```

### 8.7 Open in Browser

Go to: **http://localhost:5174/**

---

## Step 9 — Run the Complete Project

### ✅ Summary: You Need 4 Things Running

Here's the complete picture of what should be running:

```
╔═══════════════════════════════════════════════════════════════╗
║                    YOUR COMPUTER                              ║
║                                                               ║
║  ┌──────────────────────┐                                     ║
║  │  MySQL Database       │ ← Stores all data                  ║
║  │  Port: 3306           │    (must be running first!)         ║
║  └──────────┬───────────┘                                     ║
║             │ connects to                                     ║
║  ┌──────────▼───────────┐                                     ║
║  │  Backend API Server   │ ← The brain of the app             ║
║  │  Port: 3000           │    Handles all logic & API calls    ║
║  │  Terminal: npm run dev│                                     ║
║  └──────────┬───────────┘                                     ║
║             │ sends data to                                   ║
║  ┌──────────▼───────────┐  ┌──────────────────────┐           ║
║  │  User/Vendor Frontend │  │  Admin Frontend       │          ║
║  │  Port: 5173           │  │  Port: 5174           │          ║
║  │  Terminal: npm run dev│  │  Terminal: npm run dev │          ║
║  └──────────────────────┘  └──────────────────────┘           ║
╚═══════════════════════════════════════════════════════════════╝
```

### 🖥️ Terminal-by-Terminal Start Order

**TERMINAL 1 — Start MySQL (Do this FIRST)**
```bash
# Windows (service):
net start MySQL

# Windows (manual — keep this terminal open!):
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --console

# macOS:
brew services start mysql

# Linux:
sudo systemctl start mysql
```

**TERMINAL 2 — Start Backend**
```bash
cd backend
npm run dev
```
Wait until you see: `Server running on port 3000`

**TERMINAL 3 — Start User/Vendor Frontend**
```bash
cd user_vendor_frontend
npm run dev
```
Wait until you see: `http://localhost:5173/`

**TERMINAL 4 — Start Admin Frontend (Optional)**
```bash
cd admin_frontend
npm run dev -- --port 5174
```
Wait until you see: `http://localhost:5174/`

### 🔗 Open These URLs in Your Browser

| What | URL | Description |
|------|-----|-------------|
| 🌐 **Customer/Vendor App** | http://localhost:5173 | The main app — for customers and vendors |
| 👑 **Admin Dashboard** | http://localhost:5174 | Admin panel — manage everything |
| 🖥️ **Backend Health Check** | http://localhost:3000/health | Quick check if API is working |

---

## Step 10 — How to Stop the Project

### Stop a Server
Press **`Ctrl + C`** in the terminal where that server is running.

### Stop MySQL

**Windows (service):**
```bash
net stop MySQL
```

**Windows (manual):** Just close the terminal window where mysqld is running, or press `Ctrl + C`.

**macOS:**
```bash
brew services stop mysql
```

**Linux:**
```bash
sudo systemctl stop mysql
```

### Restart a Server
Just run the start command again (`npm run dev`) in that terminal.

---

## Step 11 — All Environment Variables Explained

### 📂 File: `backend/.env`

| Variable | Example Value | Required? | Explanation |
|----------|--------------|-----------|-------------|
| `PORT` | `3000` | ✅ Yes | Which port the backend server runs on |
| `NODE_ENV` | `development` | ✅ Yes | `development` for local, `production` for live server |
| `DB_SERVER` | `localhost` | ✅ **YES** | MySQL server address. Use `localhost` if MySQL is on your computer |
| `DB_USER` | `root` | ✅ **YES** | MySQL username. Usually `root` for local development |
| `DB_PASSWORD` | `root` | ✅ **YES** | MySQL password you set during installation |
| `DB_NAME` | `fast_dial` | ✅ **YES** | Database name (we created `fast_dial` in Step 5) |
| `JWT_SECRET` | `any_long_random_string` | ✅ Yes | Secret key for generating login tokens. Can be anything |
| `JWT_EXPIRES_IN` | `7d` | ✅ Yes | How long a login session lasts (7d = 7 days) |
| `RAZORPAY_KEY_ID` | `rzp_test_xxx` | ❌ Optional | Razorpay test API key. Payments won't work without it |
| `RAZORPAY_KEY_SECRET` | `xxx` | ❌ Optional | Razorpay secret. Payments won't work without it |
| `GOOGLE_MAPS_API_KEY` | `AIzaSyxxx` | ❌ Optional | Google Maps API key. Maps won't work without it |
| `SMS_ID` | `your_id` | ❌ Optional | MessageCentral customer ID for SMS OTP |
| `SMS_PASS` | `your_key` | ❌ Optional | MessageCentral API key |
| `SMS_EMAIL` | `your_email` | ❌ Optional | MessageCentral registered email |
| `AWS_ACCESS_KEY_ID` | `your_key` | ❌ Not used | AWS S3 is disabled in current code |
| `AWS_SECRET_ACCESS_KEY` | `your_secret` | ❌ Not used | AWS S3 is disabled |
| `AWS_REGION` | `ap-south-1` | ❌ Not used | AWS region |
| `BUCKET_NAME` | `your_bucket` | ❌ Not used | AWS S3 bucket name |
| `SMTP_HOST` | `smtp.gmail.com` | ❌ Optional | Email server address |
| `SMTP_PORT` | `587` | ❌ Optional | Email server port |
| `SMTP_USER` | `you@gmail.com` | ❌ Optional | Gmail address for sending emails |
| `SMTP_PASS` | `abcd efgh ijkl mnop` | ❌ Optional | Gmail App Password (NOT your Gmail login password!) |

### 📂 File: `user_vendor_frontend/.env`

| Variable | Example Value | Required? | Explanation |
|----------|--------------|-----------|-------------|
| `VITE_API_URL` | `http://localhost:3000/api/v1` | ✅ **YES** | Backend API address. Must match where backend is running |
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyxxx` | ❌ Optional | Same Google Maps key as backend |
| `VITE_RAZORPAY_KEY` | `rzp_test_xxx` | ❌ Optional | Same as `RAZORPAY_KEY_ID` in backend |

### 📂 File: `admin_frontend/.env`

| Variable | Example Value | Required? | Explanation |
|----------|--------------|-----------|-------------|
| `VITE_API_URL` | `http://localhost:3000/api/v1` | ✅ **YES** | Backend API address |

---

## Step 12 — Troubleshooting & Common Errors

### ❌ Error: `connect ECONNREFUSED 127.0.0.1:3306`

**What it means:** The backend can't connect to MySQL because MySQL is not running.

**Fix:** Start MySQL first! See Step 4.

---

### ❌ Error: `ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost'`

**What it means:** The MySQL password in your `.env` file is wrong.

**Fix:** 
1. Open `backend/.env`
2. Change `DB_PASSWORD` to your actual MySQL password
3. Save the file
4. The backend will auto-restart (if using `npm run dev`)

---

### ❌ Error: `ER_BAD_DB_ERROR: Unknown database 'fast_dial'`

**What it means:** The `fast_dial` database doesn't exist yet.

**Fix:** Go back to Step 5 and create the database.

---

### ❌ Error: `EADDRINUSE: address already in use :::3000`

**What it means:** Something else is already using port 3000.

**Fix (Windows):**
```bash
# Find what's using port 3000:
netstat -ano | findstr :3000

# Kill it (replace 12345 with the actual PID number from above):
taskkill /PID 12345 /F
```

**Fix (macOS/Linux):**
```bash
lsof -i :3000
kill -9 <PID>
```

---

### ❌ Error: `npm install` gives permission errors

**Fix (Windows):** Right-click your terminal → **"Run as Administrator"** → then run `npm install` again.

**Fix (macOS/Linux):**
```bash
sudo npm install
```

---

### ❌ Error: `Cannot find module 'express'` (or any module name)

**What it means:** Dependencies are not installed.

**Fix:** Run `npm install` in the folder that has the error:
```bash
cd backend
npm install
```

---

### ❌ Frontend shows blank white page

**Possible causes:**
1. Backend is not running → Start it with `npm run dev` in the `backend` folder
2. Wrong API URL → Check `VITE_API_URL` in `user_vendor_frontend/.env` is `http://localhost:3000/api/v1`
3. JavaScript error → Press `F12` in browser → Go to "Console" tab → Look for red error messages

---

### ❌ Error: `'node' is not recognized` or `'npm' is not recognized`

**What it means:** Node.js is not installed or not in your PATH.

**Fix:** Re-install Node.js from https://nodejs.org and make sure "Add to PATH" is checked.

---

### ❌ Error: `'mysql' is not recognized`

**What it means:** MySQL is not in your PATH.

**Fix:** Either:
- Add MySQL to PATH (see Step 4.3)
- Or use the full path: `"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"`

---

### ❌ Frontend can't connect to backend (CORS errors in browser console)

**What it means:** The frontend URL is not allowed by the backend.

**Fix:** The backend already allows `localhost:5173` and `localhost:5174` in `app.js`. If you changed the frontend port, add your port to the `origin` array in `app.js`.

---

## Step 13 — Tech Stack & Database Tables

### Backend Technologies
| Technology | Version | What It Does |
|-----------|---------|-------------|
| **Node.js** | v18+ | JavaScript runtime — runs the server code |
| **Express.js** | v4.21 | Web framework — handles HTTP requests and responses |
| **MySQL** | v8.0+ | Database — stores all application data |
| **mysql2** | v3.13 | Database driver — connects Node.js to MySQL |
| **Socket.IO** | v4.8 | WebSocket library — enables real-time chat and location tracking |
| **JWT** | v9.0 | Authentication — generates secure login tokens |
| **bcrypt** | v5.1 | Security — encrypts passwords before storing |
| **Multer** | v1.4 | File handling — processes image/document uploads |
| **Razorpay SDK** | v2.9 | Payments — integrates Razorpay payment gateway |
| **Nodemailer** | v6.9 | Email — sends OTP and notification emails |
| **Helmet** | v8.0 | Security — adds protective HTTP headers |
| **Nodemon** | v3.1 | Dev tool — auto-restarts server on code changes |

### Frontend Technologies (User/Vendor + Admin)
| Technology | Version | What It Does |
|-----------|---------|-------------|
| **React** | v19.0 | UI library — builds the entire user interface |
| **Vite** | v6.0 | Build tool — bundles code and serves in development |
| **React Router** | v7.5 | Navigation — handles page routing without page reload |
| **Redux Toolkit** | v2.6 | State management — keeps app data in a central store |
| **Redux Saga** | v1.3 | Side effects — handles async operations (API calls) |
| **Axios** | v1.8 | HTTP client — makes API calls to backend |
| **Socket.IO Client** | v4.8 | WebSocket client — connects to real-time server |
| **Tailwind CSS** | v3.4 | CSS framework — utility-first styling |
| **Framer Motion** | v12.6 | Animation library — smooth transitions |
| **Zod** | v3.25 | Validation — validates forms and data |

### Database Tables (26 Total)

| # | Table Name | What Data It Stores |
|---|-----------|-------------------|
| 1 | `ADMINS` | Admin login accounts (email, password, name) |
| 2 | `CUSTOMERS` | Customer profiles (name, mobile, email, address, image) |
| 3 | `VENDORS` | Vendor/business profiles (name, business name, category, KYC, location) |
| 4 | `SERVICE_CATEGORIES` | Types of services (e.g., "Plumbing", "Electrical", "Cleaning") |
| 5 | `SERVICES` | Individual services under each category |
| 6 | `VENDOR_SERVICES` | Which vendor offers which services (and at what price) |
| 7 | `SERVICEBOOKINGS` | All bookings made by customers |
| 8 | `CUSTOMER_ADDRESSES` | Saved addresses of customers |
| 9 | `SUBSCRIPTIONS` | Subscription plans for vendors (Free Trial, Premium, etc.) |
| 10 | `VENDOR_SUBSCRIPTIONS` | Which vendor has which active subscription |
| 11 | `SUBSCRIPTIONPAYMENTSBYVENDOR` | Payment records for vendor subscriptions (Razorpay) |
| 12 | `CUSTOMERPAYMENTS` | Payment records for customer bookings |
| 13 | `CUSTOMERCOMPLAINTS` | Complaints filed by customers |
| 14 | `VENDORSCOMPLAINTS` | Complaints filed by vendors |
| 15 | `REVIEWS` | Customer ratings and reviews for vendors |
| 16 | `FAVOURITES` | Services that customers marked as favourite |
| 17 | `SLIDER_IMAGES` | Images shown in the homepage carousel/slider |
| 18 | `NOTIFICATIONS` | Notifications for customers and vendors |
| 19 | `LOCATION_TRACKING` | Live GPS coordinates during active bookings |
| 20 | `chat_room` | Chat rooms between customers and vendors |
| 21 | `messages` | Messages in customer-vendor chats |
| 22 | `chat_rooms` | Chat rooms between admin and vendors |
| 23 | `chat_messages` | Messages in admin-vendor chats |
| 24 | `otp` | OTP verification records |
| 25 | `service_with_category` | DATABASE VIEW — joins services with their categories |
| 26 | `CUSTOMER_SERVICE_DETAILS` | DATABASE VIEW — joins bookings with customer and service info |

---

## 🎯 Super Quick Start (Copy-Paste Cheat Sheet)

For experienced developers who just want to get it running fast:

```bash
# 1. Start MySQL
net start MySQL

# 2. Create database (if first time)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fast_dial;"
mysql -u root -p fast_dial < backend/database/fast_dial_schema.sql

# 3. Backend (Terminal 1)
cd backend
npm install
# Create .env with: DB_SERVER=localhost, DB_USER=root, DB_PASSWORD=<your-password>, DB_NAME=fast_dial
npm run dev

# 4. Frontend (Terminal 2)
cd user_vendor_frontend
npm install
# Create .env with: VITE_API_URL=http://localhost:3000/api/v1
npm run dev

# 5. Admin (Terminal 3 - Optional)
cd admin_frontend
npm install
# Create .env with: VITE_API_URL=http://localhost:3000/api/v1
npm run dev -- --port 5174
```

**URLs:**
- App: http://localhost:5173
- Admin: http://localhost:5174
- API: http://localhost:3000/health

---

> **📝 Remember:** The `.env` files are in `.gitignore` — they are NEVER uploaded to Git. Every person who downloads this project must create their own `.env` files with their own credentials. Never share your real API keys publicly!

---

**Made with ❤️ for the FastDial team**
