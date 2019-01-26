/**
* Backend app.js
*
**/

var express = require("express");
var app = express();
var port = 8080; //Port to run webserver on.

app.listen(port, () => {
	console.log("Server running on port "+port);
});

app.get("/api/signin", (req, res, next) => {
	res.json(req.params);
	//res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
