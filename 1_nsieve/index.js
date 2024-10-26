function sieveOfEratosthenes(n) {
    let primes = Array(n + 1).fill(true);  // Assume all numbers in array are prime
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

if (!process.argv[3]) {
    console.log("Please input a max number...")
} else {
    let n = Number.parseInt(process.argv[3]);
    let primeNumbers = sieveOfEratosthenes(n);
    console.log(primeNumbers);  // Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
}
