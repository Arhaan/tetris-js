var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Game Dimensions
var squareDimension = 40;

// Object Square for each square of game.
//Color Status 0 = Grey

let Square = {
    coordinateX:0,
    coordinateY:0,
    colorStatus:0
}

var squares = [];

for (let index = 0; index < 200 ; index++) {
    var square = new Square;
    square.coordinateX = (index%10+10)*squareDimension
    square.coordinateY = (Math.ceil(index/10))*squareDimension;
    squares[i] = square;
}
    