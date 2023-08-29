import express = require("express");
import { setPassword } from "./adminController";

const adminRouter = express.Router();

adminRouter.post("/set-password/:id", setPassword);


export default adminRouter;
