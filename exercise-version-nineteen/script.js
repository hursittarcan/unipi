function runExercise(n) {
  let val = document.getElementById('input' + n).value;
  let output = document.getElementById('output' + n);
  if (!val) { output.textContent = 'Please enter a value.'; return; }
  let result = '';
  switch(n) {
    case 1:
      if (val === "logic") result = "Perfect match!";
      else if (val.length > 5) result = "Long input detected.";
      else if (!isNaN(val)) result = "Numeric input!";
      else result = "Try something else.";
      break;
    case 2:
      if (val === "logic") result = "Perfect match!";
      else if (val.length > 5) result = "Long input detected.";
      else if (!isNaN(val)) result = "Numeric input!";
      else result = "Try something else.";
      break;
    case 3:
      if (val === "logic") result = "Perfect match!";
      else if (val.length > 5) result = "Long input detected.";
      else if (!isNaN(val)) result = "Numeric input!";
      else result = "Try something else.";
      break;
    case 4:
      if (val === "logic") result = "Perfect match!";
      else if (val.length > 5) result = "Long input detected.";
      else if (!isNaN(val)) result = "Numeric input!";
      else result = "Try something else.";
      break;
    case 5:
      if (val === "logic") result = "Perfect match!";
      else if (val.length > 5) result = "Long input detected.";
      else if (!isNaN(val)) result = "Numeric input!";
      else result = "Try something else.";
      break;
    default: result = 'Unknown exercise.';
  }
  output.textContent = `Result: ${result}`;
}