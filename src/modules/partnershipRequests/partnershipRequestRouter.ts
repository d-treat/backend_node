import express = require("express");
import {
    createRequest,
    getAllRequests,
    approveRequest,
    rejectRequest

} from "./PartnershipRequestController"
const partnershipRequestRouter = express.Router();

partnershipRequestRouter.post("/", createRequest);
partnershipRequestRouter.get("/", getAllRequests);
partnershipRequestRouter.put("/approve/:requestId", approveRequest);
partnershipRequestRouter.put('/reject/:requestId', rejectRequest);


export default partnershipRequestRouter;