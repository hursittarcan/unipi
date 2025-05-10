document.addEventListener("DOMContentLoaded", () => {
    // Interactive Code Demo
    const codeInput = document.getElementById("code-input")
    const testAge = document.getElementById("test-age")
    const runBtn = document.getElementById("run-btn")
    const codeOutput = document.getElementById("code-output")
    const hintBtn = document.getElementById("hint-btn")
    const hintText = document.getElementById("hint-text")

    runBtn.addEventListener("click", () => {
        try {
            // Get the code and test value
            const code = codeInput.value
            const age = Number.parseInt(testAge.value)

            // Create a function from the user's code
            const userFunction = new Function("age", code + "\nreturn categorizeAge(age);")

            // Execute the function
            const result = userFunction(age)

            // Display result
            codeOutput.innerHTML = `
                <p>Age: ${age}</p>
                <p>Category: <strong>${result}</strong></p>
                <p>Expected: <strong>${getExpectedCategory(age)}</strong></p>
            `

            // Check if result is correct
            if (result === getExpectedCategory(age)) {
                codeOutput.innerHTML += '<p style="color: green;">✓ Your solution works correctly!</p>'
            } else {
                codeOutput.innerHTML += '<p style="color: red;">✗ Your solution has logical errors.</p>'
            }
        } catch (error) {
            codeOutput.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`
        }
    })

    // Helper function to get expected category
    function getExpectedCategory(age) {
        if (age < 13) {
            return "Child"
        } else if (age < 20) {
            return "Teenager"
        } else if (age < 65) {
            return "Adult"
        } else {
            return "Senior"
        }
    }

    // Show/hide hint
    hintBtn.addEventListener("click", () => {
        if (hintText.classList.contains("hidden")) {
            hintText.classList.remove("hidden")
            hintBtn.textContent = "Hide Hint"
        } else {
            hintText.classList.add("hidden")
            hintBtn.textContent = "Get Hint"
        }
    })

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What is wrong with this code?",
            code: 'if (score = 100) {\n    console.log("Perfect score!");\n}',
            options: [
                "Missing semicolon",
                "Using assignment (=) instead of comparison (==)",
                "Missing else clause",
                "Nothing is wrong",
            ],
            correctAnswer: 1,
            explanation:
                "This code uses the assignment operator (=) which assigns 100 to score and then evaluates to true, so the condition is always true. It should use == or === for comparison.",
        },
        {
            question: "What's the problem with this code?",
            code: 'if (age < 13) {\n    category = "Child";\n}\nif (age < 20) {\n    category = "Teenager";\n}\nif (age < 65) {\n    category = "Adult";\n}',
            options: [
                "Syntax error in the variable names",
                "Missing semicolons at the end of statements",
                "Overlapping conditions causing incorrect categorization",
                "There is no problem with this code",
            ],
            correctAnswer: 2,
            explanation:
                'The conditions overlap, so for example, if age is 10, all three conditions are true and category will end up as "Adult". This should use else-if statements to make the conditions mutually exclusive.',
        },
        {
            question: "What will be the output of this code if isStudent is false and age is 25?",
            code: "let discount = 0;\nif (age < 18)\n    if (isStudent)\n        discount = 25;\nelse\n    discount = 10;\nconsole.log(discount);",
            options: ["0", "10", "25", "undefined"],
            correctAnswer: 0,
            explanation:
                "Due to improper nesting (missing braces), the else belongs to the inner if statement. Since age is 25 (not less than 18), the outer if condition is false, so the code inside it (including the else) doesn't execute, and discount remains 0.",
        },
    ]

    let currentQuestion = 0
    const quizQuestion = document.getElementById("quiz-question")
    const quizFeedback = document.getElementById("quiz-feedback")
    const checkBtn = document.getElementById("check-btn")
    const nextBtn = document.getElementById("next-btn")

    // Display first question
    displayQuestion(currentQuestion)

    // Check answer
    checkBtn.addEventListener("click", () => {
        const selectedOption = document.querySelector(`input[name="q1"]:checked`)

        if (!selectedOption) {
            quizFeedback.textContent = "Please select an answer."
            quizFeedback.className = ""
            return
        }

        const answer = selectedOption.value
        const correctAnswer = String.fromCharCode(97 + quizQuestions[currentQuestion].correctAnswer)

        if (answer === correctAnswer) {
            quizFeedback.textContent = "Correct! " + quizQuestions[currentQuestion].explanation
            quizFeedback.className = "correct"
        } else {
            quizFeedback.textContent = "Incorrect. " + quizQuestions[currentQuestion].explanation
            quizFeedback.className = "incorrect"
        }

        checkBtn.disabled = true
        nextBtn.classList.remove("hidden")
    })

    // Next question
    nextBtn.addEventListener("click", () => {
        currentQuestion++

        if (currentQuestion < quizQuestions.length) {
            displayQuestion(currentQuestion)
            quizFeedback.textContent = ""
            quizFeedback.className = ""
            checkBtn.disabled = false
            nextBtn.classList.add("hidden")
        } else {
            // Quiz completed
            quizQuestion.innerHTML = `
                <h3>Quiz Completed!</h3>
                <p>You've completed the quiz on logical errors in selection structures.</p>
            `
            quizFeedback.textContent = ""
            nextBtn.classList.add("hidden")
        }
    })

    function displayQuestion(index) {
        const q = quizQuestions[index]

        quizQuestion.innerHTML = `
            <h3>Question ${index + 1} of ${quizQuestions.length}:</h3>
            <p>${q.question}</p>
            <pre>${q.code}</pre>
            <div class="options">
                ${q.options
            .map(
                (option, i) => `
                    <label>
                        <input type="radio" name="q1" value="${String.fromCharCode(97 + i)}"> ${option}
                    </label>
                `,
            )
            .join("")}
            </div>
            <button id="check-btn">Check Answer</button>
        `

        // Re-attach event listener to new check button
        document.getElementById("check-btn").addEventListener("click", () => {
            const selectedOption = document.querySelector(`input[name="q1"]:checked`)

            if (!selectedOption) {
                quizFeedback.textContent = "Please select an answer."
                quizFeedback.className = ""
                return
            }

            const answer = selectedOption.value
            const correctAnswer = String.fromCharCode(97 + quizQuestions[currentQuestion].correctAnswer)

            if (answer === correctAnswer) {
                quizFeedback.textContent = "Correct! " + quizQuestions[currentQuestion].explanation
                quizFeedback.className = "correct"
            } else {
                quizFeedback.textContent = "Incorrect. " + quizQuestions[currentQuestion].explanation
                quizFeedback.className = "incorrect"
            }

            document.getElementById("check-btn").disabled = true
            nextBtn.classList.remove("hidden")
        })
    }

    // Trigger the code demo with initial values
    runBtn.click()
})
