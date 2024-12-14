Test made using the following command : 

```sh
/usr/bin/time -v ./<deno|node>.sh
```

k6 script : 

```js
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
```


## Results for Node : 

### `time` command results : 

```yml
Command being timed: "./node.sh"
User time (seconds): 927.87
System time (seconds): 201.94
Percent of CPU this job got: 81%
Elapsed (wall clock) time (h:mm:ss or m:ss): 23:12.91
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 406296
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 15419
Minor (reclaiming a frame) page faults: 256085
Voluntary context switches: 457048
Involuntary context switches: 32507
Swaps: 0
File system inputs: 883400
File system outputs: 8
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

### k6 command results : 

```
    ✗ status was 200
      ↳  99% — ✓ 6749934 / ✗ 26191

     checks.........................: 99.61%  6749934 out of 6776125
     data_received..................: 1.9 GB  1.5 MB/s
     data_sent......................: 542 MB  419 kB/s
     http_req_blocked...............: avg=148.77ms min=0s       med=6.77µs   max=20.98s p(90)=125.36µs p(95)=1.07s   
     http_req_connecting............: avg=139.7ms  min=0s       med=0s       max=20.98s p(90)=0s       p(95)=1.01s   
   ✓ http_req_duration..............: avg=298.92ms min=0s       med=108ms    max=1m9s   p(90)=334.32ms p(95)=575.73ms
       { expected_response:true }...: avg=243.08ms min=124.45µs med=108.44ms max=1m0s   p(90)=333.17ms p(95)=565.83ms
     http_req_failed................: 0.38%   26220 out of 6787327
     http_req_receiving.............: avg=869.17µs min=0s       med=30.03µs  max=6.4s   p(90)=69.7µs   p(95)=194.92µs
     http_req_sending...............: avg=10.68ms  min=0s       med=11.8µs   max=7.75s  p(90)=755.61µs p(95)=9.75ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=287.37ms min=0s       med=105.92ms max=1m9s   p(90)=325.46ms p(95)=529.79ms
     http_reqs......................: 6787327 5241.557111/s
     iteration_duration.............: avg=2.31s    min=1s       med=1.12s    max=1m32s  p(90)=1.73s    p(95)=12.75s  
     iterations.....................: 6744170 5208.228839/s
     vus............................: 7742    min=0                  max=99593 
     vus_max........................: 100000  min=19641              max=100000


running (21m34.9s), 000000/100000 VUs, 6716121 complete and 79656 interrupted iterations
default ✓ [======================================] 054558/100000 VUs  21m0s
```

## Results for Deno : 

### time command results : 

```yml
Command being timed: "./deno.sh"
User time (seconds): 557.57
System time (seconds): 151.22
Percent of CPU this job got: 48%
Elapsed (wall clock) time (h:mm:ss or m:ss): 24:09.28
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 647084
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 179421
Minor (reclaiming a frame) page faults: 514913
Voluntary context switches: 714459
Involuntary context switches: 16838
Swaps: 0
File system inputs: 1791456
File system outputs: 0
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```


### k6 command results : 

```
   ✗ status was 200
      ↳  98% — ✓ 6533741 / ✗ 73152

     checks.........................: 98.89%  6533741 out of 6606893
     data_received..................: 1.7 GB  1.4 MB/s
     data_sent......................: 523 MB  415 kB/s
     http_req_blocked...............: avg=271.08µs min=0s       med=7.05µs  max=4.16s p(90)=10.05µs  p(95)=14.87µs 
     http_req_connecting............: avg=205.42µs min=0s       med=0s      max=4.16s p(90)=0s       p(95)=0s      
   ✓ http_req_duration..............: avg=70.12ms  min=0s       med=7.7ms   max=8.59s p(90)=149.53ms p(95)=252.13ms
       { expected_response:true }...: avg=71.24ms  min=158.82µs med=8.28ms  max=8.59s p(90)=151.48ms p(95)=255.12ms
     http_req_failed................: 1.57%   104747 out of 6639888
     http_req_receiving.............: avg=361.95µs min=0s       med=28.56µs max=3.86s p(90)=106.01µs p(95)=195.06µs
     http_req_sending...............: avg=644.06µs min=0s       med=12.01µs max=4.15s p(90)=75.86µs  p(95)=342.64µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=69.11ms  min=0s       med=7.49ms  max=8.59s p(90)=147.08ms p(95)=248.04ms
     http_reqs......................: 6639888 5260.870686/s
     iteration_duration.............: avg=1.69s    min=1s       med=1.01s   max=1m26s p(90)=1.33s    p(95)=1.69s   
     iterations.....................: 6585059 5217.428947/s
     vus............................: 0       min=0                  max=98640 
     vus_max........................: 100000  min=20617              max=100000


running (21m02.1s), 000000/100000 VUs, 6576569 complete and 67137 interrupted iterations
default ✓ [======================================] 000000/100000 VUs  21m0s
```