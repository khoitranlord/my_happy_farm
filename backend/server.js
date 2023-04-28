const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 5000;

const dotenv = require('dotenv');
dotenv.config();

const rootRoutes = require('./routes/index')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1', rootRoutes);

server.listen(port, (req, res) => {
    console.log(`server listening on port ${port}`);
})