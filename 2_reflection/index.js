var listOfNumbers = Array(10000).fill().reduce((acc, x, i) => (acc.push(i), acc), []);

console.log(listOfNumbers)

var b = listOfNumbers.reduce((acc, x) => Object.assign(acc, { [x]: x * 2 }), {});

console.log(listOfNumbers)