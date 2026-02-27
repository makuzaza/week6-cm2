const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// POST /login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw Error("All fields must be filled");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw Error("Incorrect email");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error("Incorrect password");
        }

        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// POST /signup
const signupUser = async (req, res) => {
    const { name, email, password, phone_number, gender, address } = req.body;

    try {
        if (!email || !password) {
            throw Error("All fields must be filled");
        }
        if (!validator.isEmail(email)) {
            throw Error("Email not valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }
        const exists = await User.findOne({ email });

        if (exists) {
            throw Error("Email already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hash, phone_number, gender, address });

        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };