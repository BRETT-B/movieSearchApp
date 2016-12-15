const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("search"));

app.get("/results", (req, res) => {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {movieData : data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => console.log("Server is listening..."));