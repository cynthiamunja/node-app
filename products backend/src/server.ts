import express, { json } from 'express';
import categoriesRouter from './routes/categoriesRoute';
import productRouter from './routes/productsRoute';
import authRouter from './routes/authRoutes';

const app = express();
app.use(json());
app.use("/categories", categoriesRouter);
app.use("/products", productRouter);
app.use("/auth", authRouter);
app.listen(3000, () => { console.log("server is running...") });
