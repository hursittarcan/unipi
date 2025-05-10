function runLogic(n) {
  const val = document.getElementById("input" + n).value;
  const box = document.getElementById("color" + n);
  let color = "none";

  switch(n) {
    case 1:
      const x = parseInt(val);
      if (x > 60) color = "green";
      if (x > 30) color = "blue";
      else color = "red";
      break;
    case 2:
      const age = parseInt(val);
      if (age < 18) color = "yellow";
      else if (age < 12) color = "orange";
      else color = "purple";
      break;
    case 3:
      let status = val;
      if (status = "on") color = "green";
      else color = "red";
      break;
    case 4:
      const grade = parseInt(val);
      if (grade >= 90) color = "gold";
      if (grade >= 80) color = "silver";
      else color = "bronze";
      break;
    case 5:
      const v = parseInt(val);
      if (v > 0) color = "lime";
      else if (v === 0) color = "cyan";
      else color = "gray";
      break;
    case 6:
      const num = parseInt(val);
      if (num = 10) color = "blue";
      else color = "black";
      break;
  }

  box.textContent = color.toUpperCase();
  box.style.background = color;
}
