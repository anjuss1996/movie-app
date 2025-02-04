const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email_address: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isLoggedIn: { type: Boolean, default: false },
    accessToken: { type: String, default: "" },
    coupens: [{ id: Number, discountValue: Number }],
    bookingRequests: [
        {
            reference_number: Number,
            coupon_code: Number,
            show_id: Number,
            tickets: [Number]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
