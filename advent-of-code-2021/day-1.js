// Day 1: Sonar Sweep

const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = 'input/day-1.txt';
const INPUT_ARRAY = fs
  .readFileSync(INPUT_PATH)
  .toString()
  .split('\n')
  .map(value => parseInt(value));

const getIncreasing = arr => {
  let counter = 0;

  for (let i = 1; i <= arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      counter++;
    }
  }

  return counter;
};

// Part 1: Count the number of times a depth measurement increases from the previous measurement.
console.log(getIncreasing(INPUT_ARRAY));

// Part 2: Count the number of times the sum of measurements in this sliding window increases from the previous sum.
const windowSums = [];

for (let i = 0; i <= INPUT_ARRAY.length - 3; i++) {
  // Remember: 2nd argument needs to be after desired index!
  const window = INPUT_ARRAY.slice(i, i + 3);
  const sum = window.reduce((a, b) => a + b, 0);
  windowSums.push(sum);
}

console.log(getIncreasing(windowSums));
