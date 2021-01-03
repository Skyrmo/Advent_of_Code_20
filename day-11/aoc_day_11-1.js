const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

let seats = []

for (let line of file) {
  seats.push(line.split(''))
}

function processEmpty(r, c, array) {
  let adj = checkAdj(r, c, array)
  return adj.filter(x => x === '#').length === 0 ? "#" : "L"
}

function processTaken(r, c, array) {
  let adj = checkAdj(r, c, array)
  return adj.filter(x => x === '#').length >= 4 ? "L" : "#"
}

function solve(seats) {
  let nextIteration = JSON.parse(JSON.stringify(seats))
  for (let r = 0; r < seats.length; r++) {
    for (let c = 0; c < seats[r].length; c++) {
      if (seats[r][c] === "L") {
        nextIteration[r][c] = processEmpty(r, c, seats)
      } else if (seats[r][c] === "#") {
        nextIteration[r][c] = processTaken(r, c, seats)
      }
    }
  }

  if (JSON.stringify(seats) !== JSON.stringify(nextIteration)) {
    return solve(nextIteration)
  } else {
    return nextIteration
  }
}


function checkAdj(r, c, array) {
  let rowY = array.length
  let rowX = array[r].length
  let adjSeats = []

  for (let j = -1; j < 2; j++) {
    for (let k = -1; k < 2; k++) {
      if (r + j >= 0 && c + k >= 0 &&
        r + j < rowY && c + k < rowX) {
        if (j === 0 && k === 0) {
          continue
        } else {
          adjSeats.push(array[r + j][c + k])
        }
      }
    }
  }
  return adjSeats
}

const answer = solve(seats)
let count = 0

for (let row of answer) {
  for (let col of row) {
    if (col === '#') {
      count++
    }
  }
}
console.log(count)


