const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const difficultyContainer = document.querySelector("#difficultyContainer");
const gameContainer = document.querySelector("#gameContainer");
const controlsContainer = document.querySelector("#controlsContainer");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightGreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocety = unitSize;
let yVelocety = 0;
let foodX;
let foodY;
let score = 0;
let gameSpeed = 75;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

const upBtn = document.querySelector("#upBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const downBtn = document.querySelector("#downBtn");

upBtn.addEventListener("click", () => handleTouchControl("up"));
leftBtn.addEventListener("click", () => handleTouchControl("left"));
rightBtn.addEventListener("click", () => handleTouchControl("right"));
downBtn.addEventListener("click", () => handleTouchControl("down"));

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

gameBoard.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, false);

gameBoard.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = touchEndY - touchStartY;

    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
        if (horizontalDistance > 30) {
            handleTouchControl("right");
        } else if (horizontalDistance < -30) {
            handleTouchControl("left");
        }
    } else {

        if (verticalDistance > 30) {
            handleTouchControl("down");
        } else if (verticalDistance < -30) {
            handleTouchControl("up");
        }
    }
}

function handleTouchControl(direction) {
    const goingUp = (yVelocety == -unitSize);
    const goingDown = (yVelocety == unitSize);
    const goingRight = (xVelocety == unitSize);
    const goingLeft = (xVelocety == -unitSize);

    switch (direction) {
        case "left":
            if (!goingRight) {
                xVelocety = -unitSize;
                yVelocety = 0;
            }
            break;
        case "up":
            if (!goingDown) {
                xVelocety = 0;
                yVelocety = -unitSize;
            }
            break;
        case "right":
            if (!goingLeft) {
                xVelocety = unitSize;
                yVelocety = 0;
            }
            break;
        case "down":
            if (!goingUp) {
                xVelocety = 0;
                yVelocety = unitSize;
            }
            break;
    }
}

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

showDifficultySelection();

function showDifficultySelection() {
    gameBoard.style.display = "none";
    scoreText.style.display = "none";
    resetBtn.style.display = "none";
    controlsContainer.style.display = "none";

    difficultyContainer.style.display = "flex";
}

function setDifficulty(level) {
    switch (level) {
        case "easy":
            gameSpeed = 100;
            break;
        case "medium":
            gameSpeed = 75;
            break;
        case "hard":
            gameSpeed = 50;
            break;
    }

    difficultyContainer.style.display = "none";

    gameBoard.style.display = "block";
    scoreText.style.display = "block";
    resetBtn.style.display = "inline-block";

    if (isMobileDevice()) {
        controlsContainer.style.display = "grid";
    } else {
        controlsContainer.style.display = "none";
    }

    gameStart();
}

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, gameSpeed);
    }
    else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocety,
        y: snake[0].y + yVelocety
    };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1
        scoreText.textContent = score;
        createFood()
    }
    else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocety == -unitSize);
    const goingDown = (yVelocety == unitSize);
    const goingRight = (xVelocety == unitSize);
    const goingLeft = (xVelocety == -unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
            xVelocety = -unitSize;
            yVelocety = 0;
            break;

        case (keyPressed == UP && !goingDown):
            xVelocety = 0;
            yVelocety = -unitSize;
            break;

        case (keyPressed == RIGHT && !goingLeft):
            xVelocety = unitSize;
            yVelocety = 0;
            break;

        case (keyPressed == DOWN && !goingUp):
            xVelocety = 0;
            yVelocety = unitSize;
            break;
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    score = 0;
    xVelocety = unitSize;
    yVelocety = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
}