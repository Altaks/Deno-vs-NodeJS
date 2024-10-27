const easy = Deno.readTextFileSync('../easy.json');
const hard = Deno.readTextFileSync('../hard.json');

Deno.bench("JSON deserialization | easy", () => {
  JSON.parse(easy);
})

Deno.bench("JSON deserialization | hard", () => {
  JSON.parse(hard);
})
