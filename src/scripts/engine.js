const emojis = [
    "🙈", "🙈", "😺", "😺", "🐶", "🐶", "🐺", "🐺",
    "🦁", "🦁", "🐯", "🐯", "🦒", "🦒", "🦊", "🦊",
];

let openCards = [];
let score = 0;
const congratulations = 200
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box)
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.mp3`);
    audio.play();
    audio.volume = 0.3;
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        updateScore();
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        playSound("congratulations")
        setTimeout(() => {
            alert("Parabéns!! Você Venceu");
        }, congratulations);
    }
}

function updateScore() {
    score += 1;
    const scoreDisplay = document.getElementById("score");
    if (scoreDisplay) {
        scoreDisplay.innerText = score;
        playSound("points")
    }
}

