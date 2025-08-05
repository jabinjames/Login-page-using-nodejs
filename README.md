🔐 MERN Authentication System

This is a Node.js + Express backend server that supports user authentication and password reset via OTP (One-Time Password) through email. It uses MongoDB for data storage and JWT (JSON Web Tokens) for session management.

🚀 Features
✅ User Sign Up with username, email, and password

✅ Passwords are securely hashed using bcrypt

✅ JWT-based authentication for secure login

✅ OTP-based password reset via email

✅ Session handling with cookie-parser and express-session

✅ CORS-enabled for frontend integration (e.g., React)

✅ Environment variable support using dotenv

🛠️ Technologies Used
| Tech               | Description                          |
| ------------------ | ------------------------------------ |
| Node.js + Express  | Backend server                       |
| MongoDB + Mongoose | Database + ODM                       |
| JWT                | Token-based authentication           |
| Bcrypt             | Password hashing                     |
| Nodemailer         | Email sending for OTP                |
| Axios              | HTTP request handling (for frontend) |
| CORS               | Cross-Origin Resource Sharing        |

📦 Installation
1. Clone the repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies:
npm install

3. Run the server:
npm start

