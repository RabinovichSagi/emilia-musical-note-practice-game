const stickers = [
    '00.png', '01.png','02.png', '03.png','04.png', '05.png',
    '06.png'
];
const notes = [
    // { name: 'c', hebrew: 'דו' },
    { name: 'd', hebrew: 'רה' },
    { name: 'e', hebrew: 'מי' },
    { name: 'f', hebrew: 'פה' },
    // { name: 'g', hebrew: 'סול' },
    { name: 'a', hebrew: 'לה' },
    // { name: 'b', hebrew: 'סי' }
];

let currentNote = null;
let correctCount = 0;
let stickerCount = 0;
let incorrectCount = 0;
let startTime = null;

const noteImage = document.getElementById('note-image');
const optionsDiv = document.getElementById('options');
const resultP = document.getElementById('result');
const scoreP = document.getElementById('score');
const stickersDiv = document.getElementById('stickers');
const confettiContainer = document.getElementById('confetti-container');

// Initialize scores and skills from local storage or set default values
function initializeScores() {
    notes.forEach(note => {
        const storedScore = localStorage.getItem(`score_${note.name}`);
        note.score = storedScore ? parseFloat(storedScore) : Math.random();
    });
}

// Save scores and counts to local storage
function saveScores() {
    notes.forEach(note => {
        localStorage.setItem(`score_${note.name}`, note.score);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pickRandomNote() {
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
    
    if (correctCount % 5 === 0 && correctCount > 0 && correctCount !== stickerCount) {
        stickerCount = correctCount;
        rewardSticker();
    }

    // Save scores and counts to local storage
    saveScores();

    setTimeout(() => {
        buttons.forEach(btn => {
            btn.classList.remove('correct', 'incorrect', 'disabled');
            btn.classList.add('hidden');
            noteImage.classList.add('hidden');
        });

        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove('hidden');
            });
            noteImage.classList.remove('hidden');
            displayNote();
        }, 500);
    }, 1000);
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

// Initialize scores from local storage and start the game
initializeScores();
displayNote();
