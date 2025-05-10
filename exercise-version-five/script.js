document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    const navLinks = document.querySelectorAll("nav a")
    const sections = document.querySelectorAll("section")
    const nextButtons = document.querySelectorAll(".next-btn")
    const prevButtons = document.querySelectorAll(".prev-btn")
    const backToStartButton = document.querySelector(".back-to-start")

    // Handle navigation
    function navigateTo(sectionId) {
        sections.forEach((section) => {
            section.classList.remove("active-section")
        })

        navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + sectionId) {
                link.classList.add("active")
            }
        })

        document.getElementById(sectionId).classList.add("active-section")
        window.scrollTo(0, 0)
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            const sectionId = this.getAttribute("href").substring(1)
            navigateTo(sectionId)
        })
    })

    nextButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const nextSection = this.getAttribute("data-next")
            navigateTo(nextSection)
        })
    })

    prevButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const prevSection = this.getAttribute("data-prev")
            navigateTo(prevSection)
        })
    })

    if (backToStartButton) {
        backToStartButton.addEventListener("click", () => {
            navigateTo("introduction")
        })
    }

    // Simulation Section
    const scenarioSelect = document.getElementById("scenario-select")
    const errorCode = document.getElementById("error-code")
    const correctCode = document.getElementById("correct-code")
    const inputFields = document.getElementById("input-fields")
    const runErrorBtn = document.getElementById("run-error")
    const runCorrectBtn = document.getElementById("run-correct")
    const stepByStepBtn = document.getElementById("step-by-step")
    const errorOutput = document.getElementById("error-output")
    const correctOutput = document.getElementById("correct-output")
    const simulationExplanation = document.getElementById("simulation-explanation")

    // Scenarios data
    const scenarios = {
        comparison: {
            title: "Assignment vs. Comparison",
            errorCode: `// Check if a student passed the exam
function checkPassFail(score) {
    let result;
    
    // Logical Error: Using assignment (=) instead of comparison (==)
    if (score = 60) {
        result = "Pass";
    } else {
        result = "Fail";
    }
    
    return result;
}`,
            correctCode: `// Check if a student passed the exam
function checkPassFail(score) {
    let result;
    
    // Correct: Using comparison (==) instead of assignment (=)
    if (score >= 60) {
        result = "Pass";
    } else {
        result = "Fail";
    }
    
    return result;
}`,
            inputs: [{ name: "score", type: "number", label: "Exam Score:", value: 55 }],
            explanation:
                "In the error code, 'score = 60' is an assignment that sets score to 60 and returns true (as 60 is truthy). This means the condition always evaluates to true regardless of the input value. The correct code uses the comparison operator '>=' to properly check if the score is greater than or equal to 60.",
        },
        boundary: {
            title: "Boundary Condition Error",
            errorCode: `// Determine grade based on score
function getGrade(score) {
    let grade;
    
    // Logical Error: Incorrect boundary conditions
    if (score < 60) {
        grade = "F";
    }
    if (score < 70) {
        grade = "D";
    }
    if (score < 80) {
        grade = "C";
    }
    if (score < 90) {
        grade = "B";
    }
    if (score <= 100) {
        grade = "A";
    }
    
    return grade;
}`,
            correctCode: `// Determine grade based on score
function getGrade(score) {
    let grade;
    
    // Correct: Proper boundary conditions with else-if
    if (score < 60) {
        grade = "F";
    } else if (score < 70) {
        grade = "D";
    } else if (score < 80) {
        grade = "C";
    } else if (score < 90) {
        grade = "B";
    } else if (score <= 100) {
        grade = "A";
    }
    
    return grade;
}`,
            inputs: [{ name: "score", type: "number", label: "Exam Score:", value: 85 }],
            explanation:
                "In the error code, all conditions are checked independently with separate 'if' statements. For a score of 85, all conditions after the first will be true, so the grade will always be 'A' for any score above 0. The correct code uses 'else if' to ensure only one condition is executed, properly assigning the correct grade based on the score range.",
        },
        nesting: {
            title: "Improper Nesting",
            errorCode: `// Check eligibility for a discount
function checkDiscount(age, isStudent) {
    let discount = 0;
    
    // Logical Error: Improper nesting
    if (age < 18)
        if (isStudent)
            discount = 25;
    else
        discount = 10;
    
    return discount + "%";
}`,
            correctCode: `// Check eligibility for a discount
function checkDiscount(age, isStudent) {
    let discount = 0;
    
    // Correct: Proper nesting with braces
    if (age < 18) {
        if (isStudent) {
            discount = 25;
        } else {
            discount = 15; // Student discount for under 18
        }
    } else {
        discount = 10; // Adult discount
    }
    
    return discount + "%";
}`,
            inputs: [
                { name: "age", type: "number", label: "Age:", value: 16 },
                { name: "isStudent", type: "checkbox", label: "Is Student:", value: true },
            ],
            explanation:
                "In the error code, the 'else' statement is associated with the inner 'if' due to improper nesting and missing braces. This means adults never get a discount, and non-student minors get no discount. The correct code properly nests the conditions with braces, ensuring the 'else' belongs to the outer 'if' statement, giving appropriate discounts to all groups.",
        },
        "missing-else": {
            title: "Missing Else Clause",
            errorCode: `// Validate user age for website access
function validateAge(age) {
    let message = "";
    
    // Logical Error: Missing else clause
    if (age >= 18) {
        message = "Access granted";
    }
    if (age < 13) {
        message = "Access denied";
    }
    
    return message;
}`,
            correctCode: `// Validate user age for website access
function validateAge(age) {
    let message = "";
    
    // Correct: Complete conditional logic with else-if and else
    if (age >= 18) {
        message = "Access granted";
    } else if (age >= 13) {
        message = "Access granted with parental consent";
    } else {
        message = "Access denied";
    }
    
    return message;
}`,
            inputs: [{ name: "age", type: "number", label: "Age:", value: 15 }],
            explanation:
                "In the error code, there's a logical gap for ages between 13 and 17. For these ages, the message remains an empty string because neither condition is true. The correct code uses 'else if' and 'else' to handle all possible age ranges, ensuring every user gets an appropriate message.",
        },
    }

    // Initialize simulation section
    function initSimulation() {
        scenarioSelect.addEventListener("change", loadScenario)
        runErrorBtn.addEventListener("click", runErrorCode)
        runCorrectBtn.addEventListener("click", runCorrectCode)
        stepByStepBtn.addEventListener("click", runStepByStep)

        // Load initial scenario
        loadScenario()
    }

    function loadScenario() {
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]

        // Display code
        errorCode.textContent = scenario.errorCode
        correctCode.textContent = scenario.correctCode

        // Clear previous outputs
        errorOutput.innerHTML = ""
        correctOutput.innerHTML = ""
        simulationExplanation.innerHTML = ""

        // Create input fields
        inputFields.innerHTML = ""
        scenario.inputs.forEach((input) => {
            const inputGroup = document.createElement("div")
            inputGroup.className = "input-group"

            const label = document.createElement("label")
            label.textContent = input.label
            label.setAttribute("for", `input-${input.name}`)

            let inputElement
            if (input.type === "checkbox") {
                inputElement = document.createElement("input")
                inputElement.type = "checkbox"
                inputElement.id = `input-${input.name}`
                inputElement.name = input.name
                inputElement.checked = input.value
            } else {
                inputElement = document.createElement("input")
                inputElement.type = input.type
                inputElement.id = `input-${input.name}`
                inputElement.name = input.name
                inputElement.value = input.value
            }

            inputGroup.appendChild(label)
            inputGroup.appendChild(inputElement)
            inputFields.appendChild(inputGroup)
        })
    }

    function getInputValues() {
        const inputs = {}
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]

        scenario.inputs.forEach((input) => {
            const inputElement = document.getElementById(`input-${input.name}`)
            if (input.type === "checkbox") {
                inputs[input.name] = inputElement.checked
            } else if (input.type === "number") {
                inputs[input.name] = Number.parseFloat(inputElement.value)
            } else {
                inputs[input.name] = inputElement.value
            }
        })

        return inputs
    }

    function runErrorCode() {
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]
        const inputs = getInputValues()

        try {
            // Create a function from the error code
            const funcBody = scenario.errorCode.replace(/function\s+\w+\s*$$[^)]*$$\s*{/, "").replace(/}$/, "")
            const paramNames = scenario.inputs.map((input) => input.name).join(", ")
            const func = new Function(paramNames, funcBody)

            // Execute the function with inputs
            const result = func(...Object.values(inputs))

            // Display the result
            errorOutput.innerHTML = `<p>Result: <strong>${result}</strong></p>`

            // Show explanation
            simulationExplanation.innerHTML = `<h3>Explanation:</h3><p>${scenario.explanation}</p>`
        } catch (error) {
            errorOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    }

    function runCorrectCode() {
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]
        const inputs = getInputValues()

        try {
            // Create a function from the correct code
            const funcBody = scenario.correctCode.replace(/function\s+\w+\s*$$[^)]*$$\s*{/, "").replace(/}$/, "")
            const paramNames = scenario.inputs.map((input) => input.name).join(", ")
            const func = new Function(paramNames, funcBody)

            // Execute the function with inputs
            const result = func(...Object.values(inputs))

            // Display the result
            correctOutput.innerHTML = `<p>Result: <strong>${result}</strong></p>`

            // Show explanation if not already shown
            if (simulationExplanation.innerHTML === "") {
                simulationExplanation.innerHTML = `<h3>Explanation:</h3><p>${scenario.explanation}</p>`
            }
        } catch (error) {
            correctOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    }

    function runStepByStep() {
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]

        // Create step-by-step explanation
        let steps = `<h3>Step-by-Step Execution:</h3>
                    <div class="step-container">`

        // Add steps based on scenario
        switch (scenarioKey) {
            case "comparison":
                const score = Number.parseFloat(document.getElementById("input-score").value)
                steps += `
                    <div class="step">
                        <p>1. Function called with score = ${score}</p>
                    </div>
                    <div class="step">
                        <p>2. Evaluating condition: <code>if (score = 60)</code></p>
                        <p>This is an assignment, not a comparison. It sets score to 60 and returns 60 (truthy).</p>
                        <p>After this line executes, score = 60 regardless of input.</p>
                    </div>
                    <div class="step">
                        <p>3. Since the condition is always true, we enter the if block</p>
                        <p><code>result = "Pass"</code></p>
                    </div>
                    <div class="step">
                        <p>4. Return result: "Pass"</p>
                    </div>
                    <div class="step">
                        <p><strong>Error:</strong> The function always returns "Pass" regardless of the input score!</p>
                    </div>`
                break

            case "boundary":
                const gradeScore = Number.parseFloat(document.getElementById("input-score").value)
                steps += `
                    <div class="step">
                        <p>1. Function called with score = ${gradeScore}</p>
                    </div>`

                if (gradeScore < 60) {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (score < 60)</code> → true</p>
                            <p><code>grade = "F"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (score < 60)</code> → false</p>
                        </div>`
                }

                if (gradeScore < 70) {
                    steps += `
                        <div class="step">
                            <p>3. Evaluating: <code>if (score < 70)</code> → true</p>
                            <p><code>grade = "D"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>3. Evaluating: <code>if (score < 70)</code> → false</p>
                        </div>`
                }

                if (gradeScore < 80) {
                    steps += `
                        <div class="step">
                            <p>4. Evaluating: <code>if (score < 80)</code> → true</p>
                            <p><code>grade = "C"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>4. Evaluating: <code>if (score < 80)</code> → false</p>
                        </div>`
                }

                if (gradeScore < 90) {
                    steps += `
                        <div class="step">
                            <p>5. Evaluating: <code>if (score < 90)</code> → true</p>
                            <p><code>grade = "B"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>5. Evaluating: <code>if (score < 90)</code> → false</p>
                        </div>`
                }

                if (gradeScore <= 100) {
                    steps += `
                        <div class="step">
                            <p>6. Evaluating: <code>if (score <= 100)</code> → true</p>
                            <p><code>grade = "A"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>6. Evaluating: <code>if (score <= 100)</code> → false</p>
                        </div>`
                }

                steps += `
                    <div class="step">
                        <p>7. Return grade: "${gradeScore <= 100 ? "A" : ""}"</p>
                    </div>
                    <div class="step">
                        <p><strong>Error:</strong> The function always returns "A" for any score above 0 and below or equal to 100 because all conditions are checked independently!</p>
                    </div>`
                break

            case "nesting":
                const age = Number.parseFloat(document.getElementById("input-age").value)
                const isStudent = document.getElementById("input-isStudent").checked

                steps += `
                    <div class="step">
                        <p>1. Function called with age = ${age}, isStudent = ${isStudent}</p>
                    </div>`

                if (age < 18) {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (age < 18)</code> → true</p>
                        </div>`

                    if (isStudent) {
                        steps += `
                            <div class="step">
                                <p>3. Evaluating inner: <code>if (isStudent)</code> → true</p>
                                <p><code>discount = 25</code></p>
                            </div>`
                    } else {
                        steps += `
                            <div class="step">
                                <p>3. Evaluating inner: <code>if (isStudent)</code> → false</p>
                                <p>Skip inner if block</p>
                            </div>
                            <div class="step">
                                <p>4. The else belongs to the inner if due to missing braces</p>
                                <p><code>discount = 10</code></p>
                            </div>`
                    }
                } else {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (age < 18)</code> → false</p>
                            <p>Skip both the outer if and the else (which belongs to the inner if)</p>
                            <p>discount remains 0</p>
                        </div>`
                }

                steps += `
                    <div class="step">
                        <p>5. Return discount: "${age < 18 ? (isStudent ? "25%" : "10%") : "0%"}"</p>
                    </div>
                    <div class="step">
                        <p><strong>Error:</strong> Adults never get a discount because the else belongs to the inner if statement due to improper nesting!</p>
                    </div>`
                break

            case "missing-else":
                const userAge = Number.parseFloat(document.getElementById("input-age").value)

                steps += `
                    <div class="step">
                        <p>1. Function called with age = ${userAge}</p>
                        <p>Initial message = ""</p>
                    </div>`

                if (userAge >= 18) {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (age >= 18)</code> → true</p>
                            <p><code>message = "Access granted"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>2. Evaluating: <code>if (age >= 18)</code> → false</p>
                            <p>message remains ""</p>
                        </div>`
                }

                if (userAge < 13) {
                    steps += `
                        <div class="step">
                            <p>3. Evaluating: <code>if (age < 13)</code> → true</p>
                            <p><code>message = "Access denied"</code></p>
                        </div>`
                } else {
                    steps += `
                        <div class="step">
                            <p>3. Evaluating: <code>if (age < 13)</code> → false</p>
                            <p>message remains ${userAge >= 18 ? '"Access granted"' : '""'}</p>
                        </div>`
                }

                steps += `
                    <div class="step">
                        <p>4. Return message: "${userAge >= 18 ? "Access granted" : userAge < 13 ? "Access denied" : ""}"</p>
                    </div>`

                if (userAge >= 13 && userAge < 18) {
                    steps += `
                        <div class="step">
                            <p><strong>Error:</strong> For ages between 13 and 17, the function returns an empty string because there's no condition handling this range!</p>
                        </div>`
                }
                break
        }

        steps += `</div>`

        // Display steps
        simulationExplanation.innerHTML = steps
    }

    // Visualization Section
    const flowCanvas = document.getElementById("flow-canvas")
    const variableDisplay = document.getElementById("variable-display")
    const playBtn = document.getElementById("play-visualization")
    const pauseBtn = document.getElementById("pause-visualization")
    const resetBtn = document.getElementById("reset-visualization")
    const speedControl = document.getElementById("animation-speed")

    let ctx
    let animationId
    let animationPaused = true
    let animationStep = 0
    let animationSpeed = 5

    // Initialize visualization section
    function initVisualization() {
        if (flowCanvas.getContext) {
            ctx = flowCanvas.getContext("2d")

            // Set up event listeners
            playBtn.addEventListener("click", playVisualization)
            pauseBtn.addEventListener("click", pauseVisualization)
            resetBtn.addEventListener("click", resetVisualization)
            speedControl.addEventListener("input", updateSpeed)

            // Initial drawing
            drawFlowchart()
        }
    }

    function playVisualization() {
        animationPaused = false
        if (!animationId) {
            animate()
        }
    }

    function pauseVisualization() {
        animationPaused = true
        cancelAnimationFrame(animationId)
        animationId = null
    }

    function resetVisualization() {
        pauseVisualization()
        animationStep = 0
        drawFlowchart()
        updateVariableDisplay({})
    }

    function updateSpeed() {
        animationSpeed = Number.parseInt(speedControl.value)
    }

    function animate() {
        if (!animationPaused) {
            // Slow down animation based on speed
            const frameDelay = 11 - animationSpeed // Invert scale: 1 = slow, 10 = fast

            if (animationStep % frameDelay === 0) {
                const step = Math.floor(animationStep / frameDelay)
                updateVisualization(step)
            }

            animationStep++
            animationId = requestAnimationFrame(animate)
        }
    }

    function updateVisualization(step) {
        // Get current scenario
        const scenarioKey = scenarioSelect.value
        const scenario = scenarios[scenarioKey]
        const inputs = getInputValues()

        // Create visualization based on scenario and step
        switch (scenarioKey) {
            case "comparison":
                visualizeComparison(step, inputs.score)
                break
            case "boundary":
                visualizeBoundary(step, inputs.score)
                break
            case "nesting":
                visualizeNesting(step, inputs.age, inputs.isStudent)
                break
            case "missing-else":
                visualizeMissingElse(step, inputs.age)
                break
        }
    }

    function drawFlowchart() {
        // Clear canvas
        ctx.clearRect(0, 0, flowCanvas.width, flowCanvas.height)

        // Get current scenario
        const scenarioKey = scenarioSelect.value

        // Draw flowchart based on scenario
        switch (scenarioKey) {
            case "comparison":
                drawComparisonFlowchart()
                break
            case "boundary":
                drawBoundaryFlowchart()
                break
            case "nesting":
                drawNestingFlowchart()
                break
            case "missing-else":
                drawMissingElseFlowchart()
                break
        }
    }

    function updateVariableDisplay(variables) {
        variableDisplay.innerHTML = ""

        for (const [name, value] of Object.entries(variables)) {
            const varBox = document.createElement("div")
            varBox.className = "variable-box"
            varBox.innerHTML = `<strong>${name}:</strong> ${value}`
            variableDisplay.appendChild(varBox)
        }
    }

    // Flowchart drawing functions for each scenario
    function drawComparisonFlowchart() {
        // Start
        drawRoundedRect(350, 50, 100, 40, "Start", "#4a6fa5")
        drawArrow(350, 90, 350, 130)

        // Input
        drawRoundedRect(350, 130, 100, 40, "Input score", "#166088")
        drawArrow(350, 170, 350, 210)

        // Decision
        drawDiamond(350, 250, 150, 80, "score = 60", "#e63946")
        drawArrow(425, 250, 500, 250)
        drawText(460, 240, "True")
        drawArrow(350, 290, 350, 330)
        drawText(360, 310, "False")

        // True path
        drawRect(500, 250, 100, 40, 'result = "Pass"', "#28a745")
        drawArrow(550, 290, 550, 370)

        // False path
        drawRect(350, 330, 100, 40, 'result = "Fail"', "#dc3545")
        drawArrow(350, 370, 450, 370)

        // Return
        drawRoundedRect(450, 370, 100, 40, "Return result", "#166088")
        drawArrow(450, 410, 450, 450)

        // End
        drawRoundedRect(450, 450, 100, 40, "End", "#4a6fa5")
    }

    function drawBoundaryFlowchart() {
        // Start
        drawRoundedRect(350, 30, 100, 30, "Start", "#4a6fa5")
        drawArrow(350, 60, 350, 90)

        // Input
        drawRoundedRect(350, 90, 100, 30, "Input score", "#166088")
        drawArrow(350, 120, 350, 150)

        // Decision 1
        drawDiamond(350, 180, 120, 60, "score < 60", "#17a2b8")
        drawArrow(410, 180, 500, 180)
        drawText(450, 170, "True")
        drawArrow(350, 210, 350, 240)
        drawText(360, 225, "False")

        // Decision 2
        drawDiamond(350, 270, 120, 60, "score < 70", "#17a2b8")
        drawArrow(410, 270, 500, 270)
        drawText(450, 260, "True")
        drawArrow(350, 300, 350, 330)
        drawText(360, 315, "False")

        // Decision 3
        drawDiamond(350, 360, 120, 60, "score < 80", "#17a2b8")
        drawArrow(410, 360, 500, 360)
        drawText(450, 350, "True")
        drawArrow(350, 390, 350, 420)
        drawText(360, 405, "False")

        // True paths
        drawRect(500, 180, 80, 30, 'grade = "F"', "#28a745")
        drawArrow(540, 210, 540, 450)

        drawRect(500, 270, 80, 30, 'grade = "D"', "#28a745")
        drawArrow(540, 300, 540, 450)

        drawRect(500, 360, 80, 30, 'grade = "C"', "#28a745")
        drawArrow(540, 390, 540, 450)

        // Return
        drawRoundedRect(450, 450, 100, 30, "Return grade", "#166088")
        drawArrow(450, 480, 450, 510)

        // End
        drawRoundedRect(450, 510, 100, 30, "End", "#4a6fa5")
    }

    function drawNestingFlowchart() {
        // Start
        drawRoundedRect(350, 50, 100, 40, "Start", "#4a6fa5")
        drawArrow(350, 90, 350, 130)

        // Input
        drawRoundedRect(350, 130, 120, 40, "Input age, isStudent", "#166088")
        drawArrow(350, 170, 350, 210)

        // Decision 1
        drawDiamond(350, 250, 150, 80, "age < 18", "#17a2b8")
        drawArrow(425, 250, 550, 250)
        drawText(480, 240, "True")
        drawArrow(350, 290, 350, 370)
        drawText(360, 330, "False")

        // Decision 2
        drawDiamond(550, 250, 150, 80, "isStudent", "#17a2b8")
        drawArrow(625, 250, 700, 250)
        drawText(660, 240, "True")
        drawArrow(550, 290, 550, 330)
        drawText(560, 310, "False")

        // True paths
        drawRect(700, 250, 120, 40, "discount = 25", "#28a745")
        drawArrow(760, 290, 760, 370)

        // False path for inner if
        drawRect(550, 330, 120, 40, "discount = 10", "#28a745")
        drawArrow(610, 370, 610, 410)

        // Return
        drawRoundedRect(450, 410, 150, 40, 'Return discount + "%"', "#166088")
        drawArrow(450, 450, 450, 490)

        // End
        drawRoundedRect(450, 490, 100, 40, "End", "#4a6fa5")
    }

    function drawMissingElseFlowchart() {
        // Start
        drawRoundedRect(350, 50, 100, 40, "Start", "#4a6fa5")
        drawArrow(350, 90, 350, 130)

        // Input
        drawRoundedRect(350, 130, 100, 40, "Input age", "#166088")
        drawArrow(350, 170, 350, 210)

        // Initialize
        drawRect(350, 210, 150, 40, 'message = ""', "#17a2b8")
        drawArrow(350, 250, 350, 290)

        // Decision 1
        drawDiamond(350, 330, 150, 80, "age >= 18", "#17a2b8")
        drawArrow(425, 330, 550, 330)
        drawText(480, 320, "True")
        drawArrow(350, 370, 350, 410)
        drawText(360, 390, "False")

        // Decision 2
        drawDiamond(350, 450, 150, 80, "age < 13", "#17a2b8")
        drawArrow(425, 450, 550, 450)
        drawText(480, 440, "True")
        drawArrow(350, 490, 350, 530)
        drawText(360, 510, "False")

        // True paths
        drawRect(550, 330, 180, 40, 'message = "Access granted"', "#28a745")
        drawArrow(640, 370, 640, 530)

        drawRect(550, 450, 180, 40, 'message = "Access denied"', "#dc3545")
        drawArrow(640, 490, 640, 530)

        // Return
        drawRoundedRect(450, 530, 150, 40, "Return message", "#166088")
        drawArrow(450, 570, 450, 610)

        // End
        drawRoundedRect(450, 610, 100, 40, "End", "#4a6fa5")
    }

    // Visualization functions for each scenario
    function visualizeComparison(step, score) {
        drawFlowchart()

        const variables = {}

        if (step >= 1) {
            // Highlight Start
            highlightShape(350, 50, 100, 40, "#4a6fa5", 0.3)
        }

        if (step >= 2) {
            // Highlight Input
            highlightShape(350, 130, 100, 40, "#166088", 0.3)
            variables.score = score
        }

        if (step >= 3) {
            // Highlight Decision
            highlightShape(350, 250, 150, 80, "#e63946", 0.3, "diamond")
            // In the error code, this is an assignment
            variables.score = 60
            // The condition is always true
            highlightArrow(425, 250, 500, 250)
        }

        if (step >= 4) {
            // Highlight True path
            highlightShape(500, 250, 100, 40, "#28a745", 0.3)
            variables.result = "Pass"
        }

        if (step >= 5) {
            // Highlight Return
            highlightShape(450, 370, 100, 40, "#166088", 0.3)
        }

        if (step >= 6) {
            // Highlight End
            highlightShape(450, 450, 100, 40, "#4a6fa5", 0.3)
        }

        updateVariableDisplay(variables)
    }

    function visualizeBoundary(step, score) {
        drawFlowchart()

        const variables = {}

        if (step >= 1) {
            // Highlight Start
            highlightShape(350, 30, 100, 30, "#4a6fa5", 0.3)
        }

        if (step >= 2) {
            // Highlight Input
            highlightShape(350, 90, 100, 30, "#166088", 0.3)
            variables.score = score
        }

        if (step >= 3) {
            // Highlight Decision 1
            highlightShape(350, 180, 120, 60, "#17a2b8", 0.3, "diamond")

            if (score < 60) {
                highlightArrow(410, 180, 500, 180)
            } else {
                highlightArrow(350, 210, 350, 240)
            }
        }

        if (step >= 4) {
            if (score < 60) {
                // Highlight True path for Decision 1
                highlightShape(500, 180, 80, 30, "#28a745", 0.3)
                variables.grade = "F"
            } else {
                // Highlight Decision 2
                highlightShape(350, 270, 120, 60, "#17a2b8", 0.3, "diamond")

                if (score < 70) {
                    highlightArrow(410, 270, 500, 270)
                } else {
                    highlightArrow(350, 300, 350, 330)
                }
            }
        }

        if (step >= 5) {
            if (score < 60) {
                // Already handled in step 4
            } else if (score < 70) {
                // Highlight True path for Decision 2
                highlightShape(500, 270, 80, 30, "#28a745", 0.3)
                variables.grade = "D"
            } else {
                // Highlight Decision 3
                highlightShape(350, 360, 120, 60, "#17a2b8", 0.3, "diamond")

                if (score < 80) {
                    highlightArrow(410, 360, 500, 360)
                } else {
                    highlightArrow(350, 390, 350, 420)
                }
            }
        }

        if (step >= 6) {
            if (score < 80 && score >= 70) {
                // Highlight True path for Decision 3
                highlightShape(500, 360, 80, 30, "#28a745", 0.3)
                variables.grade = "C"
            }
        }

        if (step >= 7) {
            // Highlight Return
            highlightShape(450, 450, 100, 30, "#166088", 0.3)
        }

        if (step >= 8) {
            // Highlight End
            highlightShape(450, 510, 100, 30, "#4a6fa5", 0.3)
        }

        updateVariableDisplay(variables)
    }

    function visualizeNesting(step, age, isStudent) {
        drawFlowchart()

        const variables = {
            discount: 0,
        }

        if (step >= 1) {
            // Highlight Start
            highlightShape(350, 50, 100, 40, "#4a6fa5", 0.3)
        }

        if (step >= 2) {
            // Highlight Input
            highlightShape(350, 130, 120, 40, "#166088", 0.3)
            variables.age = age
            variables.isStudent = isStudent
        }

        if (step >= 3) {
            // Highlight Decision 1
            highlightShape(350, 250, 150, 80, "#17a2b8", 0.3, "diamond")

            if (age < 18) {
                highlightArrow(425, 250, 550, 250)
            } else {
                highlightArrow(350, 290, 350, 370)
            }
        }

        if (step >= 4) {
            if (age < 18) {
                // Highlight Decision 2
                highlightShape(550, 250, 150, 80, "#17a2b8", 0.3, "diamond")

                if (isStudent) {
                    highlightArrow(625, 250, 700, 250)
                } else {
                    highlightArrow(550, 290, 550, 330)
                }
            }
        }

        if (step >= 5) {
            if (age < 18) {
                if (isStudent) {
                    // Highlight True path for Decision 2
                    highlightShape(700, 250, 120, 40, "#28a745", 0.3)
                    variables.discount = 25
                } else {
                    // Highlight False path for Decision 2
                    highlightShape(550, 330, 120, 40, "#28a745", 0.3)
                    variables.discount = 10
                }
            }
        }

        if (step >= 6) {
            // Highlight Return
            highlightShape(450, 410, 150, 40, "#166088", 0.3)
        }

        if (step >= 7) {
            // Highlight End
            highlightShape(450, 490, 100, 40, "#4a6fa5", 0.3)
        }

        updateVariableDisplay(variables)
    }

    function visualizeMissingElse(step, age) {
        drawFlowchart()

        const variables = {}

        if (step >= 1) {
            // Highlight Start
            highlightShape(350, 50, 100, 40, "#4a6fa5", 0.3)
        }

        if (step >= 2) {
            // Highlight Input
            highlightShape(350, 130, 100, 40, "#166088", 0.3)
            variables.age = age
        }

        if (step >= 3) {
            // Highlight Initialize
            highlightShape(350, 210, 150, 40, "#17a2b8", 0.3)
            variables.message = ""
        }

        if (step >= 4) {
            // Highlight Decision 1
            highlightShape(350, 330, 150, 80, "#17a2b8", 0.3, "diamond")

            if (age >= 18) {
                highlightArrow(425, 330, 550, 330)
            } else {
                highlightArrow(350, 370, 350, 410)
            }
        }

        if (step >= 5) {
            if (age >= 18) {
                // Highlight True path for Decision 1
                highlightShape(550, 330, 180, 40, "#28a745", 0.3)
                variables.message = "Access granted"
            } else {
                // Highlight Decision 2
                highlightShape(350, 450, 150, 80, "#17a2b8", 0.3, "diamond")

                if (age < 13) {
                    highlightArrow(425, 450, 550, 450)
                } else {
                    highlightArrow(350, 490, 350, 530)
                }
            }
        }

        if (step >= 6) {
            if (age < 13) {
                // Highlight True path for Decision 2
                highlightShape(550, 450, 180, 40, "#dc3545", 0.3)
                variables.message = "Access denied"
            }
        }

        if (step >= 7) {
            // Highlight Return
            highlightShape(450, 530, 150, 40, "#166088", 0.3)
        }

        if (step >= 8) {
            // Highlight End
            highlightShape(450, 610, 100, 40, "#4a6fa5", 0.3)
        }

        updateVariableDisplay(variables)
    }

    // Helper functions for drawing shapes
    function drawRoundedRect(x, y, width, height, text, color) {
        ctx.beginPath()
        ctx.moveTo(x, y + height / 2)
        ctx.lineTo(x + width, y + height / 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x + width / 2, y)
        ctx.lineTo(x + width / 2, y + height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x + 10, y)
        ctx.lineTo(x + width - 10, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + 10)
        ctx.lineTo(x + width, y + height - 10)
        ctx.quadraticCurveTo(x + width, y + height, x + width - 10, y + height)
        ctx.lineTo(x + 10, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - 10)
        ctx.lineTo(x, y + 10)
        ctx.quadraticCurveTo(x, y, x + 10, y)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.stroke()

        ctx.fillStyle = "#fff"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, x + width / 2, y + height / 2)
    }

    function drawRect(x, y, width, height, text, color) {
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.stroke()

        ctx.fillStyle = "#fff"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, x + width / 2, y + height / 2)
    }

    function drawDiamond(x, y, width, height, text, color) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + width / 2, y - height / 2)
        ctx.lineTo(x + width, y)
        ctx.lineTo(x + width / 2, y + height / 2)
        ctx.closePath()

        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = "#000"
        ctx.stroke()

        ctx.fillStyle = "#fff"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, x + width / 2, y)
    }

    function drawArrow(fromX, fromY, toX, toY) {
        const headLength = 10
        const angle = Math.atan2(toY - fromY, toX - fromX)

        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
        ctx.moveTo(toX, toY)
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
        ctx.strokeStyle = "#000"
        ctx.stroke()
    }

    function drawText(x, y, text) {
        ctx.fillStyle = "#000"
        ctx.font = "12px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, x, y)
    }

    function highlightShape(x, y, width, height, color, alpha, type = "rect") {
        ctx.globalAlpha = alpha

        if (type === "diamond") {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x + width / 2, y - height / 2)
            ctx.lineTo(x + width, y)
            ctx.lineTo(x + width / 2, y + height / 2)
            ctx.closePath()

            ctx.fillStyle = color
            ctx.fill()
        } else {
            ctx.beginPath()
            ctx.rect(x, y, width, height)
            ctx.fillStyle = color
            ctx.fill()
        }

        ctx.globalAlpha = 1.0
    }

    function highlightArrow(fromX, fromY, toX, toY) {
        const headLength = 10
        const angle = Math.atan2(toY - fromY, toX - fromX)

        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
        ctx.moveTo(toX, toY)
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
        ctx.strokeStyle = "#e63946"
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.lineWidth = 1
    }

    // Exploration Section
    const codeEditor = document.getElementById("code-editor")
    const runCustomCodeBtn = document.getElementById("run-custom-code")
    const resetEditorBtn = document.getElementById("reset-editor")
    const checkLogicBtn = document.getElementById("check-logic")
    const customInputFields = document.getElementById("custom-input-fields")
    const addInputBtn = document.getElementById("add-input")
    const customOutput = document.getElementById("custom-output")
    const logicFeedback = document.getElementById("logic-feedback")
    const templateSelect = document.getElementById("template-select")
    const loadTemplateBtn = document.getElementById("load-template")

    // Code templates
    const codeTemplates = {
        "grade-calculator": `// Calculate grade based on score
function calculateGrade(score) {
    let grade;
    
    // TODO: Fix the logical error in this code
    if (score < 60) {
        grade = "F";
    }
    if (score < 70) {
        grade = "D";
    }
    if (score < 80) {
        grade = "C";
    }
    if (score < 90) {
        grade = "B";
    }
    if (score <= 100) {
        grade = "A";
    }
    
    return grade;
}

// Test the function
const score = 85;
console.log("Score: " + score + ", Grade: " + calculateGrade(score));`,

        "discount-calculator": `// Calculate discount based on age and student status
function calculateDiscount(age, isStudent) {
    let discount = 0;
    
    // TODO: Fix the logical error in this code
    if (age < 18)
        if (isStudent)
            discount = 25;
    else
        discount = 10;
    
    return discount + "%";
}

// Test the function
const age = 20;
const isStudent = true;
console.log("Age: " + age + ", Student: " + isStudent + 
            ", Discount: " + calculateDiscount(age, isStudent));`,

        "age-validator": `// Validate user age for website access
function validateAge(age) {
    let message = "";
    
    // TODO: Fix the logical error in this code
    if (age >= 18) {
        message = "Access granted";
    }
    if (age < 13) {
        message = "Access denied";
    }
    
    return message;
}

// Test the function
const age = 15;
console.log("Age: " + age + ", Message: " + validateAge(age));`,

        "number-classifier": `// Classify a number as positive, negative, or zero
function classifyNumber(num) {
    let result;
    
    // TODO: Fix the logical error in this code
    if (num = 0) {
        result = "Zero";
    } else if (num > 0) {
        result = "Positive";
    } else {
        result = "Negative";
    }
    
    return result;
}

// Test the function
const number = -5;
console.log("Number: " + number + ", Classification: " + classifyNumber(number));`,
    }

    // Initialize exploration section
    function initExploration() {
        runCustomCodeBtn.addEventListener("click", runCustomCode)
        resetEditorBtn.addEventListener("click", resetEditor)
        checkLogicBtn.addEventListener("click", checkLogic)
        addInputBtn.addEventListener("click", addCustomInput)
        loadTemplateBtn.addEventListener("click", loadTemplate)

        // Set initial template
        codeEditor.value = codeTemplates["grade-calculator"]
        updateCustomInputs()
    }

    function loadTemplate() {
        const templateKey = templateSelect.value
        if (templateKey && codeTemplates[templateKey]) {
            codeEditor.value = codeTemplates[templateKey]
            updateCustomInputs()
            logicFeedback.innerHTML = ""
            customOutput.innerHTML = ""
        }
    }

    function resetEditor() {
        const templateKey = templateSelect.value || "grade-calculator"
        codeEditor.value = codeTemplates[templateKey]
        updateCustomInputs()
        logicFeedback.innerHTML = ""
        customOutput.innerHTML = ""
    }

    function updateCustomInputs() {
        customInputFields.innerHTML = ""

        // Parse the code to find input variables
        const code = codeEditor.value
        const testSection = code.split("// Test the function")[1]

        if (testSection) {
            const lines = testSection.split("\n")
            let inputCount = 0

            for (const line of lines) {
                if (line.trim().startsWith("const ") || line.trim().startsWith("let ")) {
                    const match = line.match(/(?:const|let)\s+(\w+)\s*=\s*(.+?);/)
                    if (match) {
                        const varName = match[1]
                        let varValue = match[2].trim()

                        // Skip console.log variables
                        if (varName === "result" || varName === "output") continue

                        // Create input field
                        const inputGroup = document.createElement("div")
                        inputGroup.className = "input-group"

                        const label = document.createElement("label")
                        label.textContent = varName + ":"
                        label.setAttribute("for", `custom-input-${inputCount}`)

                        let inputElement

                        if (varValue === "true" || varValue === "false") {
                            inputElement = document.createElement("input")
                            inputElement.type = "checkbox"
                            inputElement.id = `custom-input-${inputCount}`
                            inputElement.name = varName
                            inputElement.checked = varValue === "true"
                            inputElement.dataset.type = "boolean"
                        } else if (!isNaN(Number.parseFloat(varValue))) {
                            inputElement = document.createElement("input")
                            inputElement.type = "number"
                            inputElement.id = `custom-input-${inputCount}`
                            inputElement.name = varName
                            inputElement.value = Number.parseFloat(varValue)
                            inputElement.dataset.type = "number"
                        } else {
                            // Remove quotes if present
                            if (varValue.startsWith('"') || varValue.startsWith("'")) {
                                varValue = varValue.substring(1, varValue.length - 1)
                            }

                            inputElement = document.createElement("input")
                            inputElement.type = "text"
                            inputElement.id = `custom-input-${inputCount}`
                            inputElement.name = varName
                            inputElement.value = varValue
                            inputElement.dataset.type = "string"
                        }

                        inputGroup.appendChild(label)
                        inputGroup.appendChild(inputElement)
                        customInputFields.appendChild(inputGroup)

                        inputCount++
                    }
                }
            }
        }

        // Add a default input if none found
        if (customInputFields.children.length === 0) {
            addCustomInput()
        }
    }

    function addCustomInput() {
        const inputCount = customInputFields.children.length

        const inputGroup = document.createElement("div")
        inputGroup.className = "input-group"

        const label = document.createElement("label")
        label.textContent = `Input ${inputCount + 1}:`
        label.setAttribute("for", `custom-input-${inputCount}`)

        const inputElement = document.createElement("input")
        inputElement.type = "text"
        inputElement.id = `custom-input-${inputCount}`
        inputElement.name = `input${inputCount}`
        inputElement.dataset.type = "auto"

        inputGroup.appendChild(label)
        inputGroup.appendChild(inputElement)
        customInputFields.appendChild(inputGroup)
    }

    function getCustomInputValues() {
        const inputs = {}
        const inputElements = customInputFields.querySelectorAll("input")

        inputElements.forEach((input) => {
            const name = input.name
            let value

            if (input.dataset.type === "boolean") {
                value = input.checked
            } else if (input.dataset.type === "number") {
                value = Number.parseFloat(input.value)
            } else if (input.dataset.type === "string") {
                value = input.value
            } else {
                // Auto-detect type
                if (input.value === "true" || input.value === "false") {
                    value = input.value === "true"
                } else if (!isNaN(Number.parseFloat(input.value))) {
                    value = Number.parseFloat(input.value)
                } else {
                    value = input.value
                }
            }

            inputs[name] = value
        })

        return inputs
    }

    function runCustomCode() {
        const code = codeEditor.value
        const inputs = getCustomInputValues()

        try {
            // Create a function from the code
            const func = new Function(
                "inputs",
                `
                ${Object.entries(inputs)
                    .map(([key, value]) => {
                        if (typeof value === "string") {
                            return `const ${key} = "${value}";`
                        } else {
                            return `const ${key} = ${value};`
                        }
                    })
                    .join("\n")}
                
                let consoleOutput = [];
                const originalConsoleLog = console.log;
                console.log = function() {
                    consoleOutput.push(Array.from(arguments).join(' '));
                };
                
                try {
                    ${code}
                } catch (error) {
                    consoleOutput.push("Error: " + error.message);
                }
                
                console.log = originalConsoleLog;
                return consoleOutput;
            `,
            )

            // Execute the function
            const output = func(inputs)

            // Display the result
            customOutput.innerHTML = output.map((line) => `<p>${line}</p>`).join("")
        } catch (error) {
            customOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    }

    function checkLogic() {
        const code = codeEditor.value
        let feedback = ""

        // Check for common logical errors
        if (code.includes("if (") && code.includes("=") && !code.includes("==") && !code.includes("===")) {
            feedback += `<p class="error-highlight">⚠️ Possible assignment in condition: You might be using = (assignment) instead of == or === (comparison) in an if statement.</p>`
        }

        if (code.includes("if (") && !code.includes("else") && !code.includes("else if")) {
            feedback += `<p class="warning-highlight">⚠️ Missing else clause: Your code has if statements without corresponding else clauses. This might create logical gaps.</p>`
        }

        const ifCount = (code.match(/if\s*\(/g) || []).length
        const elseCount = (code.match(/else\s*{/g) || []).length + (code.match(/else\s+if\s*\(/g) || []).length

        if (ifCount > 1 && elseCount === 0) {
            feedback += `<p class="warning-highlight">⚠️ Multiple independent if statements: Consider using else if for mutually exclusive conditions.</p>`
        }

        const openBraces = (code.match(/{/g) || []).length
        const closeBraces = (code.match(/}/g) || []).length

        if (openBraces !== closeBraces) {
            feedback += `<p class="error-highlight">⚠️ Mismatched braces: You have ${openBraces} opening braces and ${closeBraces} closing braces.</p>`
        }

        if (code.includes("if") && !code.includes("{")) {
            feedback += `<p class="warning-highlight">⚠️ Missing braces: Using if statements without braces can lead to nesting errors.</p>`
        }

        // Check for boundary condition errors
        if (code.includes("<") && code.includes(">") && !code.includes("<=") && !code.includes(">=")) {
            feedback += `<p class="warning-highlight">⚠️ Potential boundary condition issue: Check if you need to use <= or >= for inclusive ranges.</p>`
        }

        if (feedback === "") {
            feedback = `<p class="success-highlight">✅ No common logical errors detected. However, this doesn't guarantee your code is error-free. Always test thoroughly!</p>`
        }

        logicFeedback.innerHTML = feedback
    }

    // Quiz Section
    const quizQuestions = document.getElementById("quiz-questions")
    const submitQuizBtn = document.getElementById("submit-quiz")
    const resetQuizBtn = document.getElementById("reset-quiz")
    const quizResults = document.getElementById("quiz-results")

    // Quiz data
    const quiz = [
        {
            question: "What is a logical error in a selection structure?",
            options: [
                "An error that prevents the program from compiling",
                "An error in the syntax of the code",
                "An error where the code runs but produces incorrect results due to flawed logic",
                "An error that occurs only at runtime",
            ],
            correctAnswer: 2,
        },
        {
            question: "Which of the following is a common logical error in selection structures?",
            options: [
                "Using = instead of == in conditions",
                "Forgetting to include semicolons",
                "Misspelling variable names",
                "Using too many brackets",
            ],
            correctAnswer: 0,
        },
        {
            question:
                'What will the following code return for an input of 15?\n\nfunction checkAge(age) {\n  if (age = 18) {\n    return "Adult";\n  } else {\n    return "Minor";\n  }\n}',
            options: ['"Minor"', '"Adult"', "An error", "undefined"],
            correctAnswer: 1,
        },
        {
            question:
                'What is the logical error in the following code?\n\nif (score < 60) {\n  grade = "F";\n}\nif (score < 70) {\n  grade = "D";\n}\nif (score < 80) {\n  grade = "C";\n}',
            options: [
                "Missing else clauses between conditions",
                "Incorrect comparison operators",
                "Undefined variables",
                "Missing semicolons",
            ],
            correctAnswer: 0,
        },
        {
            question:
                "What happens in the following code if age is 16 and isStudent is false?\n\nif (age < 18)\n  if (isStudent)\n    discount = 25;\nelse\n  discount = 10;",
            options: ["discount = 0", "discount = 10", "discount = 25", "An error occurs"],
            correctAnswer: 1,
        },
    ]

    // Initialize quiz section
    function initQuiz() {
        submitQuizBtn.addEventListener("click", submitQuiz)
        resetQuizBtn.addEventListener("click", resetQuiz)

        // Generate quiz questions
        generateQuiz()
    }

    function generateQuiz() {
        quizQuestions.innerHTML = ""

        quiz.forEach((q, index) => {
            const questionDiv = document.createElement("div")
            questionDiv.className = "quiz-question"

            const questionText = document.createElement("p")
            questionText.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`

            const optionsDiv = document.createElement("div")
            optionsDiv.className = "quiz-options"

            q.options.forEach((option, optIndex) => {
                const optionDiv = document.createElement("div")
                optionDiv.className = "quiz-option"

                const radio = document.createElement("input")
                radio.type = "radio"
                radio.name = `question-${index}`
                radio.id = `q${index}-opt${optIndex}`
                radio.value = optIndex

                const label = document.createElement("label")
                label.setAttribute("for", `q${index}-opt${optIndex}`)
                label.textContent = option

                optionDiv.appendChild(radio)
                optionDiv.appendChild(label)
                optionsDiv.appendChild(optionDiv)
            })

            questionDiv.appendChild(questionText)
            questionDiv.appendChild(optionsDiv)
            quizQuestions.appendChild(questionDiv)
        })
    }

    function submitQuiz() {
        let score = 0
        let feedback = ""

        quiz.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`)

            if (selectedOption) {
                const userAnswer = Number.parseInt(selectedOption.value)

                if (userAnswer === q.correctAnswer) {
                    score++
                    feedback += `<p><strong>Question ${index + 1}:</strong> <span class="correct-answer">Correct!</span></p>`
                } else {
                    feedback += `<p><strong>Question ${index + 1}:</strong> <span class="incorrect-answer">Incorrect.</span> The correct answer is: ${q.options[q.correctAnswer]}</p>`
                }
            } else {
                feedback += `<p><strong>Question ${index + 1}:</strong> <span class="incorrect-answer">Not answered.</span> The correct answer is: ${q.options[q.correctAnswer]}</p>`
            }
        })

        const percentage = Math.round((score / quiz.length) * 100)

        let resultMessage = ""
        if (percentage >= 80) {
            resultMessage = `<p class="success-highlight">Great job! You scored ${score}/${quiz.length} (${percentage}%). You have a good understanding of logical errors in selection structures.</p>`
        } else if (percentage >= 60) {
            resultMessage = `<p class="warning-highlight">Good effort! You scored ${score}/${quiz.length} (${percentage}%). You understand the basics, but review the areas where you made mistakes.</p>`
        } else {
            resultMessage = `<p class="error-highlight">You scored ${score}/${quiz.length} (${percentage}%). You should review the material on logical errors in selection structures.</p>`
        }

        quizResults.innerHTML = resultMessage + feedback
        quizResults.style.display = "block"
    }

    function resetQuiz() {
        const radioButtons = document.querySelectorAll('input[type="radio"]')
        radioButtons.forEach((radio) => {
            radio.checked = false
        })

        quizResults.innerHTML = ""
        quizResults.style.display = "none"
    }

    // Initialize all sections
    initSimulation()
    initVisualization()
    initExploration()
    initQuiz()
})

document.addEventListener("DOMContentLoaded", () => {
    // Tab navigation
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach((btn) => btn.classList.remove("active"))
            tabContents.forEach((content) => content.classList.remove("active"))

            // Add active class to clicked button and corresponding content
            button.classList.add("active")
            const tabId = button.getAttribute("data-tab")
            document.getElementById(tabId).classList.add("active")
        })
    })

    // Playground functionality
    const valueA = document.getElementById("value-a")
    const valueB = document.getElementById("value-b")
    const valueC = document.getElementById("value-c")
    const valueD = document.getElementById("value-d")
    const operator = document.getElementById("operator")
    const operator2 = document.getElementById("operator-2")
    const logicalOperator = document.getElementById("logical-operator")
    const secondCondition = document.getElementById("second-condition")
    const evaluateBtn = document.getElementById("evaluate-btn")
    const conditionCode = document.getElementById("condition-code")
    const resultDisplay = document.getElementById("result-display")
    const explanationDisplay = document.getElementById("explanation-display")

    // Show/hide second condition based on logical operator selection
    logicalOperator.addEventListener("change", () => {
        if (logicalOperator.value === "none") {
            secondCondition.classList.add("hidden")
        } else {
            secondCondition.classList.remove("hidden")
        }
    })

    // Evaluate condition when button is clicked
    evaluateBtn.addEventListener("click", () => {
        const a = Number.parseFloat(valueA.value)
        const b = Number.parseFloat(valueB.value)
        const op = operator.value

        // Build condition string and evaluate it
        let conditionStr = `${a} ${op} ${b}`
        let result = evaluateCondition(a, op, b)
        let explanation = `The condition evaluates to ${result} because ${a} ${getOperatorText(op)} ${b}.`

        // Handle compound condition if selected
        if (logicalOperator.value !== "none") {
            const c = Number.parseFloat(valueC.value)
            const d = Number.parseFloat(valueD.value)
            const op2 = operator2.value
            const logOp = logicalOperator.value

            const secondResult = evaluateCondition(c, op2, d)
            conditionStr += ` ${logOp} ${c} ${op2} ${d}`

            if (logOp === "&&") {
                result = result && secondResult
                explanation = `The condition evaluates to ${result} because:
                - First part: ${a} ${getOperatorText(op)} ${b} is ${evaluateCondition(a, op, b)}
                - Second part: ${c} ${getOperatorText(op2)} ${d} is ${secondResult}
                - Using AND (&&) operator: both parts must be true for the result to be true`
            } else {
                result = result || secondResult
                explanation = `The condition evaluates to ${result} because:
                - First part: ${a} ${getOperatorText(op)} ${b} is ${evaluateCondition(a, op, b)}
                - Second part: ${c} ${getOperatorText(op2)} ${d} is ${secondResult}
                - Using OR (||) operator: at least one part must be true for the result to be true`
            }
        }

        // Update the code display
        conditionCode.textContent = `if (${conditionStr}) {
    // Code block ${result ? "executes" : "does not execute"}
}`

        // Update the result display
        resultDisplay.className = result ? "result true" : "result false"
        resultDisplay.innerHTML = `
            <span class="result-icon">${result ? "✓" : "✗"}</span>
            <span class="result-text">Condition is ${result ? "TRUE" : "FALSE"}</span>
        `

        // Update the explanation
        explanationDisplay.innerHTML = `<p>${explanation}</p>`
    })

    // Helper function to evaluate a condition
    function evaluateCondition(a, operator, b) {
        switch (operator) {
            case "==":
                return a == b
            case "===":
                return a === b
            case "!=":
                return a != b
            case "!==":
                return a !== b
            case "<":
                return a < b
            case ">":
                return a > b
            case "<=":
                return a <= b
            case ">=":
                return a >= b
            default:
                return false
        }
    }

    // Helper function to get readable operator text
    function getOperatorText(op) {
        switch (op) {
            case "==":
                return "is equal to"
            case "===":
                return "is strictly equal to"
            case "!=":
                return "is not equal to"
            case "!==":
                return "is strictly not equal to"
            case "<":
                return "is less than"
            case ">":
                return "is greater than"
            case "<=":
                return "is less than or equal to"
            case ">=":
                return "is greater than or equal to"
            default:
                return op
        }
    }

    // Challenge tabs functionality
    const challengeTabs = document.querySelectorAll(".challenge-tab")
    const challenges = document.querySelectorAll(".challenge")

    challengeTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and challenges
            challengeTabs.forEach((t) => t.classList.remove("active"))
            challenges.forEach((c) => c.classList.remove("active"))

            // Add active class to clicked tab and corresponding challenge
            tab.classList.add("active")
            const challengeId = tab.getAttribute("data-challenge")
            document.getElementById(`challenge-${challengeId}`).classList.add("active")
        })
    })

    // Challenge 1 functionality
    const challenge1Code = document.getElementById("challenge-1-code")
    const challenge1Input = document.getElementById("challenge-1-input")
    const challenge1Test = document.getElementById("challenge-1-test")
    const challenge1Hint = document.getElementById("challenge-1-hint")
    const challenge1Solution = document.getElementById("challenge-1-solution")
    const challenge1Result = document.getElementById("challenge-1-result")

    challenge1Test.addEventListener("click", () => {
        try {
            const temp = Number.parseFloat(challenge1Input.value)
            const code = challenge1Code.value

            // Create a function from the code
            const classifyTemp = new Function("temp", code + "\nreturn classifyTemperature(temp);")

            // Execute the function
            const result = classifyTemp(temp)

            // Display the result
            challenge1Result.innerHTML = `
                <p>Temperature: ${temp}°C</p>
                <p>Classification: <strong>${result}</strong></p>
                <p>Expected classification: <strong>${getExpectedTemperatureClass(temp)}</strong></p>
            `

            // Check if result is correct
            if (result === getExpectedTemperatureClass(temp)) {
                challenge1Result.innerHTML += '<p class="correct">Your solution is correct! ✓</p>'
            } else {
                challenge1Result.innerHTML += '<p class="incorrect">Your solution is incorrect. Try again! ✗</p>'
            }
        } catch (error) {
            challenge1Result.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    })

    challenge1Hint.addEventListener("click", () => {
        challenge1Result.innerHTML = `
            <p>Hint: The problem is that you're using separate if statements, which means multiple conditions can be true for the same input.</p>
            <p>For example, if temp = 15, it's > 0, > 10, but not > 25, so the classification will be "Moderate".</p>
            <p>Try using else-if statements to make the conditions mutually exclusive.</p>
        `
    })

    challenge1Solution.addEventListener("click", () => {
        challenge1Code.value = `function classifyTemperature(temp) {
    let classification;
    
    if (temp < 0) {
        classification = "Freezing";
    } else if (temp <= 10) {
        classification = "Cold";
    } else if (temp <= 25) {
        classification = "Moderate";
    } else {
        classification = "Hot";
    }
    
    return classification;
}`
        challenge1Result.innerHTML = `
            <p>Solution:</p>
            <p>1. Use else-if statements to make conditions mutually exclusive</p>
            <p>2. Fix boundary conditions: <= 10 for Cold, <= 25 for Moderate</p>
            <p>3. Add an else clause for Hot temperatures</p>
        `
    })

    // Helper function to get expected temperature classification
    function getExpectedTemperatureClass(temp) {
        if (temp < 0) return "Freezing"
        if (temp <= 10) return "Cold"
        if (temp <= 25) return "Moderate"
        return "Hot"
    }

    // Challenge 2 functionality
    const challenge2Code = document.getElementById("challenge-2-code")
    const challenge2Amount = document.getElementById("challenge-2-amount")
    const challenge2Member = document.getElementById("challenge-2-member")
    const challenge2Test = document.getElementById("challenge-2-test")
    const challenge2Hint = document.getElementById("challenge-2-hint")
    const challenge2Solution = document.getElementById("challenge-2-solution")
    const challenge2Result = document.getElementById("challenge-2-result")

    challenge2Test.addEventListener("click", () => {
        try {
            const amount = Number.parseFloat(challenge2Amount.value)
            const memberType = challenge2Member.value
            const code = challenge2Code.value

            // Create a function from the code
            const calculateDiscount = new Function(
                "amount",
                "memberType",
                code + "\nreturn calculateDiscount(amount, memberType);",
            )

            // Execute the function
            const result = calculateDiscount(amount, memberType)

            // Display the result
            challenge2Result.innerHTML = `
                <p>Amount: $${amount}</p>
                <p>Member Type: ${memberType}</p>
                <p>Calculated Discount: <strong>${result}</strong></p>
                <p>Expected Discount: <strong>${getExpectedDiscount(amount, memberType)}</strong></p>
            `

            // Check if result is correct
            if (result === getExpectedDiscount(amount, memberType)) {
                challenge2Result.innerHTML += '<p class="correct">Your solution is correct! ✓</p>'
            } else {
                challenge2Result.innerHTML += '<p class="incorrect">Your solution is incorrect. Try again! ✗</p>'
            }
        } catch (error) {
            challenge2Result.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    })

    challenge2Hint.addEventListener("click", () => {
        challenge2Result.innerHTML = `
            <p>Hint: Look for assignment operators (=) that should be comparison operators (==).</p>
            <p>Also, consider using else-if statements to prevent multiple conditions from being true.</p>
        `
    })

    challenge2Solution.addEventListener("click", () => {
        challenge2Code.value = `function calculateDiscount(amount, memberType) {
    let discount = 0;
    
    // memberType can be: "premium", "regular", or "none"
    if (memberType === "premium") {
        discount = 0.2; // 20%
    } else if (memberType === "regular" && amount > 100) {
        discount = 0.1; // 10%
    } else if (memberType === "none" && amount > 200) {
        discount = 0.05; // 5%
    }
    
    return discount * 100 + "%";
}`
        challenge2Result.innerHTML = `
            <p>Solution:</p>
            <p>1. Replace assignment operators (=) with strict equality operators (===)</p>
            <p>2. Use else-if statements to make conditions mutually exclusive</p>
        `
    })

    // Helper function to get expected discount
    function getExpectedDiscount(amount, memberType) {
        if (memberType === "premium") return "20%"
        if (memberType === "regular" && amount > 100) return "10%"
        if (memberType === "none" && amount > 200) return "5%"
        return "0%"
    }

    // Challenge 3 functionality
    const challenge3Code = document.getElementById("challenge-3-code")
    const challenge3Username = document.getElementById("challenge-3-username")
    const challenge3Password = document.getElementById("challenge-3-password")
    const challenge3Remember = document.getElementById("challenge-3-remember")
    const challenge3Test = document.getElementById("challenge-3-test")
    const challenge3Hint = document.getElementById("challenge-3-hint")
    const challenge3Solution = document.getElementById("challenge-3-solution")
    const challenge3Result = document.getElementById("challenge-3-result")

    challenge3Test.addEventListener("click", () => {
        try {
            const username = challenge3Username.value
            const password = challenge3Password.value
            const rememberMe = challenge3Remember.checked
            const code = challenge3Code.value

            // Create a function from the code
            const validateLogin = new Function(
                "username",
                "password",
                "rememberMe",
                code + "\nreturn validateLogin(username, password, rememberMe);",
            )

            // Execute the function
            const result = validateLogin(username, password, rememberMe)

            // Display the result
            challenge3Result.innerHTML = `
                <p>Username: ${username}</p>
                <p>Password: ${password.replace(/./g, "*")}</p>
                <p>Remember Me: ${rememberMe}</p>
                <p>Result Message: <strong>${result.message}</strong></p>
                <p>Session Duration: <strong>${result.sessionDuration} hours</strong></p>
            `

            // Check if result is correct
            const expected = getExpectedLoginResult(username, password, rememberMe)
            if (result.message === expected.message && result.sessionDuration === expected.sessionDuration) {
                challenge3Result.innerHTML += '<p class="correct">Your solution is correct! ✓</p>'
            } else {
                challenge3Result.innerHTML += '<p class="incorrect">Your solution is incorrect. Try again! ✗</p>'
            }
        } catch (error) {
            challenge3Result.innerHTML = `<p class="error">Error: ${error.message}</p>`
        }
    })

    challenge3Hint.addEventListener("click", () => {
        challenge3Result.innerHTML = `
            <p>Hint: There are three logical errors in this code:</p>
            <p>1. The login condition uses OR (||) when it should use AND (&&)</p>
            <p>2. The rememberMe check uses assignment (=) instead of comparison (===)</p>
            <p>3. The username check should verify that it's NOT empty (use username.trim() !== "")</p>
        `
    })

    challenge3Solution.addEventListener("click", () => {
        challenge3Code.value = `function validateLogin(username, password, rememberMe) {
    let message = "";
    let sessionDuration = 1; // hours
    
    // Check username and password
    if (username.trim() !== "" && password.length >= 8) {
        message = "Login successful";
        
        // Set session duration
        if (rememberMe === true) {
            sessionDuration = 24 * 7; // 1 week
        }
    } else {
        message = "Login failed";
    }
    
    return {
        message: message,
        sessionDuration: sessionDuration
    };
}`
        challenge3Result.innerHTML = `
            <p>Solution:</p>
            <p>1. Change OR (||) to AND (&&) in the login condition</p>
            <p>2. Check that username is not empty with username.trim() !== ""</p>
            <p>3. Use === instead of = in the rememberMe condition</p>
        `
    })

    // Helper function to get expected login result
    function getExpectedLoginResult(username, password, rememberMe) {
        let message = ""
        let sessionDuration = 1

        if (username.trim() !== "" && password.length >= 8) {
            message = "Login successful"
            if (rememberMe === true) {
                sessionDuration = 24 * 7
            }
        } else {
            message = "Login failed"
        }

        return { message, sessionDuration }
    }

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What is a logical error in a selection structure?",
            options: [
                "An error that prevents the code from compiling",
                "An error that causes the program to crash during execution",
                "An error where the code runs but produces incorrect results due to flawed logic",
                "An error in the syntax of the if-else statement",
            ],
            correctAnswer: 2,
            explanation:
                "Logical errors occur when your code syntax is correct (so it runs without crashing), but the logic is flawed, causing incorrect results.",
        },
        {
            question: 'What\'s wrong with this code?\n\nif (score = 100) {\n    console.log("Perfect score!");\n}',
            options: [
                "Missing semicolon after the if condition",
                "Using assignment (=) instead of comparison (==)",
                "The console.log statement is incorrect",
                "Nothing is wrong with this code",
            ],
            correctAnswer: 1,
            explanation:
                "The code uses an assignment operator (=) instead of a comparison operator (==). This assigns 100 to score and the condition always evaluates to true.",
        },
        {
            question: "Which of these has a logical error?",
            options: [
                "if (age >= 18) { isAdult = true; } else { isAdult = false; }",
                'if (score > 60) { result = "Pass"; } else { result = "Fail"; }',
                'if (temp < 0) { state = "Solid"; } else if (temp > 100) { state = "Gas"; } else { state = "Liquid"; }',
                'if (num > 0) { sign = "Positive"; } else if (num < 0) { sign = "Negative"; }',
            ],
            correctAnswer: 3,
            explanation:
                "The last option has a logical error because it doesn't handle the case when num equals 0. The sign variable will remain undefined in that case.",
        },
        {
            question:
                'What\'s the logical error in this compound condition?\n\nif (age < 13 || age > 19) {\n    console.log("Not a teenager");\n} else {\n    console.log("Teenager");\n}',
            options: [
                "The condition should use AND (&&) instead of OR (||)",
                "The condition has the wrong boundary values",
                "The else clause is unnecessary",
                "There is no logical error in this code",
            ],
            correctAnswer: 3,
            explanation:
                "This code is actually correct. It checks if age is less than 13 OR greater than 19, which correctly identifies non-teenagers. The else clause then correctly identifies teenagers.",
        },
        {
            question:
                'What\'s wrong with this nested if statement?\n\nif (isLoggedIn)\n    if (isAdmin)\n        console.log("Admin access granted");\nelse\n    console.log("Please log in");',
            options: [
                "Missing semicolons after console.log statements",
                "The else clause belongs to the inner if due to missing braces",
                "isLoggedIn and isAdmin variables are not defined",
                "Nothing is wrong with this code",
            ],
            correctAnswer: 1,
            explanation:
                'Without braces, the else clause belongs to the nearest if statement (isAdmin). This means the "Please log in" message will only show if isLoggedIn is true and isAdmin is false, which is not the intended behavior.',
        },
    ]

    let currentQuizQuestion = 0
    let quizScore = 0
    let quizAnswered = false

    const quizContent = document.getElementById("quiz-content")
    const quizProgress = document.getElementById("quiz-progress")
    const progressFill = document.querySelector(".progress-fill")
    const progressText = document.querySelector(".progress-text")
    const quizSubmit = document.getElementById("quiz-submit")
    const quizNext = document.getElementById("quiz-next")
    const quizFeedback = document.getElementById("quiz-feedback")
    const quizResults = document.getElementById("quiz-results")
    const quizScoreDisplay = document.getElementById("quiz-score")
    const quizRestart = document.getElementById("quiz-restart")

    // Display the first question
    displayQuizQuestion(currentQuizQuestion)

    // Submit answer button
    quizSubmit.addEventListener("click", () => {
        if (quizAnswered) return

        const selectedOption = document.querySelector(".quiz-option.selected")
        if (!selectedOption) {
            quizFeedback.innerHTML = "<p>Please select an answer.</p>"
            quizFeedback.className = "quiz-feedback"
            return
        }

        const selectedIndex = Number.parseInt(selectedOption.getAttribute("data-index"))
        const correctIndex = quizQuestions[currentQuizQuestion].correctAnswer

        if (selectedIndex === correctIndex) {
            quizScore++
            quizFeedback.innerHTML = `<p>Correct! ${quizQuestions[currentQuizQuestion].explanation}</p>`
            quizFeedback.className = "quiz-feedback correct"
        } else {
            quizFeedback.innerHTML = `<p>Incorrect. The correct answer is: ${quizQuestions[currentQuizQuestion].options[correctIndex]}. ${quizQuestions[currentQuizQuestion].explanation}</p>`
            quizFeedback.className = "quiz-feedback incorrect"
        }

        quizAnswered = true
        quizSubmit.disabled = true
        quizNext.disabled = false
    })

    // Next question button
    quizNext.addEventListener("click", () => {
        currentQuizQuestion++
        quizAnswered = false
        quizSubmit.disabled = false
        quizNext.disabled = true
        quizFeedback.innerHTML = ""
        quizFeedback.className = "quiz-feedback"

        if (currentQuizQuestion < quizQuestions.length) {
            displayQuizQuestion(currentQuizQuestion)
        } else {
            // Quiz completed
            quizContent.style.display = "none"
            quizSubmit.style.display = "none"
            quizNext.style.display = "none"
            quizResults.classList.remove("hidden")
            quizScoreDisplay.textContent = quizScore
            progressFill.style.width = "100%"
            progressText.textContent = `Completed!`
        }
    })

    // Restart quiz button
    quizRestart.addEventListener("click", () => {
        currentQuizQuestion = 0
        quizScore = 0
        quizAnswered = false
        quizSubmit.disabled = false
        quizNext.disabled = true
        quizFeedback.innerHTML = ""
        quizFeedback.className = "quiz-feedback"
        quizContent.style.display = "block"
        quizSubmit.style.display = "block"
        quizNext.style.display = "block"
        quizResults.classList.add("hidden")
        displayQuizQuestion(currentQuizQuestion)
    })

    // Function to display a quiz question
    function displayQuizQuestion(index) {
        const question = quizQuestions[index]

        let optionsHTML = ""
        question.options.forEach((option, i) => {
            optionsHTML += `
                <div class="quiz-option" data-index="${i}">
                    <input type="radio" name="quiz-option" id="option-${i}">
                    <label for="option-${i}">${option}</label>
                </div>
            `
        })

        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>Question ${index + 1}</h3>
                <p>${question.question}</p>
                ${question.question.includes("\n") ? `<pre>${question.question.split("\n").slice(1).join("\n")}</pre>` : ""}
            </div>
            <div class="quiz-options">
                ${optionsHTML}
            </div>
        `

        // Update progress
        progressFill.style.width = `${((index + 1) / quizQuestions.length) * 100}%`
        progressText.textContent = `Question ${index + 1} of ${quizQuestions.length}`

        // Add click event to options
        const options = document.querySelectorAll(".quiz-option")
        options.forEach((option) => {
            option.addEventListener("click", () => {
                options.forEach((opt) => opt.classList.remove("selected"))
                option.classList.add("selected")
                option.querySelector("input").checked = true
            })
        })
    }

    // Initialize the playground with default values
    evaluateBtn.click()
})

document.addEventListener("DOMContentLoaded", () => {
    // Interactive code editor functionality
    const codeEditor = document.getElementById("code-editor")
    const yearInput = document.getElementById("year-input")
    const testBtn = document.getElementById("test-btn")
    const testResult = document.getElementById("test-result")
    const hintBtn = document.getElementById("hint-btn")
    const hintText = document.getElementById("hint-text")
    const solutionBtn = document.getElementById("solution-btn")
    const solutionText = document.getElementById("solution-text")

    // Correct leap year function for comparison
    function correctLeapYear(year) {
        if (year % 400 === 0) return true
        if (year % 100 === 0) return false
        return year % 4 === 0
    }

    // Test button click handler
    testBtn.addEventListener("click", () => {
        const year = Number.parseInt(yearInput.value)

        try {
            // Create a function from the user's code
            const userCode = codeEditor.value
            const userFunction = new Function("year", userCode + "\nreturn isLeapYear(year);")

            // Test the function
            const userResult = userFunction(year)
            const correctResult = correctLeapYear(year)

            // Display the result
            testResult.innerHTML = `
                <p>Testing with year: ${year}</p>
                <p>Your function returned: <strong>${userResult}</strong></p>
                <p>Expected result: <strong>${correctResult}</strong></p>
            `

            if (userResult === correctResult) {
                testResult.innerHTML += '<p style="color: #2ecc71;">✓ Your function works correctly for this input!</p>'
            } else {
                testResult.innerHTML += '<p style="color: #e74c3c;">✗ Your function returned the wrong result.</p>'
            }

            // Additional tests for common years
            const testYears = [1900, 2000, 2020, 2023]
            let allCorrect = true

            testResult.innerHTML += "<p>Additional tests:</p>"
            testResult.innerHTML += "<ul>"

            for (const testYear of testYears) {
                const testUserResult = userFunction(testYear)
                const testCorrectResult = correctLeapYear(testYear)

                if (testUserResult === testCorrectResult) {
                    testResult.innerHTML += `<li>${testYear}: ✓ Correct (${testUserResult})</li>`
                } else {
                    testResult.innerHTML += `<li>${testYear}: ✗ Wrong (got ${testUserResult}, expected ${testCorrectResult})</li>`
                    allCorrect = false
                }
            }

            testResult.innerHTML += "</ul>"

            if (allCorrect) {
                testResult.innerHTML +=
                    '<p style="color: #2ecc71; font-weight: bold;">Great job! Your function works for all test cases!</p>'
            }
        } catch (error) {
            testResult.innerHTML = `<p style="color: #e74c3c;">Error: ${error.message}</p>`
        }
    })

    // Hint button click handler
    hintBtn.addEventListener("click", () => {
        if (hintText.classList.contains("hidden")) {
            hintText.classList.remove("hidden")
            hintBtn.textContent = "Hide hint"
        } else {
            hintText.classList.add("hidden")
            hintBtn.textContent = "Need a hint?"
        }
    })

    // Solution button click handler
    solutionBtn.addEventListener("click", () => {
        if (solutionText.classList.contains("hidden")) {
            solutionText.classList.remove("hidden")
            solutionBtn.textContent = "Hide solution"
        } else {
            solutionText.classList.add("hidden")
            solutionBtn.textContent = "Show solution"
        }
    })

    // Quiz functionality
    const quizQuestions = [
        {
            question: "What's wrong with this code?",
            code: 'if (temperature = 100) {\n    console.log("Water is boiling");\n}',
            options: ["Missing semicolon", "Using = instead of ==", "Nothing is wrong"],
            correctAnswer: 1,
            explanation:
                "The code uses the assignment operator (=) instead of the comparison operator (==). This assigns 100 to temperature and the condition always evaluates to true.",
        },
        {
            question: "What will this code output if score is 85?",
            code: 'if (score >= 90) {\n    console.log("A");\n}\nif (score >= 80) {\n    console.log("B");\n}\nif (score >= 70) {\n    console.log("C");\n}',
            options: ["A", "B", "C", "B and C", "A, B, and C"],
            correctAnswer: 3,
            explanation:
                "Since score is 85, it's not >= 90, so the first if is false. But it is >= 80 and >= 70, so both the second and third if statements are true, outputting both B and C.",
        },
        {
            question: "What's the logical error in this code?",
            code: 'if (age < 13)\n    console.log("Child");\n    console.log("Not a teenager");',
            options: [
                "Missing semicolons",
                "Missing braces { } causing incorrect indentation",
                "The variable age is not defined",
            ],
            correctAnswer: 1,
            explanation:
                "Without braces { }, only the first console.log is part of the if statement. The second console.log will always execute regardless of the age value.",
        },
    ]

    let currentQuestionIndex = 0
    const quiz = document.getElementById("quiz")
    const checkAnswerBtn = document.getElementById("check-answer")
    const quizFeedback = document.getElementById("quiz-feedback")
    const nextQuestionBtn = document.getElementById("next-question")

    // Check answer button click handler
    checkAnswerBtn.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="q1"]:checked')

        if (!selectedOption) {
            quizFeedback.textContent = "Please select an answer."
            quizFeedback.className = ""
            quizFeedback.classList.remove("hidden")
            return
        }

        const answer = selectedOption.value
        const correctAnswer = String.fromCharCode(97 + quizQuestions[currentQuestionIndex].correctAnswer)

        quizFeedback.classList.remove("hidden")

        if (answer === correctAnswer) {
            quizFeedback.textContent = "Correct! " + quizQuestions[currentQuestionIndex].explanation
            quizFeedback.className = "feedback-correct"
        } else {
            quizFeedback.textContent = "Incorrect. " + quizQuestions[currentQuestionIndex].explanation
            quizFeedback.className = "feedback-incorrect"
        }

        nextQuestionBtn.classList.remove("hidden")
        checkAnswerBtn.disabled = true
    })

    // Next question button click handler
    nextQuestionBtn.addEventListener("click", () => {
        currentQuestionIndex++

        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion(currentQuestionIndex)
            quizFeedback.classList.add("hidden")
            nextQuestionBtn.classList.add("hidden")
            checkAnswerBtn.disabled = false
        } else {
            // Quiz completed
            quiz.innerHTML = `
                <h3>Quiz Completed!</h3>
                <p>You've completed the quiz on logical errors in selection structures.</p>
                <button id="restart-quiz">Restart Quiz</button>
            `

            document.getElementById("restart-quiz").addEventListener("click", () => {
                currentQuestionIndex = 0
                displayQuestion(currentQuestionIndex)
                quizFeedback.classList.add("hidden")
                nextQuestionBtn.classList.add("hidden")
            })
        }
    })

    // Function to display a question
    function displayQuestion(index) {
        const question = quizQuestions[index]

        const questionHTML = `
            <div class="quiz-question">
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <pre>${question.code}</pre>
                <div class="quiz-options">
                    ${question.options
            .map(
                (option, i) => `
                        <label><input type="radio" name="q1" value="${String.fromCharCode(97 + i)}"> ${option}</label>
                    `,
            )
            .join("")}
                </div>
            </div>
            <button id="check-answer">Check Answer</button>
            <div id="quiz-feedback" class="hidden"></div>
            <button id="next-question" class="hidden">Next Question</button>
        `

        quiz.innerHTML = questionHTML

        // Re-attach event listeners
        document.getElementById("check-answer").addEventListener("click", () => {
            const selectedOption = document.querySelector('input[name="q1"]:checked')

            if (!selectedOption) {
                document.getElementById("quiz-feedback").textContent = "Please select an answer."
                document.getElementById("quiz-feedback").className = ""
                document.getElementById("quiz-feedback").classList.remove("hidden")
                return
            }

            const answer = selectedOption.value
            const correctAnswer = String.fromCharCode(97 + quizQuestions[currentQuestionIndex].correctAnswer)

            document.getElementById("quiz-feedback").classList.remove("hidden")

            if (answer === correctAnswer) {
                document.getElementById("quiz-feedback").textContent =
                    "Correct! " + quizQuestions[currentQuestionIndex].explanation
                document.getElementById("quiz-feedback").className = "feedback-correct"
            } else {
                document.getElementById("quiz-feedback").textContent =
                    "Incorrect. " + quizQuestions[currentQuestionIndex].explanation
                document.getElementById("quiz-feedback").className = "feedback-incorrect"
            }

            document.getElementById("next-question").classList.remove("hidden")
            document.getElementById("check-answer").disabled = true
        })

        document.getElementById("next-question").addEventListener("click", () => {
            currentQuestionIndex++

            if (currentQuestionIndex < quizQuestions.length) {
                displayQuestion(currentQuestionIndex)
                document.getElementById("quiz-feedback").classList.add("hidden")
                document.getElementById("next-question").classList.add("hidden")
            } else {
                // Quiz completed
                quiz.innerHTML = `
                    <h3>Quiz Completed!</h3>
                    <p>You've completed the quiz on logical errors in selection structures.</p>
                    <button id="restart-quiz">Restart Quiz</button>
                `

                document.getElementById("restart-quiz").addEventListener("click", () => {
                    currentQuestionIndex = 0
                    displayQuestion(currentQuestionIndex)
                })
            }
        })
    }

    // Initialize the quiz with the first question
    displayQuestion(0)

    // Run the code test with initial values
    testBtn.click()
})
