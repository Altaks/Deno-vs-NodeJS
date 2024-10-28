import axios from 'npm:axios';
import { assertEquals} from "@std/assert"

Deno.bench("API | GetCollection", async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/dinosaurs");
    assertEquals(data.status, 200)
})

Deno.bench("API | Get Unique", async () => {
    const data = await axios.get("http://127.0.0.1:8000/api/dinosaurs/Zupaysaurus")
    assertEquals(data.status, 200)
})