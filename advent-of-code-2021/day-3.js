// Day 3: Binary Diagnostic

const fs = require('fs');
const readline = require('readline');

const INPUT_PATH = 'input/day-3.txt';
const INPUT_ARRAY = fs.readFileSync(INPUT_PATH).toString().split('\n');

// Part 1:
// Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report.
// The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used.
// Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine?

// Part 2:
// To find oxygen generator rating, determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
// To find CO2 scrubber rating, determine the least common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.
// Use the binary numbers in your diagnostic report to calculate the oxygen generator rating and CO2 scrubber rating, then multiply them together. What is the life support rating of the submarine?

const stringToBinary = str => {
  return parseInt(str, 2);
};

const getCommonBit = (criteria, arr, pos) => {
  let countOnes = 0;

  arr.forEach(num => {
    if (num[pos] === '1') {
      countOnes++;
    }
  });

  const criteriaCheck =
    criteria === 'most'
      ? // pick 1 for most common if counts are equal
        countOnes >= arr.length - countOnes
      : // pick 0 for least common if counts are equal
        countOnes < arr.length - countOnes;

  return criteriaCheck ? '1' : '0';
};

const findPowerRates = () => {
  const allZeroes = [...INPUT_ARRAY[0]].fill(0);

  const mostCommonBits = allZeroes.map((_, i) => getCommonBit('most', INPUT_ARRAY, i));
  const leastCommonBits = mostCommonBits.map(bit => bit === '1' ? '0' : '1');

  return {
    gamma: stringToBinary(mostCommonBits.join('')),
    epsilon: stringToBinary(leastCommonBits.join(''))
  }
};

const { gamma, epsilon } = findPowerRates();

console.log(gamma * epsilon);

const deleteUnwantedNumbers = (arr, bit, pos) => {
  // loop from last element to avoid skipping indexes after deleting
  for (let i = arr.length - 1; i >= 0; i--) {
    const num = arr[i];
    if (num[pos] !== bit) {
      arr.splice(i, 1);
    }
  }
};

const findLifeSupportRating = type => {
  // create a copy, since we'll be deleting elements and don't want to mutate the original input
  const input = [...INPUT_ARRAY];

  let currentBitPosition = 0;

  while (input.length > 1) {
    const criteria = type === 'oxygen' ? 'most' : 'least';
    const commonBit = getCommonBit(criteria, input, currentBitPosition);
    deleteUnwantedNumbers(input, commonBit, currentBitPosition);
    currentBitPosition++;
  }

  return stringToBinary(input[0]);
};

const oxygen = findLifeSupportRating('oxygen');
const co2 = findLifeSupportRating('co2');

console.log(oxygen * co2);
