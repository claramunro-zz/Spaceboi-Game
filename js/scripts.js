var myGamePiece;
var obstacleOne;
var myScore;
var myObstacles = [];
var mySound;
var myMusic;


// start game function

function startGame() {
    $("#title").hide();
    $(myGameArea.canvas).show();
    myObstacles = [];
    myGamePiece = new component(40, 70, "../img/astronaut.png", 500, 150, "image");
    myScore = new component("25px", "starjedi", "gold", 100, 30, "text");
    myMusic = new sound("../music/space.mp3");
    mySound = new sound("../music/lose.mp3");
    myMusic.play();
    myGameArea.start();
}

// add canvas onto page when start button is pressed

var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = screen.width;
        this.canvas.height = screen.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

// Player and obstacles objects and constructor

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x - 20;
        var myright = this.x + (this.width) - 20;
        var mytop = this.y - 20;
        var mybottom = this.y + (this.height) - 20;
        var otherleft = otherobj.x - 25;
        var otherright = otherobj.x + (otherobj.width) - 30;
        var othertop = otherobj.y + 25;
        var otherbottom = otherobj.y + (otherobj.height) - 30;
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// constant refreshing of game area to add player movement and objects spawning

function updateGameArea() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -9; myGamePiece.image.src = "../img/astronaut.png" }
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = +9; myGamePiece.image.src = "../img/astronaut-right.png" }
    if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -9; }
    if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = +9; }

    var y, x;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            mySound.play();
            myMusic.stop();
            $(myGameArea.canvas).hide();
            $(".endingScreen").show();
            $(".highScore").text(" " + myGameArea.frameNo);
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(300)) {
        y = myGameArea.canvas.height;
        minHeight = 0;
        maxHeight = 0;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 300;
        maxGap = 700;
        sizeRandom = Math.floor(Math.random() * (100 - 50 + 1) + 50);
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(1, 1080, "../img/black-line.png", 1, 0, "image"));
        myObstacles.push(new component(1, 1080, "../img/black-line.png", 1920, 0, "image"));
        myObstacles.push(new component(40, 40, "../img/egg.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(20, 17, "../img/popcorn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(40, 140, "../img/rocket.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(sizeRandom, sizeRandom, "../img/asteroid.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(40, 40, "../img/egg.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(20, 17, "../img/popcorn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(40, 140, "../img/rocket.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(sizeRandom, sizeRandom, "../img/asteroid.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1080, "image"));
        myObstacles.push(new component(40, 40, "../img/egg.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(20, 17, "../img/popcorn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(40, 140, "../img/rocket.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        myObstacles.push(new component(sizeRandom, sizeRandom, "../img/asteroid.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        if (myGameArea.frameNo > 500) {
            myObstacles.push(new component(70, 60, "../img/moon.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(170, 150, "../img/jupiter.png", Math.floor(Math.random() * (19200 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(125, 105, "../img/neptune.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        } if (myGameArea.frameNo > 1000) {
            myObstacles.push(new component(180, 129, "../img/satellite.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(200, 100, "../img/saturn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(150, 150, "../img/earth.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        } if (myGameArea.frameNo > 1500) {
            myObstacles.push(new component(20, 17, "../img/popcorn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(40, 40, "../img/egg.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(150, 150, "../img/earth.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
        } if (myGameArea.frameNo > 2000) {
            myObstacles.push(new component(20, 17, "../img/popcorn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(40, 40, "../img/egg.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(70, 60, "../img/moon.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(170, 150, "../img/jupiter.png", Math.floor(Math.random() * (19200 - 0 + 1) + 0), 1500, "image"));
        } if (myGameArea.frameNo > 3000) {
            myObstacles.push(new component(150, 150, "../img/earth.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(200, 100, "../img/saturn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(70, 60, "../img/moon.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(170, 150, "../img/jupiter.png", Math.floor(Math.random() * (19200 - 0 + 1) + 0), 1500, "image"));
        } if (myGameArea.frameNo > 4000) {
            myObstacles.push(new component(500, 500, "../img/alien.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(200, 100, "../img/saturn.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(70, 60, "../img/moon.png", Math.floor(Math.random() * (1920 - 0 + 1) + 0), 1500, "image"));
            myObstacles.push(new component(170, 150, "../img/jupiter.png", Math.floor(Math.random() * (19200 - 0 + 1) + 0), 1500, "image"));
        }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += -1;
        myObstacles[i].update();
    }
    myScore.text = "SCoRE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

// Sound

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}
$(document).ready(function(){
  $("#instructions").click(function(event){
    event.preventDefault();
    $("#instructPopUp").toggle();


  });
});

$(document).ready(function () {
    $("#tryAgain").click(function (event) {
        event.preventDefault();
        $(".endingScreen").hide();
        $(myGameArea.canvas).show();
        startGame();
        
    });
    $(".home").click(function (event) {
        event.preventDefault();
        $(".endingScreen").hide();
        $("#title").show();
    });
    $("#infoButton").click(function(event) {
        event.preventDefault();
        $("#infoPanel").toggle();
        $("#infoButton").hide();
    });
    $("#infoPanel").click(function(event) {
        event.preventDefault();
        $("#infoPanel").hide();
        $("#infoButton").show();
    });
});
