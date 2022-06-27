import User from "../Models/Schema.mjs";
import roles from "../helper.mjs";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

class PermessionFunc {
  constructor() {
    this.getUsers = async (req, res, next) => {
        try {
          if (!(res.locals.loggedInUser.role===roles.Admin)) {
            console.log("you have no access to get all data");
            return res.json({
               message: "no acess",
             });
            
          } else {
            const users = await User.find({}).select("-password");
            console.log("All employees list Extracted....", users);
            return  res.status(400).json({
              data: users,
            });
                  
          }
                  
      } catch (error) {
        next(error);
      }
    };

    this.getUser = async (req, res, next) => {
      try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
          if (!user) return next(new Error("User does not exist"));
        console.log("Extracted User from id", user);
        return res.status(400).json({
          data: user,
        });
        
      } catch (error) {
        next(error);
      }
    };

    this.updateUser = async (req, res, next) => {
      try {
        const { role } = req.body;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, { role });
        const user = await User.findById(userId);
        console.log("Employee updated successfully...");
        res.status(400).json({
          data: user,
          message: "updated Sucessfully..",
        });
      } catch (error) {
        next(error);
      }
    };

    this.deleteUser = async (req, res, next) => {
      try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        console.log("Employee deleted successfully...");
        res.status(400).json({
          data: null,
          message: "User has been deleted",
        });
      } catch (error) {
        next(error);
      }
    };
  }
}
export default new PermessionFunc();
