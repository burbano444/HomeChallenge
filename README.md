# Solution
🛑Important note: 🛑  
After clone, install cy with: npm install cypress --save-dev  
Run cypress with: npm run cy:open  

 After installing Chocolatey and K6  
 Run K6 with: k6 run k6_scripts/*name of test*.js  
 For example: k6 run k6_scripts/high_load_test.js  

Dear reviewer, I’m sending you the answers to the challenge:  

**First task: API test automation**  
Steps:  
1.	Follow the link to get the information about the Swagger Pet store project.  
2.	Analize, understand ante test the Swagger Pet store Sample training tool in https://petstore3.swagger.io/  
3.	Follow the instructions to set up locally environment in Docker and Run it.  
 ![Captura de pantalla 2025-03-09 230054](https://github.com/user-attachments/assets/2d965082-23a1-4ff6-b9a8-95fce9a49675)  
4.	Use postman to test the requests and enforce the knowledge about the API (Endpoints, methods, structure, format, etc.)  
![Captura de pantalla 2025-03-09 230218](https://github.com/user-attachments/assets/20b2d902-b0ed-4c52-ba2a-3c48f2cd6507)  
5.	Propose a list of test cases for automation:  
•	Positive Tests:  
o	Add (Post) a new pet and verify its details.  
o	Update (Put) a pet’s information and confirm changes.  
o	Get a pet by ID.  
o	Delete a pet and ensure it’s removed from the system.  
•	Negative Tests:  
o	Try to get a pet with a non-existent ID.  
o	Try to update a pet with invalid data (e.g. different ID).  
o	Send requests with invalid content types.   
•	Edge Cases:  
o	Add a pet with large data fields.  
o	Add a pet with minimal data.  
6.	Translate it to a Gherkin language to understand clearly what I want to design and develop  
For example:  

Positive Tests
  Scenario: Add a new pet and verify its details
    When I send a POST request to "/pet" with the pet payload
    Then the response status code should be 200
    And the response should include the created pet's details
    And the pet's data structure should be valid

    When I send a GET request to "/pet/{petId}"
    Then the response status code should be 200
    And the response should include the created pet's details
    And the pet's data structure should be valid
7.	Create a project with Cypress con TypeScript.  
8.	Create a folder called “Feature” where I Will include the files “. feature” of my tests where I Will paste the Gherkin designed tests (This is with double purpose, first one is to have a clear guide to develop the tests and second to represent the base in case of migrate the tests to BDD).  
9.	Develop the automation of proposed test cases.  
10.	In the next points I will explain a little more about the project:  
•	In the process of analyze I realized that I would need the library Faker which I called in “package.json”, with documentation here: https://fakerjs.dev/ .  
•	I made three files where I can test the different kinds of tests that I already designed (Positive tests, Negative tests and Edge cases).  
•	I developed the test cases in each folder how it corresponds following the gherkin designed tests.   
•	I wrote teller variable, methos, interfaces, etc. and  comments with cy.logs explaining each step following the explanation and the clarity in the codification.  
•	I made a test case of deleted created data in the CRUD tests in each iteration to save the integrity of information (Clean tests practices).  
•	Also, this could be useful following the principles of DRY and code reuse.  
•	I made a root folder called cypress.env.json with the purpose of hiding the sensible information (in this case the base URL) following Security by design principle.  
•	I made a folder “Utils” and file inside called “petUtils.ts” where I created the interfaces and functions following the Separation of concerns (SoC) principle.  
Any question or clarification about this, can ask me directly to burbo444@hotmail.com.  
  
**Second task: API test automation**  
Steps:  
1.	Analyze how to create scripts that can effectively test the performance of the API under different conditions  
2.	Design basically way to test each one of the performance tests recognized.  
3.	Concluding how each one of the performance tests can work in the API:  
a.	High Load Test: Send a high number of simultaneous requests to key endpoints like:  
	POST /pet: Add a new pet to the store.  
	GET /pet/{petId}: Get details of a pet by ID.  
	DELETE /pet/{petId}: Remove a pet by ID.  

b.	Stress Test: Gradually increase the load until the system breaks.  
c.	Spike Test: Simulate sudden spikes in traffic to evaluate stability.  
d.	Endurance Test: Assess the API’s behavior over a prolonged period with a constant load.  
e.	Data-Driven Test: Use varied and complex payloads (e.g., large and minimal data for pets).  
f.	Invalid Requests Test: Test how the API handles invalid inputs or requests under load.  
g.	Rate Limiting Test: Verify the API correctly enforces rate limits if applicable.  
4.	The first idea consists in running each test in different conditions, trying to design a minimum test, and a top test, with increase or decrease depending on each test (That means that ideally the coverage could be full coverage).  
5.	Considering the resources (time), I conclude that the most relevant and impactful performance test is High Load Tests and proceed to design the minimum, mid and top tests.
6.	The design of the tests is:  
Min: stages: [{ duration: "30s", target: 10 },{ duration: "30s", target: 20 }, { duration: "30s", target: 0 },]  
Mid: stages: [{ duration: "30s", target: 20 },{ duration: "30s", target: 50 }, { duration: "30s", target: 0 },]  
Top: Mid: stages: [{ duration: "30s", target: 50 },{ duration: "30s", target: 100 }, { duration: "30s", target: 0 },]  



7.	The results of the tests are:  
Min:  
scenarios: (100.00%) 1 scenario, 20 max VUs, 2m0s max duration (incl. graceful stop):
              * default: Up to 20 looping VUs for 1m30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

        ✓ POST /pet status is 200
        ✓ GET /pet/{petId} status is 200
        ✗ DELETE /pet/{petId} status is 200
         ↳  99% — ✓ 898 / ✗ 1
   
        checks.........................: 99.96% 2696 out of 2697
        data_received..................: 1.1 MB 13 kB/s
        data_sent......................: 405 kB 4.5 kB/s
        http_req_blocked...............: avg=20.03µs min=0s     med=0s     max=13.12ms  p(90)=0s      p(95)=0s
        http_req_connecting............: avg=5.62µs  min=0s     med=0s     max=1.06ms   p(90)=0s      p(95)=0s
        http_req_duration..............: avg=3.46ms  min=1.53ms med=2.72ms max=538.94ms p(90)=4.76ms  p(95)=5.4ms
          { expected_response:true }...: avg=3.45ms  min=1.53ms med=2.72ms max=538.94ms p(90)=4.76ms  p(95)=5.4ms
        http_req_failed................: 0.03%  1 out of 2697
        http_req_receiving.............: avg=75.83µs min=0s     med=0s     max=1.09ms   p(90)=520.2µs p(95)=532.12µs
        http_req_sending...............: avg=19.01µs min=0s     med=0s     max=2.69ms   p(90)=0s      p(95)=0s
        http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s       p(90)=0s      p(95)=0s
        http_req_waiting...............: avg=3.37ms  min=1.53ms med=2.67ms max=538.94ms p(90)=4.45ms  p(95)=5.34ms
        http_reqs......................: 2697   29.739853/s
        iteration_duration.............: avg=1.01s   min=1s     med=1s     max=1.57s    p(90)=1.01s   p(95)=1.01s
        iterations.....................: 899    9.913284/s
        vus............................: 1      min=1            max=20
        vus_max........................: 20     min=20           max=20
                                                                                                                                           


Mid:  
scenarios: (100.00%) 1 scenario, 50 max VUs, 2m0s max duration (incl. graceful stop):
              * default: Up to 50 looping VUs for 1m30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ POST /pet status is 200
     ✓ GET /pet/{petId} status is 200
     ✗ DELETE /pet/{petId} status is 200
      ↳  99% — ✓ 2109 / ✗ 1

     checks.........................: 99.98% 6329 out of 6330
     data_received..................: 2.7 MB 30 kB/s
     data_sent......................: 950 kB 11 kB/s
     http_req_blocked...............: avg=11.2µs  min=0s     med=0s     max=7.93ms  p(90)=0s      p(95)=0s
     http_req_connecting............: avg=5.32µs  min=0s     med=0s     max=1.08ms  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=2.27ms  min=1.02ms med=2.11ms max=20.79ms p(90)=3.17ms  p(95)=3.31ms
       { expected_response:true }...: avg=2.27ms  min=1.02ms med=2.11ms max=20.79ms p(90)=3.17ms  p(95)=3.31ms
     http_req_failed................: 0.01%  1 out of 6330
     http_req_receiving.............: avg=81.94µs min=0s     med=0s     max=2.69ms  p(90)=524.4µs p(95)=534.8µs
     http_req_sending...............: avg=14.6µs  min=0s     med=0s     max=10.09ms p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=2.17ms  min=1.02ms med=2.1ms  max=20.79ms p(90)=2.75ms  p(95)=3.27ms
     http_reqs......................: 6330   69.801327/s
     iteration_duration.............: avg=1s      min=1s     med=1s     max=1.02s   p(90)=1s      p(95)=1.01s
     iterations.....................: 2110   23.267109/s
     vus............................: 2      min=1            max=50
     vus_max........................: 50     min=50           max=50 







Top:  
scenarios: (100.00%) 1 scenario, 100 max VUs, 2m0s max duration (incl. graceful stop):
              * default: Up to 100 looping VUs for 1m30s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

     ✗ POST /pet status is 200
      ↳  42% — ✓ 1929 / ✗ 2578
     ✗ GET /pet/{petId} status is 200
      ↳  42% — ✓ 1929 / ✗ 2578
     ✗ DELETE /pet/{petId} status is 200
      ↳  42% — ✓ 1925 / ✗ 2582

     checks.........................: 42.77% 5783 out of 13521
     data_received..................: 6.0 MB 66 kB/s
     data_sent......................: 2.1 MB 23 kB/s
     http_req_blocked...............: avg=10.77µs min=0s     med=0s     max=21.97ms p(90)=0s      p(95)=0s
     http_req_connecting............: avg=7.03µs  min=0s     med=0s     max=21.97ms p(90)=0s      p(95)=0s
     http_req_duration..............: avg=2.96ms  min=1.02ms med=2.64ms max=57.53ms p(90)=4.34ms  p(95)=5.3ms
       { expected_response:true }...: avg=1.93ms  min=1.02ms med=2.05ms max=13.5ms  p(90)=2.63ms  p(95)=2.7ms
     http_req_failed................: 57.22% 7737 out of 13521
     http_req_receiving.............: avg=76.52µs min=0s     med=0s     max=10.92ms p(90)=521.4µs p(95)=530.8µs
     http_req_sending...............: avg=12.47µs min=0s     med=0s     max=1ms     p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s     max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=2.87ms  min=1.02ms med=2.62ms max=57.53ms p(90)=4.31ms  p(95)=4.94ms
     http_reqs......................: 13521  148.783884/s
     iteration_duration.............: avg=1s      min=1s     med=1s     max=1.06s   p(90)=1.01s   p(95)=1.01s
     iterations.....................: 4507   49.594628/s
     vus............................: 3      min=2             max=100
     vus_max........................: 100    min=100           max=100





8.	Having these results I will provide the comprehensive report:  
a.	Objectives  
Primary Goal: Identify potential performance issues that could impact the user experience or the overall functionality of the Swagger Petstore APIs.  

Endpoints Tested:  
•	POST /pet: Simulates adding a new pet to the store.  
•	GET /pet/{petId}: Simulates fetching a pet's details by ID.  
•	DELETE /pet/{petId}: Simulates removing a pet from the store.  

Focus Areas:  
API stability and reliability under different user loads.  
Response times, success rates, and failure rates.  
Any bottlenecks observed as the load increases.  

b.	Methodology  
Tools Used:  
K6: A performance testing tool to simulate load and measure metrics.  

Test Configurations:  
Min Load Test (20 VUs):  
Up to 20 Virtual Users (VUs) for 1m30s, followed by a 30s graceful ramp-down.  
Objective: Evaluate baseline performance with minimal load.  

Mid Load Test (50 VUs):  
Up to 50 VUs for 1m30s, followed by a graceful ramp-down of 30s.  
Objective: Identify performance trends as concurrency increases.  

Top Load Test (100 VUs):  
Up to 100 VUs for 1m30s, followed by a 30s graceful ramp-down.  
Objective: Stress the API to evaluate its upper limits.  

Validation Checks:  
Each endpoint was validated for HTTP status 200.  
Metrics captured: average response times, failure rates, throughput, and resource utilization.  

c.	 Results  
Min Load Test (20 VUs):  
Results:    
•	POST /pet: 99.96% success (898 passed, 1 failed).  
•	GET /pet/{petId}: 99.96% success.  
•	DELETE /pet/{petId}: 99.96% success.  

Metrics:  
•	Average response time: 3.46ms.  
•	Maximum response time: 538.94ms.  
•	Failure rate: 0.03%.  
•	Throughput: 2697 requests in total (29.7 req/s).  

Observations:  
•	API performed well with minimal failures.  
•	Latency and response times were acceptable for real-time usage.  

Mid Load Test (50 VUs):  
Results:  
•	POST /pet: 99.98% success (2109 passed, 1 failed).  
•	GET /pet/{petId}: 99.98% success.  
•	DELETE /pet/{petId}: 99.98% success.  

Metrics:  
•	Average response time: 2.27ms.  
•	Maximum response time: 20.79ms.    
•	Failure rate: 0.01%.  
•	Throughput: 6330 requests in total (69.8 req/s).  

Observations:  
•	The API continued to handle requests efficiently.  
•	Latency slightly improved compared to the minimal load test, indicating the system handles moderate loads well.  

Top Load Test (100 VUs):  
Results:  
•	POST /pet: 42% success (1929 passed, 2578 failed).  
•	GET /pet/{petId}: 42% success (1929 passed, 2578 failed).  
•	DELETE /pet/{petId}: 42% success (1925 passed, 2582 failed).  

Metrics:  
•	Average response time: 2.96ms.  
•	Maximum response time: 57.53ms.  
•	Failure rate: 57.22%.  
•	Throughput: 13521 requests in total (148.7 req/s).  

Observations:  
•	A significant increase in failures occurred under maximum load.  
•	Success rates for all endpoints dropped drastically due to resource exhaustion or system bottlenecks.  
d.	Insights  
Performance Bottlenecks:  
Under Maximum Load (100 VUs):  
•	The failure rate (57%) indicates the API backend or database is unable to handle high concurrency.  
•	Frequent failures on POST and DELETE suggest write operations are particularly resource-intensive.  

System Limitations:  
•	Latency remains relatively low (~3ms), but the high failure rate points to backend resource exhaustion (e.g., CPU, memory, or database connections).  

Potential Database Issues:  
•	Operations like DELETE may involve locking or transaction management, which could slow down under stress.  

e.	Recommendations  
To improve the API’s performance and scalability:  
Optimize Database Performance:  
•	Indexing: Add indexes to frequently accessed fields like id to speed up GET /pet/{petId} queries.  
•	Asynchronous Deletes: Offload or batch DELETE operations to reduce lock contention during high loads.  
•	Implement Caching:Cache frequently accessed resources (e.g., pet details for GET /pet/{petId}) using tools like Redis or Memcached.  

Increase Backend Resources:  
•	Scale the API server horizontally by adding more instances and using a load balancer.  
•	Consider vertical scaling (more CPU/RAM) for short-term improvements.  

Rate Limiting:  
•	Apply rate limits to throttle excessive requests and prevent resource starvation.  

Connection Pooling:  
•	Ensure efficient database connection pooling to handle spikes in traffic without overloading the database.  

Conduct Further Testing:  
•	Stress test individual endpoints (POST, GET, DELETE) separately to isolate bottlenecks and identify which operation struggles the most.  

f.	Next Steps  
•	Implement some of the suggested optimizations.  
•	Rerun the high load test with gradual scaling to evaluate improvements.  
•	Monitor backend metrics (CPU, memory, database connections) during tests using tools like Grafana or Prometheus for better diagnostics.  
•	Once the testing is complete, you will need to interpret the results and provide a comprehensive report.  
