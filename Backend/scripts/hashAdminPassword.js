// scripts/hashAdminPassword.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Admin = require("../models/Admin");

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB");

        const admin = await Admin.findOne({ email: "krinakhunt12@gmail.com" }); // change to your admin email
        if (!admin) {
            console.log("❌ Admin not found");
            return process.exit(1);
        }

        // Only hash if not already hashed
        if (!admin.password.startsWith("$2a$") && !admin.password.startsWith("$2b$")) {
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            admin.password = hashedPassword;
            await admin.save();
            console.log("✅ Password hashed successfully");
        } else {
            console.log("ℹ️ Password already hashed");
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();