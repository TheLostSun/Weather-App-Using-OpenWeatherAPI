const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));//To be able to parse the data posted by the form.

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");//To send the html file with the form that allows us to post data.

});

app.post("/",function(req,res)
{
    console.log(req.body.cityName);//Since the name of the input was cityName hence we can use it.
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=c4f2e2e0c91827cfcfe664d78fbc4418&units=metric";
    https.get(url,function(response){
        if(response.statusCode==200)//Checks if the input is valid and the api can be used to fetch data .
        {
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            const icon=weatherData.weather[0].icon;
            console.log(weatherData.weather[0].icon);
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1> The weather is currently "+weatherData.weather[0].description+".</h1>");
           res.write("<h2>The weather in "+query+" is "+weatherData.main.temp+".</h2>");
           res.write("<img src="+imageurl+">");
            res.send();
        })
        }
        else//Will display error if the status code is anyting other than 200.
        {
            res.send("<h1>Invalid Input</h1>");
        }
        })
    });
app.listen(3000,function(){console.log("Server is running on port 3000");});

    