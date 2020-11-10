const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/keys');
const PORT = process.env.PORT || 5002;

mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
    console.log("MongoDb is connected!!");
})
mongoose.connection.on('error', (err) => {
    console.log("connecting ", err)
})

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})