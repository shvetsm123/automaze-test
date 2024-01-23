const express = require("express");
const connectDB = require("../src/utils/db");
const taskController = require("./controllers/taskController");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", taskController.getAllTasks);
app.post("/", taskController.createTask);
app.delete("/:id", taskController.removeTask);
app.patch("/:id", taskController.updateTask);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
