import http from "k6/http";
import { check, sleep } from "k6";

// Test configuration
export const options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ["p(99) < 3000"],
  },
  // Ramp the number of virtual users up and down
  stages: [
    { duration: "5m", target: 10_000 },
    { duration: "10m", target: 5_000 },
    { duration: "3m", target: 10_000 },
    { duration: "1s", target: 100_000 },
    { duration: "2m59s", target: 1_000 },
  ],
};

// Simulated user behavior
export default function () {
  let res = http.get("http://127.0.0.1:3000/");
  // Validate response status
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}