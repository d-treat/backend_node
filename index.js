const dotenv = require("dotenv");
const express = require('express');
const { db } = require('./utils/database.js');
const middlewareSetup = require('./middleware/middleware.js');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4040;
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const { application, urlencoded } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
dotenv.config();
const fileupload  = require('express-fileupload')
const  swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc')
const SwaggerDocument = require('./swagger/swagger.json')

// Import the route files
const addressRoutes = require('./routes/addressRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const caseRoutes = require('./routes/caseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const hospitalAdminRoutes = require('./routes/hospitalAdminRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const imageRoutes = require('./routes/imageRoutes');



app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(SwaggerDocument)
);

app.use(cors({
    
  explore:true,
}))

var options = {
  explore:true,
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(fileupload())
const upload = multer({dest: './dtreat_images'});
var type = upload.single('recfile')

// Use the routes
app.use(addressRoutes);
app.use(appointmentRoutes);
app.use(caseRoutes);
app.use(contactRoutes);
app.use(doctorRoutes);
app.use(hospitalAdminRoutes);
app.use(hospitalRoutes);
app.use(imageRoutes);

function start() {
  const database = db();
  // setupRouter(app, database)
}

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="./public/css/styles.css">
      </head>
      <body>
        <h1 class="greeting">Welcome to D_treat Backend!</h1>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Listening at port :${PORT}`);
});

start();
