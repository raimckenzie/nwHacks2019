/**
* Backend app.js
*
**/

var express = require("express");
var app = express();
var port = 80; //Port to run webserver on.

app.listen(80, () => {
	console.log("Server running on port 80");
});
