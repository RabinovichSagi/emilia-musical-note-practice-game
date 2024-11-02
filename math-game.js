let decayCounter = { level1: 0, level2: 0 }; // Track when to reintroduce easier exercises

const exercises = [];
for (let a = 0; a <= 10; a++) {
    for (let b = 0; b <= 10; b++) {
        if (a + b <= 10 || (a + b > 10 && a === b)) {
            exercises.push({ a, b, operation: 'add', score: Math.random() });
        }
        if (a >= b && a <= 10) { // Ensure the result of subtraction is non-negative
            exercises.push({ a, b, operation: 'sub', score: Math.random() });
        }
    }
}


// Play the audio for a given number
function playNumberAudio(number) {
    document.getElementById(`sound-number-${number}`).play();
}

// Method to reset all scores
function resetScore() {
    exercises.forEach(exercise => {
        exercise.score = Math.random(); // Reset the score to a random value (or set to 0 if preferred)
        localStorage.setItem(getExerciseKeyInStorage(exercise), exercise.score);
    });
    console.log("All exercise scores have been reset.");
    updateScoreTable(); // Update the UI table with the reset scores
}

// Attach resetScore to the window object for easy access during debugging
window.resetScore = resetScore;


let currentExercise = null;
let correctCount = 0;
let incorrectCount = 0;
let startTime = null;
let countdownTimer = null;
let timeLimit = 11; 
let displayAsGraph = false; // Flag to alternate between the representations
const delayBeforeNextExcerciseOnWrong = 3500
const delayBeforeNextExcerciseOnCorrect = 1000

// Get the time limit from query parameters
const urlParams = new URLSearchParams(window.location.search);
const queryTimeLimit = parseInt(urlParams.get('timeLimit'), 10);
if (!isNaN(queryTimeLimit)) {
    timeLimit = queryTimeLimit;
}

// HTML elements
const exerciseP = document.getElementById('exercise');
const optionsDiv = document.getElementById('options');
const resultP = document.getElementById('result');
const scoreP = document.getElementById('score');
const scoreTableBody = document.getElementById('score-table-body');
const timerP = document.getElementById('timer');

// Audio elements for correct and wrong answers
const rightSound = document.getElementById('right-sound');
const wrongSound = document.getElementById('wrong-sound');

// Local storage keys for scores and counters
const correctCountKey = 'math_game_correct_count';
const incorrectCountKey = 'math_game_incorrect_count';


// Load correct/incorrect count from localStorage
function loadProgress() {
    correctCount = parseInt(localStorage.getItem(correctCountKey)) || 0;
    incorrectCount = parseInt(localStorage.getItem(incorrectCountKey)) || 0;
    scoreP.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
}

// Save correct/incorrect count to localStorage
function saveProgress() {
    localStorage.setItem(correctCountKey, correctCount);
    localStorage.setItem(incorrectCountKey, incorrectCount);
}

// Save scores to local storage
function saveScores() {
    exercises.forEach(exercise => {
        localStorage.setItem(getExerciseKeyInStorage(exercise), exercise.score);
    });
}


function getExerciseKeyInStorage(exercise) {
    return `math-game_exercise_${exercise.a}_${exercise.b}_${exercise.operation}`;
}


// Pick an exercise with weighted probabilities and progression logic
function pickProgressiveExercise() {
     // Create arrays of Level 1, Level 2, and Level 3 exercises
     const level1Exercises = exercises.filter(ex => ex.a <= 5 && ex.b <= 5 && (ex.a <= 2 || ex.b <= 2)); // Basic additions/subtractions

     // Level 2 exercises that are not in Level 1
     const level2Exercises = exercises.filter(ex => 
         ex.a + ex.b <= 10 && ex.a > 2 && ex.b > 2 && !level1Exercises.includes(ex)
     ); // Medium difficulty, excludes Level 1
 
     // Level 3 exercises that are not in Level 1 or Level 2
     const level3Exercises = exercises.filter(ex => 
         ex.a + ex.b > 10 && !level1Exercises.includes(ex) && !level2Exercises.includes(ex)
     ); // Harder exercises, excludes Level 1 and Level 2    const level1Threshold = 20;

    const level1Threshold = 20;
    const level2Threshold = 40;
    
    let selectedExercises = [];

    const skill = correctCount - incorrectCount;
    // Decide current difficulty based on progression
    if (skill < level1Threshold) { // Level 1
        selectedExercises = level1Exercises;
    } else if (skill >= level1Threshold && skill < level2Threshold) { // Level 2
        selectedExercises = [...level1Exercises, ...level2Exercises];
    } else { // Level 3
        selectedExercises = [...level2Exercises, ...level3Exercises];
    }

    // Apply skill decay: favor easier exercises after decay period
    if (skill >= level1Threshold && decayCounter.level1 >= 5) {
        selectedExercises = weightedExercisePicker(level1Exercises, selectedExercises, 0.8); // 80% favor to easier
        decayCounter.level1 = 0; // Reset decay counter
    } else if (skill >= level2Threshold && decayCounter.level2 >= 5) {
        selectedExercises = weightedExercisePicker(level2Exercises, selectedExercises, 0.8); // 80% favor to medium exercises
        decayCounter.level2 = 0; // Reset decay counter
    }

    // Increment decay counters based on the level
    if (selectedExercises.some(ex => level1Exercises.includes(ex))) {
        decayCounter.level1++;
    }
    if (selectedExercises.some(ex => level2Exercises.includes(ex))) {
        decayCounter.level2++;
    }

    console.log(selectedExercises);
    // Select exercises favoring least-known from weighted selection
    const leastKnownExercises = selectedExercises.sort((a, b) => a.score - b.score).slice(0, 3);
    return leastKnownExercises[Math.floor(Math.random() * leastKnownExercises.length)];
}

/**
 * Weighted exercise picker to favor certain level of exercises.
 * @param {Array} favoredLevelExercises - Exercises we want to favor (e.g., level 1).
 * @param {Array} allExercises - All available exercises.
 * @param {number} weight - Probability weight favoring easier exercises (e.g., 0.7 = 70% chance).
 */
function weightedExercisePicker(favoredLevelExercises, allExercises, weight) {
    const weightedExercises = [];

    // Add favored exercises with higher frequency
    favoredLevelExercises.forEach(ex => {
        for (let i = 0; i < Math.floor(weight * 10); i++) {
            weightedExercises.push(ex);
        }
    });

    // Add remaining exercises with lower frequency
    allExercises.forEach(ex => {
        if (!favoredLevelExercises.includes(ex)) {
            for (let i = 0; i < Math.floor((1 - weight) * 10); i++) {
                weightedExercises.push(ex);
            }
        }
    });

    // Randomly select from the weighted pool
    return weightedExercises;
}


// Initialize scores from local storage
function initializeScores() {
    exercises.forEach(exercise => {
        const storedScore = localStorage.getItem(getExerciseKeyInStorage(exercise));
        exercise.score = storedScore && !isNaN(parseFloat(storedScore)) ? parseFloat(storedScore) : Math.random();
    });
    updateScoreTable(); // Update the score table at the beginning

}


function pickRandomExercise() {
    const exercisesCopy = [...exercises];
    exercisesCopy.sort((a, b) => a.score - b.score);
    const leastKnownExercises = exercisesCopy.slice(0, 3);
    return leastKnownExercises[Math.floor(Math.random() * leastKnownExercises.length)];
}

function displayExercise() {
    displayAsGraph = !displayAsGraph; // Alternate between representations

    let newExercise;
    let previousExerciseText = exerciseP.textContent; // Get the previous exercise text representation

    let newExerciseText;
    do {
        newExercise = pickProgressiveExercise(); // Generate a new exercise
        const { a, b, operation } = newExercise;
        if (displayAsGraph) {
            const graphHtml = generateGraphHtml(a, b, operation);
            exerciseP.innerHTML = graphHtml;
            newExerciseText = `${a}_${b}_${operation}_graph`; // Unique representation for graph mode
        } else {
            const operationSymbol = operation === 'add' ? '+' : '-';
            newExerciseText = `${a} ${operationSymbol} ${b} = __`;
            exerciseP.textContent = newExerciseText;
        }
    } while (newExerciseText === previousExerciseText); // Ensure the new exercise is different from the previous one

    adjustedTimeLimit = displayAsGraph ? Math.floor(timeLimit *1.3):timeLimit;
    currentExercise = newExercise;

    // Generate the number pad with all options from 0 to 20
    generateNumberPad();
    startTimer(adjustedTimeLimit); // Start the timer

    startTime = new Date();
}

function generateGraphHtml(a, b, operation, showAnswer) {
    const answer = operation === 'add' ? a + b : a - b;
    const rootValue = operation === 'add' ? answer : a;
    const leftChild = operation === 'add' ? a : b;
    const rightChild = operation === 'add' ? b : answer;
    
    return `
        <div class="tree">
            <ul>
                <li>
                    <a href="#" ${operation === 'add' && !showAnswer ? 'class="hide-answer"' : ''}>${rootValue}</a>
                    <ul>
                        <li>
                            <a href="#">${leftChild}</a>
                        </li>
                        <li>
                            <a href="#" ${operation !== 'add' && !showAnswer ? 'class="hide-answer"' : ''}>${rightChild}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
}

function generateNumberPad() {
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
    clearTimeout(countdownTimer); // Stop the timer

    const timeTaken = (new Date() - startTime) / 1000;

    const buttons = optionsDiv.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true); // Disable buttons programmatically

    const { a, b, operation } = currentExercise;
    const correctResult = operation === 'add' ? a + b : a - b;

    const isCorrectAnswer = option === correctResult;
    if (isCorrectAnswer) {
        correctCount++;
        currentExercise.score += 1;
        button.classList.add('correct');
        resultP.textContent = `Correct! Time: ${timeTaken.toFixed(2)} seconds.`;
        rightSound.play();  // Play correct answer sound
    } else {
        incorrectCount++;
        currentExercise.score = Math.max(-5, currentExercise.score - 1); // lower bound the score
        button.classList.add('incorrect');
        resultP.textContent = `Incorrect! The correct answer was ${correctResult}. Time: ${timeTaken.toFixed(2)} seconds.`;
        // wrongSound.play();
        playNumberAudio(correctResult);  // Play audio for the correct answer

        // Highlight the correct answer in green
        buttons.forEach(btn => {
            if (parseInt(btn.textContent, 10) === correctResult) {
                btn.classList.add('correct');
            }
        });

        // Update the exercise display to show the correct answer
        const operationSymbol = operation === 'add' ? '+' : '-';
        if (displayAsGraph) { 
            const graphHtml = generateGraphHtml(a, b, operation, true);
            exerciseP.innerHTML = graphHtml;
        }
        else {
            exerciseP.textContent = `${a} ${operationSymbol} ${b} = ${correctResult}`;
        }
        
    }

    scoreP.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;

    saveScores();
    updateScoreTable();  // Update the score table after each answer

    timeToWait = isCorrectAnswer ? delayBeforeNextExcerciseOnCorrect : delayBeforeNextExcerciseOnWrong;
    setTimeout(() => {
        buttons.forEach(btn => btn.classList.remove('correct', 'incorrect', 'disabled'));
        displayExercise(); // Move to the next question
    }, timeToWait); // Increased time to allow the user to see the correct answer
}

function startTimer(time) {
    timerP.textContent = `${time} שניות`;

    countdownTimer = setInterval(() => {
        time--;
        timerP.textContent = `${time} שניות`;

        if (time === 0) {
            clearInterval(countdownTimer);
            handleTimeOut();
        }
    }, 1000);
}
function handleTimeOut() {
    const buttons = optionsDiv.querySelectorAll('button');
    const { a, b, operation } = currentExercise;
    const correctResult = operation === 'add' ? a + b : a - b;

    buttons.forEach(btn => {
        btn.disabled = true; // Disable buttons programmatically
        if (parseInt(btn.textContent, 10) === correctResult) {
            btn.classList.add('correct'); // Highlight the correct answer in green
        }
    });

    incorrectCount++;
    currentExercise.score -= 1;
    resultP.textContent = `Time's up! The correct answer was ${correctResult}.`;
    optionsDiv.querySelector('table').style.border = '2px solid red'; // Set red border on the table
    // wrongSound.play();
    playNumberAudio(correctResult); 

    // Update the exercise display to show the correct answer
    if (displayAsGraph) { 
        const graphHtml = generateGraphHtml(a, b, operation, true);
        exerciseP.innerHTML = graphHtml;
    }
    else {
        const operationSymbol = operation === 'add' ? '+' : '-';
        exerciseP.textContent = `${a} ${operationSymbol} ${b} = ${correctResult}`;
    }
    

    scoreP.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
    saveProgress();
    saveScores();
    updateScoreTable();

    setTimeout(() => {
        buttons.forEach(btn => btn.classList.remove('correct', 'incorrect', 'disabled')); // Remove button styles
        optionsDiv.querySelector('table').style.border = ''; // Remove red border
        displayExercise(); // Move to the next question
    }, delayBeforeNextExcerciseOnWrong);  // Delay a bit longer to give user time to see the correct answer
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
loadProgress(); 
displayExercise();
