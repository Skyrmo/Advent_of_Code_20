const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

function createData(file) {
  let data = {}
  for (let [index, line] of file.entries()) {
    data[index] = {
      ins: line.split(' ')[0],
      amo: parseInt(line.split(' ')[1]),
      vis: false
    }
    data['repeated'] = false
  }
  return data
}

function runProgram(data, position = 0, acc = 0) {
  while ((position < Object.keys(data).length)) {
    let step = data[position]

    if (step === undefined) {
      return acc
    }

    if (step.vis === true) {
      return acc
    }

    if (step.ins === 'acc') {
      acc += step.amo
    }

    if (step.ins === "jmp") {
      position += step.amo - 1
    }

    step.vis = true;
    position++

  }
  return acc
}

function tryVariations(data) {
  for (let key in data) {
    dataCopy = JSON.parse(JSON.stringify(data))

    if (dataCopy[key].ins === 'jmp') {
      dataCopy[key].ins = 'nop'
    } else if (dataCopy[key].ins === 'nop') {
      dataCopy[key].ins = 'jmp'
    }
    runProgram(dataCopy)
  }
}

const data = createData(file)
tryVariations(data)
