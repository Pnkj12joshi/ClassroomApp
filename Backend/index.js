const express = require("express");
const app = express();
const dot = require("dotenv");
const connectDB = require("./config/db");
const Principaluser = require("./model/Principal");
const bcrypt = require("bcrypt");
const {route} = require ("./routes/authroutes");
const {prouter} = require("./routes/principalroutes");
const {sroute} = require("./routes/studentroutes");
const {troute} = require("./routes/teacherroutes");
const authmiddleware = require('./middleware/authmiddleware');
const cors = require("cors");


dot.config();
connectDB();
//email and password for Principal database 


const PrivalPrincipal = async () => {
    const email = "principal@classroom.com";
    const password = "Admin";

    try {
        const existingPrincipal = await Principaluser.findOne({ email });
        if (!existingPrincipal) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const principal = new Principaluser({
                email,
                password: hashedPassword,
                role: "principal",
            });
            await principal.save();
            console.log("Principal account created successfully");
        } else {
            console.log("Principal account already exists");
        }
    } catch (error) {
        console.error("Error seeding principal account:", error.message);
    }
};

app.use(cors( {origin:`http://localhost:3000`}));
PrivalPrincipal();
app.use(express.json());
app.use("/",route);
app.use("/principal", authmiddleware,prouter);
app.use("/teacher",authmiddleware,troute);
app.use("/student",authmiddleware,sroute);
const PORT = process.env.PORT;
app.listen(PORT,()=>console.log("Server is started", PORT));