var iso = new Isomer(document.getElementById("graphicsContainer"));
var canvas = document.getElementById("graphicsContainer");
var context = canvas.getContext("2d");

//Shorthand references to Isomer classes
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;

//Predefined floor colors for non-party mode
var paleOrange = new Color(255,146,0);
var paleBlue = new Color(11,97,164);

var sidelen = 7;
var partyMode = false;

drawPyramid(sidelen,sidelen,0,sidelen,partyMode);

document.getElementById("moreButton").onclick = function () {
  if (sidelen < 29){
    sidelen++;
    drawPyramid(sidelen,sidelen,0,sidelen,partyMode);  
  }
};   

document.getElementById("lessButton").onclick = function () {
  if (sidelen > 3){
    sidelen--;

    //Clearing the canvas    
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );

    drawPyramid(sidelen,sidelen,0,sidelen,partyMode);
  }
};

document.getElementById("partyButton").onclick = function () {
  if (partyMode === false){
    partyMode = true;
    document.getElementById("partyButton").value = "Stop Partying!";
    document.getElementById("partyContainer").style.width = "6%";
    setInterval(function() {drawPyramid(sidelen,sidelen,0,sidelen,partyMode);},400);
  }
  else{
    partyMode = false;
    document.getElementById("partyButton").value = "Party!";
    document.getElementById("partyContainer").style.width = "3%";
    drawPyramid(sidelen,sidelen,0,sidelen,partyMode);
  }
};

function drawPyramid(xBase,yBase,zBase,sideLen,partyMode){

  var floorXBase =  xBase;
  var floorYBase =  yBase;
  var floorSideLen = sideLen;

  var floorColor;

  for (i = zBase; i < (zBase + sideLen - 1); i++){

    if (partyMode === true){
      floorColor =  randColor();
    }else if (i%2 === 0){
      floorColor = paleOrange;
    }else{
      floorColor = paleBlue;
    }

    iso.add(Shape.Prism(new Point(floorXBase - j, floorYBase - k, i), sideLen, sideLen),floorColor);


    floorSideLen-=2;
    floorXBase--;
    floorYBase--;
  }
}


function randColor(){
  var r = Math.floor((Math.random() * 255)); 
  var g = Math.floor((Math.random() * 255)); 
  var b = Math.floor((Math.random() * 255)); 
  var color = new Color(r,g,b);
  return color;
}


//Markers for the origin point and the x,y axes
/*var zeroMarker = Shape.Pyramid(new Point(0,0,0));
iso.add(zeroMarker);
iso.add(Shape.Pyramid(new Point(5,0,0)),red);
iso.add(Shape.Pyramid(new Point(0,5,0)),blue);*/

//setInterval(function() {drawDiscoFloor(5,5,5,5,0.6); },1000);
//setInterval(function() {drawPyramid(6,6,7);},1000);

//Color scaling for pyramids

/*
//Base color
var colorScale = Math.floor(240/sideLen);
var floorColor = new Color(0,0,colorScale);

//Scaling with every floor
colorScale += Math.floor(230/sideLen);
floorColor = new Color(0,0,colorScale);
*/

/*
function drawDiscoFloor(xBase,yBase,xLen,yLen,zBase){

  for (var i = 0; i<xLen; i++){
    for (var j = 0; j <yLen; j++){
      iso.add(Shape.Prism(new Point(xBase-i, yBase-j, zBase)),randColor());
    }
  }
}
*/

//Base Color Definitions
/*var red = new Color(255,0,0);
var green = new Color(0,255,0);
var blue = new Color(0,0,255);

*/



