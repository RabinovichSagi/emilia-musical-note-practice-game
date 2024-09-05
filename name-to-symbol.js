const stickers = [
    '00.png', '01.png', '02.png', '03.png', '04.png', '05.png',
    '06.png'
];
const notes = [
    { name: 'c', hebrew: 'דו' },
    { name: 'd', hebrew: 'רה' },
    { name: 'e', hebrew: 'מי' },
    { name: 'f', hebrew: 'פה' },
    { name: 'g', hebrew: 'סול' },
    { name: 'a', hebrew: 'לה' },
    { name: 'b', hebrew: 'סי' }
];

let currentNote = null;
let correctCount = 0;
let stickerCount = 0;
let incorrectCount = 0;
let startTime = null;

const noteNameP = document.getElementById('note-name');
const optionsDiv = document.getElementById('options');
const resultP = document.getElementById('result');
const scoreP = document.getElementById('score');
const stickersDiv = document.getElementById('stickers');
const confettiContainer = document.getElementById('confetti-container');

function getNoteKeyInStorage(note){
    return `symbol-to-name__score_${note.name}`;
}


// Initialize scores and skills from local storage or set default values
function initializeScores() {
    notes.forEach(note => {
        const storedScore = localStorage.getItem(getNoteKeyInStorage(note));
        note.score = storedScore ? parseFloat(storedScore) : Math.random();
    });
}

// Save scores and counts to local storage
function saveScores() {
    notes.forEach(note => {
        localStorage.setItem(getNoteKeyInStorage(note), note.score);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pickRandomNote() {
    notesCopy = [...notes]
    notesCopy.sort((a, b) => a.score - b.score);
    const leastKnownNotes = notesCopy.slice(0, 3);
    return leastKnownNotes[Math.floor(Math.random() * leastKnownNotes.length)];
}

function findClosestNotes(note) {
    const index = notes.findIndex(n => n.name === note.name);
    if (index< 0){
        throw new Error('Did not find note ' + note.name);
    }
    console.log('index: ', index);
    const closestNotes = [];
    if (index > 0) {
        closestNotes.push(notes[index - 1]);
    } else {
        closestNotes.push(notes[index + 2]);
    }

    if (index < notes.length - 1) {
        closestNotes.push(notes[index + 1]);
    } else {
        closestNotes.push(notes[index - 2]);
    }
    return closestNotes;
}

function displayNoteName() {
    currentNote = pickRandomNote();
    noteNameP.textContent = currentNote.hebrew;

    const closestNotes = findClosestNotes(currentNote);
    const options = [currentNote, ...closestNotes];

    shuffle(options);

    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('img');
        button.src = `images/${option.name}.png`;
        button.alt = option.hebrew;
        button.onclick = () => checkAnswer(option, button);
        button.classList.add('sticker');
        optionsDiv.appendChild(button);
    });

    startTime = new Date();
}

function checkAnswer(option, button) {
    const timeTaken = (new Date() - startTime) / 1000;

    const buttons = optionsDiv.querySelectorAll('img');
    buttons.forEach(btn => btn.classList.add('disabled'));

    if (option.name === currentNote.name) {
        correctCount++;
        option.score += 1;
        button.classList.add('correct-border');
        resultP.textContent = `Correct! Time: ${timeTaken.toFixed(2)} seconds.`;
    } else {
        incorrectCount++;
        option.score -= 1;
        button.classList.add('incorrect-border');
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
            btn.classList.remove('correct-border', 'incorrect-border', 'disabled');
            btn.classList.add('hidden');
        });

        setTimeout(() => {
            buttons.forEach(btn => {
                btn.classList.remove('hidden');
            });
            displayNoteName();
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
        stickerImg.classList.add('pop-up');
    }, 100);

    setTimeout(() => {
        stickerImg.classList.remove('pop-up');
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
displayNoteName();