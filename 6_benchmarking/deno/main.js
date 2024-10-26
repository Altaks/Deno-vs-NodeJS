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


Deno.bench("Sieve of erathosthenes | 1000", () => {
  sieveOfEratosthenes(1000)
})

Deno.bench("Sieve of erathosthenes | 10000", () => {
  sieveOfEratosthenes(10000)
})

Deno.bench("Sieve of erathosthenes | 100000", () => {
  sieveOfEratosthenes(100000)
})