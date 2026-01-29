import express from "express";
import router from "./routes/routes.js";
import cors from "cors"


const app = express();


app.use(cors({
    origin:'https://travelio-1-hq8n.onrender.com',
    credentials:true
}))
app.use(express.json());

app.use("/", router); 

app.listen(3000, '0.0.0.0',() => {
    console.log(" Node.js API listening on http://localhost:3000");
});