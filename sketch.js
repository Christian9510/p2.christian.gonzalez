let capture;
let c;
let curr_temp
let curr_short_forecast;
let link1;
let link2;
let link3;
let link4;
let img;
let whiteimg;
let i=1;
let t=10000;
let calendar = null;
let checkbox1;
let checkbox2;
let checkbox3;
let checkbox4;
let lego;
let head1;
let placethere;
let mirrortime;

async function get_temp(){
     const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
     const json = await response.json()
     console.log(json)
     curr_temp = json.properties.periods[0].temperature
     curr_short_forecast = json.properties.periods[0].shortForecast
 }

 function preload() {
  whiteimg = loadImage('white.png');
  lego = loadImage('lego.jpg');
  head1 = loadImage('head1.png');
  placethere = loadImage('placethere.PNG');
}

var dragging = false;
var rollover = false;
var x1, y1, w1, h1;
var offsetX, offsetY;

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  
  get_temp()
  
  createCanvas(windowWidth, windowHeight);
  clockFont = loadFont("digital-7.ttf");

  link1 = createA("https://www.cnn.com/2022/11/10/politics/sotomayor-new-york-vaccine-mandate/index.html",
  "Politics", "_blank");
  link2 = createA("https://www.cnn.com/2022/11/08/entertainment/jeff-cook-alabama-obit/index.html",
  "Entertainment", "_blank");
  link3 = createA("https://bleacherreport.com/articles/10055226-christian-pulisic-brenden-aaronson-headline-2022-usmnt-world-cup-roster?utm_source=cnn.com&utm_medium=referral&utm_campaign=editorial",
  "Sports", "_blank");
  link4 = createA("https://www.cnn.com/2022/11/10/middleeast/iran-taraneh-alidoosti-actor-hijab-intl/index.html",
  "World", "_blank");
  link1.position(30, 885);
  link2.position(60, 915);
  link3.position(160, 885);
  link4.position(220, 915); 
  addImg();

  checkbox1 = createCheckbox('Arms', false);
  checkbox1.changed(myCheckedEvent);
  checkbox1.position(1750,840);
  checkbox2 = createCheckbox('Legs', false);
  checkbox2.changed(myCheckedEvent);
  checkbox2.position(1750,860);
  checkbox3 = createCheckbox('Back', false);
  checkbox3.changed(myCheckedEvent);
  checkbox3.position(1750,880);
  checkbox4 = createCheckbox('Running', false);
  checkbox4.changed(myCheckedEvent);
  checkbox4.position(1750,900);

  loadBtn = createButton("View Calendar");
  loadBtn.position(440, 50)
  loadBtn.mousePressed(loadFile);

  loadBtn = createButton("Mirror Time");
  loadBtn.position(1060, 50)
  loadBtn.mousePressed(loadFile);

    x1 = 1600;
    y1 = 230;
    w1 = 80;
    h1 = 80;
}

function loadFile() {
  
  calendar = loadTable('calendar.csv', 'csv', onFileload);
  mirrortime = loadTable('mirrortime.csv', 'csv', onFileload);
}

function myCheckedEvent() {
  if (checkbox1.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
  if (checkbox2.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
  if (checkbox3.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
  if (checkbox4.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
}

function windowResized()
{
 resizeCanvas(windowWidth, windowHeight);
}

 function draw(){  
  textSize(32)
  fill(0)
  textAlign(LEFT, CENTER)
  text(curr_temp, 50, 50)
  textSize(24)
  fill(0)
  textAlign(LEFT, CENTER)
  text(curr_short_forecast, 50, 80);
  
  image(capture, 312.5, 220, 1385, 730);

  noFill();
  rect(425,15,610,200,20,20);
  
  fill(255);
  rect(1700,15,200,100,20,20);
 
  fill(255);
  rect(20,15,200,100,20,20);

  fill(255);
  rect(20,130,285,280,20,20);

  noFill();
  rect(1050,15,400,200,20,20);

  fill(255);
  rect(10,875,280,70,20,20);

  fill(255);
  rect(1700,790,200,150,20,20);

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
  text(hrs + ":" + min + ":"+ sec +
    " " + mer, 1800, 65);

  textSize(32)
  fill(0)
  textAlign(LEFT, CENTER)
  text(curr_temp, 50, 50)
  textSize(24)
  fill(0)
  textAlign(LEFT, CENTER)
  text(curr_short_forecast, 50, 80);

  textSize(28)
  text("Exercises", 1737, 825);
  textSize(18)
  text("Click to View Calendar", 440, 35);
  textSize(20)
  text("Click for Mirror Time", 1060, 35);
  textSize(20)
  text("Health-Related Information", 48, 210);
  textSize(16)
  text("•     Current Weight: 153.2", 45, 240);
  text("•     Current Height: 5'6", 45, 270);
  text("•     Sleep Time: 6 Hrs, 30 Mins", 45, 300);
  text("•     Heart Rate: 72 BPM", 45, 330);

  image(lego, 1695, 117, 270, 670);
  image(whiteimg, 1452, 0, 245, 220);
  image(placethere, 1765, 140, 90, 140);
  image(head1, x1, y1, w1, h1);

  if (mouseX > x1 && mouseX < x1 + w1 && mouseY > y1 && mouseY < y1 + h1) {
    rollover = true;
  } else {
    rollover = false;
  }

  if (dragging) {
    x1 = mouseX + offsetX;
    y1 = mouseY + offsetY;
  }
}

function onFileload() {
  
  for (let r = 0; r < calendar.getRowCount(); r++) {
    for (let c = 0; c < calendar.getColumnCount(); c++) {
      text(calendar.getString(r, c), 
            440 + c * 87.5, 85 + r * 12);
    }
  }

  for (let r = 0; r < mirrortime.getRowCount(); r++) {
    for (let c = 0; c < mirrortime.getColumnCount(); c++) {
      text(mirrortime.getString(r, c), 
            1060 + c * 80, 85 + r * 12);
    }
  }
}

function formatting(num){
  if(int(num) < 10) {
    return "0" + num;
  }
  return num;
}

function addImg() {
		
  if (i<4){
    i++;
  }else{
    i=1;
  }

  img = createImg("news" + i + ".PNG");
  img.position(100,500);
  img.addClass("newsImg");
  img.position(10, 425);
  setTimeout(imgRemove, t);
  setTimeout(addImg, t);
}

function imgRemove() {
  img.remove();
}

function mousePressed() {

  if (mouseX > x1 && mouseX < x1 + w1 && mouseY > y1 && mouseY < y1 + h1) {
    dragging = true;

    offsetX = x1 - mouseX;
    offsetY = y1 - mouseY;
  }

}

function mouseReleased() {
  dragging = false;
}
