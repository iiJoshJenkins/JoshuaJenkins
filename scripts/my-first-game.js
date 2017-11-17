var ctx = null,
    gameMap = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    tileW = 40,
    tileH = 40,
    mapW = 10,
    mapH = 10,
    currentSec = 0,
    frameCount = 0,
    framesLastSec = 0;

window.onload = function(){
    ctx = document.getElementById("game-canvas").getContext("2d");
    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";
}

function drawGame(){
    if(!ctx){ return; }
    var sec = Math.floor(Date.now()/1000);
    if(sec!=currentSec){
        currentSec = sec;
        framesLastSec = frameCount;
        frameCount = 1;
    }else { frameCount++; }
    for(var y = 0; y < mapH; ++y){
        for(var x = 0; x < mapW; ++x){
            switch(gameMap[((y*mapW)+x)]){
                case 0:
                    ctx.fillStyle = "#000000";
                    break;
                default:
                    ctx.fillStyle = "#ccffcc";
            }
            ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
        }
    }
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSec, 10, 20);

    requestAnimationFrame(drawGame);
}
