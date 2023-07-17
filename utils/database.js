require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Set strictQuery to false

const URL = process.env.DB_URL;

module.exports.db = async () => {
  mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the db'))
    .catch((err) => console.log(err));
};
