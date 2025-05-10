function run(n) {
  let result = '';
  switch(n) {
    case 1:
      const x = parseInt(document.getElementById('val1').value);
      if (isNaN(x)) {
        result = '[ error: invalid input ]';
      } else {
        if (x < 20) result = '→ Under 20';
        else if (x < 10) result = '→ Under 10';
        else result = '→ 20 or more';
      }
      document.getElementById('out1').textContent = result;
      break;

    case 2:
      let mode = document.getElementById('val2').value;
      if (mode = 'debug') {
        result = '→ Debug Mode ON (but this is always true)';
      } else {
        result = '→ Normal Mode';
      }
      document.getElementById('out2').textContent = result;
      break;

    case 3:
      const score = parseInt(document.getElementById('val3').value);
      if (isNaN(score)) {
        result = '[ error: enter a score ]';
      } else {
        if (score >= 90) result = '→ Grade A';
        if (score >= 80) result = '→ Grade B (overwrites A!)';
        else result = '→ Grade C';
      }
      document.getElementById('out3').textContent = result;
      break;
  }
}
