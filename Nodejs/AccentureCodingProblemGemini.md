# Accenture Custom Software Engineer Coding Interview Session Log

---

## 1. Interview Strategy: How to Answer "What do you know about Accenture?" / "Why Accenture?"

When an interviewer asks *"What do you know about Accenture?"* or *"Why Accenture?"*, they are not looking for a Wikipedia recital of revenue or employee headcount. They want to know if you understand **their business model**, **their culture**, and **where you fit as a Custom Software Engineer**.

### Recommended Answer Structure (3-Part Framework)

1. **The Big Picture (Company Identity)**
   > *"Accenture is a global leader in technology, consulting, and digital transformation. What stands out to me is how Accenture doesn't just consult—it builds enterprise solutions at scale using technology and human ingenuity to deliver '360° Value' to clients."*

2. **Why Custom Software Engineering at Accenture?**
   > *"As a Custom Software Engineer, I'm drawn to Accenture because you work with multi-cloud environments, modern software architectures, and complex enterprise integrations across 40+ industries. The focus isn't just on writing code, but on building tailored, scalable solutions that solve real-world business challenges from the ground up."*

3. **Growth Culture & Skilling**
   > *"I also admire Accenture’s focus on continuous learning—specifically initiatives like TQ (Technology Quotient) and heavy investment in upskilling employees in emerging stack areas like AI, cloud, and modern microservices. It’s an environment where I can grow technically while delivering high-impact work."*

---

## 2. Practice Coding Questions & Evaluation Log

---

### Question 1: Group Array of Objects by Field

#### Problem Statement
Write a function that takes an array of objects and a property key, then returns an object where the keys are the unique values of that property, and the values are arrays containing the matching objects.

**Example Input:**
```javascript
const data = [
  { name: "Alice", role: "Developer", salary: 80000 },
  { name: "Bob", role: "Designer", salary: 70000 },
  { name: "Charlie", role: "Developer", salary: 90000 },
  { name: "David", role: "Manager", salary: 110000 }
];

groupBy(data, "role");
```

**Expected Output:**
```javascript
{
  Developer: [
    { name: "Alice", role: "Developer", salary: 80000 },
    { name: "Charlie", role: "Developer", salary: 90000 }
  ],
  Designer: [
    { name: "Bob", role: "Designer", salary: 70000 }
  ],
  Manager: [
    { name: "David", role: "Manager", salary: 110000 }
  ]
}
```

#### Your Submitted Solution
```javascript
const data = [
  { name: "Alice", role: "Developer", salary: 80000 },
  { name: "Bob", role: "Designer", salary: 70000 },
  { name: "Charlie", role: "Developer", salary: 90000 },
  { name: "David", role: "Manager", salary: 110000 }
];

groupBy(data, "role");

function groupBy(list, field) {
  const group = {};

  for (const key of list) {
    group[key[field]] = null
  }

  for (const key of list) {
    if (group[key[field]] === null) {
      group[key[field]] = [key]
    }else{
      group[key[field]].push(key)
    }
  }

  console.log(group);
  
  return group;
}
```

#### Evaluation & Interviewer Feedback
* **Score:** 7 / 10
* **Interviewer Perspective:**
  1. **Redundant Iteration:** You iterate over the `list` array twice using two separate `for...of` loops. The first loop initializes keys to `null`, and the second populates the arrays. This increases unnecessary execution steps.
  2. **Variable Naming Clarity:** Naming the loop item `key` inside `for (const key of list)` is slightly confusing because `key` is actually an object, not a property string.
  3. **Style:** While standard loops are acceptable, modern array methods like `Array.prototype.reduce()` or checking key existence dynamically inside a single loop demonstrate higher proficiency in JavaScript.

#### Optimal Refactored Solutions

**Approach 1: Single `for...of` Loop (Clean & Standard)**
```javascript
function groupBy(list, field) {
  const group = {};

  for (const item of list) {
    const fieldValue = item[field];
    
    // Initialize the array if the key doesn't exist yet
    if (!group[fieldValue]) {
      group[fieldValue] = [];
    }
    
    group[fieldValue].push(item);
  }

  return group;
}
```

**Approach 2: `Array.prototype.reduce()` (Senior Level/Idiomatic JS)**
```javascript
function groupBy(list, field) {
  return list.reduce((acc, item) => {
    const key = item[field];
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {});
}
```

---

### Question 2: Find Second Largest Element in Array Without Sorting

#### Problem Statement
Find the second largest element in an array of integers without sorting the array.
* **Example Input:** `[12, 35, 1, 10, 34, 1]`
* **Expected Output:** `34`
* **Constraints:** Must run in $O(N)$ time complexity. Handle duplicate elements gracefully (e.g., in `[10, 10, 9]`, the second largest distinct value is `9`).

#### Your Submitted Solutions & Revisions

**Attempt 1:**
```javascript
const arr = [12, 35, 1, 10, 34, 1];
let firstLargest = -Infinity, secondLargest = -Infinity;
for (const element of arr) {
    if(firstLargest < element){
      firstLargest = element;
    }else if( element < firstLargest &&  secondLargest < element ){
      secondLargest = element
    }
}

console.log({secondLargest});
```
* **Score:** 7.5 / 10
* **Interviewer Feedback:** Overwriting `firstLargest` without saving its old value to `secondLargest` causes bugs in strictly increasing sequences like `[10, 20, 30]`.

**Attempt 2 (Follow-up adjustment):**
```javascript
const arr = [10, 20, 30, 30, 40];
let firstLargest = -Infinity, secondLargest = -Infinity;
for (const element of arr) {
  if (firstLargest < element) {
    firstLargest = element;
  } else if ( element < firstLargest && secondLargest < element) {
    secondLargest = element
  }else if(secondLargest === -Infinity){
    secondLargest = element
  }
}

console.log({ secondLargest });
```
* **Score:** 4 / 10
* **Interviewer Feedback:** Still fails on strictly increasing inputs like `[10, 20, 30, 40]` because no duplicate triggers the third condition. The fundamental step missed is handing off `secondLargest = firstLargest` before reassigning `firstLargest`.

#### Optimal Refactored Solution
```javascript
function findSecondLargest(arr) {
  if (arr.length < 2) return null;

  let firstLargest = -Infinity;
  let secondLargest = -Infinity;

  for (const element of arr) {
    if (element > firstLargest) {
      // Shift current maximum to second position before updating maximum
      secondLargest = firstLargest;
      firstLargest = element;
    } else if (element < firstLargest && element > secondLargest) {
      secondLargest = element;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}
```

---

### Question 3: Password Rules Validator

#### Problem Statement
Write a function `validatePassword(password)` that returns `true` if all of the following rules are met, and `false` otherwise:
1. Minimum length of **8 characters**.
2. Must contain at least **one uppercase letter**.
3. Must contain at least **one digit**.
4. Must **not** contain any spaces or hyphens (`-`).

* **Example 1:** `"Accenture2026"` -> `true`
* **Example 2:** `"acc2026"` -> `false`
* **Example 3:** `"Accenture 2026"` -> `false`

#### Your Submitted Solutions & Revisions

**Attempt 1:**
```javascript
function validatePassword(password) {
  if (!password || password.length < 8 || [" ", "-"].includes(password)) return false ;

  const regex = /[A-Z]/g
  const numRegex = /[0-9]/g
  if (!regex.test(password)) return false;
  if (!numRegex.test(password)) return false;
  return true
}
```
* **Score:** 5.5 / 10
* **Interviewer Feedback:** `[" ", "-"].includes(password)` checks if the entire password string is `" "` or `"-"`, failing to catch spaces/hyphens within longer passwords like `"Accenture 2026"`.

**Attempt 2 (Correction):**
```javascript
function validatePassword(password) {
  if (!password || password.length < 8 || /[- ]/g.test(password)) return false ;

  const regex = /[A-Z]/g
  const numRegex = /[0-9]/g
  if (!regex.test(password)) return false;
  if (!numRegex.test(password)) return false;
  return true
}
```
* **Score:** 8.5 / 10
* **Interviewer Feedback:** Excellent adaptation using regex character class `/[- ]/`. Small recommendation to omit the global `/g` flag when using `.test()` to prevent state retention bugs.

#### Optimal Refactored Solution
```javascript
function validatePassword(password) {
  if (!password || password.length < 8) return false;

  // Reject if it contains spaces or hyphens
  if (/[\s-]/.test(password)) return false;

  // Ensure at least one uppercase letter and one digit
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  return hasUppercase && hasDigit;
}
```

---

### Question 4: Move Zeros to End

#### Problem Statement
Write a function `moveZerosToEnd(arr)` that takes an array of numbers and moves all `0`s to the end of the array while maintaining the relative order of all non-zero elements.
* **Example 1:** `[0, 1, 0, 3, 12]` -> `[1, 3, 12, 0, 0]`
* **Example 2:** `[0, 0, 1]` -> `[1, 0, 0]`
* **Constraint:** $O(N)$ time complexity, in-place modification preferred.

#### Your Submitted Solution
```javascript
function moveZerosToEnd(arr) {

  let left = 0, right = arr.length - 1;

  while(arr[right] === 0){
    right --;
  }

  while (left < right) {
    if (arr[left] === 0) {
        arr[left] = arr[right];
        arr[right] = 0;

        right --;
    }
    left ++;
  }

  return arr;
}
```

#### Evaluation & Interviewer Feedback
* **Score:** 4.5 / 10
* **Interviewer Perspective:**
  1. **Missed Constraint:** Swapping from opposite ends (`right` pointer moving backwards) changes the relative order of non-zero elements (e.g., `[0, 1, 0, 3, 12]` produced `[12, 1, 3, 0, 0]`).
  2. **Read/Write Pointer Technique:** To maintain relative ordering, both pointers must move from left to right.

#### Optimal Refactored Solutions

**Approach 1: Read/Write Pointers (Clear $O(N)$ Time, $O(1)$ Space)**
```javascript
function moveZerosToEnd(arr) {
  let writeIndex = 0;

  // Step 1: Shift non-zero elements forward
  for (let readIndex = 0; readIndex < arr.length; readIndex++) {
    if (arr[readIndex] !== 0) {
      arr[writeIndex] = arr[readIndex];
      writeIndex++;
    }
  }

  // Step 2: Fill remaining slots with zeros
  while (writeIndex < arr.length) {
    arr[writeIndex] = 0;
    writeIndex++;
  }

  return arr;
}
```

**Approach 2: Single-Pass Swapping**
```javascript
function moveZerosToEnd(arr) {
  let nonZeroIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      [arr[nonZeroIndex], arr[i]] = [arr[i], arr[nonZeroIndex]];
      nonZeroIndex++;
    }
  }

  return arr;
}
```

---

## 3. Interview Performance Summary Table

| Question | Topic | Score | Core Strength / Area to Improve |
| :--- | :--- | :--- | :--- |
| **Q1: Grouping Objects** | Array Data Manipulation | **7.0 / 10** | Good problem-solving ability; optimize by avoiding redundant array iterations. |
| **Q2: Second Largest** | Algorithm Logic & Constraints | **4.0 / 10** | Ensure max pointers hand off their values before reassignment during single-pass loops. |
| **Q3: Password Rules** | String Validation & Regex | **8.5 / 10** | Strong regular expression usage and quick bug resolution. |
| **Q4: Move Zeros** | Two-Pointer Array Mutation | **4.5 / 10** | Pay strict attention to relative ordering constraints in pointer swapping algorithms. |

**Overall Average Rating:** **6.0 / 10**

---

## 4. Key Takeaways for your Accenture Interview

1. **Verify All Constraints Before Coding:** Carefully check for conditions like "maintain relative order" or "in $O(N)$ time".
2. **Trace Edge Cases Out Loud:** Test edge cases (e.g., strictly increasing arrays `[10, 20, 30]`, missing parameters, duplicate values) with simple traces before presenting your solution.
3. **Master Modern JS Idioms:** Practice single-pass loops, `Array.prototype.reduce()`, and two-pointer array manipulation patterns.