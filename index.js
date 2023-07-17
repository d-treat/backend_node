require('dotenv').config();
const express = require('express');
const { db } = require('./utils/database.js');

// Import the route files
const addressRoutes = require('./routes/addressRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const caseRoutes = require('./routes/caseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const hospitalAdminRoutes = require('./routes/hospitalAdminRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4040;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  return res.send('Hello world...');
});

app.listen(PORT, () => {
  console.log(`Listening at port :${PORT}`);
});

start();
