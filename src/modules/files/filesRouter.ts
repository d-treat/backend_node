import express = require("express");
import multer = require("multer");
const upload = multer({ dest: 'uploads/' });

import {
    deleteFile, uploadFile
} from "./filesController";
const filesRouter = express.Router();

filesRouter.post("/upload", upload.single('file'), uploadFile);
filesRouter.delete("/:id", deleteFile);

export default filesRouter;