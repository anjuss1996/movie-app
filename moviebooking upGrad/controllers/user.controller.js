// controllers/userController.js
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const TokenGenerator = require("uuid-token-generator");
const { v4: uuidv4 } = require("uuid");
const b2a = require("b2a");

const tokenGen = new TokenGenerator(256, TokenGenerator.BASE62);

// POST /auth/signup
exports.signUp = async (req, res) => {
    try {
        const { first_name, last_name, email_address, mobile_number, password } = req.body;
        if (!first_name || !last_name || !email_address || !mobile_number || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const username = first_name + last_name;
        const hashedPassword = b2a.btoa(password);
        const user = new User({
            uuid: uuidv4(),
            first_name,
            last_name,
            username,
            email_address,
            mobile_number,
            password: hashedPassword,
            isLoggedIn: false,
            accessToken: ""
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// POST /auth/login
exports.login = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Basic ")) {
            return res.status(400).json({ message: "Authorization header is required" });
        }

        const base64Credentials = authHeader.split(" ")[1];
        const decodedCredentials = b2a.atob(base64Credentials).split(":");
        const email_address = decodedCredentials[0];
        const password = decodedCredentials[1];

        const user = await User.findOne({ email_address });
        const pp = b2a.atob(user.password)
        if (!user || b2a.atob(user.password) !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        user.isLoggedIn = true;
        user.accessToken = tokenGen.generate();
        await user.save();

        res.json({
            message: "Login successful",
            id: user.uuid,
            "access-token": user.accessToken
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// POST /auth/logout
exports.logout = async (req, res) => {
    try {
        const { uuid } = req.body;
        if (!uuid) {
            return res.status(400).json({ message: "UUID is required" });
        }

        const user = await User.findOne({ uuid });
        if (!user || !user.isLoggedIn) {
            return res.status(400).json({ message: "User is not logged in" });
        }

        user.isLoggedIn = false;
        user.accessToken = "";
        await user.save();

        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out", error });
    }
};

// POST /api/auth/bookings
exports.createBooking = async (req, res) => {
    try {
        const { customerUuid, bookingRequest } = req.body;
        if (!customerUuid || !bookingRequest || !bookingRequest.tickets) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findOne({ uuid: customerUuid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.bookingRequests) {
            user.bookingRequests = [];
        }

        const referenceNumber = Math.floor(10000 + Math.random() * 90000);

        const newBooking = new Booking({
            customerUuid,
            coupon_code: bookingRequest.coupon_code || "",
            tickets: bookingRequest.tickets,
        });
        await newBooking.save();

        user.bookingRequests.push({
            reference_number: referenceNumber,
            coupon_code: bookingRequest.coupon_code || "",
            show_id: bookingRequest.show_id || null,
            tickets: bookingRequest.tickets,
        });
        await user.save();

        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking", error: error.message || error });
    }
};

// POST /api/auth/applyCoupon
exports.applyCoupon = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ message: "Invalid coupon code" });
        }
        const discountValue = Math.floor(Math.random() * 21);

        res.status(201).json({ discountValue });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error });
    }
};