import { parentPort } from 'node:worker_threads' 


parentPort.once('message', async (value) => {
    const { array, messageChannel } = value;
    messageChannel.postMessage({array: array.toSorted()});
    messageChannel.close();
});