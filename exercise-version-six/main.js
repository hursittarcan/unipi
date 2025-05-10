// ======================
// Functional Quiz Logic
// ======================

const quizData = [
    {
        code: `let x = 5;

if (x > 10)
  console.log("Greater than 10");
else if (x > 3)
  console.log("Greater than 3");
else
  console.log("Less than or equal to 3");`,
        question: "What will be printed?",
        options: [
            "Greater than 10",
            "Greater than 3",
            "Less than or equal to 3",
            "Nothing"
        ],
        answer: 1,
        explanation: "x is 5, so the second condition (x > 3) is true."
    },
    {
        code: `let age = 16;

if (age < 13)
  console.log("Child");
else if (age < 18)
  console.log("Teen");
else
  console.log("Adult");`,
        question: "What category will be printed?",
        options: ["Child", "Teen", "Adult", "None"],
        answer: 1,
        explanation: "16 is less than 18, but not less than 13."
    },
    {
        code: `let score = 90;

if (score >= 90)
  console.log("Excellent");
else if (score >= 75)
  console.log("Good");
else
  console.log("Needs Improvement");`,
        question: "What does this code print?",
        options: ["Excellent", "Good", "Needs Improvement", "Nothing"],
        answer: 0,
        explanation: "score is 90, which matches the first condition (>= 90)."
    },
    {
        code: `let flag = false;

if (flag)
  console.log("Yes");
else
  console.log("No");`,
        question: "What will be printed?",
        options: ["Yes", "No", "True", "False"],
        answer: 1,
        explanation: "flag is false, so 'No' is printed."
    },
    {
        code: `let a = 10;
let b = 20;

if (a > b)
  console.log("A is larger");
else if (a === b)
  console.log("Equal");
else
  console.log("B is larger");`,
        question: "Which is the correct output?",
        options: ["A is larger", "Equal", "B is larger", "Error"],
        answer: 2,
        explanation: "10 is less than 20, so 'B is larger' is printed."
    }
];

let score = 0;

const renderQuiz = () => {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";

    quizData.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "quiz-card";

        const codeBlock = document.createElement("pre");
        codeBlock.textContent = item.code;

        const qText = document.createElement("p");
        qText.className = "question";
        qText.textContent = item.question;

        const optionsDiv = document.createElement("div");
        optionsDiv.className = "options";

        item.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "option";
            btn.textContent = opt;
            btn.onclick = () => handleAnswer(btn, index, i);
            optionsDiv.appendChild(btn);
        });

        const feedback = document.createElement("div");
        feedback.className = "feedback";
        feedback.id = `feedback-${index}`;

        card.appendChild(codeBlock);
        card.appendChild(qText);
        card.appendChild(optionsDiv);
        card.appendChild(feedback);
        container.appendChild(card);
    });

    updateScore();
};

const handleAnswer = (button, qIndex, selectedIndex) => {
    const correct = quizData[qIndex].answer;
    const explanation = quizData[qIndex].explanation;
    const buttons = button.parentElement.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) {
            btn.classList.add("correct");
        } else if (i === selectedIndex) {
            btn.classList.add("incorrect");
        }
    });

    const feedback = document.getElementById(`feedback-${qIndex}`);
    feedback.textContent = selectedIndex === correct
        ? `✅ Correct! ${explanation}`
        : `❌ Incorrect. ${explanation}`;

    if (selectedIndex === correct) score++;

    updateScore();
};

const updateScore = () => {
    const scoreText = document.getElementById("score-text");
    scoreText.textContent = `Score: ${score} / ${quizData.length}`;
};

// Initialize
document.addEventListener("DOMContentLoaded", renderQuiz);
