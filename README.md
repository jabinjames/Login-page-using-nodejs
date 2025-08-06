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

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/jabinjames/Login-page-using-nodejs)


3. Install dependencies:

npm install

5. Run the server:

npm start

📂 API Endpoints

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | `/signup`          | User registration             |
| POST   | `/login`           | User login (JWT)              |
| POST   | `/forgot-password` | Send OTP to email             |
| POST   | `/verify-otp`      | Verify OTP and reset password |

🔒 Security Notes

. Passwords are stored only after hashing with bcrypt

. JWT tokens are sent via HTTP-only cookies

. Environment variables (in .env) handle sensitive data

📝 License

This project is open-source and available under the MIT License.
