document.addEventListener("DOMContentLoaded", () => {
    // Visualization section functionality
    const ageInput = document.getElementById("age-input")
    const runBtn = document.getElementById("run-btn")
    const flowDiagram = document.getElementById("flow-diagram")
    const output = document.getElementById("output")

    runBtn.addEventListener("click", () => {
        const age = Number.parseInt(ageInput.value)

        // Clear previous visualization
        flowDiagram.innerHTML = ""

        // Create condition node
        const conditionNode = document.createElement("div")
        conditionNode.className = "flow-node condition-node"
        conditionNode.textContent = `if (age >= 18) // age = ${age}`
        flowDiagram.appendChild(conditionNode)

        // Evaluate condition and create appropriate node
        let resultNode
        let outputText

        if (age >= 18) {
            resultNode = document.createElement("div")
            resultNode.className = "flow-node true-node"
            resultNode.textContent = "Condition is TRUE"
            outputText = "You can vote!"
        } else {
            resultNode = document.createElement("div")
            resultNode.className = "flow-node false-node"
            resultNode.textContent = "Condition is FALSE"
            outputText = "You cannot vote yet."
        }

        flowDiagram.appendChild(resultNode)

        // Create output node
        const outputNode = document.createElement("div")
        outputNode.className = "flow-node output-node"
        outputNode.textContent = `Output: ${outputText}`
        flowDiagram.appendChild(outputNode)

        // Update output display
        output.innerHTML = `<p>${outputText}</p>`
    })

    // Interactive Exercise functionality
    const exerciseCode = document.getElementById("exercise-code")
    const checkBtn = document.getElementById("check-btn")
    const hintBtn = document.getElementById("hint-btn")
    const solutionBtn = document.getElementById("solution-btn")
    const exerciseFeedback = document.getElementById("exercise-feedback")

    checkBtn.addEventListener("click", () => {
        const code = exerciseCode.value

        // Simple check for correct solution patterns
        const hasElseIf = code.includes("else if")
        const hasCorrectBoundaries =
            code.includes("age < 13") &&
            (code.includes("age >= 13 && age <= 19") || code.includes("age >= 13 && age < 20")) &&
            (code.includes("age >= 20 && age <= 64") || code.includes("age >= 20 && age < 65")) &&
            code.includes("age >= 65")

        if (hasElseIf && hasCorrectBoundaries) {
            exerciseFeedback.innerHTML =
                '<p class="correct-feedback">Great job! Your solution correctly handles all age categories without logical errors.</p>'
        } else if (hasElseIf) {
            exerciseFeedback.innerHTML =
                "<p>You're using else-if correctly, but check your boundary conditions. Make sure each age falls into exactly one category.</p>"
        } else {
            exerciseFeedback.innerHTML =
                "<p>Your solution still has logical errors. Try using else-if statements and check your boundary conditions.</p>"
        }
    })

    hintBtn.addEventListener("click", () => {
        exerciseFeedback.innerHTML =
            "<p>Hint: Using separate if statements can cause multiple conditions to be true for the same input. Consider using else-if to ensure each person falls into exactly one category.</p>"
    })

    solutionBtn.addEventListener("click", () => {
        exerciseCode.value = `if (age < 13) {
    category = "Child";
} else if (age <= 19) {
    category = "Teenager";
} else if (age <= 64) {
    category = "Adult";
} else {
    category = "Senior";
}`
        exerciseFeedback.innerHTML =
            "<p>This solution uses else-if statements to ensure each person falls into exactly one category. The boundary conditions are also correctly set.</p>"
    })

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What is wrong with the following code?",
            code: `if (temperature = 100) {
    console.log("Water is boiling");
}`,
            options: [
                "The temperature variable is not defined",
                "Using = (assignment) instead of == or === (comparison)",
                "Missing semicolon after the if condition",
                "The console.log statement is incorrect",
            ],
            correctAnswer: 1,
        },
        {
            question: "Which of the following has a logical error?",
            code: `// Check if a student passed the exam
let score = 75;`,
            options: [
                `if (score >= 60) {
    console.log("Pass");
} else {
    console.log("Fail");
}`,
                `if (score > 60) {
    console.log("Pass");
} else {
    console.log("Fail");
}`,
                `if (score >= 60)
    console.log("Pass");
else
    console.log("Fail");`,
                `if (score >= 60) console.log("Pass");
else console.log("Fail");`,
            ],
            correctAnswer: 1,
        },
        {
            question: "What's the logical error in this age verification code?",
            code: `let age = 20;
if (age < 18) {
    console.log("Too young");
}
if (age > 65) {
    console.log("Senior discount");
}
if (age >= 18) {
    console.log("Adult price");
}`,
            options: [
                "The code has no logical errors",
                "A 20-year-old will get both 'Too young' and 'Adult price' messages",
                "A 66-year-old will get both 'Senior discount' and 'Adult price' messages",
                "The conditions should use else-if to be mutually exclusive",
            ],
            correctAnswer: 2,
        },
    ]

    let currentQuestionIndex = 0
    const quizQuestion = document.getElementById("quiz-question")
    const quizFeedback = document.getElementById("quiz-feedback")
    const nextQuestionBtn = document.getElementById("next-question")

    function displayQuestion(index) {
        const question = quizQuestions[index]

        let optionsHTML = ""
        question.options.forEach((option, i) => {
            optionsHTML += `
                <label>
                    <input type="radio" name="q${index + 1}" value="${String.fromCharCode(97 + i)}"> 
                    ${String.fromCharCode(65 + i)}) ${option}
                </label>
            `
        })

        quizQuestion.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <pre>${question.code}</pre>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
            <button id="next-question">Next Question</button>
        `

        quizFeedback.innerHTML = '<p>Select an answer and click "Next Question".</p>'
        quizFeedback.className = "quiz-feedback"

        document.getElementById("next-question").addEventListener("click", checkAnswer)
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`)

        if (!selectedOption) {
            quizFeedback.innerHTML = "<p>Please select an answer.</p>"
            return
        }

        const selectedValue = selectedOption.value.charCodeAt(0) - 97
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer

        if (selectedValue === correctAnswer) {
            quizFeedback.innerHTML = "<p>Correct! Well done.</p>"
            quizFeedback.className = "quiz-feedback correct-feedback"
        } else {
            quizFeedback.innerHTML = `<p>Incorrect. The correct answer is ${String.fromCharCode(65 + correctAnswer)}).</p>`
            quizFeedback.className = "quiz-feedback incorrect-feedback"
        }

        // Move to next question or show completion message
        currentQuestionIndex++
        if (currentQuestionIndex < quizQuestions.length) {
            setTimeout(() => {
                displayQuestion(currentQuestionIndex)
            }, 1500)
        } else {
            setTimeout(() => {
                quizQuestion.innerHTML = `
                    <h3>Quiz Completed!</h3>
                    <p>You've completed the quiz on logical errors in selection structures.</p>
                    <button id="restart-quiz">Restart Quiz</button>
                `
                document.getElementById("restart-quiz").addEventListener("click", () => {
                    currentQuestionIndex = 0
                    displayQuestion(0)
                })
            }, 1500)
        }
    }

    // Initialize the quiz with the first question
    displayQuestion(0)

    // Trigger the visualization on page load
    runBtn.click()
})
