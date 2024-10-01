const exercises = [];
for (let a = 0; a <= 10; a++) {
    for (let b = 0; b <= 10; b++) {
        exercises.push({ a, b, operation: 'add', score: Math.random() });
        if (a >= b) { // Ensure the result of subtraction is non-negative
            exercises.push({ a, b, operation: 'sub', score: Math.random() });
        }
    }
}

let currentExercise = null;
let correctCount = 0;
let incorrectCount = 0;
let startTime = null;

const exerciseP = document.getElementById('exercise');
const optionsDiv = document.getElementById('options');
const resultP = document.getElementById('result');
const scoreP = document.getElementById('score');
const scoreTableBody = document.getElementById('score-table-body');

// Audio elements for correct and wrong answers
const rightSound = document.getElementById('right-sound');
const wrongSound = document.getElementById('wrong-sound');

function getExerciseKeyInStorage(exercise) {
    return `exercise_${exercise.a}_${exercise.b}_${exercise.operation}`;
}

// Initialize scores from local storage
function initializeScores() {
    exercises.forEach(exercise => {
        const storedScore = localStorage.getItem(getExerciseKeyInStorage(exercise));
        exercise.score = storedScore && !isNaN(parseFloat(storedScore)) ? parseFloat(storedScore) : Math.random();
    });
    updateScoreTable(); // Update the score table at the beginning

}

// Save scores to local storage
function saveScores() {
    exercises.forEach(exercise => {
        localStorage.setItem(getExerciseKeyInStorage(exercise), exercise.score);
    });
}

function pickRandomExercise() {
    const exercisesCopy = [...exercises];
    exercisesCopy.sort((a, b) => a.score - b.score);
    const leastKnownExercises = exercisesCopy.slice(0, 3);
    return leastKnownExercises[Math.floor(Math.random() * leastKnownExercises.length)];
}

function displayExercise() {
    let newExercise;
    let previousExerciseText = exerciseP.textContent; // Get the previous exercise

    do {
        newExercise = pickRandomExercise(); // Generate a new exercise
        const { a, b, operation } = newExercise;
        const operationSymbol = operation === 'add' ? '+' : '-';
        const newExerciseText = `${a} ${operationSymbol} ${b} = _`;

        // Only assign if it's different from the previous one
        if (newExerciseText !== previousExerciseText) {
            currentExercise = newExercise;
            exerciseP.textContent = newExerciseText;
            break;
        }
    } while (true); // Loop until a different exercise is found

    // Generate the number pad with all options from 0 to 20
    generateNumberPad();

    startTime = new Date();
}

function generateNumberPad(correctResult) {
    optionsDiv.innerHTML = ''; // Clear any existing options

    const allOptions = Array.from({ length: 21 }, (_, i) => i); // Generate numbers 0 to 20
    const table = document.createElement('table');
    table.style.margin = "0 auto";

    let row;
    allOptions.forEach((number, index) => {
        if (index % 4 === 0) {
            row = document.createElement('tr');
            table.appendChild(row);
        }
        const cell = document.createElement('td');
        const button = document.createElement('button');
        button.style.width = '70px'; // Set width to 50px
        button.style.height = '50px'; // Set height to 50px
        button.textContent = number;
        button.onclick = () => checkAnswer(number, button);
        cell.appendChild(button);
        row.appendChild(cell);
    });

    optionsDiv.appendChild(table);
}

function checkAnswer(option, button) {
    const timeTaken = (new Date() - startTime) / 1000;

    const buttons = optionsDiv.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true); // Disable buttons programmatically

    const { a, b, operation } = currentExercise;
    const correctResult = operation === 'add' ? a + b : a - b;

    if (option === correctResult) {
        correctCount++;
        currentExercise.score += 1;
        button.classList.add('correct');
        resultP.textContent = `Correct! Time: ${timeTaken.toFixed(2)} seconds.`;
        rightSound.play();  // Play correct answer sound
    } else {
        incorrectCount++;
        currentExercise.score -= 1;
        button.classList.add('incorrect');
        resultP.textContent = `Incorrect! Time: ${timeTaken.toFixed(2)} seconds.`;
        wrongSound.play()
    }

    scoreP.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;

    saveScores();
    updateScoreTable();  // Update the score table after each answer

    setTimeout(() => {
        buttons.forEach(btn => btn.classList.remove('correct', 'incorrect', 'disabled'));
        displayExercise(); // Move to the next question
    }, 1000);
}

// Function to update the score table
function updateScoreTable() {
    scoreTableBody.innerHTML = '';  // Clear the table body

    // Sort exercises by score and then display them
    exercises.sort((a, b) => b.score - a.score);

    exercises.forEach(exercise => {
        const { a, b, operation, score } = exercise;
        const operationSymbol = operation === 'add' ? '+' : '-';
        const exerciseText = `${a} ${operationSymbol} ${b}`;
        
        const row = document.createElement('tr');
        const exerciseCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        exerciseCell.textContent = exerciseText;
        scoreCell.textContent = score.toFixed(2);  // Display score with 2 decimal places

        row.appendChild(exerciseCell);
        row.appendChild(scoreCell);

        scoreTableBody.appendChild(row);
    });
}

// Initialize scores from local storage and start the game
initializeScores();
displayExercise();