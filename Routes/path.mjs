import express from "express";
// import verify from "jsonwebtoken";
var router = express.Router();
import roles from "../helper.mjs";
import Funccontroller from "../Controllers/LogicSetterControllers.mjs";
import Acess from "../Middlewares/RoleAccessMiddleware.mjs";
import LGController from "../Controllers/AcessLogicController.mjs";

//paths detail
// register new employee route
router.route("/Signup").post(Funccontroller.registerEmployee);
//login route
router.route("/Login").post(Funccontroller.LoginEmployee);
//get All
router
  .route("/GetAcessToAllRecord")
  .get(
    Acess.VerifyLoginUser,
    LGController.getUsers
  );
//get by id
router.get("/Get/:id", Acess.VerifyLoginUser, Acess.authorize(),LGController.getUser);

router.put("/Update/:id", Acess.VerifyLoginUser, Acess.authorize);

router.delete("/Delete/:id", Acess.VerifyLoginUser, Acess.authorize);

export default router;
