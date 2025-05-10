const answers = [1, 2, 1, 1]; // correct answer indices for each question
const feedbacks = [
    "✅ Correct! 92 > 90 → Grade A.",
    "✅ Correct! '=' is assignment. Use '===' for comparison.",
    "✅ Correct! 30 > 20 → 'Warm'.",
    "✅ Correct! 10 === 10 → 'Equal'."
];

function checkAnswer(index) {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const feedback = document.getElementById(`f${index}`);

    if (!selected) {
        feedback.textContent = "❌ Please select an answer.";
        feedback.style.color = "red";
        return;
    }

    if (parseInt(selected.value) === answers[index]) {
        feedback.textContent = feedbacks[index];
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrect. Try again!";
        feedback.style.color = "red";
    }
}
