var CANVAS = document.getElementById('canvas');
var CANVAS_HEIGHT = CANVAS.height;
var CANVAS_WIDTH = CANVAS.width;
var BUTT = document.getElementById('butt');
var BOWL = document.getElementById('bowl');
var PLAYER;
var POOPS = [];

function doOverlap(c1, c2) {
    return false;
}

class Poop {
    constructor(height, width) {
        this.image = document.getElementById('poop1');
        this.x = 0;
        this.y = 0;
        this.speedBounce = -9.5;
        this.speedX = 5;
        this.speedY = 5;
    }

    coordinates() {
        return [this.x, this.y, this.x + this.image.width,
                this.y + this.image.height];
    }

    draw(context) {
        this.update();
        context.drawImage(this.image, this.x, this.y);
    }

    update() {
        if (this.y > CANVAS_HEIGHT) {
            this.speedY = this.speedBounce;
        }

        if (this.x < CANVAS_WIDTH - this.image.width - BOWL.width / 2) {
            this.x += this.speedX;
        } else {
            if (this.y > CANVAS_HEIGHT - 80) {
                this.remove();
            }
        }

        this.y += this.speedY;
        this.speedY += 0.1;
    }

    remove() {
        var i = POOPS.indexOf(this);
        POOPS.splice(i, 1);
    }
}


class STOOL {
    constructor() {
        this.image = document.getElementById('stool');
        this.x = 0;
        this.y = CANVAS_HEIGHT - this.image.height;
    }

    update(newX) {
        if (newX > CANVAS_WIDTH - BOWL.width) {
            newX = CANVAS_WIDTH - BOWL.width;
        } else if (newX < 0) {
            newX = 0;
        }

        newX = newX - this.image.width / 2;
        this.x = newX;
    }

    coordinates() {
        return [this.x, this.y, this.x + this.image.width,
                this.y + this.image.height];
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }
}


function initialize() {
    POOPS.push(new Poop());
    PLAYER = new STOOL();

    window.addEventListener('mousemove', function(e) {
        PLAYER.update(e.pageX);
    });
}

function draw() {
    var canvas = CANVAS;
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0 , 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.drawImage(BOWL, CANVAS_WIDTH - BOWL.width,
            CANVAS_HEIGHT - BOWL.height);
        PLAYER.draw(context);

        for (var i = POOPS.length - 1; i >= 0; i--) {
            POOPS[0].draw(context);
        }

        context.drawImage(BUTT, -40, -40);
    }
}

window.onload = function() {
    function mainLoop() {
        draw();
        requestAnimationFrame(mainLoop);
    }

    initialize();
    requestAnimationFrame(mainLoop);
};

