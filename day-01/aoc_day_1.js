const fs = require('fs');
let file = fs.readFileSync('input.txt', 'utf8');
file = file.split('\n');

for (let i of file) {
  for (let j of file) {
    for (let k of file) {
      if (parseInt(i) + parseInt(j) + parseInt(k) === 2020) {
        console.log(parseInt(i) * parseInt(j) * parseInt(k))
        // return parseInt(i) * parseInt(j)
      }
    }
  }
}

console.log(file)
