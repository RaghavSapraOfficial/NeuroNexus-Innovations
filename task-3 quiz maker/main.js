// main.js

let quizzes = [];

function renderQuizzes() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const quizCard = createQuizCard(quiz, index);
        quizContainer.appendChild(quizCard);
    });
}

function createQuizCard(quiz, index) {
    const quizCard = document.createElement('div');
    quizCard.classList.add('quiz-card');
    quizCard.innerHTML = `
        <h2>Quiz ${index + 1}</h2>
        <p>${quiz.question}</p>
        <form id="quiz-form-${index}">
            <ul>
                ${quiz.choices.map((choice, i) => `
                    <li>
                        <input type="radio" name="quiz-${index}" value="${choice}" id="q${index}-option${i}">
                        <label for="q${index}-option${i}">${choice}</label>
                    </li>
                `).join('')}
            </ul>
            <button type="button" onclick="checkQuizAnswer(${index})">Submit</button>
        </form>
    `;
    return quizCard;
}

function createQuiz(question, choices, correctAnswer) {
    const quiz = {
        question,
        choices,
        correctAnswer
    };
    quizzes.push(quiz);
    renderQuizzes();
}

function checkQuizAnswer(index) {
    const form = document.getElementById(`quiz-form-${index}`);
    const selectedOption = form.querySelector('input[type="radio"]:checked');

    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = quizzes[index].correctAnswer;

    if (userAnswer === correctAnswer) {
        alert('Correct! You got it right.');
    } else {
        alert(`Incorrect. The correct answer is ${correctAnswer}.`);
    }

    form.reset();
}

function renderQuizCreationForm() {
    const quizForm = document.getElementById('quiz-form');
    quizForm.innerHTML = `
        <h2 style="color:purple">Create a Quiz</h2>
        <label for="question" style="color:blue">Question:</label>
        <input type="text" id="question" required>
        <label for="choices" style="color:blue">Choices (comma-separated):</label>
        <input type="text" id="choices" required>
        <label for="correct-answer" style="color:blue">Correct Answer:</label>
        <input type="text" id="correct-answer" required>
        <button onclick="submitQuizForm()">Create Quiz</button>
    `;
}

function submitQuizForm() {
    const questionInput = document.getElementById('question');
    const choicesInput = document.getElementById('choices');
    const correctAnswerInput = document.getElementById('correct-answer');

    const question = questionInput.value;
    const choices = choicesInput.value.split(',').map(choice => choice.trim());
    const correctAnswer = correctAnswerInput.value;
    
    if (question === " " || choices === " " || correctAnswer === " ") {
        alert('Please fill all details. ');
        return;
    }
    createQuiz(question, choices, correctAnswer);

    questionInput.value = '';
    choicesInput.value = '';
    correctAnswerInput.value = '';
}

renderQuizCreationForm();
renderQuizzes();
