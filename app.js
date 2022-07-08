const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    
  res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){

    // console.log(req.body.cityname)
 
    
    
    const place = req.body.cityname ;
    const appkey = "3ae65dd843c14f6285d22294673ff0e0" ;
    const unit = "metric"
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + appkey + "&units=" + unit; 

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            // console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            // console.log(weatherDescription);
            const icon = weatherData.weather[0].icon
            const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temprature in "+ place +" is " + temp + " degrees Celcius.</h1>" );
            res.write("<img src=" + imageurl+">")
            res.write("<p>The weather is currently " + weatherDescription + "</p>");           
            res.send()
        })
    })

})
    // res.send("server is up and running")




app.listen(3000, function(){
    console.log("server is running on port 3000. ");
})




