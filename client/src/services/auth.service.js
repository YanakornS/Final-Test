import api from "./api";
import Tokenservice from "./Token.service";
import { Cookies } from "react-cookie";

const API_URL = "http://localhost:5000/api/v1"; // กำหนด API_URL ที่ถูกต้อง

const register = async (fullName, email, password, phoneNumber) => {
  return await api.post(`${API_URL}/register`, {
    fullName,
    email,
    password,
    phoneNumber,
  });
};

const cookies = new Cookies();

const login = async (email, password) => {
  try {
    // ใช้ API_URL ที่ถูกต้อง
    const response = await api.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    // เก็บ token ลงใน cookies
    cookies.set("token", accessToken, {
      expires: new Date(Date.now() + 86400000),
    });
    cookies.set("user", JSON.stringify(user), {
      expires: new Date(Date.now() + 86400000),
    });

    Tokenservice.setUser(user); // Set user ใน Tokenservice
    return response.data; // ส่งค่าผลลัพธ์กลับ
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response ? error.response.data.message : error.message;
  }
};

const logoutCookies = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("user", { path: "/" });
};

const getCurrentUser = () => {
  return Tokenservice.getUser();
};

const AuthService = {
  register,
  login,
  getCurrentUser,
  logoutCookies,
};

export default AuthService;
