const answers = [1, 2, 2, 2, 1];
const feedbacks = [
    "✅ Correct! 5 > 3, so 'Medium' is printed.",
    "✅ Correct! '=' is assignment. Use '===' for comparison.",
    "✅ Correct! 15 is greater than 10, so 'Cool' is printed.",
    "✅ Correct! The signal is 'green', so 'Go' is printed.",
    "✅ Correct! The last condition should be a simple 'else'."
];

function checkAll() {
    let correct = 0;

    answers.forEach((answerIndex, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const feedbackDiv = document.getElementById(`f${i}`);

        if (!selected) {
            feedbackDiv.textContent = "Please select an option.";
            return;
        }

        if (parseInt(selected.value) === answerIndex) {
            feedbackDiv.textContent = feedbacks[i];
            correct++;
        } else {
            feedbackDiv.textContent = "Incorrect. Try again.";
        }
    });

    alert(`You got ${correct} out of ${answers.length} correct.`);
}
