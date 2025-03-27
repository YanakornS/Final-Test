const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

// Verify Token
verifyToken = (req, res, next) => {
  // รับ Token จาก header
  const token = req.headers["x-access-token"];
  // ตรวจสอบว่า Token มีหรือไม่
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Forbidden!!" });

    // ตรวจสอบว่า decoded มีข้อมูลที่คาดหวัง
    console.log("Decoded Token:", decoded);

    req.email = decoded.email; // เก็บ email ที่ได้จาก token
    req.userId = decoded.id; // เก็บ id ที่ได้จาก token
    req.role = decoded.role; // เก็บ role ที่ได้จาก token

    next(); // ไปยัง middleware หรือ controller ถัดไป
  });
};

// ตรวจสอบว่าเป็น admin หรือไม่
isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Require Admin Role" });
  }
  next(); // ถ้าเป็น admin ก็ให้ไปต่อที่ controller
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
