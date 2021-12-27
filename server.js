// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
// configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

// enable cors
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 4000

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening () {
    console.log(`server running on http://localhost:${port}`);
};

// POST '/add'
app.post('/addWeatherData', postData)

function postData (req, res) {
    projectData = req.body;
    res.send();
}

// GET '/all'
app.get('/sendWeatherData', getData)

function getData (req, res) {
    res.send(projectData); 
}


