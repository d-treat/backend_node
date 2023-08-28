import express = require("express");
import multer = require("multer");
const upload = multer({ dest: 'uploads/' });

import {
    deleteFile, uploadFile, getFile
} from "./filesController";
const filesRouter = express.Router();

filesRouter.post("/upload", upload.single('file'), uploadFile);
filesRouter.delete("/:id", deleteFile);
filesRouter.get("/:id", getFile);

export default filesRouter;