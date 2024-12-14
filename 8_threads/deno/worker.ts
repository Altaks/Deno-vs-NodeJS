self.onmessage = async (event) => {
    const { array } = event.data;
    self.postMessage({array: array.toSorted()})
}