import express from "express";
import connectToDb from "./models/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/auth.js"
import patientroutes from './routes/patients.js'
import appointmentroutes from './routes/appoinments.js'
import PracticionerRoutes from "./routes/practitioners.js";
import recordRoutes from "./routes/record.js"
// import Workspaceoutes from "./routes/workspace.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
));
app.use(cookieParser());
connectToDb()

app.use("/api/user", UserRoutes);
app.use("/api/patients", patientroutes);
app.use("/api/appointments", appointmentroutes);
app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app;