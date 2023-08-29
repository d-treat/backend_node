import express = require("express");
import { createInvite, getInvite } from "./invitesController";
const invitesRouter = express.Router();

invitesRouter.post("/", createInvite);
invitesRouter.get("/:inviteId", getInvite);

export default invitesRouter;