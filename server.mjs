import express from "express";
import PathOfRegisterEmployee from "./Routes/path.mjs";
import Db from "./config/DataBase.mjs";
import mongoose from "mongoose";
const app = express();

//SERVER CONNECTION
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//BODY PARSER
app.use(express.json());

//USE ROUTES PATHS
app.use("/Employee", PathOfRegisterEmployee);

export default app;
