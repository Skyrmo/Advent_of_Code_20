const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

function makeSeats(file) {
  let seats = []
  for (let line of file) {
    seats.push(line.split(''))
  }
  return seats
}



function processEmpty(r, c, array) {
  let adj = checkAdj(r, c, array)
  return adj.filter(x => x === '#').length === 0 ? "#" : "L"
}

function processTaken(r, c, array) {
  let adj = checkAdj(r, c, array)
  return adj.filter(x => x === '#').length >= 5 ? "L" : "#"
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
  function getHorizontal(r, c, array) {
    let row = array[r]
    let left = row.slice(0, c).reverse()
    let right = row.slice(c + 1)
    return { left, right }
  }

  function getVertical(r, c, array) {
    let column = []
    for (let row of array) {
      column.push(row[c])
    }
    let top = column.slice(0, r).reverse()
    let bottom = column.slice(r + 1)
    return { top, bottom }
  }

  function getTopL(r, c, array) {
    r--
    c--
    topL = []
    while (r >= 0 && c >= 0) {
      topL.push(array[r][c])
      r--
      c--
    }
    return { topL }
  }

  function getTopR(r, c, array) {
    r--
    c++
    topR = []
    while (r >= 0 && c < 92) {
      topR.push(array[r][c])
      r--
      c++
    }
    return { topR }
  }

  function getBotR(r, c, array) {
    r++
    c++
    botR = []
    while (r < 90 && c < 92) {
      botR.push(array[r][c])
      r++
      c++
    }
    return { botR }
  }

  function getBotL(r, c, array) {
    r++
    c--
    botL = []
    while (r < 90 && c >= 0) {
      botL.push(array[r][c])
      r++
      c--
    }
    return { botL }
  }

  arrObj = {
    ...getHorizontal(r, c, array),
    ...getVertical(r, c, array),
    ...getTopL(r, c, array),
    ...getTopR(r, c, array),
    ...getBotR(r, c, array),
    ...getBotL(r, c, array)
  }

  answerObj = {}

  for (let [name, arr] of Object.entries(arrObj)) {
    if (arrObj[name][0] === 'L' || arrObj[name][0] === '#') {
      answerObj[name] = arrObj[name][0]
    } else {
      let i = 0
      while (arr[i] === '.') {
        i++
      }
      answerObj[name] = arrObj[name][i]
    }
  }

  return Object.values(answerObj).filter(x => x !== undefined)
}

const answer = solve(makeSeats(file))

let count = 0

for (let row of answer) {
  for (let col of row) {
    if (col === '#') {
      count++
    }
  }
}

console.log(count)

