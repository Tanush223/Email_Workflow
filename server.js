const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");

const authRoutes = require("./Routes/authRoutes");
const gmailRoutes = require("./Routes/gmailRoutes");
const calendarRoutes = require("./Routes/calendarRoutes");
const aiRoutes = require("./Routes/aiRoutes");

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));

app.get('/',(req,res)=>{
    res.json("hey")
})
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/gmail", gmailRoutes);
app.use("/calendar", calendarRoutes);
app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
