var express = require("express");
var request = require("request");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
})

app.get("/list", function(req, res){
    var search = req.query.movie_name;
    
    const url = "http://www.omdbapi.com/?apikey=c44f040&s=" + search;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            // console.log(data["Search"][0].Title);
            res.render("list", {data : data});
        } else {
            console.log("SOMETHING WENT WRONG!!!")
            res.send("<h1>Page Not Found</h1>");
        }
    })

})

var PORT = process.env.PORT || 8080;

app.listen(PORT, process.env.IP, function(){
    console.log("Server is Started!!!");
})
