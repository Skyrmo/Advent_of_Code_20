const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

instructions = []
state = {
  N: 0,
  E: 0,
  S: 0,
  W: 0,
  facing: 'E'
}
rotations = []

for (let [i, line] of Object.entries(file)) {
  instructions[i] = {
    action: line.slice(0, 1),
    amount: parseInt(line.slice(1))
  }
}

function processDirection(dir) {
  if (dir.action === 'N') {
    // console.log("It was a N")
    state['N'] += dir.amount
  } else if (dir.action === 'E') {
    // console.log("It was a E")
    state['E'] += dir.amount
  } else if (dir.action === 'S') {
    // console.log("It was a S")
    state['S'] += dir.amount
  } else if (dir.action === 'W') {
    // console.log("It was a W")
    state['W'] += dir.amount
  }
}

function processRotation(rot) {
  let turns = rot.amount / 90

  if (rot.action == 'R') {
    let directions = ['N', 'E', 'S', 'W']
    let starting = directions.indexOf(state.facing)
    let ending = (turns + starting) % directions.length
    state.facing = directions[ending]
  } else {
    let directions = ['N', 'E', 'S', 'W'].reverse()
    let starting = directions.indexOf(state.facing)
    let ending = (turns + starting) % directions.length
    state.facing = directions[ending]
  }
}

function processForward(inst) {
  state[state.facing] += inst.amount
}

instructions.forEach(inst => {
  if ('NESW'.includes(inst.action)) {
    processDirection(inst)
  }

  if ('LR'.includes(inst.action)) {
    processRotation(inst)
  }

  if ('F'.includes(inst.action)) {
    processForward(inst)
  }
  console.log(inst, state)
})

// processRotation({ action: 'L', amount: 90 })
// console.log(state)


console.log(Math.abs(state.N - state.S) + Math.abs(state.E - state.W))