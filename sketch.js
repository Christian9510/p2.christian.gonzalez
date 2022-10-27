let capture;
let curr_temp
let curr_short_forecast
let clockFont;

async function get_temp(){
     const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
     const json = await response.json()
     console.log(json)
     curr_temp = json.properties.periods[0].temperature
     curr_short_forecast = json.properties.periods[0].shortForecast
 }

function setup() {
  
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(1920, 1080);
  capture.position(100,50);

  background(50);
  createCanvas(400, 400);
  get_temp()
  
  createCanvas(windowWidth, windowHeight);
  clockFont = loadFont("digital-7.ttf");
}

function windowResized()
{
 resizeCanvas(windowWidth, windowHeight);
}

 function draw(){
     
     background(255);
     clock();
   
     textSize(32)
     fill(0)
     textAlign(LEFT, CENTER)
     text(curr_temp, 50, 50)
     textSize(18)
     fill(0)
     textAlign(LEFT, CENTER)
     text(curr_short_forecast, 50, 80);
   
}

function clock()
{
  fill("rgb(0,0,0)");
  textFont(clockFont);
  textAlign(CENTER, TOP);
  textSize(width/12);
  
  let Hour = hour();
  let min = minute();
  let secs = second()
  let noon = Hour >= 12? " PM" : " AM"
  if(min < 10)
    min = "0"+min
  Hour%=12
  text(Hour+":"+min+":"+secs+noon, width/2, 65); 
}
