const fs = require('fs');
let file = fs.readFileSync('input', 'utf8').split('\n');
slopes = [{ "right": 1, "down": 1 }, { "right": 3, "down": 1 }, { "right": 5, "down": 1 }, { "right": 7, "down": 1 }, { "right": 1, "down": 2 },]


function countTrees(h_step, d_step) {
  let x_pos = 0
  let trees_count = 0

  for (let i = 0; i < file.length; i += d_step) {
    // console.log(file[i])
    let new_line = [...file[i]]

    if (x_pos >= new_line.length) {
      x_pos -= new_line.length;
    }

    if (new_line[x_pos] === '#') {
      trees_count++
    }

    x_pos += h_step
    // x_pos += (h_step + x_pos) % new_line.length;
    // new_line[j] = new_line[j] === '.' ? "O" : "X"
    // output_file.push(new_line.join())
  }
  // console.log(output_file)
  return trees_count

}

// // console.log(
// //   // countTrees(1, 1),
// //   countTrees(3, 1),
// //   // countTrees(5, 1),
// //   // countTrees(7, 1),
// //   // countTrees(1, 2)
// // )
console.log(
  countTrees(1, 1) *
  countTrees(3, 1) *
  countTrees(5, 1) *
  countTrees(7, 1) *
  countTrees(1, 2)
)
// let total = 1

// slopes.forEach(s => {

//   count = countTrees(s.right, s.down)

//   total *= count;

// });

// console.log(total)

// // console.log(
// //   countTrees(1, 1) *
// //   countTrees(3, 1) *
// //   countTrees(5, 1) *
// //   countTrees(7, 1) *
// //   countTrees(1, 2)
// // )


// // 9533698720

// const fs = require('fs');

// // fs.readFile('input', 'utf-8', (err, data) => {
// //   console.log(err);
// //   lines = data.split(/\r?\n/);
// //   slopes = [{ "right": 1, "down": 1 }, { "right": 3, "down": 1 }, { "right": 5, "down": 1 }, { "right": 7, "down": 1 }, { "right": 1, "down": 2 },]

// //   let total = 1;

// //   slopes.forEach(s => {
// //     let slopeRight = s.right;
// //     let slopeDown = s.down;

// //     let position = 0;
// //     let count = 0;

// //     for (let i = 0; i < lines.length; i += slopeDown) {
// //       let line = lines[i];
// //       if (position >= line.length) {
// //         position -= line.length;
// //       }
// //       if (line[position] === '#') {
// //         count++;
// //       }
// //       position += slopeRight;
// //     }

// //     total *= count;

// //   });


// //   console.log(total);
// // });