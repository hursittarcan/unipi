function runLogic(n) {
  let message = "";
  switch(n) {
    case 1:
      const score = parseInt(document.getElementById("scoreInput").value);
      if (isNaN(score)) message = "Enter a number.";
      else {
        if (score > 90) message = "Grade: A";
        if (score > 80) message = "Grade: B";
        else message = "Grade: C";
      }
      document.getElementById("feedback1").textContent = message;
      break;

    case 2:
      let role = document.getElementById("roleInput").value;
      if (role = "admin") {
        message = "Access granted (but this is always true!)";
      } else {
        message = "Access denied";
      }
      document.getElementById("feedback2").textContent = message;
      break;

    case 3:
      const age = parseInt(document.getElementById("ageInput").value);
      if (isNaN(age)) message = "Please enter an age.";
      else if (age < 18) message = "Group: Teen";
      else if (age < 13) message = "Group: Child";
      else message = "Group: Adult";
      document.getElementById("feedback3").textContent = message;
      break;

    case 4:
      const temp = parseInt(document.getElementById("tempInput").value);
      if (isNaN(temp)) message = "Enter a valid number.";
      else {
        if (temp > 35) message = "Hot";
        if (temp > 20) message = "Warm";
        else message = "Cool";
      }
      document.getElementById("feedback4").textContent = message;
      break;

    case 5:
      const loggedIn = document.getElementById("loginInput").value;
      if (loggedIn === "yes") message = "Welcome";
      if (loggedIn === "no") message = "Goodbye";
      else message = "Unknown";
      document.getElementById("feedback5").textContent = message;
      break;
  }
}
