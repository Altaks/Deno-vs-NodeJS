"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var port = 3000;
var count = 0;
app.get('/', function (req, res) {
    res.send({
        hello: "You are the ".concat(++count, "'th user since startup")
    });
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
