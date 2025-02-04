const express = require("express");
const { signUp, login, logout, createBooking, applyCoupon } = require("../controllers/user.controller");

const router = express.Router();

// POST /auth/signup
router.post("/signup", signUp);

// POST /auth/login
router.post("/login", login);

// POST /auth/logout
router.post("/logout", logout);

// POST /auth/bookings
router.post("/bookings", createBooking);

// GET /auth/coupons
router.get("/coupons", applyCoupon);

module.exports = router;
