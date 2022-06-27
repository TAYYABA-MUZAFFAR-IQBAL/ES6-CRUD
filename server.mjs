import express from "express";
import PathOfRegisterEmployee from "./Routes/path.mjs";
import Db from "./config/DataBase.mjs";
import path from "path";
import User from "./Models/Schema.mjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";


const app = express();

//SERVER CONNECTION
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//BODY PARSER
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

//USE ROUTES PATHS
app.use("/Employee", PathOfRegisterEmployee);

export default app;
