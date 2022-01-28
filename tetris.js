var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var squareSide = 40;

    //Main Screen of Tetris
    ctx.beginPath();
    for(let i = 1; i <= 20; i++){
        for(let j = 10; j < 20; j++){
            var x_coordinate = j*squareSide;
            var y_coordinate = i*squareSide;
            ctx.rect(x_coordinate, y_coordinate, squareSide, squareSide);
        }
    }
    ctx.fillStyle = " #cfcfc7"
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //Display for next block

    ctx.beginPath();
    ctx.rect(1000, 40, 400, 55);
    ctx.rect(1000, 95, 400, 400);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Next Block",1200 ,75);
    ctx.closePath();
    