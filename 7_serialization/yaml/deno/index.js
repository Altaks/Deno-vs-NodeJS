import { parse, stringify } from "jsr:@std/yaml";

const easy = Deno.readFileSync('../easy.yaml');
const hard = Deno.readFileSync('../hard.yaml');

Deno.bench("YAML deserialization | easy", () => {
    parse(easy.toString());
})

Deno.bench("YAML deserialization | hard", () => {
    parse(hard.toString());
})
