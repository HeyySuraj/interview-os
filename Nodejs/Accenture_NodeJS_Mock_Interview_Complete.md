# 🎯 Accenture Node.js Mock Interview — Complete Session

> **Interview Preparation Session**
>
> Focus: **Node.js • JavaScript • Express.js • Event Loop • JWT • PostgreSQL • Redis • Backend Performance**
>
> Format: One question at a time → voice answer → review → score → corrections → next question

---

## 📌 Session Overview

This document contains the complete mock interview session so far, including:

- Every interview question
- Your spoken answer, cleaned up for readability
- Detailed interviewer-style feedback
- Technical corrections
- Scores
- Stronger answer points
- Key concepts to revise
- The next question at each stage

### Overall Progress

| Question | Topic | Score |
|---|---|---:|
| 1 | What is Node.js? | ⭐ 7/10 |
| 2 | Event Loop & 1,000 concurrent requests | ⭐ 7.5/10 |
| 3 | Event Loop execution order | ⭐ 7/10 |
| 4 | `await` & DB I/O | ⭐ 6.5/10 |
| 5 | CPU-bound work & blocking | ⭐ 8/10 |
| 6 | Express centralized error handling | ⭐ 7/10 |
| 7 | `throw`, `next(error)`, `res.status()` | ⭐ 6.5/10 |
| 8 | JWT authentication | ⭐ 8/10 |
| 9 | Access & refresh tokens | ⭐ 7.5/10 |
| 10 | PostgreSQL + 10M users | ⭐ 8/10 |
| 11 | Database indexing | ⭐ 6.5/10 |
| 12 | Debugging a slow query | ⭐ 6.5/10 |
| 13 | Redis caching | ⭐ 8.5/10 |

**Average so far: ~7.3/10**

---

# 🧑‍💻 Interview Style

The interview is being conducted like a real backend interview:

1. One question at a time.
2. Answer verbally.
3. Review the answer honestly.
4. Identify technical inaccuracies.
5. Explain what an interviewer would think.
6. Give a stronger way to answer.
7. Increase difficulty progressively.

> **Important pattern:** Your practical understanding is generally good. The biggest improvement area is **technical precision and avoiding absolute statements**.

---

# 1️⃣ Node.js Fundamentals

## 🎤 Question

**What is Node.js, and why would you choose Node.js for building a backend application?**

### 🗣️ Your Answer — Summary

You explained that Node.js is:

- A backend runtime environment for JavaScript.
- Used to build backend services and APIs.
- Useful for I/O operations.
- Capable of asynchronous operations.
- Single-threaded.
- Easy and user-friendly.
- Easy for new developers because JavaScript syntax is simple.

### ⭐ Score: 7/10

### ✅ What You Did Well

- Correctly identified Node.js as a **JavaScript runtime environment**.
- Mentioned backend APIs/services.
- Mentioned I/O.
- Mentioned asynchronous operations.
- Gave reasons for choosing Node.js.

### ⚠️ Corrections

Don't simply say:

> "Node.js is single-threaded."

Better:

> Node.js executes JavaScript on a single main thread using the event loop, while asynchronous I/O can be handled through the underlying operating system and libuv mechanisms.

Also, **dynamic typing** isn't a major reason to choose Node.js for backend development.

### 💡 Stronger Answer

> Node.js is a JavaScript runtime environment built on Chrome's V8 engine that allows us to execute JavaScript outside the browser and build backend applications.
>
> It is particularly useful for I/O-heavy applications because it uses an event-driven, non-blocking architecture. This allows the application to handle many concurrent I/O operations without blocking the main JavaScript thread.
>
> It also has a large npm ecosystem and allows teams to use JavaScript/TypeScript across both frontend and backend.

---

# 2️⃣ Event Loop & 1,000 Requests

## 🎤 Question

**If Node.js runs JavaScript on a single main thread, how can it handle 1,000 requests at the same time? Explain the Event Loop and asynchronous I/O.**

### 🗣️ Your Answer — Summary

You explained:

- Node.js executes JavaScript on one main thread.
- Event Loop and libuv help handle asynchronous operations.
- Work can be offloaded so the main thread can continue handling requests.
- Callbacks are processed after asynchronous work completes.

### ⭐ Score: 7.5/10

### ✅ Correct Concepts

- Main JavaScript execution thread.
- Event Loop.
- libuv.
- Asynchronous operations.
- Other requests can continue while I/O is pending.

### ⚠️ Important Corrections

Don't say:

> "All async operations are offloaded to another working thread."

That's not always true.

For example:

- Some filesystem/crypto/DNS operations use libuv's thread pool.
- Network I/O commonly uses operating-system asynchronous mechanisms.

### Better Statement

> Node.js doesn't block the JavaScript thread while waiting for asynchronous I/O. The underlying OS/libuv mechanisms handle the I/O, and once the operation completes, the corresponding callback or Promise continuation is scheduled for execution.

### Core Mental Model

```text
1000 Requests
      ↓
   Node.js
      ↓
   Event Loop
      ↓
 ┌────┴───────────────┐
 │                    │
Sync JS           Async I/O
 │                    │
 ↓               OS / libuv
                  │
                  ↓
            Operation done
                  │
                  ↓
             Event Loop
                  │
                  ↓
               Response
```

---

# 3️⃣ Event Loop Execution Order

## 🎤 Question

What is the output?

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

process.nextTick(() => {
  console.log("D");
});

console.log("E");
```

### 🗣️ Your Answer

You reasoned that:

- `A` is synchronous.
- `setTimeout` is asynchronous.
- Promise callback goes to the microtask mechanism.
- `process.nextTick()` has higher priority.
- `E` executes synchronously.
- Timer runs later.

You accidentally said the final output was:

```text
A E B C B
```

### ⭐ Score: 7/10

### ❌ Correct Output

```text
A
E
D
C
B
```

### Why?

```text
1. console.log("A")      → A
2. setTimeout            → timer
3. Promise.then          → Promise microtask
4. process.nextTick      → nextTick queue
5. console.log("E")      → E

Synchronous execution finishes.

6. process.nextTick       → D
7. Promise microtask      → C
8. Timer                  → B
```

### Important Terminology

Don't say:

> "JavaScript pushes synchronous code to the event loop in the call stack."

Better:

> Synchronous JavaScript executes on the call stack. Once the current synchronous execution completes, Node.js processes pending asynchronous work according to its scheduling rules.

---

# 4️⃣ `await` and Database I/O

## 🎤 Question

Given:

```js
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

If the database takes 3 seconds, does the Node.js main thread get blocked?

### 🗣️ Your Answer — Summary

You correctly said:

- `User.find()` gets data from the DB.
- `await` waits for the result.
- The main thread can handle other work.
- The database operation is asynchronous.
- The response is sent once the query finishes.

### ⭐ Score: 6.5/10

### ❌ Important Correction

You said:

> "await will go to the microtask queue."

Not exactly.

`await` pauses execution of the **async function** while the Promise is pending.

The database operation itself isn't simply "put into the microtask queue."

### Correct Flow

```text
Request
   ↓
Express handler
   ↓
User.find()
   ↓
DB query starts
   ↓
Async function pauses at await
   ↓
Node.js handles other work
   ↓
DB completes
   ↓
Promise resolves
   ↓
Continuation after await runs
   ↓
res.json(users)
```

### Better Explanation

> The database driver performs an asynchronous network operation. While the database is processing the query, the JavaScript thread is free to execute other work. Once the Promise resolves, the continuation after `await` is scheduled and eventually executes `res.json()`.

---

# 5️⃣ CPU-Bound Work Blocking Node.js

## 🎤 Question

What happens here?

```js
app.get("/users", async (req, res) => {
  const users = await User.find();

  for (let i = 0; i < 5000000000; i++) {
    // heavy calculation
  }

  res.json(users);
});
```

Will other requests be affected?

### 🗣️ Your Answer — Summary

You correctly explained:

- DB query is asynchronous.
- Other requests can be handled while waiting for DB.
- The huge loop is CPU-intensive.
- The loop runs synchronously on the main JavaScript thread.
- Other requests are blocked while the loop runs.

### ⭐ Score: 8/10

### Key Principle

> **Node.js is excellent for I/O-bound workloads, but CPU-bound JavaScript can block the Event Loop.**

### Production Solutions

#### 1. Worker Threads

```text
Main Thread
    │
    ├── HTTP requests
    │
    └── Worker Thread
           │
           └── Heavy calculation
```

#### 2. Background Job

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Heavy Processing
```

Examples include RabbitMQ/BullMQ-style architectures.

#### 3. Separate Service

Move computationally expensive work into a dedicated service.

#### 4. Optimize the Algorithm

Before adding infrastructure, determine whether the algorithm itself can be made more efficient.

---

# 6️⃣ Express Centralized Error Handling

## 🎤 Question

How do you implement centralized error handling in Express?

### 🗣️ Your Answer — Summary

You mentioned:

- `app.use()`
- Middleware.
- Request/response/next.
- Centralized handling.
- HTTP status codes.
- Registering the middleware in `app.js`/`server.js`.

### ⭐ Score: 7/10

### ❌ Important Correction

Express error middleware has **four parameters**:

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});
```

Normal middleware:

```js
(req, res, next)
```

Error middleware:

```js
(err, req, res, next)
```

### Registration Order

```text
Request
   ↓
Normal Middleware
   ↓
Routes
   ↓
Error
   ↓
Error Middleware
   ↓
Response
```

Error middleware should generally be registered **after routes**.

### Error Propagation

```js
next(error);
```

tells Express to enter the error-handling pipeline.

### Status Code Corrections

| Status | Meaning |
|---|---|
| 400 | Bad Request |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 504 | Gateway Timeout |

---

# 7️⃣ `throw`, `next(error)`, and `res.status()`

## 🎤 Question

What is the difference between:

```js
throw error;
```

```js
next(error);
```

```js
return res.status(500).json(...);
```

### 🗣️ Your Answer — Summary

You explained:

- `throw` throws an error.
- `next(error)` can pass the error to error middleware.
- `res.status(500).json()` directly returns a response.

You incorrectly suggested the server would necessarily break.

### ⭐ Score: 6.5/10

### `throw error`

Throws an exception.

Inside an `async` function, a thrown error causes the returned Promise to become rejected.

### `next(error)`

Explicitly tells Express:

> There is an error; route this to error-handling middleware.

```js
next(error);
```

### `res.status(500).json()`

This directly sends a response.

It doesn't propagate an error.

```js
return res.status(500).json({
  message: "Internal Server Error"
});
```

### Express Version Detail

In modern **Express 5**, rejected Promises from async route handlers are automatically forwarded to error handling.

In older Express 4 patterns, async errors generally needed explicit handling/wrapping.

---

# 8️⃣ JWT Authentication

## 🎤 Question

Explain:

**Login → JWT generated → client stores token → protected API → JWT validation → controller**

Also explain authentication vs authorization.

### 🗣️ Your Answer — Summary

You explained:

- User provides credentials.
- Backend validates credentials.
- JWT is generated.
- JWT contains header, payload, signature.
- Client stores token.
- Client sends token with protected requests.
- Middleware validates token.
- Authentication identifies the user.
- Authorization determines whether the user can access a resource.

### ⭐ Score: 8/10

### Excellent Core Concept

> **Authentication = Who are you?**

> **Authorization = What are you allowed to do?**

Example:

```text
User logs in
    ↓
Authentication
    ↓
"I am Suraj"
    ↓
Authorization
    ↓
"Can Suraj access Admin API?"
```

### JWT Structure

```text
Header.Payload.Signature
```

### Important Correction

JWT payload/header are normally **Base64URL encoded**, not encrypted.

Never put sensitive information such as passwords in the payload.

### Signature

For symmetric signing:

```text
HMAC(
  encodedHeader + "." + encodedPayload,
  secret
)
```

For asymmetric algorithms such as RS256:

```text
Private Key → Sign
Public Key  → Verify
```

---

# 9️⃣ Access Token + Refresh Token

## 🎤 Question

If the access token expires every 15 minutes, how can users stay logged in without logging in every 15 minutes?

### 🗣️ Your Answer — Summary

You explained:

- Access tokens can have short expiration.
- Refresh tokens have longer expiration.
- Refresh token can be used to generate another access token.
- If refresh token expires, user must log in again.
- Tokens can be stored client-side or server-side.

### ⭐ Score: 7.5/10

### Recommended Architecture

```text
Access Token
   ↓
Short-lived
Example: 15 min

Refresh Token
   ↓
Longer-lived
Example: days/weeks
```

### Refresh Flow

```text
Access Token Expired
        ↓
Client sends Refresh Token
        ↓
Server validates it
        ↓
New Access Token
        ↓
Client continues API calls
```

### Important Production Concepts

#### Refresh Token Rotation

```text
Old Refresh Token
       ↓
Validate
       ↓
Invalidate old token
       ↓
Generate new Access Token
       ↓
Generate new Refresh Token
```

#### Storage

For web applications, a common approach is:

- Access token: short-lived
- Refresh token: `HttpOnly + Secure` cookie
- Server-side session/token state when revocation is required

### Important Principle

Don't rely on a 12-hour access token simply to avoid refresh tokens. Long-lived access tokens increase the impact of token theft.

---

# 🔟 PostgreSQL + 10 Million Users

## 🎤 Question

Given:

```js
const users = await db.user.findMany();
```

with 10 million PostgreSQL users, how do you fix the performance/memory problem?

### 🗣️ Your Answer — Summary

You suggested:

- Pagination.
- Limit.
- Sorting.
- Indexes.
- Redis.
- Avoid loading all users into Node.js memory.
- Reduce response size.

### ⭐ Score: 8/10

### Correct Production Approach

Don't fetch:

```sql
SELECT *
FROM users;
```

for an API response containing millions of records.

Use pagination:

```sql
SELECT id, name, email
FROM users
ORDER BY id
LIMIT 20;
```

### Offset Pagination

```text
LIMIT 20
OFFSET 1000
```

Works, but very large offsets can become inefficient.

### Cursor / Keyset Pagination

For large datasets:

```sql
SELECT id, name, email
FROM users
WHERE id > 1000
ORDER BY id
LIMIT 20;
```

This can scale better.

### Also Select Only Required Columns

Avoid:

```sql
SELECT *
```

when the API only needs:

```text
id
name
email
```

### Important Correction

Don't say:

> "Fetching all rows will lock the database."

Instead say it can cause:

- High CPU/I/O
- Memory pressure
- Connection pool exhaustion
- Network bandwidth consumption
- High latency
- Long query execution
- Increased contention

---

# 1️⃣1️⃣ PostgreSQL Indexing

## 🎤 Question

For:

```sql
SELECT *
FROM users
WHERE email = 'suraj@example.com';
```

with 10 million users:

1. What is an index?
2. How does it improve the query?
3. What happens internally?
4. What are disadvantages?

### 🗣️ Your Answer — Summary

You used the textbook analogy:

> A database index is like the index of a book.

You explained that:

- We can index email.
- It helps locate the required data faster.
- Too many indexes have costs.

### ⭐ Score: 6.5/10

### Important Correction

An index isn't simply "sorting the table."

A PostgreSQL B-tree index is a separate data structure that helps locate rows efficiently.

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Conceptually:

```text
Email Index
    ↓
email → row location
```

### High-Level Query Flow

```text
WHERE email = 'suraj@example.com'
              ↓
       PostgreSQL Query Planner
              ↓
        Uses email index
              ↓
     Finds matching index entry
              ↓
       Finds table row
              ↓
          Returns row
```

### Check the Query Plan

```sql
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'suraj@example.com';
```

### Index Disadvantages

- Additional disk storage.
- INSERT becomes more expensive.
- UPDATE may require index maintenance.
- DELETE requires index maintenance.
- Too many indexes increase maintenance overhead.

### Key Interview Sentence

> **Indexes improve read performance but add storage and write/maintenance cost.**

Also remember:

> PostgreSQL is not forced to use an index. The query planner decides whether using it is beneficial.

---

# 1️⃣2️⃣ Debugging a Slow Indexed Query

## 🎤 Question

The API:

```http
GET /users?email=suraj@example.com
```

has an index on `email`, but is still slow.

How would you investigate?

### 🗣️ Your Answer — Summary

You suggested:

- Check traffic.
- Check database size.
- Check indexes.
- Check DB resource contention.
- Check whether something is locking the database.

### ⭐ Score: 6.5/10

### Main Missing Concept

The first major tool should be:

```sql
EXPLAIN ANALYZE
SELECT *
FROM users
WHERE email = 'suraj@example.com';
```

### Recommended Debugging Process

#### 1. Measure instead of guessing

Check the actual execution plan.

#### 2. Check whether the index is being used

You may see:

```text
Index Scan
```

or:

```text
Seq Scan
```

A sequential scan over millions of rows may explain the latency.

#### 3. Check database health

Investigate:

```text
CPU
Memory
Disk I/O
Connections
Connection Pool
Locks
Long-running queries
```

#### 4. Check application latency

The DB may be fast while another part of the API is slow.

```text
Request
  ↓
Express
  ↓
DB Query        20ms
  ↓
Application     2 sec
  ↓
JSON serialization
  ↓
Network
```

Measure each stage.

### Strong Interview Answer

> "I would first measure rather than guess. I'd use EXPLAIN ANALYZE to determine whether PostgreSQL is using the expected index and how much work the query is doing. Then I'd investigate database resources, locks, connection pool usage, and application-level latency."

---

# 1️⃣3️⃣ Redis Caching

## 🎤 Question

The API:

```http
GET /users/123
```

is requested thousands of times per minute and PostgreSQL is overloaded.

Explain:

**Request → Redis → Cache Hit/Miss → PostgreSQL → Redis → Response**

Also:

1. What is a cache hit?
2. What is a cache miss?
3. Where is TTL set?
4. What happens when user 123 changes?
5. What problems can caching introduce?

### 🗣️ Your Answer — Summary

You explained:

- Redis is an in-memory data store.
- Cache the frequently requested result.
- Check Redis first.
- Cache hit → return cached value.
- Cache miss → query PostgreSQL.
- Store result in Redis.
- TTL controls expiration.
- DB updates can create stale cache.
- Cache can consume a lot of RAM.

### ⭐ Score: 8.5/10

This was one of your strongest answers.

### Cache-Aside Pattern

```text
Request
   ↓
Redis
   ↓
Cache Hit? ─── Yes ───→ Return Data
   │
   No
   ↓
PostgreSQL
   ↓
Store in Redis
   ↓
Return Response
```

### Cache Hit

Requested data exists in Redis.

```text
Redis → Data → Client
```

### Cache Miss

Data doesn't exist in Redis.

```text
Redis MISS
    ↓
PostgreSQL
    ↓
Redis SET
    ↓
Response
```

### TTL

TTL = **Time To Live**

Example:

```text
user:123
TTL = 600 seconds
```

After expiration, Redis removes/evicts the key depending on configuration/eviction behavior.

### Important Correction

Redis is itself an **in-memory data store**.

Better wording:

> Redis is an in-memory data store, so frequently accessed data can usually be retrieved much faster than going to a disk-backed database.

---

## Cache Invalidation

If user 123 is updated:

```text
PUT /users/123
       ↓
Update PostgreSQL
       ↓
Invalidate Redis
       ↓
DEL user:123
```

Next request:

```text
GET /users/123
       ↓
Redis MISS
       ↓
PostgreSQL
       ↓
Redis SET
       ↓
Response
```

---

## Problems Caching Can Introduce

### 1. Stale Data

Redis contains old data while PostgreSQL contains newer data.

### 2. Memory Usage

Don't blindly cache millions of users.

### 3. Cache Stampede

```text
Cache expires
     ↓
1000 requests arrive
     ↓
1000 cache misses
     ↓
1000 DB queries
     ↓
Database overloaded
```

Possible solutions:

- Request coalescing.
- Distributed locks.
- TTL jitter.
- Background refresh.

### 4. Redis Failure

Depending on architecture, the application may fall back to PostgreSQL.

---

# ⏭️ NEXT QUESTION — Redis Consistency

The next question was:

Suppose Redis contains:

```text
user:123 → {
  name: "Suraj",
  role: "developer"
}
```

TTL = 10 minutes.

At exactly the same time:

- **Request A** updates user 123.
- **Request B** reads user 123.
- PostgreSQL and Redis are separate systems.

### Question

**How would you prevent Request B from receiving stale data?**

And:

**What consistency problems can occur if the PostgreSQL update succeeds but Redis invalidation/update fails?**

This is the next question to answer in voice.

---

# 🧠 Key Revision Sheet

Before the interview, make sure you can confidently explain these:

## Node.js

- V8
- Event Loop
- Call Stack
- libuv
- Non-blocking I/O
- CPU-bound vs I/O-bound work
- Worker Threads
- Event Loop phases
- `process.nextTick`
- Promise microtasks
- Timers
- `setImmediate`

## Express.js

- Middleware
- Route middleware
- Error middleware
- `(err, req, res, next)`
- `next()`
- `next(error)`
- Async error handling
- Express 4 vs Express 5

## Authentication

- Authentication vs Authorization
- JWT
- Header / Payload / Signature
- Base64URL encoding
- Signing vs encryption
- Access token
- Refresh token
- Token expiration
- Refresh token rotation
- HttpOnly/Secure cookies
- XSS/CSRF considerations

## PostgreSQL

- Index
- B-tree
- Query planner
- `EXPLAIN`
- `EXPLAIN ANALYZE`
- Sequential Scan
- Index Scan
- Query optimization
- Pagination
- Offset vs Cursor pagination
- Connection pool
- Locks
- Transactions

## Redis

- Cache
- Cache hit
- Cache miss
- TTL
- Cache-aside pattern
- Cache invalidation
- Stale data
- Cache stampede
- Redis memory
- Redis failure/fallback
- Distributed locking

---

# 🎯 Your Current Interview Profile

### Strong Areas

- Practical Node.js understanding
- Async programming
- CPU vs I/O distinction
- JWT fundamentals
- Redis caching
- General backend architecture
- Explaining concepts naturally

### Areas to Improve

1. **Technical terminology**
2. Avoiding absolute statements
3. Event Loop details
4. PostgreSQL internals
5. Query debugging methodology
6. Express error propagation
7. Production-level consistency patterns

### Biggest Communication Tip

Instead of saying:

> "This will break."

Say:

> "This can lead to..."

Instead of:

> "Node.js offloads everything to another thread."

Say:

> "Node.js uses the Event Loop together with OS/libuv mechanisms for asynchronous operations, and some operations use the libuv thread pool."

Instead of:

> "The DB will lock."

Say:

> "This can cause high CPU/I/O, contention, connection pressure, or long-running queries."

This small change will make your answers sound much more **senior and production-oriented**.

---

# 🏁 Current Status

**Mock interview completed:** 13 questions  
**Average score:** ~7.3/10  
**Current topic:** Redis consistency  
**Next:** Distributed consistency / cache invalidation

> 🎤 **Continue by answering Question 14 in voice.**
