console.log("***** NEW SERVER.JS IS RUNNING *****");

const express = require("express");
const cors = require("cors");
const db = require("./db");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = "jobportal_secret_key";

app.use(cors());
app.use(express.json());

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Test MySQL connection
db.query("SELECT 1", (err, result) => {
  if (err) {
    console.log("Database Error:", err);
  } else {
    console.log("Database Connected!", result);
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Home Route Working");
});

// Register GET Route
app.get("/register", (req, res) => {
  res.send("GET Register Working");
});

// Register POST Route
app.post("/register", (req, res) => {
  console.log("POST /register route reached");
  console.log(req.body);

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.log("Registration Error:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "Email already exists. Please use another email.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Registration failed",
      });
    }

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  });
});

// Login POST Route
app.post("/login", (req, res) => {
  console.log("POST /login route reached");
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: true,
      message: "Email and password are required",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log("Login Error:", err);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Login successful
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});
// Protected Profile Route
app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile accessed successfully",
    user: req.user,
  });
});
// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});