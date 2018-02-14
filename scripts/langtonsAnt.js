function LangtonsAnt(){
    var parent = this,
        canvas = $('#LangtonsAnt')[0],
        ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 800;
    var canvasBounds = {
        xMin : 0,
        xMax : canvas.width,
        yMin : 0,
        yMax : canvas.height
    }
    this.directions = {
        "north" : [0, -1],
        "east" : [1, 0],
        "south" : [0, 1],
        "west" : [-1, 0]
    }
    this.tiles = [];

    this.createAnt = function(id, pos, facing, color){
        var ant = this;
        this.id = id;
        this.pos = pos;
        this.isFacing = facing;
        this.color = color;
        //Keeping tileSize 1 variable so it will always be a square.
        this.createTile = function(tileSize){
            var tileExists = compare(parent.tiles, ant.pos);
            if(tileExists){
                ctx.beginPath();
                ctx.fillStyle = 'white';
                ctx.rect(ant.pos[0], ant.pos[1], tileSize, tileSize);
                ctx.fill();
                return false;
            }else{
                ctx.beginPath();
                ctx.fillStyle = ant.color;
                ctx.rect(ant.pos[0], ant.pos[1], tileSize, tileSize);
                ctx.fill();
                parent.tiles.push(ant.pos);
                return true;
            }
        }
        this.move = function(){
            var _pos;
            _pos = add(ant.pos, parent.directions[ant.isFacing]);
            _pos[0] = _pos[0] < canvasBounds.xMin ? canvasBounds.xMax : _pos[0] > canvasBounds.xMax ? 0 : _pos[0];
            _pos[1] = _pos[1] < canvasBounds.yMin ? canvasBounds.yMax : _pos[1] > canvasBounds.yMax ? 0 : _pos[1];
            if(this.createTile(1)){
                switch(ant.isFacing){
                    case 'north':
                        ant.isFacing = 'west';
                        break;
                    case 'east':
                        ant.isFacing = 'north';
                        break;
                    case 'south':
                        ant.isFacing = 'east';
                        break;
                    case 'west':
                        ant.isFacing = 'south';
                }
            }else{
                switch(ant.isFacing){
                    case 'north':
                        ant.isFacing = 'east';
                        break;
                    case 'east':
                        ant.isFacing = 'south';
                        break;
                    case 'south':
                        ant.isFacing = 'west';
                        break;
                    case 'west':
                        ant.isFacing = 'north';
                }
            }
            ant.pos = _pos;
        }
    }
}
function add(arr, arr2){
    var xPos = arr[0] + arr2[0],
        yPos = arr[1] + arr2[1];
        return _arr = [xPos, yPos];
}

function compare(arr, arr2){
    var x = 0,
        y = 0;
    for(var i = 0; i < arr.length; i++){
        x = arr[i][0];
        y = arr[i][1];
        if((x == arr2[0]) && (y == arr2[1])){
            arr.splice(i - 1, 1);
            return true;
        }
    }
    return false;
}

var langtonsAnt = new LangtonsAnt();
var ants =[];
for(var i = 0; i < 10; i++){
    var dir,
        move = Math.floor((Math.random() * 5) + 1);
    switch(move){
        case 1:
            dir = 'north';
            break;
        case 2:
            dir = 'east';
            break;
        case 3:
            dir = 'south';
            break;
        case 4:
            dir = 'west';
    }
    if(dir)
        ants.push(new langtonsAnt.createAnt(i, [Math.floor(Math.random() * 800), Math.floor(Math.random() * 800)], dir, 'hsl(' + 360 * Math.random() + ', 50%, 50%)'));
}
setInterval(function(){
    ants.forEach(function(e){
        e.move();
    });
}, 0);
