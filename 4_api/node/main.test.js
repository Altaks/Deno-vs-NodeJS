import axios from 'axios';
import assert from 'node:assert/strict';
import { Bench } from 'tinybench';

const bench = new Bench({ time: 1000 });

bench.add("API | GetCollection", async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/dinosaurs");
    assert.strictEqual(data.status, 200);
});

bench.add("API | Get Unique", async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/dinosaurs/Zupaysaurus");
    assert.strictEqual(data.status, 200);
});

await bench.run();
console.table(bench.table());
