const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://admin:admin@cluster0.pddz49u.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
