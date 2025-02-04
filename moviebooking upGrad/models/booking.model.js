const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    customerUuid: { type: String, required: true },
    coupon_code: { type: String, default: "" },
    tickets: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
