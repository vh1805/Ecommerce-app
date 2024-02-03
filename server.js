import express from 'express';
import colors from 'colors'
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDb from './config/db.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

connectMongoDb(process.env.MONGO_URL)
.then(() => console.log('Mongo Db connected'))
.catch(() => console.log('Mongo Db Error'))


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.get("/", (req,res) => {
    return res.json({msg : `Welcome to node server`})
})

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`server started on mode ${process.env.DEV_MODE} at port: ${PORT}`.bgCyan.white)
});