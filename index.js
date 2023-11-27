import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import Path from "path";
import {fileURLToPath} from "url";

//configure env
dotenv.config();

//databse config
connectDB();

//EsMosule 6
const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
  );
});
