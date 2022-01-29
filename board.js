
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var squareSide = 40;
var gridHeight = 20;
var gridWidth = 10;


var blocks = []
// Will be a 2d array
// blocks[i][j] === 0 => empty
// 1 => stationary block
// 2 => Moving block (moves down in next iter)


//Main Screen of Tetris
function draw_grid() {

    ctx.beginPath();
    for (let i = 0; i < gridHeight; i++) {
        blocks[i] = [];
        for (let j = 0; j < gridWidth; j++) {
            var x_coordinate = j * squareSide;
            var y_coordinate = i * squareSide;
            console.log(x_coordinate, y_coordinate)
            ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
            
            blocks[i][j] = 0;
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
console.log(blocks)
console.log("Hello")
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
