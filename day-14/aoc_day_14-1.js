const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

mask = 0
memory = {}

for (line of file) {
  if (line[1] === 'a') {
    mask = line.split('=')[1].trim()
  } else {
    let mem = line.split('=')[0].trim()
    let num = Number(line.split('=')[1].trim())
    let base2 = process10to2(num)
    let masked = applyMask(base2, mask)
    memory[mem] = parseInt(masked, 2)
  }
}

function process10to2(int) {
  let base2 = int.toString(2)
  return String(base2).padStart(36, '0')
}

function applyMask(base2, mask) {
  let answer = ''
  for (i in mask) {
    if (mask[i] === 'X') {
      answer += base2[i]
    } else {
      answer += mask[i]
    }
  }
  return answer
}

answer = 0
for (let value in memory) {
  answer += memory[value]
}

console.log(answer)