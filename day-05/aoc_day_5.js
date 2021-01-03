const fs = require('fs');
let file = fs.readFileSync('input', 'utf8').split('\n');
let seatIDs = []

function findSeatID(input) {

  const rowData = input.split('').filter(char => {
    if (char !== "L" && char !== "R") {
      return char
    }
  })

  const seatData = input.split('').filter(char => {
    if (char !== "F" && char !== "B") {
      return char
    }
  })

  function createArray(array_length) {
    const array = []
    for (let i = 0; i < array_length; i++) {
      array.push(i)
    }
    return array
  }

  function rowFinder(rowData, rows) {
    rowData.forEach(move => {
      let midpoint = rows.length / 2
      let rowsSplit = [rows.slice(0, midpoint), rows.slice(midpoint)]
      rows = move === "F" ? rowsSplit[0] : rowsSplit[1]
    })
    return rows[0]
  }

  function seatFinder(seatData, seats) {
    seatData.forEach(move => {
      let midpoint = seats.length / 2
      let seatsSplit = [seats.slice(0, midpoint), seats.slice(midpoint)]
      seats = move === "L" ? seatsSplit[0] : seatsSplit[1]
    })
    return seats[0]
  }

  row = rowFinder(rowData, createArray(128))
  seat = seatFinder(seatData, createArray(8))
  seatID = row * 8 + seat

  return seatID
}

file.forEach(ticket => {
  const seatID = findSeatID(ticket)
  seatIDs.push(seatID)
})

seatIDs = seatIDs.sort((a, b) => a - b)

seatIDs.forEach((seat, i) => {
  if (seat !== seatIDs[i - 1] + 1) {
    console.log(seat - 1)
  }
})

