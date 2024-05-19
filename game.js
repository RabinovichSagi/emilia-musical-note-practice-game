

const stickers = [
    '00.png', '01.png','02.png', '03.png','04.png', '05.png',
    '06.png'
];
const notes = [
    { name: 'c', hebrew: 'דו', score: Math.random() },
    { name: 'd', hebrew: 'רה', score: Math.random() },
    { name: 'e', hebrew: 'מי', score: Math.random() },
    { name: 'f', hebrew: 'פה', score: Math.random() },
    { name: 'g', hebrew: 'סול', score: Math.random() },
    { name: 'a', hebrew: 'לה', score: Math.random() },
    { name: 'b', hebrew: 'סי', score: Math.random() }
];


let currentNote = null;
let correctCount = 0;
let incorrectCount = 0;
let startTime = null;

const noteImage = document.getElementById('note-image');
const optionsDiv = document.getElementById('options');
const resultP = document.getElementById('result');
const scoreP = document.getElementById('score');
const stickersDiv = document.getElementById('stickers');
const confettiContainer = document.getElementById('confetti-container');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pickRandomNote() {
    console.log('notes', notes);
    notes.sort((a, b) => a.score - b.score);
    const leastKnownNotes = notes.slice(0, 3);
    return leastKnownNotes[Math.floor(Math.random() * leastKnownNotes.length)];
}

function displayNote() {
    currentNote = pickRandomNote();
    noteImage.src = `images/${currentNote.name}.png`;
    noteImage.alt = currentNote.hebrew;

    const options = [currentNote];
    while (options.length < 3) {
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        if (!options.includes(randomNote)) {
            options.push(randomNote);
        }
    }

    shuffle(options);

    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.hebrew;
        button.onclick = () => checkAnswer(option, button);
        optionsDiv.appendChild(button);
    });

    startTime = new Date();
}

function checkAnswer(option, button) {
    const timeTaken = (new Date() - startTime) / 1000;
    const buttons = optionsDiv.querySelectorAll('button');

    console.log('options', options);
    buttons.forEach(btn => btn.classList.add('disabled'));
    if (option.name === currentNote.name) {
        correctCount++;
        option.score += 1;
        button.classList.add('correct');
        resultP.textContent = `Correct! Time: ${timeTaken.toFixed(2)} seconds.`;
    } else {
        incorrectCount++;
        option.score -= 1;
        button.classList.add('incorrect');
        resultP.textContent = `Incorrect! Time: ${timeTaken.toFixed(2)} seconds.`;
    }
    scoreP.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
    
    if (correctCount % 3 === 0) {
        rewardSticker();
    }
    
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'disabled');
        });
        displayNote();
    }, 2000);
}

function rewardSticker() {
    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    const stickerImg = document.createElement('img');
    stickerImg.src = `images/stickers/${randomSticker}`;
    stickerImg.classList.add('sticker');
    stickersDiv.appendChild(stickerImg);

    setTimeout(() => {
        stickerImg.classList.add('pop-up', 'wiggle');
    }, 100);

    setTimeout(() => {
        stickerImg.classList.remove('pop-up', 'wiggle');
    }, 1000);

    launchConfetti(stickerImg);
}

function launchConfetti(stickerImg) {
    const confettiCount = 100;
    const confettiColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiContainer.appendChild(confetti);

        const rect = stickerImg.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;

        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}

displayNote();
