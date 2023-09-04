// Variables
let board;
let boardWidth = 1000;
let boardHeight = 500;
let context;

// Player
let playerWidth = 88;
let playerHeight = 94;
let playerX = 40;
let playerY = 250;
let playerImg;

let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}

// Enemies
let enemyArray = [];

let enemy1Width = 60
let enemy2Width = 90;
let enemy3Width = 112;

let enemyHeight = 70;
let enemyX = 1000;
let enemyY = boardHeight - enemyHeight;

let enemy1Img;
let enemy2Img;
let enemy3Img;

// Physics
let velocityX = -6; // Enemy moving left speed
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;
let jumping = false; // Menyimpan status meloncat

// Initialize the game
function initializeGame() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); // Used for drawing on the board

    initializePlayer();
    initializeEnemyImages();
    requestAnimationFrame(update);
    setInterval(placeEnemy, 1000); // 1000 milliseconds = 1 second
    document.addEventListener("keydown", handleKeyPress);
}

// Initialize the player
function initializePlayer() {
    playerImg = new Image();
    playerImg.src = "./img/ship.png";
    playerImg.onload = function () {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
}

// Initialize enemy images
function initializeEnemyImages() {
    enemy1Img = new Image();
    enemy1Img.src = "./img/ufo1.png";

    enemy2Img = new Image();
    enemy2Img.src = "./img/ship-enemy.png";

    enemy3Img = new Image();
    enemy3Img.src = "./img/ship-enemy2.png";
}

// Handle player key presses
function handleKeyPress(e) {
    if (e.code === "Space" && playerY > 30 && !jumping) {
        jump();
    } else if (e.code == "ArrowUp" && playerY > 30) {
        moveVertical(-30); // Mengganti nama duck menjadi moveVertical
    } else if (e.code == "ArrowDown" && playerY < 380) {
        moveVertical(30); // Mengganti nama duck menjadi moveVertical
    }
}

// Player jump
function jump() {
    velocityY = -10;
    jumping = true;
}

// Player moveVertical
function moveVertical(offsetY) {
    playerY += offsetY;
}

// Game update loop
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        context.fillStyle = "white";
        context.font = "48px 'Press Start 2P', cursive";
        const gameOverText = "Game Over";
        const textWidth = context.measureText(gameOverText).width;
        const centerX = (board.width - textWidth) / 2;
        context.fillText(gameOverText, centerX, 250);

        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // Player
    updatePlayer();

    // Enemies
    updateEnemies();

    // Score
    displayScore();

    // Check if player has returned to the ground
    if (player.y >= playerY) {
        player.y = playerY;
        velocityY = 0;
        jumping = false;
    }
}

// Update player position
function updatePlayer() {
    velocityY += gravity;
    player.y = Math.min(player.y + velocityY, playerY);
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Update enemy positions
function updateEnemies() {
    for (let i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i];
        enemy.x += velocityX;
        context.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);

        if (detectCollision(player, enemy)) {
            gameOver = true;
            playerImg.src = "./img/boom.png";
            playerImg.onload = function () {
                context.clearRect(player.x, player.y, player.width, player.height);
                context.drawImage(playerImg, player.x, player.y, player.width, player.height);
            }
        }
    }
}

// Display the score
function displayScore() {
    context.fillStyle = "white";
    context.font = "40px courier";
    score++;
    const scoreText = "Score: " + score;
    const textWidth = context.measureText(scoreText).width;
    const centerX = 700;
    context.fillText(scoreText, centerX, 50);
}

// Place enemies on the screen
function placeEnemy() {
    if (gameOver) {
        return;
    }

    let enemy = {
        img: null,
        x: enemyX,
        y: Math.random() * (boardHeight - enemyHeight),
        width: null,
        height: enemyHeight
    }

    let placeEnemyChance = Math.random();

    if (placeEnemyChance > 0.90) {
        enemy.img = enemy3Img;
        enemy.width = enemy3Width;
        enemyArray.push(enemy);
    } else if (placeEnemyChance > 0.70) {
        enemy.img = enemy2Img;
        enemy.width = enemy2Width;
        enemyArray.push(enemy);
    } else if (placeEnemyChance > 0.50) {
        enemy.img = enemy1Img;
        enemy.width = enemy1Width;
        enemyArray.push(enemy);
    }

    if (enemyArray.length > 5) {
        enemyArray.shift();
    }
}

// Detect collision between two objects
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

// Start the game
window.onload = initializeGame;
