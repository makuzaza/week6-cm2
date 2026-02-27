const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Full name of the user
        email: { type: String, required: true, unique: true }, // Unique username for login
        password: { type: String, required: true }, // Hashed password for authentication
        phone_number: { type: String, required: true }, // Contact phone number
        gender: { type: String, required: true }, // Gender of the user
        address: {
            street: { type: String, required: true }, // Street address
            city: { type: String, required: true }, // City
            zipCode: { type: String, required: true } // Postal/ZIP code
        }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('User', userSchema)