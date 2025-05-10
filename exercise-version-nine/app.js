const questions = [
    {
        code: `let score = 85;

if (score > 90)
  console.log("A");
else if (score > 80)
  console.log("B");
else
  console.log("C");`,
        question: "What grade will be printed?",
        explanation: "✅ Correct! 85 > 80, so 'B' is printed.",
    },
    {
        code: `let isActive = false;

if (isActive = true)
  console.log("Active");
else
  console.log("Inactive");`,
        question: "Is there a logic error in this code?",
        explanation: "❌ Yes. '=' is assignment. Use '===' for comparison.",
    },
    {
        code: `let age = 16;

if (age < 13)
  console.log("Child");
else if (age < 18)
  console.log("Teen");
else
  console.log("Adult");`,
        question: "What will be printed for age = 16?",
        explanation: "✅ Teen. The first condition fails, but age < 18 is true.",
    },
    {
        code: `let temp = 5;

if (temp > 30)
  console.log("Hot");
else
  console.log("Cold");
console.log("Done");`,
        question: "What does this code output?",
        explanation: "✅ 'Cold' and then 'Done' — two separate lines.",
    },
    {
        code: `let flag = true;

if (flag)
  console.log("Go");
else
  console.log("Stop");`,
        question: "What is printed?",
        explanation: "✅ 'Go' — flag is true.",
    },
    {
        code: `let x = 10;

if (x > 10)
  console.log("Greater");
else if (x === 10)
  console.log("Equal");
else
  console.log("Smaller");`,
        question: "What is printed?",
        explanation: "✅ 'Equal' — second condition matches exactly.",
    }
];

function createCard(data, index) {
    const container = document.getElementById("qa-container");

    const card = document.createElement("div");
    card.className = "card";

    const codeBlock = document.createElement("pre");
    codeBlock.textContent = data.code;

    const question = document.createElement("p");
    question.innerHTML = `<strong>Q${index + 1}:</strong> ${data.question}`;

    const button = document.createElement("button");
    button.className = "reveal-btn";
    button.textContent = "Reveal Answer";
    button.onclick = () => {
        answer.style.display = "block";
        button.disabled = true;
        button.textContent = "Answer Revealed";
    };

    const answer = document.createElement("div");
    answer.className = "answer";
    answer.textContent = data.explanation;

    card.appendChild(codeBlock);
    card.appendChild(question);
    card.appendChild(button);
    card.appendChild(answer);

    container.appendChild(card);
}

document.addEventListener("DOMContentLoaded", () => {
    questions.forEach((q, i) => createCard(q, i));
});
