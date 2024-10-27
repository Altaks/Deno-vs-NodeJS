import { parse, stringify } from 'yaml'
import { Bench } from 'tinybench';
import fs from 'node:fs';

const bench = new Bench({ time: 1000 });

const easy = fs.readFileSync("../easy.yaml");
const hard = fs.readFileSync("../hard.yaml");

bench.add('YAML deserialization | easy', async () => {
    parse(easy.toString())
})

bench.add('YAML deserialization | hard', async () => {
    parse(hard.toString())
})

await bench.run();

console.table(bench.table());