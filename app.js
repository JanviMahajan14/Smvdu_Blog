const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const { MONGO_URI } = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => {
    console.log("MongoDb is connected!!");
})
mongoose.connection.on('error', (err) => {
    console.log("connecting ", err)
})

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require('./routes/post'));
app.use(require('./routes/people'));
app.use(require('./routes/file'));

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})
