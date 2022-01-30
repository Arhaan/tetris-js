
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var squareSide = 40;
var filledSquarePadding = 5; // The amount of padding in the unfilled squares
var gridHeight = 20;
var gridWidth = 10;


var colors = [
    "#42f548", // Green
    "#f54251", // Red
    "#429ef5", // Blue
    "#edea0e" // Yellow
]
function Square(){
    this.coordinateX = 0;
    this.coordinateY = 0;
    this.colorStatus = 0;
    this.movementStatus = 0;
};

// Object Square for each square of game.
//Color Status 0 = Grey
// MovementStatus 0 = Unfilled
// 1 = moving
// 2 = fixed (the squares that have already been set)

var squares = [];
// Stores Conditon of each square on the board


var movingSquares = [];
// Stores coordiantes of all the moving squares
//Main Screen of Tetris
function draw_grid() {
 
    ctx.beginPath();
    for (let i = 0; i < gridWidth; i++) {
        squares[i] = [];
        for (let j = 0; j <  gridHeight; j++) {
            var square = new Square();
            var x_coordinate = i * squareSide;
            var y_coordinate = j * squareSide;
            square.coordinateX = x_coordinate;
            square.coordinateY = y_coordinate;
            ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
            squares[i][j] =square; // i, j are the x and y coordinates, in units of square side, y is taken normally like simplecpp
        }
    }
    ctx.fillStyle = " #cfcfc7"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    console.log(squares)
}


// Creates new moving group
function create_new_moving_group(command) {
    // Arhaan
    centrex = gridWidth/2;
    var randomcolors = [];
    for (let i = 0; i < 4; i++) {
        randomcolors[i] = Math.floor(Math.random()*colors.length);
    }
    
    if (command == 1){
        // Straight Line
        movingSquares[0] = [centrex - 2, 0, randomcolors[0]],
        movingSquares[1] = [centrex - 1, 0, randomcolors[1]], 
        movingSquares[2] = [centrex - 0, 0, randomcolors[2]], 
        movingSquares[3] = [centrex + 1, 0, randomcolors[3]] 
    }

    if (command == 2){

        // T shape
        movingSquares[0] = [centrex - 1, 0, randomcolors[0]],
        movingSquares[1] = [centrex - 0, 1, randomcolors[1]], 
        movingSquares[2] = [centrex - 0, 0, randomcolors[2]], 
        movingSquares[3] = [centrex + 1, 0, randomcolors[3]] 
    }


    if (command == 3){

        // L shape
        movingSquares[0] = [centrex - 2, 0, randomcolors[0]],
        movingSquares[1] = [centrex - 1, 0, randomcolors[1]], 
        movingSquares[2] = [centrex - 0, 0, randomcolors[2]], 
        movingSquares[3] = [centrex + 0, 1, randomcolors[3]] 
    }


    if (command == 4){

        // Square shape
        movingSquares[0] = [centrex - 1, 0, randomcolors[0]],
        movingSquares[1] = [centrex - 1, 1, randomcolors[1]], 
        movingSquares[2] = [centrex - 0, 0, randomcolors[2]], 
        movingSquares[3] = [centrex + 0, 1, randomcolors[3]] 
    }

    
    draw_moving_group();

}


function draw_moving_group(){
    // Actually draws the group on screen
    for (let i = 0; i < movingSquares.length; i++) {
        const coordinates = movingSquares[i];
        var square = new Square();
        var x_coordinate = coordinates[0] * squareSide;
        var y_coordinate = coordinates[1] * squareSide;
        square.coordinateX = x_coordinate;
        square.coordinateY = y_coordinate;
        

        square.movementStatus = 1;
        squares[coordinates[0]][coordinates[1]] = square;  

        ctx.beginPath();
        ctx.rect(x_coordinate+filledSquarePadding/2.0, y_coordinate + filledSquarePadding/2.0, squareSide-filledSquarePadding, squareSide-filledSquarePadding);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function check_collision(){
    var outcome = false;
    for(var i = 0; i < movingSquares.length; i++){
        let x = movingSquares[i][0];
        let y = movingSquares[i][1] + 1;
        if(y >= gridHeight || (squares[x][y].movementStatus == 2)){
            outcome = true;
            break;
        }
    }
    return outcome;
}

// Returns true if the block has reached bottom of screen
//or touch a fixed square



function do_rotation(command){
    // Arhaan
}

function side_move_moving_square(command){
    if(command == "l"){
        for (let i = 0; i < movingSquares.length; i++){
            movingSquares[i][0] -= 1; 
        }
    }
    if (command == "r"){
        for (let i = 0; i < movingSquares.length; i++){
            movingSquares[i][0] += 1; 
        }
    }
    for (let i = 0; i < movingSquares.length; i++){
        let x = movingSquares[i][0];
        let y = movingSquares[i][1];
        if(x < 0){
            side_move_moving_square("r");
            break;
        }
        if(x >= gridWidth){
            side_move_moving_square("l");
            break;
        } 
        if (squares[x][y].movementStatus == 2){
            if(command == "l"){
                side_move_moving_square("r");
                break;
            }
            else{
                side_move_moving_square("l");
                break;
            }

        }
    }
}
//command must be either "l" or "r"
//moves the block rightwards or leftwards
//If single block crosses grid or collides with fixed square, reverses the movement


function disappear_moving_group_from_prev_position(){
    // Make the squares at original position disappear
    ctx.beginPath();
    for (let i = 0; i < movingSquares.length; i++) {
        const coordinates = movingSquares[i];
        var x_coordinate = coordinates[0] * squareSide;
        var y_coordinate = coordinates[1] * squareSide;
        
        ctx.clearRect(x_coordinate, y_coordinate , squareSide, squareSide);
        ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
    } 
    ctx.fillStyle = " #cfcfc7"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}


function down_move_moving_squares(){
    // Check_collision will ensure that the squares below the moving squares are empty
    disappear_moving_group_from_prev_position();
    for (let i = 0; i < movingSquares.length; i++){
        movingSquares[i][1] += 1; // Increase the y by 1, since canvas behaves like simplecpp
    }
    draw_moving_group();
}


function set_moving_group_to_stationary_after_collision(){
    for (let i = 0; i < movingSquares.length; i++) {
        const coordinates = movingSquares[i];
        squares[coordinates[0]][coordinates[1]].movementStatus = 2; // Fixed
    }  
}


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


function play_game(){
    var collided = check_collision();
    console.log(collided)
    if (collided){
        if (squares[gridWidth/2][0].movementStatus == 2){
            // Game Over
            console.log("Game Over") // TODO: Doesnt work
            return;
        }
        set_moving_group_to_stationary_after_collision();
        create_new_moving_group(2);
    }
    else{

        down_move_moving_squares();
    }


}

draw_grid()
create_new_moving_group(4);
setInterval(play_game, 10);