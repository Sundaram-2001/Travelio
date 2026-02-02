import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: 'https://travelio-1-hq8n.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());


app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});


app.use("/", router); 


app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

app.get("/ping",async(req,res)=>{
    res.status(200).end("keep up...")
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});