import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./db/config.js";
import { StatusCodes } from "http-status-codes";
import productsRoute from "./routes/products.route.js";

dotenv.config();

const app = express();
app.use(express.json());

connectToDB();

app.use("/api/v1/products", productsRoute);

app.use((err, req, res, next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal server error";
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
