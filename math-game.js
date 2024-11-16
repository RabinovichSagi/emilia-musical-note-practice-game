<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Problems</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .problem {
            margin: 20px auto;
            border: 1px solid #ccc;
            padding: 20px;
            width: 80%;
            max-width: 500px;
            border-radius: 8px;
        }
        .problem p {
            font-size: 18px;
            margin-bottom: 15px;
        }
        .problem input {
            padding: 8px;
            font-size: 16px;
            margin-right: 10px;
        }
        .problem button {
            padding: 8px 15px;
            font-size: 16px;
            cursor: pointer;
        }
        .problem .result {
            margin-top: 10px;
            font-size: 16px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Math Practice</h1>
    <div id="problem-container"></div>

    <script type="module">
        import { templates_bus_drive, templates_grocery_shopping, templates_flower_bed, templates_balloons } from './math-stories.templates.js';

        const templates = [
            ...templates_bus_drive,
            ...templates_grocery_shopping,
            ...templates_flower_bed,
            ...templates_balloons
        ];

        // Function to pick numbers based on problem type
        function pickNumbers(template) {
            switch (template.type) {
                case "addition_2":
                    return pickForAddition2();
                case "addition_3":
                    return pickForAddition3();
                case "addition_4":
                    return pickForAddition4();
                case "subtraction_2":
                    return pickForSubtraction2();
                case "mixed_3":
                    return pickForMixed3();
                case "mixed_4":
                    return pickForMixed4();
                case "mixed_5":
                    return pickForMixed5();
                default:
                    throw new Error("Unsupported problem type");
            }
        }

        function pickForAddition2() {
            let a = getRandomInt(0, 20);
            let b = getRandomInt(0, 20 - a);
            return [a, b];
        }

        function pickForAddition3() {
            let a = getRandomInt(0, 20);
            let b = getRandomInt(0, 20 - a);
            let c = getRandomInt(0, 20 - a - b);
            return [a, b, c];
        }

        function pickForAddition4() {
            let a = getRandomInt(0, 20);
            let b = getRandomInt(0, 20 - a);
            let c = getRandomInt(0, 20 - a - b);
            let d = getRandomInt(0, 20 - a - b - c);
            return [a, b, c, d];
        }

        function pickForSubtraction2() {
            let a = getRandomInt(1, 20);
            let b = getRandomInt(0, a);
            return [a, b];
        }

        function pickForMixed3() {
            let a = getRandomInt(0, 20);
            let b = getRandomInt(0, 20 - a);
            let c = getRandomInt(0, a + b);
            return [a, b, c];
        }

        function pickForMixed4() {
            let a = getRandomInt(1, 20);
            let b = getRandomInt(0, a);
            let c = getRandomInt(0, 20 - (a - b));
            return [a, b, c];
        }

        function pickForMixed5() {
            let a = getRandomInt(1, 20);
            let b = getRandomInt(0, a);
            let c = getRandomInt(0, a - b);
            return [a, b, c];
        }

        // Utility function to generate a random integer in range [min, max]
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Replace placeholders explicitly
        function replacePlaceholders(story, params) {
            return story
                .replace("{a}", params[0] ?? "")
                .replace("{b}", params[1] ?? "")
                .replace("{c}", params[2] ?? "")
                .replace("{d}", params[3] ?? "");
        }

        // Generate a problem
        function generateProblem() {
            const template = templates[Math.floor(Math.random() * templates.length)];
            const params = pickNumbers(template);
            const problemText = replacePlaceholders(template.story, params);
            const correctAnswer = template.operation(...params);

            const problemDiv = document.createElement('div');
            problemDiv.className = 'problem';

            const storyParagraph = document.createElement('p');
            storyParagraph.textContent = problemText;
            problemDiv.appendChild(storyParagraph);

            const inputField = document.createElement('input');
            inputField.type = 'number';
            inputField.placeholder = 'Your answer';
            problemDiv.appendChild(inputField);

            const checkButton = document.createElement('button');
            checkButton.textContent = 'Check';
            problemDiv.appendChild(checkButton);

            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            problemDiv.appendChild(resultDiv);

            checkButton.addEventListener('click', () => {
                const userAnswer = parseInt(inputField.value, 10);
                if (userAnswer === correctAnswer) {
                    resultDiv.textContent = 'Correct!';
                    resultDiv.style.color = 'green';
                } else {
                    resultDiv.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
                    resultDiv.style.color = 'red';
                }
            });

            return problemDiv;
        }

        // Load problems into the container
        function loadProblems(count) {
            const container = document.getElementById('problem-container');
            container.innerHTML = '';
            for (let i = 0; i < count; i++) {
                container.appendChild(generateProblem());
            }
        }

        loadProblems(5); // Generate 5 problems on page load
    </script>
</body>
</html>
