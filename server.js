const express = require('express');
const app = express();
const port = 3000;

const logger = require('./logger');

const serve = () => {
    app.get('/ping', (req, res) => {
        res.send(`<html><head><link rel="icon" href="https://bit.ly/haicon"><meta name="viewport"content="width=device-width,initial-scale=1"><title>I'm alive</title></head><body style='padding-top:10px;background-color:#121212;color:#fff;font-family:"Trebuchet MS",sans-serif;text-align:center;'><h1>I'm Alive!</h1><img style="border-radius:7px"src="https://bit.ly/haicon"width="128"height="128"></img><hr style="margin:20px"><p>Server Time: ${new Date().toString()}</p></body></html>`)
    });

    app.listen(port, () => {
        logger.info(`Web server listening at port ${port}`)
    });
}

module.exports = { serve };