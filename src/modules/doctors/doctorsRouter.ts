import express = require("express");
import { createDoctor } from "./doctorsController";
import { seedDoctor } from "../../seed";

const doctorsRouter = express.Router();

doctorsRouter.post("/", createDoctor);
doctorsRouter.post("/seed", seedDoctor);

export default doctorsRouter;