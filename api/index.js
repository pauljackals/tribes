const express = require('express');
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const worlds = require('./routes/worlds');
const villages = require('./routes/villages');

app.use(cors())
app.use(express.json());

app.use('/users', users);
app.use('/worlds', worlds);
app.use('/villages', villages);

require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE
};

const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(response => {
        console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
        const port = process.env.PORT
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));