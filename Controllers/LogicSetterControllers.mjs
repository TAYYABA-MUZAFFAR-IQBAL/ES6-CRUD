import EmpSchema from "../Models/Schema.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "dotenv/config";
const salt=10;
class EmployeeFunc {
  constructor() {
    //register Employee
    this.registerEmployee = async (req, res) => {
      try {
        // Get user input
        const { first_name, last_name, email, password, role } = req.body;
        
        // Validate user input
        if (!(email && password && first_name && last_name && role)) {
          
          res.status(400).send("All input is required");
        }
        console.log("hello");
        // check if user already exist
        // Validate if user exist in our database
        const oldemployee = await EmpSchema.findOne({ email });

        if (oldemployee) {
          return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10,salt);
        

        // Create user in our database
        const user = await EmpSchema.create({
          first_name,
          last_name,
          email: email.toLowerCase(),
          password: encryptedPassword,
          role: role ,
        });

        // Create token
        const token = jwt.sign(
          { user_id: user._id, first_name, last_name, email, role },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
        console.log("user Register Sucessfully..");
        return res
          .status(200)
          .json({
            status: true,
            token: token,
            user,
            message: "Register Sucessfully.. ",
          });
      } catch (err) {
        console.log(err);
      }
    };

    //Login Employee
    this.LoginEmployee = async (req, res) => {
      try {
        // Get user input
        const { email, password } = req.body;
        console.log(email, password)

        // Validate user input
        if (!(email && password)) {
         return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await EmpSchema.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // user
          console.log("Welcome 🙌", user.first_name);
          res
            .status(200)
            .json({ status: true, token: token, user, message: "Welcome 🙌 " });
        } else {
         return res.status(400).json("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
        return res.json({ message: "user not exsists...please register" });
      }
    };


  }
}

export default new EmployeeFunc();
