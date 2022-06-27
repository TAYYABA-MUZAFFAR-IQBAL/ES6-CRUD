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

// //token verifcation
// app.use(async (req, res, next) => {
//   if (req.headers["x-access-token"]) {
//     try {
//       const accessToken = req.headers["x-access-token"];
//       console.log(jwt.verify(accessToken, process.env.TOKEN_KEY));
//       const { user_id, exp, email } = jwt.verify(
//         accessToken,
//         process.env.TOKEN_KEY
//       );
//       console.log(user_id, email);
//       // If token has expired
//       if (exp < Date.now().valueOf() / 1000) {
//         return res.status(401).json({
//           error: "JWT token has expired, please login to obtain a new one",
//         });
//       }
//       res.locals.loggedInUser = await User.findById(user_id);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return res.status(401).json({
//       error: "You need to be logged in to access this route",
//     });
//       }
// });

//USE ROUTES PATHS
app.use("/Employee", PathOfRegisterEmployee);

export default app;
