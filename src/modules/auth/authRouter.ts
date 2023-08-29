import express = require("express");

import { login } from "./authController";

const authRouter = express.Router();

authRouter.post("/login", login);

export default authRouter;

