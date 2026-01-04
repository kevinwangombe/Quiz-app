const quizData = [
    {
        question: "Which singer is known as the 'Queen of Pop'?",
        options: ["Beyoncé", "Madonna", "Taylor Swift", "Lady Gaga"],
        answer: "Madonna"
    },
    {
        question: "In which movie would you find the character Tony Stark?",
        options: ["Batman", "Superman", "Iron Man", "Spider-Man"],
        answer: "Iron Man"
    },
    {
        question: "What social media platform limits posts to 280 characters?",
        options: ["Facebook", "Instagram", "Twitter", "TikTok"],
        answer: "Twitter"
    },
    {
        question: "Which streaming service created 'Stranger Things'?",
        options: ["Netflix", "Hulu", "Amazon Prime", "Disney+"],
        answer: "Netflix"
    },
    {
        question: "Who wrote the 'Harry Potter' book series?",
        options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Stephen King"],
        answer: "J.K. Rowling"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
const timerEl = document.getElementById('time');
const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restartBtn = document.querySelector('.restart-btn');

// Function to load the question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }
    clearInterval(timerInterval);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    startTimer();
    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = ''; // Clear previous options
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });
}

// Check the answer
function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// End the quiz and show the results
function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = 'none';
    optionsEl.style.display = 'none';
    resultEl.style.display = 'block';
    scoreEl.textContent = score;
    restartBtn.style.display = 'block';
}

// Restart the quiz
restartBtn.addEventListener('click', () => {
    // Reset variables
    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    timerEl.textContent = timeLeft;

    // Reset the display
    questionEl.style.display = 'block';
    optionsEl.style.display = 'flex'; // Ensure options are displayed correctly
    resultEl.style.display = 'none';
    restartBtn.style.display = 'none';

    // Load the first question
    loadQuestion();
});

// Initialize the quiz with the first question
loadQuestion();