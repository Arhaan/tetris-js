// Animate motion - optional
// Bomb - Arhaan
// Pause - play - Arhaan


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ctx2 = document.getElementById("Display_NextBlock").getContext("2d");
var score_box = document.getElementById("score")
var total_shapes = 7;
var level_box = document.getElementById("level")
var points = 0;
var level = 0;

var squareSide = 35;
var filledSquarePadding = 5; // The amount of padding in the unfilled squares
var gridHeight = 20;
var gridWidth = 10;
var inputCommand = "";




document.addEventListener("keydown", keyDownHandler, false);

canvas.addEventListener("mousedown", handle_mouse_click, false);

function handle_mouse_click(){
    if (!bomb_mode) inputCommand = "rot";
}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key=="d" || e.key == "D") {
        inputCommand = "r";
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"|| e.key=="a" || e.key == "A") {
        inputCommand = "l";
    }
    else if(e.key == "Up" || e.key == "ArrowUp"|| e.key=="w" || e.key == "W") {
        inputCommand = "rot";
    }
    else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "s" || e.key == "S"){
        inputCommand = "d";
    }
}


var colors = [
    "rgba(0,0,0,0.1)", //Grey
    "rgb(0,255,0)", // Green
    "rgb(255,0,0)", // Red
    "rgb(0,255,255)", // Aqua
    "rgb(255,255,0)", // Yellow
    "rgb(255,0,255)" // Fuchsia
]

var lighter_colors = [
    "rgba(0,0,0,0.1)", //Grey
    "rgba(0,255,0,0.4)", // Green
    "rgba(255,0,0,0.4)", // Red
    "rgba(0,255,255,0.4)", // Aqua
    "rgba(255,255,0,0.4)", // Yellow
    "rgba(255,0,255,0.4)" // Fuchsia
]

var level_bonuses = [
    [1, 1], //Level 0
    [2, 0.90], //Level 1
    [3, 0.75], //Level 2
    [4, 0.60], //Level 3
    [5, 0.50], //Level 4
]
//[{point multiplier},{setinterval multiplier}]

function Square(){
    this.coordinateX = 0;
    this.coordinateY = 0;
    this.colorStatus = 0;
    this.movementStatus = 0;
};

// Object Square for each square of game.
//Color Status i => colors[i]
// MovementStatus 0 = Unfilled
// 1 = moving
// 2 = fixed (the squares that have already been set)

var squares = [];
// Stores Conditon of each square on the board


var movingSquares = [];
// Stores coordiantes of all the moving squares

var copy_movingSquares = []
// Copy of movingSquares for using to draw impression at bottom

var next_squares_array = []

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
    ctx.fillStyle = " rgba(0,0,0,0.1)"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

//Main Screen of Tetris
function draw_grid_next() {

    ctx2.beginPath();
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j <  4; j++) {
            var square = new Square();
            var x_coordinate = i * squareSide;
            var y_coordinate = j * squareSide;
            square.coordinateX = x_coordinate;
            square.coordinateY = y_coordinate;
            ctx2.rect(x_coordinate, y_coordinate, squareSide, squareSide);
        }
    }
    ctx2.fillStyle = " rgba(0,0,0,0.1)"
    ctx2.fill();
    ctx2.stroke();
    ctx2.closePath();

}


// Creates new moving group
function create_new_moving_group(command) {
    // Arhaan
    centrex = gridWidth/2;
    
    var randomcolor = next_color;
    
    var new_random = Math.floor(Math.random()*(colors.length-1)) + 1;
    
    while (new_random === next_color){
        new_random = Math.floor(Math.random()*(colors.length-1)) + 1;
    }
    prev_color = next_color;
    next_color = new_random;


        
    if (command == 1){
        // Straight Line
        movingSquares[0] = [centrex - 2, 0, randomcolor],
        movingSquares[1] = [centrex - 1, 0, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 1, 0, randomcolor] 
    }

    if (command == 2){
        // T shape
        movingSquares[0] = [centrex - 1, 0, randomcolor],
        movingSquares[1] = [centrex - 0, 1, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 1, 0, randomcolor] 
    }


    if (command == 3){
        // L shape
        movingSquares[0] = [centrex - 2, 0, randomcolor],
        movingSquares[1] = [centrex - 1, 0, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 0, 1, randomcolor] 
    }


    if (command == 4){
        // Square shape
        movingSquares[0] = [centrex - 1, 0, randomcolor],
        movingSquares[1] = [centrex - 1, 1, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 5){
        // L mirror image shape
        movingSquares[0] = [centrex + 1, 0, randomcolor],
        movingSquares[1] = [centrex + 2, 0, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 6){
        // Z shape
        movingSquares[0] = [centrex - 1, 0, randomcolor],
        movingSquares[1] = [centrex + 1, 1, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 7){
        // Z mirrir image shape
        movingSquares[0] = [centrex + 1, 0, randomcolor],
        movingSquares[1] = [centrex + 0, 1, randomcolor], 
        movingSquares[2] = [centrex - 0, 0, randomcolor], 
        movingSquares[3] = [centrex - 1, 1, randomcolor] 
    }


    var len = movingSquares.length;
        for (var i=0; i<len; ++i){
            copy_movingSquares[i] = movingSquares[i].slice(0);
        }
    
    if (overlap()){
        handle_game_over()
        console.log("Game Over")
        pause()
        return;
    }
    
    draw_moving_group();

}


function create_next_moving_group_array(command) {
    // Arhaan
    centrex = 2;
    var randomcolor = next_color;
        
    if (command == 1){
        // Straight Line
        next_squares_array[0] = [centrex - 2, 0, randomcolor],
        next_squares_array[1] = [centrex - 1, 0, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 1, 0, randomcolor] 
    }

    if (command == 2){
        // T shape
        next_squares_array[0] = [centrex - 1, 0, randomcolor],
        next_squares_array[1] = [centrex - 0, 1, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 1, 0, randomcolor] 
    }


    if (command == 3){
        // L shape
        next_squares_array[0] = [centrex - 2, 0, randomcolor],
        next_squares_array[1] = [centrex - 1, 0, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 0, 1, randomcolor] 
    }


    if (command == 4){
        // Square shape
        next_squares_array[0] = [centrex - 1, 0, randomcolor],
        next_squares_array[1] = [centrex - 1, 1, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 5){
        // L mirror image shape
        centrex = 1
        next_squares_array[0] = [centrex + 1, 0, randomcolor],
        next_squares_array[1] = [centrex + 2, 0, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 6){
        // Z shape
        next_squares_array[0] = [centrex - 1, 0, randomcolor],
        next_squares_array[1] = [centrex + 1, 1, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex + 0, 1, randomcolor] 
    }

    if (command == 7){
        // Z mirrir image shape
        next_squares_array[0] = [centrex + 1, 0, randomcolor],
        next_squares_array[1] = [centrex + 0, 1, randomcolor], 
        next_squares_array[2] = [centrex - 0, 0, randomcolor], 
        next_squares_array[3] = [centrex - 1, 1, randomcolor] 
    }

    draw_next_squares()
    
    

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
        

        square.movementStatus = 1; // Right now even moving forward doesnt change this back to 0, we can fix it or let 1 to mean both moving and empty
        squares[coordinates[0]][coordinates[1]] = square;  

        ctx.beginPath();
        ctx.rect(x_coordinate+filledSquarePadding/2.0, y_coordinate + filledSquarePadding/2.0, squareSide-filledSquarePadding, squareSide-filledSquarePadding);
        ctx.fillStyle = colors[movingSquares[i][2]];
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function draw_next_squares(){
    ctx2.clearRect(0, 0, 140, 140)
    draw_grid_next();
    for (let i = 0; i < next_squares_array.length; i++) {
        const coordinates = next_squares_array[i];
        var x_coordinate = coordinates[0] * squareSide;
        var y_coordinate = (coordinates[1] +1)* squareSide;
        
    
        ctx2.beginPath();
        ctx2.rect(x_coordinate+filledSquarePadding/2.0, y_coordinate + filledSquarePadding/2.0, squareSide-filledSquarePadding, squareSide-filledSquarePadding);
        ctx2.fillStyle = colors[next_squares_array[i][2]];
        ctx2.fill();
        ctx2.stroke();
        ctx2.closePath();
    }
}

function draw_impression(){
    for (let i = 0; i < copy_movingSquares.length; i++){
        let x_coordinate = copy_movingSquares[i][0]*squareSide;
        let y_coordinate = copy_movingSquares[i][1]*squareSide;
        ctx.beginPath();
        ctx.rect(x_coordinate+filledSquarePadding/2.0, y_coordinate + filledSquarePadding/2.0, squareSide-filledSquarePadding, squareSide-filledSquarePadding);
        ctx.fillStyle = lighter_colors[copy_movingSquares[i][2]];
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

function overlap(){
    var outcome = false;
    for(var i = 0; i < movingSquares.length; i++){
        let x = movingSquares[i][0];
        let y = movingSquares[i][1];
        if(y >= gridHeight || (squares[x][y].movementStatus == 2)){
            outcome = true;
            break;
        }
    }
    return outcome;
}

function check_collision_copy_movingSquare(){
    var outcome = false;
    for(var i = 0; i < copy_movingSquares.length; i++){
        let x = copy_movingSquares[i][0];
        let y = copy_movingSquares[i][1] + 1;
        if(y >= gridHeight || (squares[x][y].movementStatus == 2)){
            outcome = true;
            break;
        }
    }
    return outcome;
}


// Returns true if the block has reached bottom of screen
//or touch a fixed square

function check_collision_side_movement(command){
    var outcome = false;
    for (let i = 0; i < movingSquares.length; i++) {
        let x, y;
        if(command == "l"){
            x = movingSquares[i][0] - 1;
            y = movingSquares[i][1];
        } 
        if(command == "r"){
            x = movingSquares[i][0] + 1;
            y = movingSquares[i][1];
        }   
        if(x < 0 || x >= gridWidth || squares[x][y].movementStatus == 2 ){
            outcome = true;
            break;
        }
    }
    return outcome;
}

//Checks for sideway collision.
//Returns true if collision occurs

function do_rotation(){
    // Always do clockwise rotation
    // coordinates [2] has to be left unchanged

    let relcoordinates = [];
    for (let i = 0; i < movingSquares.length; i++) {
        relcoordinates[i] = [movingSquares[i][0] - movingSquares[2][0], movingSquares[i][1] - movingSquares[2][1]];
    }

    console.log(relcoordinates)
    var present_oreo = prev_shape;
    if (present_oreo === 4){
        return; // Square
    }

    else{
        var final_positions_free = true;
        for (let i = 0; i < movingSquares.length; i++) {
            var newx = movingSquares[2][0] - relcoordinates[i][1];
            var newy = movingSquares[2][1] + relcoordinates[i][0];

            if (newx < 0 || newx >= gridWidth || newy < 0 || newy >= gridHeight || squares[newx][newy].movementStatus == 2){
                final_positions_free = false;

                
                break;
            }
        }
        if (final_positions_free){
            //console.log("Rotating")
            disappear_moving_group_from_prev_position();
            for (let i = 0; i < movingSquares.length; i++) {
                movingSquares[i][0] = - relcoordinates[i][1] + movingSquares[2][0];
                movingSquares[i][1] = + relcoordinates[i][0] + movingSquares[2][1]; 
                
            }
            draw_moving_group();
        }
        else{
            // Rotate in opposite direction
            final_positions_free = true;
            for (let i = 0; i < movingSquares.length; i++) {
                var newx = movingSquares[2][0] + relcoordinates[i][1];
                var newy = movingSquares[2][1] - relcoordinates[i][0];
    
                if (newx < 0 || newx >= gridWidth || newy < 0 || newy >= gridHeight || squares[newx][newy].movementStatus == 2){
                    final_positions_free = false;
    
                    
                    break;
                }
                if (final_positions_free){
                    //console.log("Rotating")
                    disappear_moving_group_from_prev_position();
                    for (let i = 0; i < movingSquares.length; i++) {
                        movingSquares[i][0] = + relcoordinates[i][1] + movingSquares[2][0];
                        movingSquares[i][1] = - relcoordinates[i][0] + movingSquares[2][1]; 
                        
                    }
                    draw_moving_group();
                }
            } 
        }
    }

}


function side_move_moving_square(){
    command = inputCommand;
    if (command != "r" && command != "l"){
        return;
    }
    let collided = check_collision_side_movement(command);
    if(!collided){
        disappear_moving_group_from_prev_position();
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
        draw_moving_group();
    }
    inputCommand = "";
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
        squares[coordinates[0]][coordinates[1]].movementStatus = 0;
    } 
    ctx.fillStyle = " rgba(0,0,0,0.1)"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

}

function disappear_impression(){
    ctx.beginPath();
    for (let i = 0; i < copy_movingSquares.length; i++) {
        const coordinates = copy_movingSquares[i];
        var x_coordinate = coordinates[0] * squareSide;
        var y_coordinate = coordinates[1] * squareSide;
        
        ctx.clearRect(x_coordinate, y_coordinate , squareSide, squareSide);
        ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
    } 
    ctx.fillStyle = " rgba(0,0,0,0.1)"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


function down_move_moving_squares(){
    // Check_collision will ensure that the squares below the moving squares are empty
    var collided = check_collision()
    if (collided){
        return;
    }
    disappear_moving_group_from_prev_position();
    for (let i = 0; i < movingSquares.length; i++){
        movingSquares[i][1] += 1; // Increase the y by 1, since canvas behaves like simplecpp
    }
    draw_moving_group();
}

function bottom_impression(){
    
    disappear_impression(); //Clears previous impression
    disappear_moving_group_from_prev_position();
    draw_moving_group();
    var len = movingSquares.length;
    for (var i=0; i<len; ++i){
        copy_movingSquares[i] = movingSquares[i].slice(0);
    }

    //Moves the impression downwards
    while(!check_collision_copy_movingSquare()){ 
        for (let i = 0; i < copy_movingSquares.length; i++){
            copy_movingSquares[i][1] += 1; 
        }
    }
    draw_impression();
    disappear_moving_group_from_prev_position();
    draw_moving_group();
    
}


function set_moving_group_to_stationary_after_collision(){
    for (let i = 0; i < movingSquares.length; i++) {
        const coordinates = movingSquares[i];
        squares[coordinates[0]][coordinates[1]].movementStatus = 2; // Fixed
        squares[coordinates[0]][coordinates[1]].colorStatus = coordinates[2]; //Updating color status of fixed squares.
    }  
}


function handle_filled_row(){
    let filled_rows = 0;  //Keeps track of how many rows got filled at same time
    for (let j = 0; j < gridHeight; j++){
        let complete_row_filled = true;
        for (let i = 0; i < gridWidth; i++) {
            if (squares[i][j].movementStatus != 2){
                complete_row_filled = false;
                break;
            }    
        }
        if(complete_row_filled){
            pause();
            clear_row(j);
            console.log("stopping")
            for(let k = j - 1; k >= 0; k--){
                move_row_downwards(k);
            }
            unpause()
            filled_rows += 1;
        }
    }

    //Update Points
    if(filled_rows == 1){
        points += 40*level_bonuses[level][0];
    }
    if(filled_rows == 2){
        points += 100*level_bonuses[level][0];
    }
    if(filled_rows == 3){
        points += 300*level_bonuses[level][0];
    }
    if(filled_rows == 4){
        points += 1200*level_bonuses[level][0];
    }

    score_box.textContent = points;
}

function clear_row(row){
    let y_coordinate = row*squareSide;
    ctx.clearRect(0, y_coordinate , gridWidth*squareSide, squareSide);
    ctx.beginPath();
    for (let i = 0; i < gridWidth; i++) {
        squares[i][row].movementStatus = 0;
        squares[i][row].colorStatus = 0;
        ctx.rect(i*squareSide, y_coordinate, squareSide, squareSide);
    }
    ctx.fillStyle = " rgba(0,0,0,0.1)"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
//Clears the jth row from canvas and makes it blank row.

function move_row_downwards(row){
    for (let i = 0; i < gridWidth; i++){
        squares[i][row+1].colorStatus = squares[i][row].colorStatus;
        squares[i][row+1].movementStatus = squares[i][row].movementStatus;
        if(squares[i][row+1].colorStatus != 0){
            ctx.beginPath();
            ctx.rect(i*squareSide+filledSquarePadding/2.0, (row+1)*squareSide + filledSquarePadding/2.0, squareSide-filledSquarePadding, squareSide-filledSquarePadding);
            ctx.fillStyle = colors[squares[i][row+1].colorStatus]
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
    clear_row(row);  //Clears the row after moving it downwards
}

/*ctx.beginPath();
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
*/

function handle_collision(){
    var collided = check_collision();
    if (collided){  
        set_moving_group_to_stationary_after_collision();
        handle_filled_row();
        var new_shape = Math.floor(Math.random()*total_shapes)+1;
        while (new_shape === next_shape){
            new_shape = Math.floor(Math.random()*total_shapes)+1;
        }
        create_new_moving_group(next_shape); // Generates a number between 1 and 4 and creates group with that
        prev_shape = next_shape;
        next_shape = new_shape;

        create_next_moving_group_array(next_shape)
    }
    return collided 
}

function play_game(){
    var collided = handle_collision();
    
    if(!collided){
        down_move_moving_squares();
    }

    //Updating Level
    if(points >= 700 && level == 0){level = 1};
    if(points >= 2500 && level == 1){level = 2};
    if(points >= 6000 && level == 2){level = 3};
    if(points >= 12000 && level == 3){level = 4};

    level_box.textContent = level;
    inputCommand = "";


}

function move_according_to_input(){
    if(inputCommand == "rot") {do_rotation();}
    if(inputCommand == "l" || inputCommand == "r") {side_move_moving_square(inputCommand);}
    if(inputCommand == "d" && !(check_collision())){down_move_moving_squares(); points += 1;} 

    bottom_impression();

    //Updating Level
    if(points >= 700 && level == 0){level = 1};
    if(points >= 2500 && level == 1){level = 2};
    if(points >= 6000 && level == 2){level = 3};
    if(points >= 12000 && level == 3){level = 4};

    score_box.textContent = points;
    inputCommand = "";
}

draw_grid()
draw_grid_next();
var prev_shape = Math.floor(Math.random()*total_shapes)+1;
var prev_color = Math.floor(Math.random()*(colors.length-1)) + 1;
var next_shape = Math.floor(Math.random()*total_shapes)+1;
while(next_shape === prev_shape){
    next_shape = Math.floor(Math.random()*total_shapes)+1;
}
var next_color = Math.floor(Math.random()*(colors.length-1)) + 1;
while(next_color === prev_color){
    next_color = Math.floor(Math.random()*(colors.length-1)) + 1;
}

create_new_moving_group(prev_shape);
create_next_moving_group_array(next_shape);

var time_interval = 1000;
var interval = setInterval(play_game, time_interval*level_bonuses[level][1]);
var interval_input = setInterval(move_according_to_input,time_interval/20*level_bonuses[level][1]);



function pause(){
    clearInterval(interval);
    clearInterval(interval_input);
}


function unpause(){
    interval = setInterval(play_game, time_interval*level_bonuses[level][1]); 
    interval_input = setInterval(move_according_to_input,time_interval/20*level_bonuses[level][1]);
}
// play_game()
// play_game()
// play_game()

// function test_rotation(){

//     if(inputCommand == "rot") do_rotation(); 
//     inputCommand = "";
// }

// var interval = setInterval(test_rotation, 100);


function handle_game_over(){
    var modal = document.getElementById("GameOverModal");
    modal.style.display = "block";
    var close = document.getElementById("game-over-modal-close");
    var score_display = document.getElementById("modal-score");
    var  level_display = document.getElementById("modal-level");
    score_display.textContent = "Your Score: " + points; 

    level_display.textContent = "Level Reached: " + level;
    modal.style.display = "block";
    close.onclick = function() {
        modal.style.display = "none";
      }

      var reload_button = document.getElementById("reload-button")
      reload_button.onclick = function(){
          location.reload();
      }
}



// Handle Clicking on Help
var helpModal = document.getElementById("HelpModal");
var helpModalOpen = document.getElementById("help-button");
var helpModalClose = document.getElementById("help-modal-close");
helpModalOpen.onclick = function() {
  helpModal.style.display = "block";
  pause();
}
helpModalClose.onclick = function() {
  helpModal.style.display = "none";
  unpause();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == helpModal) {
    helpModal.style.display = "none";
    unpause();
  }
}


// Pause and Play
var playpausebutton = document.getElementById("pause-play")
var paused = false;
playpausebutton.onclick = function(){
    if (paused){
        unpause();
        paused = false;
        playpausebutton.innerHTML = "<i class=\"fas fa-pause\"></i>";
    }
    else{
        pause();
        paused = true;
        playpausebutton.innerHTML = "<i class=\"fas fa-play\"></i>";
    }

}

var bomb_cutoff_score = 50;
var bombbtn = document.getElementById("bomb-button")
bombbtn.onclick = bomb;
var bomb_mode = false;
function bomb(){
    if (points < bomb_cutoff_score){
        return;
    }
    bomb_mode = true;
    // canvas.removeEventListener("mousedown", handle_mouse_click, false);
    pause();

    canvas.addEventListener("mousedown", handle_bomb_placing, false);


}

function handle_bomb_placing(e){
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left)/squareSide);
    let y = Math.floor((e.clientY - rect.top)/squareSide); 
    console.log(x, y)

    clear_3x3(x, y);
    canvas.removeEventListener("mousedown", handle_bomb_placing, false);
    unpause();
    // canvas.addEventListener("mousedown", handle_mouse_click, false);
    points -= bomb_cutoff_score;

    bomb_mode = false;
}

function is_valid_x_y(x, y){
    return (x< gridWidth && x>=0 && y< gridHeight && y>= 0)
}

function clear_3x3(x, y){
    
    ctx.beginPath();
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
            if(is_valid_x_y(i, j)){
                squares[i][j].movementStatus = 0;
                squares[i][j].colorStatus = 0;
                ctx.clearRect(i*squareSide, j*squareSide, squareSide, squareSide);

                ctx.rect(i*squareSide, j*squareSide, squareSide, squareSide);
            }
            
        }
        
    }
    ctx.fillStyle = " rgba(0,0,0,0.1)"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    
}



