function evaluateProblem1() {
    const num = parseInt(document.getElementById("p1_input").value);
    let result = "";

    if (num < 20) {
        result = "Under 20";
    } else if (num < 10) {
        result = "Under 10"; // This will never be reached!
    } else {
        result = "20 or more";
    }

    document.getElementById("p1_result").textContent = `Result: ${result}`;
}

function evaluateProblem2() {
    let mode = document.getElementById("p2_input").value;

    if (mode = "test") {
        result = "Test Mode Enabled"; // Always true — logic error
    } else {
        result = "Normal Mode";
    }

    document.getElementById("p2_result").textContent = `Result: ${result}`;
}

function evaluateProblem3() {
    const grade = parseInt(document.getElementById("p3_input").value);
    let result = "";

    if (grade >= 90) {
        result = "A";
    }
    if (grade >= 80) {
        result = "B"; // Overrides A!
    } else {
        result = "C";
    }

    document.getElementById("p3_result").textContent = `Result: ${result}`;
}
