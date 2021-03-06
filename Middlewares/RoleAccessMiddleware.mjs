// import roles from "../RolesPermission.mjs";
import EmpSchema from "../Models/Schema.mjs";
import roles from "../helper.mjs";
import jwt from "jsonwebtoken";
import logic from "../Controllers/AcessLogicController.mjs";
import {} from "dotenv/config";

const VerifyLoginUser = async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { user_id, exp } = jwt.verify(accessToken, process.env.TOKEN_KEY);
           // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      res.locals.loggedInUser = await EmpSchema.findById(user_id);
      const user= res.locals.loggedInUser ;
      console.log("Welcome ",user.first_name);
      res.json("Welcome Login User ");
      next();
    } catch (error) {
      console.log("Token not valid");
      res.json("Must provide valid token");
    }
  } else {
    return res.status(401).json({
      error: "You need to be logged in to access this route",
    });
  }
};

function authorize(role=[]) {
  
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === "string") {
         roles = [roles];
     }

  return [
    // // authenticate JWT token and attach user to request object (req.user)
    // jwt({ TOKEN_KEY, algorithms: ['HS256'] }),

    // authorize based on user role
    (req, res, next) => {
      const loginuser = res.locals.loggedInUser;
      console.log("Your Role: ",loginuser.role);
      

      if (roles.length && !roles.includes(roles)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      } else if (loginuser.role===roles.Admin) {
        console.log("You have access..");
        next();
      } else if (loginuser.role===roles.RegularUser) {
        console.log(req.params.id);
        console.log(loginuser.id);
        if(loginuser.id===req.params.id)
        {
          next();
        }else{
          console.log("You have only access to get and update your own data..")
        }
             
      }else if(loginuser.role===roles.guest){
         if(loginuser.id===req.params.id)
        {
           next();
        }else{
          console.log("You have only access to get your own data..")
        }
                
          
      }else{
        console.log("your role must be..Admin,RegualrUser or guest");
      }
    },
  ];
}

// const grantAccess = function (action, resource) {
//        return (req, res, next) => {

//     try {
//       const permission = roles.can(req.user.role)[action](resource);

//       if (!permission.granted) {
//         return res.status(401).json({
//           error: "You don't have enough permission to perform this action",
//         });
//       } else {
//         next();
//       }
//   }
//   catch (error) {
//       next(error)
//       console.log("error occured");
//       res.json("error")
//   }

//    };
// };
export default {
  // grantAccess,
  VerifyLoginUser,
  authorize,
};
