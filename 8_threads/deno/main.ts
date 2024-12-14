import { delay } from "jsr:@std/async@1/delay";

function shuffle(array: Array<number>) {
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

const worker_thread_amount = 100;
const array_size = 10;
const array_check_poll = 100; // ms

function generateArray() {
  const array = Array(array_size).map((_, i) => i);
  shuffle(array);
  return array;
}

Deno.bench("Worker | 100", async () => {
  var array_collection: Array<number> = []

  for(let i = 0; i < worker_thread_amount; i++){
    const worker = new Worker(
      new URL("./worker.ts", import.meta.url).href,
      {
        type: "module"
      }
    )

    worker.addEventListener("message", (message) => {
      array_collection.push(message.data.array);
      worker.terminate();
    })

    worker.postMessage({array: generateArray()})
  }

  while(array_collection.length != worker_thread_amount) {
    await delay(array_check_poll);
  }
})
