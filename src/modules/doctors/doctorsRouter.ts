import express = require("express");
import { createDoctor } from "./doctorsController";

const doctorsRouter = express.Router();

doctorsRouter.post("/", createDoctor);

export default doctorsRouter;