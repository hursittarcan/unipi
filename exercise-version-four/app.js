class QuizQuestion {
    constructor(id, code, question, options, correctIndex, explanation) {
        this.id = id;
        this.code = code;
        this.question = question;
        this.options = options;
        this.correctIndex = correctIndex;
        this.explanation = explanation;
    }
}

class QuizManager {
    constructor(quizContainerId, resultContainerId) {
        this.questions = [];
        this.container = document.getElementById(quizContainerId);
        this.resultContainer = document.getElementById(resultContainerId);
        this.score = 0;
        this.rendered = false;
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    render() {
        this.questions.forEach((q, index) => this.renderQuestion(q, index));
        this.rendered = true;
    }

    renderQuestion(question, qIndex) {
        const card = document.createElement("div");
        card.className = "quiz-card";
        card.id = `question-${qIndex}`;

        const codeBlock = document.createElement("pre");
        codeBlock.textContent = question.code;
        card.appendChild(codeBlock);

        const qText = document.createElement("p");
        qText.innerHTML = `<strong>${question.question}</strong>`;
        card.appendChild(qText);

        const optionsContainer = document.createElement("div");
        optionsContainer.className = "options";

        question.options.forEach((optionText, idx) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = optionText;
            btn.onclick = () => this.checkAnswer(question, idx, qIndex);
            optionsContainer.appendChild(btn);
        });

        const feedback = document.createElement("div");
        feedback.className = "feedback";
        feedback.id = `feedback-${qIndex}`;

        card.appendChild(optionsContainer);
        card.appendChild(feedback);
        this.container.appendChild(card);
    }

    checkAnswer(question, selectedIndex, qIndex) {
        const feedback = document.getElementById(`feedback-${qIndex}`);
        if (selectedIndex === question.correctIndex) {
            feedback.textContent = `Correct! ${question.explanation}`;
            feedback.className = "feedback correct";
            this.score++;
        } else {
            feedback.textContent = `Incorrect. ${question.explanation}`;
            feedback.className = "feedback incorrect";
        }

        this.disableButtons(qIndex);
        this.updateResults();
    }

    disableButtons(qIndex) {
        const card = document.getElementById(`question-${qIndex}`);
        const buttons = card.querySelectorAll("button.option-btn");
        buttons.forEach(btn => btn.disabled = true);
    }

    updateResults() {
        this.resultContainer.innerHTML = `<h3>Score: ${this.score} / ${this.questions.length}</h3>`;
    }
}

// ---------------------------------------
// Initialization
// ---------------------------------------
const quiz = new QuizManager("quiz-area", "result-area");

quiz.addQuestion(new QuizQuestion(
    1,
    `let score = 75;

if (score > 90)
  console.log("Grade: A");
else if (score > 80)
  console.log("Grade: B");
else if (score > 70)
  console.log("Grade: C");
else
  console.log("Grade: F");`,
    "What grade will be printed?",
    ["Grade: A", "Grade: B", "Grade: C", "Grade: F"],
    2,
    "75 > 70 but not > 80, so Grade: C is correct."
));

quiz.addQuestion(new QuizQuestion(
    2,
    `let username = "admin";
let password = "1234";

if (username === "admin")
  if (password === "admin")
    console.log("Login successful");
  else
    console.log("Invalid username");`,
    "What's the logical problem?",
    ["Checks password first", "Uses wrong comparison", "Else attached to wrong if", "No error"],
    2,
    "The 'else' is tied to the inner if. Use braces to avoid confusion."
));

quiz.addQuestion(new QuizQuestion(
    3,
    `let age = 17;

if (age < 18)
  console.log("Child");
else if (age < 13)
  console.log("Teen");
else
  console.log("Adult");`,
    "What's wrong with this condition order?",
    ["Nothing", "Wrong condition order", "Missing else", "Use switch instead"],
    1,
    "'age < 13' should come first. Teen will never be printed for <18."
));

quiz.addQuestion(new QuizQuestion(
    4,
    `let total = 100;

if (total > 50)
  console.log("5% discount");
else if (total > 100)
  console.log("10% discount");`,
    "Why is 10% never applied?",
    ["Bad syntax", "Wrong order of conditions", "Missing else", "Should use total === 100"],
    1,
    "The first condition is true, so second is skipped. Check larger thresholds first."
));

quiz.addQuestion(new QuizQuestion(
    5,
    `let num = 0;

if (num > 0)
  console.log("Positive");
else if (num < 0)
  console.log("Negative");
else if (num === 0)
  console.log("Zero");`,
    "Why is this logic overly complicated?",
    ["Too many ifs", "Doesn’t work", "Last condition should be else", "Missing braces"],
    2,
    "Only 3 possible outcomes. Just use 'else' for final case to simplify."
));

quiz.render();
