const fs = require('fs');
const file = fs.readFileSync('input', 'utf8').split('\n\n');
let count = 0

// file.forEach(group => {
//   let groupTotal = []
//   group.split('\n').forEach(person => {
//     groupTotal = [...groupTotal, person.split('')]
//   })
//   count += [...new Set(groupTotal.flat())].length
// })

file.forEach(group => {
  let groupTotal = {}
  let people = group.split('\n').length
  group.split('\n').forEach(person => {
    person.split('').forEach(answer => {
      groupTotal[answer] ? groupTotal[answer] += 1 : groupTotal[answer] = 1
    })
  })
  matches = Object.values(groupTotal).filter(value => value === people)
  // console.log(people, groupTotal, matches.length)
  count += matches.length
})
console.log(count)