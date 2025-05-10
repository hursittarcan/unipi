function checkAnswer(exercise, selected) {
    const correctAnswers = {
        1: 3,
        2: 3,
        3: 2,
        4: 2,
        5: 3
    };

    const explanations = {
        1: "✅ Correct! 75 is greater than 70, so it prints Grade: C.",
        2: "✅ Correct! The 'else' is wrongly matched to the inner if, causing wrong messages.",
        3: "✅ Correct! 'age < 13' should come before 'age < 18'. Order matters.",
        4: "✅ Correct! The first condition (>50) is true, so it never checks >100.",
        5: "✅ Correct! The last condition should be just 'else' since it's the only option left."
    };

    const feedback = document.getElementById(`feedback${exercise}`);
    if (selected === correctAnswers[exercise]) {
        feedback.textContent = explanations[exercise];
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrect. Look at the logic and try again.";
        feedback.style.color = "red";
    }
}
