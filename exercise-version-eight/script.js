document.addEventListener("DOMContentLoaded", () => {
    // Interactive code editor functionality
    const codeEditor = document.getElementById("code-editor")
    const testNumber = document.getElementById("test-number")
    const testBtn = document.getElementById("test-btn")
    const testResult = document.getElementById("test-result")
    const hintBtn = document.getElementById("hint-btn")
    const hintText = document.getElementById("hint-text")
    const solutionBtn = document.getElementById("solution-btn")
    const solutionText = document.getElementById("solution-text")

    // Correct prime number function for comparison
    function correctIsPrime(num) {
        if (num <= 1) return false
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false
        }
        return true
    }

    // Test button click handler
    testBtn.addEventListener("click", () => {
        const num = Number.parseInt(testNumber.value)

        try {
            // Create a function from the user's code
            const userCode = codeEditor.value

            // Extract the Python function and convert to JavaScript
            let jsCode = userCode
                .replace("def is_prime(num):", "function isPrime(num) {")
                .replace(/return /g, "return ")
                .replace(/ {4}/g, "    ")
                .replace(/#.*/g, "// $&")
                .replace(/range$$(\d+),\s*(\w+)$$/g, "Array.from({length: $2-$1}, (_, i) => i+$1)")
                .replace(/num \*\* 0\.5/g, "Math.sqrt(num)")
                .replace(/int$$(.*?)$$/g, "Math.floor($1)")

            // Add closing brace
            jsCode += "\n}"

            // Create the function
            const userFunction = new Function(jsCode + "\nreturn isPrime(" + num + ");")

            // Test the function
            const userResult = userFunction()
            const correctResult = correctIsPrime(num)

            // Display the result
            testResult.innerHTML = `
        <p>Testing with number: ${num}</p>
        <p>Your function returned: <strong>${userResult}</strong></p>
        <p>Expected result: <strong>${correctResult}</strong></p>
      `

            if (userResult === correctResult) {
                testResult.innerHTML += '<p style="color: #2f9e44;">✓ Your function works correctly for this input!</p>'
            } else {
                testResult.innerHTML += '<p style="color: #e03131;">✗ Your function returned the wrong result.</p>'
            }

            // Additional tests for common numbers
            const testNumbers = [1, 2, 7, 15, 25, 97]
            let allCorrect = true

            testResult.innerHTML += "<p>Additional tests:</p>"
            testResult.innerHTML += "<ul>"

            for (const testNum of testNumbers) {
                try {
                    // Create a new function for each test number
                    const testFunction = new Function(jsCode + "\nreturn isPrime(" + testNum + ");")
                    const testUserResult = testFunction()
                    const testCorrectResult = correctIsPrime(testNum)

                    if (testUserResult === testCorrectResult) {
                        testResult.innerHTML += `<li>${testNum}: ✓ Correct (${testUserResult})</li>`
                    } else {
                        testResult.innerHTML += `<li>${testNum}: ✗ Wrong (got ${testUserResult}, expected ${testCorrectResult})</li>`
                        allCorrect = false
                    }
                } catch (error) {
                    testResult.innerHTML += `<li>${testNum}: Error - ${error.message}</li>`
                    allCorrect = false
                }
            }

            testResult.innerHTML += "</ul>"

            if (allCorrect) {
                testResult.innerHTML +=
                    '<p style="color: #2f9e44; font-weight: bold;">Great job! Your function works for all test cases!</p>'
            } else {
                // Performance test for large prime
                const largeNum = 9973 // A large prime number
                try {
                    const startTime = performance.now()
                    const largeFunction = new Function(jsCode + "\nreturn isPrime(" + largeNum + ");")
                    largeFunction()
                    const endTime = performance.now()

                    testResult.innerHTML += `<p>Performance test with ${largeNum}: ${(endTime - startTime).toFixed(2)}ms</p>`

                    if (endTime - startTime > 50) {
                        testResult.innerHTML += '<p style="color: #e03131;">Your solution works but could be more efficient.</p>'
                    }
                } catch (error) {
                    testResult.innerHTML += `<p>Performance test error: ${error.message}</p>`
                }
            }
        } catch (error) {
            testResult.innerHTML = `<p style="color: #e03131;">Error: ${error.message}</p>`
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
            question: "What is the logical error in this code?",
            code: 'def check_even_odd(num):\n    if num / 2 == 0:\n        return "Even"\n    else:\n        return "Odd"',
            options: [
                "Missing parentheses in the if condition",
                "Using division (/) instead of modulo (%)",
                "The function name is incorrect",
            ],
            correctAnswer: 1,
            explanation:
                "The code uses division (/) instead of modulo (%). Division returns the quotient, while modulo returns the remainder. For even numbers, num % 2 should equal 0, not num / 2.",
        },
        {
            question: "What will this code output for x = 5?",
            code: 'x = 5\nif x > 0:\n    print("Positive")\nif x % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
            options: ["Positive", "Positive\\nEven", "Positive\\nOdd", "Odd"],
            correctAnswer: 2,
            explanation:
                "The code will print 'Positive' because x > 0. Then it checks if x is even. Since 5 % 2 = 1 (not 0), it executes the else clause and prints 'Odd'.",
        },
        {
            question: "What's wrong with this function?",
            code: "def is_adult(age):\n    if age > 18:\n        return True\n    elif age == 18:\n        return True\n    else:\n        return False",
            options: [
                "The function has no logical errors",
                "The elif statement is unnecessary",
                "The function should return False for age == 18",
            ],
            correctAnswer: 1,
            explanation:
                "While the function works correctly, the elif statement is unnecessary. Since both if and elif return True, they can be combined: if age >= 18: return True",
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
        <p>You've completed the quiz on logical errors in Python selection structures.</p>
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

    // Run the code test with initial values
    testBtn.click()
})
