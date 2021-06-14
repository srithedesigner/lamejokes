const express = require('express');
const https = require('https');
const app = express();
const ejs = require("ejs");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){

    res.render('index',{jokes:jokes, jokep:jokep});
});
var jokep = "Why is 6 afraid of 7 in hexadecimal Canada?";
var jokes = "Because 7 8 9 A?";

app.post('/',function(req, res){

    // Programming,Dark,Pun,Spooky
    var s = "";
    console.log(req.body.prog);
    s = [];
    if(req.body.prog){
        s .push("Programming");
    }
    if(req.body.pun){
        s.push("Pun");
    }
    if(req.body.dark){
        s.push("Dark");
    }
    if(req.body.spooky){
        s.push("Spooky");
    }
    var url = "https://v2.jokeapi.dev/joke/"
    for(var i = 0; i< s.length-1; i++)
    {
        url = url + s[i]+",";
    }
    url = url + s[s.length-1];
    if(s.length ==0){
        url = "https://v2.jokeapi.dev/joke/Any";
    }
    console.log(url);

    https.get(url, function(response){
        response.on('data', function(data){
            const jokedata = JSON.parse(data);
            if(jokedata.type == "twopart")
            {
                jokep = jokedata.setup;
                jokes = jokedata.delivery;
            }else{
                jokep = jokedata.joke;
            }

            res.render('index',{jokes:jokes, jokep:jokep});

        });
    });
});


app.listen(7000, function(){
    console.log("server running on 7000");
});
