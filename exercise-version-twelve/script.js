function showOutput(id, message, percent, color) {
    document.getElementById(id).textContent = message;
    const bar = document.getElementById("bar" + id.charAt(id.length - 1));
    bar.style.width = percent + "%";
    bar.style.background = color;
}

function runCase1() {
    const age = parseInt(document.getElementById("age1").value);
    if (isNaN(age)) return showOutput("out1", "Please enter a valid age.", 0, "gray");

    // Bug: Child includes all under 18, even <13, so 'Kid' is never shown
    if (age < 18)
        showOutput("out1", "Output: Child", 60, "#f39c12");
    else if (age < 13)
        showOutput("out1", "Output: Kid", 30, "#3498db");
    else
        showOutput("out1", "Output: Adult", 90, "#2ecc71");
}

function runCase2() {
    let status = document.getElementById("status").value;
    // Logical bug: '=' assigns instead of comparing
    if (status = "active") {
        showOutput("out2", "Output: Running (wrong logic!)", 100, "#e74c3c");
    } else {
        showOutput("out2", "Output: Stopped", 20, "#95a5a6");
    }
}

function runCase3() {
    const value = parseInt(document.getElementById("val3").value);
    if (isNaN(value)) return showOutput("out3", "Enter a number.", 0, "gray");

    if (value > 0)
        showOutput("out3", "Output: Positive", 80, "#2ecc71");
    else if (value < 0)
        showOutput("out3", "Output: Negative", 60, "#e67e22");
    else if (value === 0)
        showOutput("out3", "Output: Zero (UNREACHED)", 30, "#f1c40f");
}
