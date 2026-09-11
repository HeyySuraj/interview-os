https://chatgpt.com/share/6aa43d6d-e3fc-83e9-b74a-24a565b93add

Yes. I searched recent Infosys interview reports and Node.js-specific Infosys questions, including reports from **July–September 2026**. The pattern is quite clear: for a **Senior Software Engineer / Node.js** profile, expect **project deep-dive + JavaScript + Node.js internals + Express/API + MongoDB/SQL + microservices + AWS + coding/DSA + CS fundamentals**. Recent Infosys candidates specifically reported questions on Node architecture, Event Loop, middleware authentication, `Promise.all()`, microservices, I/O, and coding. ([Glassdoor][1])

## 🔥 My prediction for your Infosys interview tomorrow

Considering your **~3 years Node.js/MERN experience**, I would prepare in this order:

| Priority | Section                        | Probability |
| -------- | ------------------------------ | ----------: |
| 🔴 1     | Node.js                        |   Very High |
| 🔴 2     | JavaScript                     |   Very High |
| 🔴 3     | Your project / real-world work |   Very High |
| 🔴 4     | Express + REST APIs            |   Very High |
| 🟠 5     | MongoDB + SQL                  |        High |
| 🟠 6     | Microservices / RabbitMQ       |        High |
| 🟠 7     | AWS / Docker                   | Medium-High |
| 🟠 8     | Coding / DSA                   |        High |
| 🟡 9     | System Design                  | Medium-High |
| 🟡 10    | React / TypeScript             |      Medium |
| 🟡 11    | OS / DBMS / OOP                |      Medium |

Recent Infosys reports support this mix: one 2026 candidate reported MERN, Node, Express, MongoDB, SQL, DSA and CS fundamentals; another recent Node.js report specifically mentioned `Promise.all()` for simultaneous API calls. ([Reddit][2])

---

# 1. 🚨 Node.js — MOST IMPORTANT

These are the questions I would **definitely prepare**.

### Basic → Intermediate

1. What is Node.js?
2. Why is Node.js used for backend development?
3. Is Node.js single-threaded or multi-threaded?
4. Explain Node.js architecture.
5. What is the Event Loop?
6. Explain Event Loop phases.
7. What is libuv?
8. What is the V8 engine?
9. How does Node.js handle multiple requests if it is single-threaded?
10. What is non-blocking I/O?
11. Synchronous vs asynchronous programming?
12. What is the difference between blocking and non-blocking code?
13. What happens when a Node.js application receives 1000 requests simultaneously?
14. What happens if one request performs a CPU-intensive operation?
15. How would you handle CPU-intensive tasks in Node.js?
16. What are Worker Threads?
17. What is Node.js Cluster?
18. Cluster vs Worker Threads?
19. How do you scale a Node.js application?

The Event Loop is particularly important: an Infosys Node.js interview report explicitly asked architecture-level Node.js/JavaScript questions, including Event Loop and libuv. ([Glassdoor][1])

---

# 2. 🔥 JavaScript

For a Senior Node role, don't prepare only Node.js. They can go deep into JS.

### Must know

1. `var` vs `let` vs `const`
2. Hoisting
3. Closure
4. Scope
5. Lexical scope
6. Execution context
7. Call stack
8. Callback function
9. Higher-order function
10. Arrow function vs normal function
11. `this`
12. `call()` vs `apply()` vs `bind()`
13. Prototype
14. Prototype inheritance
15. `==` vs `===`
16. Shallow copy vs deep copy
17. Spread vs rest operator
18. Destructuring
19. Map vs filter vs reduce
20. `forEach()` vs `map()`
21. Promise
22. Promise states
23. `async/await`
24. Promise chaining
25. `Promise.all()`
26. `Promise.allSettled()`
27. `Promise.race()`
28. `Promise.any()`
29. Microtask vs macrotask
30. Callback queue vs microtask queue

### Very likely output questions

They may give you something like:

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

And ask:

**What is the output and why?**

You should be comfortable explaining:

```text
A
D
C
B
```

---

# 3. 🚨 Promise / Async questions

This is especially important because a recent Infosys Node.js interview explicitly asked:

> Three websites/APIs need to be called simultaneously. How would you approach it?

The reported answer was `Promise.all()`. ([Glassdoor][3])

Prepare these:

### Q: How do you call 3 APIs simultaneously?

```javascript
const [users, orders, products] = await Promise.all([
    getUsers(),
    getOrders(),
    getProducts()
]);
```

Then interviewer may ask:

**What happens if one API fails?**

That's where you should know:

```javascript
Promise.all()
```

vs

```javascript
Promise.allSettled()
```

---

# 4. 🚨 Express.js

Prepare these very well.

1. What is Express.js?
2. Why use Express with Node?
3. What is middleware?
4. Types of middleware?
5. Application-level middleware?
6. Router-level middleware?
7. Error-handling middleware?
8. Authentication middleware?
9. How does Express request-response lifecycle work?
10. How do you handle errors globally?
11. How do you validate request body?
12. How do you handle file upload?
13. How do you implement authentication?
14. How do you implement authorization?
15. What is CORS?
16. How do you handle CORS?
17. What is Helmet?
18. What is rate limiting?
19. How do you secure an Express API?
20. How do you structure a large Express project?

A recent Infosys Senior Software Engineer report specifically mentions **Event Loop + authentication using middleware**. ([Glassdoor][4])

---

# 5. 🔐 JWT / Authentication

Very likely for your experience.

Be ready for:

### Q. Explain JWT authentication.

Your answer should cover:

```text
Login
 ↓
Validate username/password
 ↓
Generate JWT
 ↓
Client stores token
 ↓
Client sends Authorization header
 ↓
Middleware verifies token
 ↓
Request reaches controller
```

Then expect follow-ups:

* What is inside a JWT?
* Header / Payload / Signature?
* JWT vs Session?
* Where should JWT be stored?
* Access token vs refresh token?
* How do you expire tokens?
* How do you revoke JWT?
* How do you implement role-based authorization?
* What happens if JWT is stolen?

---

# 6. MongoDB 🔥

Considering your actual experience, I expect they may dig into MongoDB.

Prepare:

1. SQL vs MongoDB
2. Collection vs table
3. Document
4. Embedding vs referencing
5. MongoDB indexing
6. Compound index
7. Unique index
8. Aggregation pipeline
9. `$match`
10. `$group`
11. `$lookup`
12. `$project`
13. `$unwind`
14. `find()` vs aggregation
15. Pagination
16. Skip/limit problems
17. Cursor-based pagination
18. MongoDB transactions
19. MongoDB ACID
20. Replica set
21. Sharding
22. How do you optimize a slow MongoDB query?

An Infosys Senior Software Engineer interview listing specifically includes MongoDB database concepts. ([NodeFlair][5])

---

# 7. SQL

Don't ignore SQL even though you're primarily MongoDB.

Prepare:

```sql
INNER JOIN
LEFT JOIN
RIGHT JOIN
GROUP BY
HAVING
ORDER BY
WHERE
COUNT
MAX
MIN
AVG
```

Especially:

### Find 2nd highest salary

### Find duplicate records

### Find employees who don't exist in another table

### Difference between WHERE and HAVING

### JOIN vs subquery

### Indexing

Recent Infosys interview reports have included SQL joins, aggregation and basic SQL queries alongside MERN questions. ([Glassdoor][6])

---

# 8. 🚨 Microservices

For **Senior Software Engineer**, this can separate you from a normal 2–3 YOE candidate.

Prepare:

1. What are microservices?
2. Monolith vs microservices?
3. Why microservices?
4. Disadvantages?
5. How do services communicate?
6. REST vs messaging
7. Synchronous vs asynchronous communication
8. API Gateway
9. Service discovery
10. Circuit breaker
11. Retry
12. Timeout
13. Idempotency
14. Distributed transactions
15. Event-driven architecture
16. RabbitMQ vs Kafka
17. What happens if RabbitMQ is down?
18. How do you handle duplicate messages?
19. How do you monitor microservices?
20. How do you trace a request across services?

Infosys interview reports specifically mention **microservices questions** alongside Node.js and I/O. ([Glassdoor][7])

---

# 9. 🐇 RabbitMQ

Since you have actual RabbitMQ experience, **prepare this deeply**.

They may ask:

> Why did you use RabbitMQ in your project?

Then:

* What is RabbitMQ?
* Exchange?
* Queue?
* Binding?
* Routing key?
* Direct exchange?
* Fanout exchange?
* Topic exchange?
* Consumer?
* Producer?
* ACK?
* NACK?
* Dead-letter queue?
* Retry mechanism?
* What happens if consumer crashes?
* How do you prevent duplicate processing?
* RabbitMQ vs Kafka?

You can answer using your actual payment/callback/reporting work.

---

# 10. 🚨 REST API Design

Prepare practical questions.

### Q: Design a payment API.

They may ask:

```text
POST /payments
GET /payments/:id
POST /payments/:id/refund
```

Then:

* What HTTP methods?
* Status codes?
* Validation?
* Authentication?
* Idempotency?
* Retry?
* Logging?
* Error handling?
* Database transaction?
* Payment callback?
* Duplicate callback?
* Timeout?

Your real payment middleware experience is extremely useful here.

---

# 11. AWS

Because your resume contains AWS, expect questions.

Prepare:

### EC2

* What is EC2?
* How did you deploy Node.js?
* PM2?
* Nginx?
* Reverse proxy?

### S3

* What is S3?
* How do you upload files?
* Presigned URL?
* Public vs private bucket?

### Other

* IAM
* CloudWatch
* Load Balancer
* Auto Scaling
* Security Groups
* Environment variables
* Secrets

---

# 12. Docker

Very possible for Senior role.

Questions:

1. What is Docker?
2. Image vs container?
3. Dockerfile?
4. Docker Compose?
5. Docker volume?
6. Environment variables?
7. How do you dockerize Node.js?
8. Why use multi-stage builds?
9. How do you reduce Docker image size?
10. How do containers communicate?

An Infosys lateral MERN interview experience also reported questions around Docker and whether `package-lock.json` should be copied into a Docker container. ([Medium][8])

---

# 13. TypeScript

Because your work is heavily TypeScript-based, prepare:

1. `type` vs `interface`
2. `any` vs `unknown`
3. `never`
4. `void`
5. Union types
6. Intersection types
7. Generics
8. Optional properties
9. `readonly`
10. Enums
11. Type guards
12. Utility types
13. `Partial`
14. `Pick`
15. `Omit`
16. `Record`
17. Generics with functions

---

# 14. System Design — Senior-level

This is where they may test whether you are actually senior.

Possible questions:

### Design a URL shortener

### Design a payment processing system

### Design a WhatsApp notification system

### Design a file upload system

### Design a notification service

### Design an API rate limiter

### Design a scalable Node.js application

### Design a microservice architecture

For every design, talk about:

```text
Client
 ↓
Load Balancer
 ↓
API Gateway
 ↓
Node.js services
 ↓
Redis
 ↓
MongoDB / SQL
 ↓
RabbitMQ / Kafka
 ↓
Workers
```

Then discuss:

* scalability
* caching
* database indexes
* retries
* failures
* monitoring
* logging
* security
* horizontal scaling

---

# 15. 🚨 Coding / DSA

Don't skip this.

Recent Infosys interviews have included **sliding window** and medium-level DP/coding questions. ([Reddit][2])

For tomorrow, I would practice these **15**:

### Easy/Medium

1. Reverse a string
2. Reverse words
3. Check palindrome
4. Character frequency
5. First non-repeating character
6. Find duplicates in array
7. Remove duplicates
8. Two Sum
9. Anagram
10. Maximum/minimum element
11. Find missing number
12. Merge two sorted arrays
13. Longest substring without repeating characters
14. Maximum subarray
15. Sliding window problem

And be ready to write them in **JavaScript/TypeScript**, not only explain the logic.

---

# 16. Your PROJECT — 🚨 VERY IMPORTANT

This is probably your biggest opportunity.

Don't just say:

> "I worked on Node.js and MongoDB."

They can start drilling down:

### Your project

> Explain your current project.

Then:

> What exactly was your role?

> Why did you choose Node.js?

> Why MongoDB?

> How does the request flow through your application?

> How did you implement authentication?

> How did you handle errors?

> How did you improve performance?

> What was the biggest production issue you solved?

> How did you debug it?

> How did you handle concurrency?

> Why did you use RabbitMQ?

> Why Redis?

> How did you deploy it?

> How do you monitor production?

> What happens if MongoDB goes down?

> What happens if RabbitMQ goes down?

> How do you scale your application?

> How did you reduce API response time?

This matches the broader Infosys pattern: candidates report significant project discussion plus fundamentals and practical implementation questions. ([JustSkills][9])

---

# 17. Questions specifically around YOUR resume

I would prepare these tonight because an interviewer can pick any bullet from your resume:

### Connector API

> Why did you use Adapter Pattern?

> What problem did the Adapter Pattern solve?

> How did it reduce development time?

### Payment middleware

> Explain the complete payment flow.

> How did you handle payment callbacks?

> How did you prevent duplicate transactions?

> Where did RabbitMQ fit?

> What happens if the payment gateway sends the callback twice?

### Redis

> Why Redis?

> What did you cache?

> How did you invalidate cache?

> What happens when Redis goes down?

### MongoDB

> Which indexes did you create?

> Why did you create those indexes?

> How did you identify a slow query?

### AWS

> How did you deploy Node.js?

> Why EC2?

> How did Nginx fit into the architecture?

---

# 18. CS Fundamentals

Infosys can still ask these.

### OOP

* Encapsulation
* Abstraction
* Inheritance
* Polymorphism
* Composition vs inheritance

### DBMS

* ACID
* Normalization
* Indexing
* Transactions
* SQL vs NoSQL

### OS

* Process vs thread
* Deadlock
* 4 conditions of deadlock
* Context switching
* Concurrency

### Networking

* HTTP vs HTTPS
* TCP vs UDP
* DNS
* HTTP status codes
* REST
* CORS

---

# 🔥 Top 30 — If you have limited time tonight

If you only have **3–4 hours**, do these first:

1. **Explain Node.js architecture.**
2. **Explain Event Loop.**
3. **Why is Node.js called single-threaded?**
4. **How does Node handle multiple requests?**
5. **What is libuv?**
6. **What happens with CPU-intensive work in Node?**
7. **Promise vs async/await.**
8. **Promise.all vs Promise.allSettled.**
9. **Explain microtasks vs macrotasks.**
10. **Explain middleware in Express.**
11. **How do you implement authentication middleware?**
12. **JWT authentication flow.**
13. **How do you handle errors globally?**
14. **How do you secure an Express API?**
15. **How do you optimize a Node API?**
16. **MongoDB indexing.**
17. **MongoDB aggregation.**
18. **MongoDB vs SQL.**
19. **Pagination approaches.**
20. **RabbitMQ architecture.**
21. **RabbitMQ vs Kafka.**
22. **How do you handle duplicate messages?**
23. **Microservices vs monolith.**
24. **How do microservices communicate?**
25. **Redis use cases.**
26. **REST API design.**
27. **AWS EC2/S3 deployment.**
28. **Docker basics.**
29. **Sliding window coding problem.**
30. **Explain your current project end-to-end.**

---

## ⚠️ One important thing

Don't prepare these as textbook definitions.

For a **Senior Software Engineer** interview, if you say:

> "Node.js is single-threaded and uses an event loop."

the interviewer can immediately ask:

> **"Okay, then how can Node.js handle 10,000 concurrent requests?"**

Then:

> **"What if one request does CPU-intensive processing?"**

Then:

> **"How would you solve that?"**

Then:

> **"Worker threads or cluster?"**

That's the level I would expect.

Recent Infosys reports also show this movement toward architecture/practical questions rather than only definitions. ([Glassdoor][1])

### My recommendation for you

**Don't try to memorize 200 answers tonight.**

We should do a **real Infosys mock interview** based on your profile:

**Round 1:** JavaScript + Node.js
**Round 2:** Express + MongoDB + Redis + RabbitMQ
**Round 3:** Project deep dive
**Round 4:** System design
**Round 5:** 2 coding problems
**Round 6:** HR/managerial

I'll ask **one question at a time exactly like an interviewer**, and after you answer I'll tell you **what was good, what was missing, and give you a natural answer you can actually speak tomorrow**.

[Infosys Careers](https://www.infosys.com/careers.html?utm_source=chatgpt.com)

[1]: https://www.glassdoor.co.in/Interview/Node-js-architecture-level-questions-Javascript-architecture-questions-QTN_7094242.htm?utm_source=chatgpt.com "Infosys Interview Question: Node js architecture level questions Javascript architecture questions | Glassdoor"
[2]: https://www.reddit.com/r/infosys/comments/1wcotdw/infosys_interview_experience_oa_technical_rounds/?utm_source=chatgpt.com "Infosys Interview Experience – OA + Technical Rounds"
[3]: https://www.glassdoor.com/Interview/node-js-developer-interview-questions-SRCH_KO0%2C17_SDRD.htm?utm_source=chatgpt.com "Node Js Developer Interview Questions | Glassdoor"
[4]: https://www.glassdoor.co.in/Interview/What-is-the-event-loop-in-Node-js-How-do-you-handle-authentication-using-a-middleware-QTN_7518700.htm?utm_source=chatgpt.com "Infosys Interview Question: What is the event loop in Node.js How do you handle authentication using a middleware | Glassdoor"
[5]: https://nodeflair.com/companies/infosys/interviews/senior-software-engineer-ui2h4n?utm_source=chatgpt.com "Infosys Senior Software Engineer Interview Questions"
[6]: https://www.glassdoor.co.in/Interview/They-asked-a-medium-level-Dynamic-Programming-DP-coding-problem-to-evaluate-problem-solving-skills-The-interviewer-also-QTN_9084477.htm?utm_source=chatgpt.com "Infosys Interview Question: They asked a medium-level Dynamic Programming (DP) coding problem to evaluate problem-solving skills. The interviewer also asked MERN stack questions related to React, Node.js, Express.js, and MongoDB, along with SQL queries (joins, aggregation, and basic queries). Additionally, they asked Computer Science fundamentals including OOP, DBMS, Operating Systems, and Computer Networks. | Glassdoor"
[7]: https://www.glassdoor.co.in/Interview/NodeJs-Questions-Microservices-Questions-I-O-and-One-DSA-question-QTN_8758070.htm?utm_source=chatgpt.com "Infosys Interview Question: NodeJs Questions, Microservices Questions, I/O and One DSA question | Glassdoor"
[8]: https://medium.com/%40rhythm6194/interview-experience-for-the-power-programmer-specialist-programmer-role-at-infosys-mean-mern-858d3831693b?utm_source=chatgpt.com "Interview Experience for the Power Programmer/Specialist Programmer Role at Infosys (MEAN/MERN) - Lateral Hiring (Q2-FY-25) | by Rhythm Khandelwal | Medium"
[9]: https://justskills.in/posts/infosys-specialist-programmer-interview-experience-on-campus-2025?utm_source=chatgpt.com "Infosys (Specialist Programmer) Interview Experience On Campus | 2025"

---

For your **Infosys Senior Software Engineer – Node.js** interview, I’d prepare these **machine-coding problems** in this order:

### 🔴 Must practice

1. **URL Shortener**

   * Create short URL
   * Redirect to original URL
   * Expiry
   * Collision handling

2. **Rate Limiter**

   * Fixed window
   * Sliding window
   * Token bucket
   * Redis-based implementation

3. **LRU Cache**

   * `get()`
   * `put()`
   * O(1) operations
   * HashMap + Doubly Linked List

4. **Task / Job Queue**

   * Add jobs
   * Process jobs
   * Retry failed jobs
   * Concurrency limit

5. **Notification System**

   * Email/SMS/WhatsApp
   * Queue-based processing
   * Retry
   * Failure handling

6. **Payment System**

   * Create payment
   * Payment status
   * Callback/webhook
   * Idempotency
   * Duplicate callback handling

7. **API with Pagination + Filtering**

   * Pagination
   * Sorting
   * Search
   * Filters
   * MongoDB indexes

8. **File Upload Service**

   * Upload
   * Validation
   * S3 storage
   * Presigned URL
   * Download

---

### 🟠 Very useful for Node.js

9. **In-memory Event Emitter**

10. **Pub/Sub System**

11. **Retry Mechanism with Exponential Backoff**

12. **Circuit Breaker**

13. **Concurrent API Processor**

* Process 100 APIs
* Maximum 5 simultaneously
* Retry failures

14. **Caching Layer**

* Cache-aside
* TTL
* Cache invalidation

15. **Distributed Lock**

16. **Cron Job Scheduler**

17. **Simple Logger**

* Levels
* File/console output
* Rotation

18. **Authentication System**

* Register
* Login
* JWT
* Refresh token
* Role-based authorization

---

### 🟡 Classic machine coding / LLD

19. **Parking Lot**

20. **Library Management System**

21. **Movie Ticket Booking**

22. **Elevator System**

23. **Car Rental System**

24. **Hotel Booking System**

25. **ATM**

26. **Inventory Management**

27. **Splitwise**

28. **Food Ordering System**

29. **Ride Booking / Uber-like system**

30. **Chess / Tic-Tac-Toe**

---

## 🎯 For YOUR interview tomorrow

Don't try to code all 30.

I would specifically practice these **5 tonight**:

**1. LRU Cache**
**2. Rate Limiter**
**3. Task Queue with concurrency + retry**
**4. Payment API with idempotency**
**5. URL Shortener**

These will also let you demonstrate the Node.js concepts you've actually worked with: **Redis, RabbitMQ, MongoDB, REST APIs, async processing, retries and concurrency**.

If they give you a **90-minute machine-coding round**, the most likely style is not just "write a function." They may expect:

```text
Requirements
   ↓
API / class design
   ↓
Data model
   ↓
Implementation
   ↓
Error handling
   ↓
Edge cases
   ↓
Test with examples
```

And for a **Senior** role, explain your design decisions while coding rather than silently writing code.
