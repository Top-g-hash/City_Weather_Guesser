const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

   
});
app.post("/", function (req, res){
 
    const queryCity = req.body.cityName;
const apiKey ="1f3ea40177e89ec7d11f7a7259528e8b";
const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+queryCity+"&appid="+apiKey+"&units="+units+"#"
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherDATA = JSON.parse(data)
        const temp = weatherDATA.main.temp
        const weatherDescription = weatherDATA.weather[0].description
        const icon = weatherDATA.weather[0].icon
        const imgURl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p>The weather currently is "+weatherDescription+"</p>")
       res.write("<h1>The temperature in "+queryCity+" is "+temp+" degree Celcius</h1>")
       res.write("<img src="+ imgURl+">");
       res.send()


        })
    })

   
})



app.listen(3000, function(){
    console.log("Server is running at port 3000");
});