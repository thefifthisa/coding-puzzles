// Day 2: Dive!

const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = 'input/day-2.txt';
const INPUT_ARRAY = fs.readFileSync(INPUT_PATH).toString().split('\n');

// Part 1:
// forward X increases the horizontal position by X units.
// down X increases the depth by X units.
// up X decreases the depth by X units.

let position = 0;
let depth = 0;

INPUT_ARRAY.forEach(cmd => {
  const [action, stringValue] = cmd.split(' ');
  const value = parseInt(stringValue);

  switch (action) {
    case 'forward':
      position += value;
      break;
    case 'down':
      depth += value;
      break;
    case 'up':
      depth -= value;
      break;
  }
});

console.log(position * depth);

// Part 2:
// down X increases your aim by X units.
// up X decreases your aim by X units.
// forward X does two things:
//   - It increases your horizontal position by X units.
//   - It increases your depth by your aim multiplied by X.

position = 0;
depth = 0;
let aim = 0;

INPUT_ARRAY.forEach(cmd => {
  const [action, stringValue] = cmd.split(' ');
  const value = parseInt(stringValue);

  switch (action) {
    case 'down':
      aim += value;
      break;
    case 'up':
      aim -= value;
      break;
    case 'forward':
      position += value;
      depth += aim * value;
      break;
  }
});

console.log(position * depth);
