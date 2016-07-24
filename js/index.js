var ColorGen = function(saturation, value) {
  this.saturation = saturation;
  this.value = value;
  this.nextHue = Math.random();

  ColorGen.prototype.PHI = 0.618033988749895;

  ColorGen.prototype.nextColor = function() {
    this.nextHue += (1 / this.PHI);
    this.nextHue %= 1;
    return this.hsvToRgb(this.nextHue, this.saturation, this.value);
  };

  ColorGen.prototype.nextRGBColor = function() {
    var color = this.nextColor();
    console.log(color);
    return this.colorToRGBString(color);
  };

  ColorGen.prototype.hsvToRgb = function(hue, saturation, value) {
    var h = Math.trunc(hue * 6);
    var f = hue * 6 - h;
    var p = value * (1 - saturation);
    var q = value * (1 - f * saturation);
    var t = (value * (1 - (1 - f) * saturation));
    switch (h) {
      case 0:
        color = {
          r: Math.trunc(value * 256),
          g: Math.trunc(t * 256),
          b: Math.trunc(p * 256)
        };

        break;
      case 1:
        color = {
          r: Math.trunc(q * 256),
          g: Math.trunc(value * 256),
          b: Math.trunc(p * 256)
        };
        break;
      case 2:
        color = {
          r: Math.trunc(p * 256),
          g: Math.trunc(value * 256),
          b: Math.trunc(t * 256)
        };
        break;
      case 3:
        color = {
          r: Math.trunc(p * 256),
          g: Math.trunc(q * 256),
          b: Math.trunc(value * 256)
        };
        break;
      case 4:
        color = {
          r: Math.trunc(t * 256),
          g: Math.trunc(p * 256),
          b: Math.trunc(value * 256)
        };
        break;
      case 5:
        color = {
          r: Math.trunc(value * 256),
          g: Math.trunc(p * 256),
          b: Math.trunc(q * 256)
        };
        break;
    }
    return color;
  };

  ColorGen.prototype.colorToRGBString = function(color) {
    var nextColorRGBString = "#" + this.zeroPad(color.r.toString(16), 2) + this.zeroPad(color.g.toString(16), 2) + this.zeroPad(color.b.toString(16), 2);

    return nextColorRGBString
  };

  ColorGen.prototype.zeroPad = function(string, targetLength) {
    return string.length < targetLength ? "0".repeat(targetLength - string.length) + string : string;
  };
};

var ColorGenerator = new ColorGen(0.99, 0.70);

var iso = new Isomer(document.getElementById("graphicsCanvas"));
var canvas = document.getElementById("graphicsCanvas");
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

var sideLength = 9;
var partyMode = false;

drawPyramid(Point.ORIGIN,sideLength,partyMode);

function registerMoreHandler() {
    var _self = document.getElementById("moreButton");
    _self.onclick = function () {
        sideLength++;
        context.clearRect ( 0 , 0 , canvas.width , canvas.height );
        drawPyramid(Point.ORIGIN,sideLength,partyMode);
        if (sideLength === maxSideLength) {
            _self.disabled = true
        }else if (sideLength > minSideLength) {
                document.getElementById("lessButton").disabled = false;
        }
    }
};

registerMoreHandler();

function registerLessHandler() {
    var _self = document.getElementById("lessButton");
    _self.onclick = function () {
      if (sideLength > minSideLength){
        sideLength--;
        context.clearRect ( 0 , 0 , canvas.width , canvas.height );
        drawPyramid(Point.ORIGIN,sideLength,partyMode);
        if (sideLength === minSideLength) {
            _self.disabled = true
        }else if (sideLength < maxSideLength) {
                document.getElementById("moreButton").disabled = false;
        }
      }
  }
};

registerLessHandler();

document.getElementById("partyButton").onclick = function () {
  if (partyMode === false){
    partyMode = true;
    document.getElementById("partyButton").value = "Stop Partying!";
    document.getElementById("datBass").play();
    setInterval(function() {drawPyramid(Point.ORIGIN,sideLength,partyMode);},400);
  }
  else{
    partyMode = false;
    document.getElementById("partyButton").value = "Party!";
    document.getElementById("datBass").pause();
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
  color = ColorGenerator.nextColor();
  return new Color(color.r, color.g, color.b);
}
