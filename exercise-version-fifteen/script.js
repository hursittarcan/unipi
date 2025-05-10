document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()

    // Theme toggle functionality
    const themeToggleBtn = document.getElementById("theme-toggle-btn")

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark-theme")
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme")
        const isDark = document.body.classList.contains("dark-theme")
        localStorage.setItem("theme", isDark ? "dark" : "light")
    })

    // Factorial visualization
    const factorialViz = document.getElementById("factorial-viz")

    // Create visualization steps
    const vizSteps = [
        { type: "call", text: "factorial(4)" },
        { type: "call", text: "4 * factorial(3)" },
        { type: "call", text: "3 * factorial(2)" },
        { type: "call", text: "2 * factorial(1)" },
        { type: "return", text: "factorial(1) returns 1" },
        { type: "return", text: "factorial(2) returns 2 * 1 = 2" },
        { type: "return", text: "factorial(3) returns 3 * 2 = 6" },
        { type: "return", text: "factorial(4) returns 4 * 6 = 24" },
    ]

    // Render visualization
    vizSteps.forEach((step, index) => {
        const stepElement = document.createElement("div")
        stepElement.className = `viz-step viz-${step.type}`
        stepElement.textContent = step.text
        stepElement.style.opacity = "0"
        stepElement.style.transform = "translateY(10px)"
        factorialViz.appendChild(stepElement)

        // Animate steps with delay
        setTimeout(() => {
            stepElement.style.opacity = "1"
            stepElement.style.transform = "translateY(0)"
        }, index * 500)
    })

    // Interactive code editor functionality
    const codeEditor = document.getElementById("code-editor")
    const testNumber = document.getElementById("test-number")
    const testBtn = document.getElementById("test-btn")
    const testResult = document.getElementById("test-result")
    const hintBtn = document.getElementById("hint-btn")
    const hintText = document.getElementById("hint-text")
    const solutionBtn = document.getElementById("solution-btn")
    const solutionText = document.getElementById("solution-text")

    // Correct Fibonacci function for comparison
    function correctFibonacci(n) {
        if (n === 0) return 0
        if (n === 1) return 1
        return correctFibonacci(n - 1) + correctFibonacci(n - 2)
    }

    // Test button click handler
    testBtn.addEventListener("click", () => {
        const n = Number.parseInt(testNumber.value)

        if (isNaN(n) || n < 0 || n > 20) {
            testResult.innerHTML = '<p style="color: var(--error);">Please enter a number between 0 and 20.</p>'
            return
        }

        try {
            // Create a function from the user's code
            const userCode = codeEditor.value

            // Extract the Python function and convert to JavaScript
            let jsCode = userCode
                .replace("def fibonacci(n):", "function fibonacci(n) {")
                .replace(/return /g, "return ")
                .replace(/ {4}/g, "    ")
                .replace(/#.*/g, "// $&")
                .replace(/pass/g, "// Empty function")

            // Add closing brace
            jsCode += "\n}"

            // Create the function
            const userFunction = new Function(jsCode + "\nreturn fibonacci(" + n + ");")

            // Test the function
            const userResult = userFunction()
            const correctResult = correctFibonacci(n)

            // Display the result
            testResult.innerHTML = `
        <p>Testing fibonacci(${n}):</p>
        <p>Your function returned: <strong>${userResult}</strong></p>
        <p>Expected result: <strong>${correctResult}</strong></p>
      `

            if (userResult === correctResult) {
                testResult.innerHTML += '<p style="color: var(--success);">✓ Your function works correctly!</p>'

                // Test additional values
                const testValues = [0, 1, 2, 5, 8]
                let allCorrect = true

                testResult.innerHTML += "<p>Additional tests:</p><ul>"

                for (const val of testValues) {
                    if (val !== n) {
                        // Skip the already tested value
                        try {
                            const testFunction = new Function(jsCode + "\nreturn fibonacci(" + val + ");")
                            const testResult = testFunction()
                            const expectedResult = correctFibonacci(val)

                            if (testResult === expectedResult) {
                                testResult.innerHTML += `<li>fibonacci(${val}) = ${testResult} ✓</li>`
                            } else {
                                testResult.innerHTML += `<li>fibonacci(${val}) = ${testResult} (expected ${expectedResult}) ✗</li>`
                                allCorrect = false
                            }
                        } catch (error) {
                            testResult.innerHTML += `<li>fibonacci(${val}) caused an error: ${error.message} ✗</li>`
                            allCorrect = false
                        }
                    }
                }

                testResult.innerHTML += "</ul>"

                if (allCorrect) {
                    testResult.innerHTML +=
                        '<p style="color: var(--success);">Great job! Your solution works for all test cases!</p>'
                }
            } else {
                testResult.innerHTML += '<p style="color: var(--error);">✗ Your function returned the wrong result.</p>'
            }
        } catch (error) {
            testResult.innerHTML = `<p style="color: var(--error);">Error: ${error.message}</p>`
        }
    })

    // Hint button click handler
    hintBtn.addEventListener("click", () => {
        if (hintText.classList.contains("hidden")) {
            hintText.classList.remove("hidden")
            hintBtn.textContent = "Hide Hint"
        } else {
            hintText.classList.add("hidden")
            hintBtn.textContent = "Show Hint"
        }
    })

    // Solution button click handler
    solutionBtn.addEventListener("click", () => {
        if (solutionText.classList.contains("hidden")) {
            solutionText.classList.remove("hidden")
            solutionBtn.textContent = "Hide Solution"
        } else {
            solutionText.classList.add("hidden")
            solutionBtn.textContent = "Show Solution"
        }
    })

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What will be the output of this recursive function call: sum_to(4)?",
            code: "def sum_to(n):\n    if n == 1:\n        return 1\n    return n + sum_to(n-1)",
            options: ["4", "10", "6", "Error: Maximum recursion depth exceeded"],
            correctAnswer: 1,
            explanation: "sum_to(4) = 4 + sum_to(3) = 4 + (3 + sum_to(2)) = 4 + (3 + (2 + sum_to(1))) = 4 + 3 + 2 + 1 = 10",
        },
        {
            question: "What's the base case in this recursive function?",
            code: "def power(base, exponent):\n    if exponent == 0:\n        return 1\n    return base * power(base, exponent - 1)",
            options: ["base == 0", "exponent == 0", "exponent == 1", "There is no base case"],
            correctAnswer: 1,
            explanation: "The base case is when exponent == 0, which returns 1 (any number raised to the power of 0 is 1).",
        },
        {
            question: "What will happen if you call count_down(-1)?",
            code: "def count_down(n):\n    print(n)\n    if n > 0:\n        count_down(n - 1)",
            options: [
                "It will print -1 and stop",
                "It will print -1, -2, -3, and so on until stack overflow",
                "It will cause an error",
                "It will print nothing",
            ],
            correctAnswer: 0,
            explanation:
                "It will print -1 and then stop because the condition n > 0 is false for -1, so the recursive call doesn't happen.",
        },
    ]

    let currentQuestionIndex = 0
    const questionText = document.getElementById("question-text")
    const questionCode = document.getElementById("question-code")
    const optionsContainer = document.getElementById("options-container")
    const feedbackContainer = document.getElementById("feedback-container")
    const checkBtn = document.getElementById("check-btn")
    const nextBtn = document.getElementById("next-btn")

    // Display first question
    displayQuestion(currentQuestionIndex)

    // Check answer button click handler
    checkBtn.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="quiz"]:checked')

        if (!selectedOption) {
            feedbackContainer.textContent = "Please select an answer."
            feedbackContainer.className = ""
            feedbackContainer.classList.remove("hidden")
            return
        }

        const answer = Number.parseInt(selectedOption.value)
        const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer

        feedbackContainer.classList.remove("hidden")

        if (answer === correctAnswer) {
            feedbackContainer.textContent = "Correct! " + quizQuestions[currentQuestionIndex].explanation
            feedbackContainer.className = "correct"
        } else {
            feedbackContainer.textContent = "Incorrect. " + quizQuestions[currentQuestionIndex].explanation
            feedbackContainer.className = "incorrect"
        }

        nextBtn.classList.remove("hidden")
        checkBtn.disabled = true
    })

    // Next question button click handler
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion(currentQuestionIndex)
            feedbackContainer.classList.add("hidden")
            nextBtn.classList.add("hidden")
            checkBtn.disabled = false
        } else {
            // Quiz completed
            document.getElementById("question-container").innerHTML = `
        <h3>Quiz Completed!</h3>
        <p>You've completed the quiz on recursion.</p>
        <button id="restart-quiz">Restart Quiz</button>
      `

            document.getElementById("restart-quiz").addEventListener("click", () => {
                currentQuestionIndex = 0
                displayQuestion(currentQuestionIndex)
                feedbackContainer.classList.add("hidden")
                nextBtn.classList.add("hidden")
                checkBtn.disabled = false
            })
        }
    })

    // Function to display a question
    function displayQuestion(index) {
        const question = quizQuestions[index]

        questionText.textContent = question.question
        questionCode.textContent = question.code

        let optionsHTML = ""
        question.options.forEach((option, i) => {
            optionsHTML += `
        <label class="option">
          <input type="radio" name="quiz" value="${i}">
          <span>${option}</span>
        </label>
      `
        })

        optionsContainer.innerHTML = optionsHTML
    }
})

// Very simple JavaScript for a student project
document.addEventListener("DOMContentLoaded", () => {
    // Quiz functionality
    const checkBtn = document.getElementById("check-btn")
    const feedback = document.getElementById("feedback")

    checkBtn.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="q1"]:checked')

        if (!selectedOption) {
            feedback.textContent = "Please select an answer."
            feedback.className = "incorrect"
            feedback.classList.remove("hidden")
            return
        }

        const answer = selectedOption.value

        if (answer === "c") {
            feedback.textContent = "Correct! Sets store unique elements and automatically remove duplicates."
            feedback.className = "correct"
        } else {
            feedback.textContent =
                "Incorrect. The correct answer is Set. Sets store unique elements and automatically remove duplicates."
            feedback.className = "incorrect"
        }

        feedback.classList.remove("hidden")
    })
})
