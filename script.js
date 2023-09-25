const character = document.getElementById("character");
const block = document.getElementById("block");
const megaman = document.querySelector(".megaman-running");

const spriteImages = [
    "img/megaman_running_1.png",
    "img/megaman_running_2.png",
    "img/megaman_running_3.png"
];

let currentImageIndex = 0;
let isJumping = false;
let playTime = 0; // Initialize play time in seconds

let timerInterval; // Store the timer interval

function animateSprite() {
    if (!isJumping) {
        megaman.style.backgroundImage = `url(${spriteImages[currentImageIndex]})`;
        currentImageIndex++;
        if (currentImageIndex >= spriteImages.length) {
            currentImageIndex = 0;
        }
    }

    setTimeout(animateSprite, 100);
}

animateSprite();

function jump() {
    if (!isJumping) {
        megaman.style.backgroundImage = `url(img/megaman_jump.png)`;
        character.classList.add("animate");
        isJumping = true; 
    }

    setTimeout(function () {
        character.classList.remove("animate");
        isJumping = false; 
    }, 500);
}

function startTimer() {
    timerInterval = setInterval(function () {
        playTime++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time Played: ${playTime} seconds`;
}

// Start the timer when the game begins
startTimer();

const checkDead = setInterval(function () {
    const characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    const blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
    );
    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        stopTimer(); // Stop the timer when the user loses
        block.style.animation = "none";
        block.style.display = "none";
        alert(`Game Over! You played for ${playTime} seconds.`);
    }
}, 10);
