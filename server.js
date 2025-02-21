const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = "john_doe_17091999";  // Replace with your details
const EMAIL = "john@xyz.com";         // Replace with your details
const ROLL_NUMBER = "ABCD123";        // Replace with your details

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
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
