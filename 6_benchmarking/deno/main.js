import { assert } from "jsr:@std/assert";

Deno.bench("Cryptographic task", async () => {
  const message = "The easiest, most secure JavaScript runtime.";
  const messageBuffer = new TextEncoder().encode(message);
  await crypto.subtle.digest("SHA-256", messageBuffer);
});

function sieveOfEratosthenes(n) {
  const primes = Array(n + 1).fill(true);  // Assume all numbers in array are prime
  primes[0] = primes[1] = false;         // Except for 0 and 1
  
  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (primes[i]) {
          for (let j = i * i; j <= n; j += i) {
              primes[j] = false;         // Mark factors non-prime
          }
      }
  }
  
  return primes.reduce((acc, isPrime, index) => {
      if (isPrime) acc.push(index);
      return acc;
  }, []);
}

Deno.bench("Sieve of erathosthenes | 10", () => {
  sieveOfEratosthenes(10)
})

Deno.bench("Sieve of erathosthenes | 100", () => {
  sieveOfEratosthenes(100)
})

Deno.bench("Sieve of erathosthenes | 1000", () => {
  sieveOfEratosthenes(1000)
})

Deno.bench("Sieve of erathosthenes | 10000", () => {
  sieveOfEratosthenes(10000)
})

Deno.bench("Sieve of erathosthenes | 100000", () => {
  sieveOfEratosthenes(100000)
})

Deno.bench("Sieve of erathosthenes | 1000000", () => {
  sieveOfEratosthenes(1000000)
})

function bubbleSortFun(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = 
                          [arr[j + 1], arr[j]];
          }
      }
  }
  return arr;
}

function selectionSortFun(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {
              minIndex = j;
          }
      }
      if (minIndex !== i) {
          [arr[i], arr[minIndex]] = 
                  [arr[minIndex], arr[i]];
      }
  }
  return arr;
}

function insertionSortFun(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
          arr[j + 1] = arr[j];
          j--;
      }
      arr[j + 1] = current;
  }
  return arr;
}

function mergeSortFun(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortFun(arr.slice(0, mid));
  const right = mergeSortFun(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length &&
          rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
      } else {
          result.push(right[rightIndex]);
          rightIndex++;
      }
  }

  return result.concat(left.slice(leftIndex))
               .concat(right.slice(rightIndex));
}
// helper
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// helper
function digitCount(num) {
  if (num === 0) {
      return 1;
  }
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// helper
function mostDigits(nums) {
  let max = 0;
  for (let num of nums) {
      max = Math.max(max, digitCount(num));
  }
  return max;
}

function radixSort(nums) {
  let maxDigits = mostDigits(nums);
  for (let k = 0; k < maxDigits; k++) {
      let buckets = Array.from({length: 10}, () => []);
      for (let num of nums) {
          let digit = getDigit(num, k);
          buckets[digit].push(num);
      }
      nums = [].concat(...buckets);
  }
  return nums;
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function generateArray() {
  const array = Array(1000).map((_, i) => i);
  shuffle(array);
  return array;
}

const sort1array = generateArray();
const sort1arraySorted = sort1array.toSorted();

const sort2array = generateArray();
const sort2arraySorted = sort2array.toSorted();

const sort3array = generateArray();
const sort3arraySorted = sort3array.toSorted();

const sort4array = generateArray();
const sort4arraySorted = sort3array.toSorted();

const sort5array = generateArray();
const sort5arraySorted = sort3array.toSorted();

const sort6array = generateArray();
const sort6arraySorted = sort3array.toSorted();

Deno.bench({
  name: "Sorting | Engine sorting",
  baseline: true,
  group: "Sorting algorithms",
  fn() {
    sort1array.sort()
    assert(sort1array.toString() == sort1arraySorted.toString())
  }
})

Deno.bench({
  name: "Sorting | Bubble sort",
  group: "Sorting algorithms",
  fn() {
    bubbleSortFun(sort2array)
    assert(sort2array.toString() == sort2arraySorted.toString())
  }
})

Deno.bench({
  name: "Sorting | Insertion sort",
  group: "Sorting algorithms",
  fn() {
    insertionSortFun(sort3array)
    assert(sort3array.toString() == sort3arraySorted.toString())
  }
})

Deno.bench({
  name: "Sorting | Selection sort",
  group: "Sorting algorithms",
  fn() {
    selectionSortFun(sort4array)
    assert(sort4array.toString() == sort4arraySorted.toString())
  }
})

Deno.bench({
  name: "Sorting | Merge sort",
  group: "Sorting algorithms",
  fn() {
    mergeSortFun(sort5array)
    assert(sort5array.toString() == sort5arraySorted.toString())
  }
})

Deno.bench({
  name: "Sorting | Radix sort",
  group: "Sorting algorithms",
  fn() {
    radixSort(sort6array)
    assert(sort6array.toString() == sort6arraySorted.toString())
  }
})
