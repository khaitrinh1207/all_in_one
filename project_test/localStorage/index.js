const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, function () {
    console.log("Your app running on port " + port);
})
