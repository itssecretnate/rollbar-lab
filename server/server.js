const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use(express.static(path.join(__dirname, "../public")));

// Add the images folder.
app.use('/images', express.static(path.join(__dirname, "../public/images")))

const port = process.env.PORT || 4005;

app.listen(port, () => {console.log(`Server is hosted on ${port}`)})


