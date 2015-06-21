var iso = new Isomer(document.getElementById("graphicsContainer"));
var canvas = document.getElementById("graphicsContainer");
var context = canvas.getContext("2d");

//Shorthand references to Isomer classes
var Shape = Isomer.Shape;
var Color = Isomer.Color;
var Point = Isomer.Point;

//Predefined floor colors for non-party mode
var paleOrange = new Color(255,146,0);
var paleBlue = new Color(11,97,164);

//Pyramid Size limits
var minSideLength = 3;
var maxSideLength = 17;

var sideLength = 7;
var partyMode = false;

drawPyramid(Point.ORIGIN,sideLength,partyMode);

document.getElementById("moreButton").onclick = function () {
  if (sideLength < maxSideLength){
    sideLength++;
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    drawPyramid(Point.ORIGIN,sideLength,partyMode);
  }
};

document.getElementById("lessButton").onclick = function () {
  if (sideLength > minSideLength){
    sideLength--;

    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
    drawPyramid(Point.ORIGIN,sideLength,partyMode);
  }
};

document.getElementById("partyButton").onclick = function () {
  if (partyMode === false){
    partyMode = true;
    document.getElementById("partyButton").value = "Stop Partying!";
    document.getElementById("partyContainer").style.width = "6%";
    setInterval(function() {drawPyramid(Point.ORIGIN,sideLength,partyMode);},400);
  }
  else{
    partyMode = false;
    document.getElementById("partyButton").value = "Party!";
    document.getElementById("partyContainer").style.width = "3%";
    drawPyramid(Point.ORIGIN,sideLength,partyMode);
  }
};

function drawPyramid(originPoint,sideLen,partyMode)
{

    var floorOriginPoint = new Point(originPoint);
    var floorSideLen = sideLen;
    var floorColor;

    for (var i = 0; i < Math.ceil(sideLen/2); i++) {

        if (partyMode === true) {
            floorColor = randColor();
        } else if (i % 2 === 0) {
            floorColor = paleOrange;
        }
        else {
            floorColor = paleBlue;
        }

        iso.add(Shape.Prism(floorOriginPoint, floorSideLen, floorSideLen), floorColor);

        floorOriginPoint.x++;
        floorOriginPoint.y++;
        floorOriginPoint.z++;

        floorSideLen -= 2;

    }
}

function drawRectangle(originPoint,xLen,yLen, Zlen)
{

    var floorOriginPoint = new Point(originPoint);
    var floorSideLen = sideLen;
    var floorColor;

    for (var i = 0; i < Math.ceil(sideLen/2); i++) {

        if (partyMode === true) {
            floorColor = randColor();
        } else if (i % 2 === 0) {
            floorColor = paleOrange;
        }
        else {
            floorColor = paleBlue;
        }

        iso.add(Shape.Prism(floorOriginPoint, floorSideLen, floorSideLen), floorColor);

        floorOriginPoint.x++;
        floorOriginPoint.y++;
        floorOriginPoint.z++;

        floorSideLen -= 2;

    }
}

function randColor(){
  var r = Math.floor((Math.random() * 255));
  var g = Math.floor((Math.random() * 255));
  var b = Math.floor((Math.random() * 255));
  return new Color(r, g, b);
}