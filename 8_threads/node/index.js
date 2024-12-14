import { Bench } from "tinybench";
import { Worker, MessageChannel, MessagePort } from "node:worker_threads";
import delay from "delay";

const bench = new Bench();

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const worker_thread_amount = 100;
const array_size = 10;
const array_check_poll = 100; // ms

function generateArray() {
  const array = [...Array(array_size).keys()].map((_, i) => i);
  shuffle(array);
  return array;
}

bench.add("Worker | 100", async () => {
  var array_collection = [];

  for (let i = 0; i < worker_thread_amount; i++) {
    const worker = new Worker("./worker.js");
    const workerMessageChannel = new MessageChannel();

    workerMessageChannel.port2.on("message", (message) => {
      array_collection.push(message.array);
      worker.terminate();
    });

    worker.postMessage(
      { array: generateArray(), messageChannel: workerMessageChannel.port1 },
      [workerMessageChannel.port1]
    );
  }

  while (array_collection.length != worker_thread_amount) {
    await delay(array_check_poll);
  }
});

await bench.run();

console.table(bench.table());
