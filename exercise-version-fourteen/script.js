function run(n) {
    const val = document.getElementById("input" + n).value;
    const res = document.getElementById("result" + n);
    const prefix = "light" + n + "_";

    // Reset lights
    ["GREEN", "YELLOW", "RED"].forEach(color => {
        const light = document.getElementById(prefix + color);
        if (light) light.className = "light";
    });

    let result = "Invalid input";
    let light = "NONE";

    switch (n) {
        case 1:
            const x = parseInt(val);
            if (x > 50) light = "GREEN";
            if (x > 30) light = "YELLOW";
            else light = "RED";
            break;

        case 2:
            const age = parseInt(val);
            if (age < 18) light = "GREEN";
            else if (age < 13) light = "YELLOW";
            else light = "RED";
            break;

        case 3:
            let status = val;
            if (status = "active") light = "GREEN"; // bug: assignment not comparison
            else light = "RED";
            break;

        case 4:
            const grade = parseInt(val);
            if (grade >= 90) light = "GREEN";
            if (grade >= 80) light = "YELLOW";
            else light = "RED";
            break;

        case 5:
            const v = parseInt(val);
            if (v > 0) light = "GREEN";
            else if (v === 0) light = "YELLOW";
            else light = "RED";
            break;

        case 6:
            const num = parseInt(val);
            if (num = 5) light = "GREEN"; // assignment instead of comparison
            else light = "RED";
            break;
    }

    // Apply light
    const target = document.getElementById(prefix + light);
    if (target) {
        if (light === "GREEN") target.classList.add("active-green");
        if (light === "YELLOW") target.classList.add("active-yellow");
        if (light === "RED") target.classList.add("active-red");
    }

    res.textContent = `Logic Output: ${light}`;
}
