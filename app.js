const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res){
    const query = req.body.cityName;
    const apiKey = '90826cd320c29774496b28a3a8b1645a';
    const unit = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units='+unit
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
            res.write("<p>The weather is currently "+ weatherDescription+"</p>");
            res.write("<h1>The temperature in "+ query +" is "+ temp + ' degree celsius</h1>');
            res.write("<img src="+iconURL+">")
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log('server is runnning');
})