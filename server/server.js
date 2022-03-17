const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: '466c93f9cbb344b292f2b74a53abdd31',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

app.use(rollbar.errorHandler());

rollbar.log("Hello world!");

// Middleware
app.use(express.static(path.join(__dirname, "../public")));

// Add the images folder.
app.use('/images', express.static(path.join(__dirname, "../public/images")))

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log(`Server is hosted on ${port}`)
    rollbar.info(`Server initialized on ${port}`)
})

// Rollbar Stuff

app.get('/rollbar/functionTest', (req, res) => {
    
    res.status(200).send("Break site request received.");
    try {
        nonExistentFunction();
    } catch (error) {
        // console.error(error);
        rollbar.error(error)
    }
})

app.get('/rollbar/criticalFunctionTest', (req, res) => {
    
    res.status(200).send("Critical log request received.");
    try {
        getPokemon(0);
    } catch (error) {
        console.error(error);
        rollbar.critical(error)
    }
})


