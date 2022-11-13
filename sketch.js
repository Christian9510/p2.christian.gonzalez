let capture;
let curr_temp
let curr_short_forecast

async function get_temp(){
     const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
     const json = await response.json()
     console.log(json)
     curr_temp = json.properties.periods[0].temperature
     curr_short_forecast = json.properties.periods[0].shortForecast
 }

function setup() {
  
  createCanvas(400, 400);
  //createCanvas(390, 240);
  //capture = createCapture(VIDEO);
  //capture.size(740, 840);
  //capture.position(100,50);

  background(255);
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
     textSize(32)
     fill(0)
     textAlign(LEFT, CENTER)
     text(curr_temp, 50, 50)
     textSize(18)
     fill(0)
     textAlign(LEFT, CENTER)
     text(curr_short_forecast, 50, 80);
     
     strokeWeight(4);
     var sec = second();
     var min = minute();
     var hrs = hour();
     var mer = hrs < 12 ? "AM":"PM";
     sec = formatting(sec);
     min = formatting(min);
     hrs = formatting(hrs % 12);
     fill(0);
     textSize(32);
     textAlign(CENTER, CENTER);
     text(hrs + ":" + min + ":" + sec +
       " " + mer, 1725, 60);
}

function formatting(num){
  if(int(num) < 10) {
    return "0" + num;
  }
  return num;
}