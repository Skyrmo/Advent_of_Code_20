const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n');

state = {
  position: { x: 0, y: 0 },
  waypoint: { x: 10, y: 1 },
}

instructions = []

for (let [i, line] of Object.entries(file)) {
  instructions[i] = {
    action: line.slice(0, 1),
    amount: parseInt(line.slice(1))
  }
}

function processDirection(dir) {
  if (dir.action === 'N') {
    state.waypoint.y += dir.amount
  } else if (dir.action === 'E') {
    state.waypoint.x += dir.amount
  } else if (dir.action === 'S') {
    state.waypoint.y -= dir.amount
  } else if (dir.action === 'W') {
    state.waypoint.x -= dir.amount
  }
}

function processRotation(rot) {
  let turns = (rot.amount % 360) / 90

  if (rot.action == 'R') {
    if (turns === 1) {
      let newX = state.waypoint.y
      let newY = state.waypoint.x * -1
      state.waypoint.x = newX
      state.waypoint.y = newY
    } else if (turns === 2) {
      let newX = state.waypoint.x * -1
      let newY = state.waypoint.y * -1
      state.waypoint.x = newX
      state.waypoint.y = newY
    } else if (turns === 3) {
      let newX = state.waypoint.y * -1
      let newY = state.waypoint.x
      state.waypoint.x = newX
      state.waypoint.y = newY
    }
  } else {
    if (turns === 1) {
      let newX = state.waypoint.y * -1
      let newY = state.waypoint.x
      state.waypoint.x = newX
      state.waypoint.y = newY
    } else if (turns === 2) {
      let newX = state.waypoint.x * -1
      let newY = state.waypoint.y * -1
      state.waypoint.x = newX
      state.waypoint.y = newY
    } else if (turns === 3) {
      let newX = state.waypoint.y
      let newY = state.waypoint.x * -1
      state.waypoint.x = newX
      state.waypoint.y = newY
    }
  }
}

function processForward(inst) {
  state.position.x += inst.amount * state.waypoint.x
  state.position.y += inst.amount * state.waypoint.y
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

})

console.log(Math.abs(state.position.x) + Math.abs(state.position.y))