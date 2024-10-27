import { Bench } from 'tinybench';
import fs from 'node:fs';

const bench = new Bench({ time: 1000 });

const easy = fs.readFileSync("../easy.json");
const hard = fs.readFileSync("../hard.json");

bench.add('JSON deserialization | easy', () => {
    JSON.parse(easy.toString())
})

bench.add('JSON deserialization | hard', () => {
    JSON.parse(hard.toString())
})

await bench.run();

console.table(bench.table());