
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var squareSide = 40;
var gridHeight = 20;
var gridWidth = 10;

// Doesn't work perfectly, but can be made into a class maybe
let Square = {
    coordinateX:0,
    coordinateY:0,
    colorStatus:0,
    movementStatus:0
}

// Object Square for each square of game.
//Color Status 0 = Grey
// MovementStatus 0 = Unfilled
// 1 = moving
// 2 = fixed (the squares that have already been set)

var squares = [];
// Stores Conditon of each square on the board


//Main Screen of Tetris
function draw_grid() {

    ctx.beginPath();
    for (let i = 0; i < gridHeight; i++) {
        squares[i] = [];
        for (let j = 0; j < gridWidth; j++) {
            var square = new Square;
            var x_coordinate = j * squareSide;
            var y_coordinate = i * squareSide;
            square.coordinateX = x_coordinate;
            square.coordinateY = y_coordinate;
            ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
            squares[i][j] =square;
        }
    }
    ctx.fillStyle = " #cfcfc7"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


// Creates new moving group
function create_new_moving_group() {

}

draw_grid();
ctx.beginPath();
ctx.rect(1000, 40, 400, 55);
ctx.rect(1000, 95, 400, 400);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Next Block", 1200, 75);
ctx.closePath();



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
