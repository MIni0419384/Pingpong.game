const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 50;  // 調整了方塊的高度
const ballRadius = 10;
const paddleSpeed = 4; // 增加方塊的速度

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 6; // 增加球的速度
let ballSpeedY = 3; // 增加球的速度

let paddle1Moving = false;
let paddle2Moving = true; // 初始讓右邊的拍子移動

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 畫方塊
    ctx.fillStyle = 'white';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

    // 畫球
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();

    // 畫牆壁
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, 5); // 上牆壁
    ctx.fillRect(0, canvas.height - 5, canvas.width, 5); // 下牆壁
    ctx.fillRect(0, 0, 5, canvas.height); // 左牆壁
    ctx.fillRect(canvas.width - 5, 0, 5, canvas.height); // 右牆壁

    // 移動方塊
    if (paddle1Moving) {
        if (ballY > paddle1Y + paddleHeight / 2 && paddle1Y + paddleHeight < canvas.height) {
            paddle1Y += paddleSpeed;
        } else if (ballY < paddle1Y + paddleHeight / 2 && paddle1Y > 0) {
            paddle1Y -= paddleSpeed;
        }
    }

    if (paddle2Moving) {
        if (ballY > paddle2Y + paddleHeight / 2 && paddle2Y + paddleHeight < canvas.height) {
            paddle2Y += paddleSpeed;
        } else if (ballY < paddle2Y + paddleHeight / 2 && paddle2Y > 0) {
            paddle2Y -= paddleSpeed;
        }
    }

    // 移動球
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 牆壁碰撞檢測
    if (ballY + ballRadius >= canvas.height || ballY - ballRadius <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    // 方塊碰撞檢測
    if (ballX - ballRadius <= paddleWidth + 5 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        paddle1Moving = false;
        paddle2Moving = true;
    }
    if (ballX + ballRadius >= canvas.width - paddleWidth - 5 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        paddle2Moving = false;
        paddle1Moving = true;
    }

    // 球出界重置
    if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = 6; // 重置球的速度
        ballSpeedY = 3; // 重置球的速度
        paddle1Moving = false;
        paddle2Moving = true; // 重置初始狀態，讓右邊拍子先移動
    }
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
