const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        let numbers = [];
        let alphabets = [];

        data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) alphabets.push(item);
        });

        const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: "amit_kumar_01011999",
            email: "amit@example.com",
            roll_number: "CU123456",
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

module.exports = app;
