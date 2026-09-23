Yes. I scanned recent **2026 PubMatic interview reports**, including Pune/India experiences. The pattern is quite clear: for Software Engineer roles, **easy–medium LeetCode-style DSA is very relevant**, with arrays/strings, hashing, intervals, linked lists, trees/graphs, and sometimes a harder problem where explaining the approach matters. A recent Aug 2026 PubMatic candidate reported **“Top K Frequent Elements” with a tie-break requiring larger numbers first**, while another reported a problem similar to **Merge Intervals**. ([Glassdoor][1])

Older PubMatic reports also show **two DSA questions in a technical round**, including arrays/strings at Medium level, and linked-list, BST, DFS, and matrix problems. ([Glassdoor][2])

Since **you have 3+ YOE and your interview is for Senior Software/UI**, I would **not** spend your remaining preparation time randomly solving 100 problems. Do these in this order.

# 🔥 PubMatic DSA — Priority List for 3+ YOE

## 🔴 Tier 1 — MUST SOLVE

### 1. Top K Frequent Elements ⭐⭐⭐⭐⭐

**Problem**

Given an array of integers and `k`, return the `k` most frequent numbers.

If two numbers have the same frequency, the **larger number should come first**.

Example:

```text
Input:
nums = [1,1,1,2,2,3]
k = 2

Output:
[1,2]
```

Tie example:

```text
nums = [4,4,1,1,3,3]
k = 2
```

All have frequency `2`, therefore:

```text
[4,3]
```

**Why I am putting this #1:**
A recent 2026 PubMatic interview explicitly reported almost exactly this question. ([Glassdoor][1])

**Pattern:** HashMap + Heap / Bucket Sort

**Target:** 20–25 min

---

### 2. Merge Intervals ⭐⭐⭐⭐⭐

```text
Input:
[[1,3],[2,6],[8,10],[9,12]]

Output:
[[1,6],[8,12]]
```

You should be able to immediately say:

> "I'll sort intervals based on the start time. Then I'll maintain the last merged interval. If the current interval overlaps, I'll extend the end; otherwise I'll push a new interval."

**Pattern:** Sorting + Greedy

**Target:** 15–20 min

A recent PubMatic candidate specifically reported a coding question similar to Merge Intervals. ([Glassdoor][1])

---

### 3. Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐

```text
Input: "abcabcbb"

Output: 3
```

You already worked on this problem recently, so **you should absolutely be able to solve this without help.**

**Pattern:** Sliding Window + HashMap

Know:

```text
left
right
Map
maxLength
```

**Target:** 10–15 min

---

### 4. Product of Array Except Self ⭐⭐⭐⭐⭐

```text
Input:
[1,2,3,4]

Output:
[24,12,8,6]
```

Important constraint:

> Don't use division.

**Pattern:** Prefix + Suffix

**Target:** 15 min

This is also directly reported in a recent PubMatic interview. ([Glassdoor][3])

---

### 5. Rotate Array ⭐⭐⭐⭐

```text
Input:
nums = [1,2,3,4,5,6,7]
k = 3

Output:
[5,6,7,1,2,3,4]
```

Know the **O(1) space reversal approach**.

```text
reverse entire array
reverse first k
reverse remaining
```

A recent PubMatic Java interview report specifically mentions rotate-array as a Round 1 DSA question. ([LeetCode][4])

---

### 6. Linked List Cycle ⭐⭐⭐⭐

```text
Given a linked list, determine whether it contains a cycle.
```

You should immediately think:

> Slow pointer + Fast pointer.

Then explain **Floyd's Cycle Detection Algorithm**.

**Time:** O(n)
**Space:** O(1)

---

### 7. Reverse Linked List ⭐⭐⭐⭐

You should be able to code this almost automatically.

```text
1 -> 2 -> 3 -> 4

4 -> 3 -> 2 -> 1
```

Know both:

* Iterative
* Recursive

---

# 🟠 Tier 2 — VERY IMPORTANT

## 8. Two Sum

```text
nums = [2,7,11,15]
target = 9

Output:
[0,1]
```

Don't give them O(n²).

Immediately:

> "I'll use a Map to store previously seen values."

---

## 9. Group Anagrams

```text
Input:
["eat","tea","tan","ate","nat","bat"]

Output:
[
 ["eat","tea","ate"],
 ["tan","nat"],
 ["bat"]
]
```

**Pattern:** HashMap

Very useful for testing whether you understand hashing.

---

## 10. Valid Anagram

Simple, but interviewers sometimes use it as a warm-up.

Know:

```text
frequency map
```

and, for lowercase English letters:

```text
frequency array of size 26
```

---

## 11. Longest Consecutive Sequence ⭐⭐⭐⭐

```text
Input:
[100,4,200,1,3,2]

Output:
4
```

Because:

```text
1,2,3,4
```

**Important:** O(n), not O(n log n).

Pattern:

> HashSet + sequence-start detection.

---

## 12. Valid Parentheses

```text
Input: "{[()]}"

Output: true
```

Pattern:

> Stack

Know why we don't simply count opening/closing brackets.

---

# 🟡 Tier 3 — Linked List / Tree

PubMatic has historically asked linked-list and tree questions, including linked-list reversal, BST operations, inorder successor and DFS. ([Glassdoor][2])

### 13. Inorder Successor in BST ⭐⭐⭐⭐

Understand the difference between:

```text
BST
Binary Tree
```

and solve using BST properties.

---

### 14. Binary Tree Level Order Traversal

```text
        1
       / \
      2   3
     / \
    4   5
```

Output:

```text
[[1],[2,3],[4,5]]
```

Pattern:

> BFS + Queue

---

### 15. Maximum Depth of Binary Tree

Very common basic recursion question.

---

### 16. Validate Binary Search Tree

Important because interviewer can extend it:

> "Can you solve it without creating an array?"

Know the **min/max boundary approach**.

---

### 17. DFS of Graph ⭐⭐⭐⭐

Know both:

```text
DFS recursive
DFS using stack
```

A PubMatic interview report specifically mentioned explaining DFS on a graph. 

---

# 🔵 Tier 4 — Sliding Window

These are **high-value for a frontend/full-stack candidate** because they test problem-solving without requiring advanced algorithms.

### 18. Minimum Size Subarray Sum

```text
Input:
target = 7
nums = [2,3,1,2,4,3]

Output:
2
```

---

### 19. Maximum Sum Subarray of Size K

Example:

```text
[2,1,5,1,3,2]
k = 3
```

Output:

```text
9
```

Pattern:

> Fixed Sliding Window

---

### 20. Longest Repeating Character Replacement

Pattern:

> Sliding Window + Frequency Map

---

# 🟣 Tier 5 — Stack / Queue

### 21. Min Stack ⭐⭐⭐

Implement:

```text
push()
pop()
top()
getMin()
```

All in:

```text
O(1)
```

---

### 22. Next Greater Element ⭐⭐⭐⭐

```text
Input:
[2,1,2,4,3]

Output:
[4,2,4,-1,-1]
```

Pattern:

> Monotonic Stack

This is a very useful **3+ YOE level** problem.

---

# 🔥 Tier 6 — If interviewer gives harder DSA

### 23. Number of Islands ⭐⭐⭐⭐

```text
11110
11010
11000
00000
```

Count connected islands.

Know:

```text
DFS
BFS
```

---

### 24. Clone Graph

Tests:

```text
Graph traversal
HashMap
DFS/BFS
```

---

### 25. Coin Change

Don't prioritize this over the problems above, but know the basic DP pattern.

---

### 26. Longest Increasing Subsequence

For 3+ YOE, understand:

```text
O(n²)
```

first, then know the optimized:

```text
O(n log n)
```

approach.

---

# 🚨 One Hard Problem You Should Know

PubMatic has reports where the interviewer gives a harder matrix problem and may accept an **approach/pseudocode**, rather than requiring a perfect implementation. ([Glassdoor][2])

So prepare:

### 27. Spiral Matrix

```text
[
 [1,2,3],
 [4,5,6],
 [7,8,9]
]
```

Output:

```text
[1,2,3,6,9,8,7,4,5]
```

Know the four boundaries:

```text
top
bottom
left
right
```

---

# 🎯 If Your Interview Is TODAY

Don't attempt all 27.

Do **these 12**:

| Priority | Problem                      | Pattern        |
| -------- | ---------------------------- | -------------- |
| 🔥 1     | Top K Frequent Elements      | HashMap + Heap |
| 🔥 2     | Merge Intervals              | Sort + Greedy  |
| 🔥 3     | Longest Substring            | Sliding Window |
| 🔥 4     | Product Except Self          | Prefix/Suffix  |
| 🔥 5     | Rotate Array                 | Array/Reversal |
| 🔥 6     | Two Sum                      | HashMap        |
| 🔥 7     | Longest Consecutive Sequence | HashSet        |
| 🔥 8     | Linked List Cycle            | Fast/Slow      |
| 🔥 9     | Reverse Linked List          | Pointers       |
| 🔥 10    | Level Order Traversal        | BFS            |
| 🔥 11    | Number of Islands            | DFS/BFS        |
| 🔥 12    | Spiral Matrix                | Matrix         |

## ⚠️ Most important for your specific interview

Because your role is **Senior Software/UI**, don't prepare DSA like a pure competitive-programming interview.

For **every problem**, practice saying this out loud:

> **1. Brute force → 2. Better approach → 3. Data structure → 4. Algorithm → 5. Complexity → 6. Code → 7. Edge cases**

For example, if they ask **Top K Frequent**:

> "First I'll count the frequency of every number using a Map. Then I need the top K frequencies. I can use a min heap of size K, which keeps only the K most relevant elements. For equal frequencies, I'll use the larger number first according to the requirement. This gives approximately O(n log k) time and O(n) space."

That explanation is **much more important at 3+ YOE** than simply writing code.

### 🧪 Let's simulate the PubMatic round

I recommend we do it exactly like an interview.

**Question 1 — don't look up the solution:**

> Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.
> If two elements have the same frequency, the **larger element must come first**.
>
> Example:
>
> ```text
> nums = [1,1,1,2,2,3]
> k = 2
>
> Output = [1,2]
> ```
>
> Another:
>
> ```text
> nums = [4,4,1,1,3,3]
> k = 2
>
> Output = [4,3]
> ```

**Your task:** explain your approach first, then write the JavaScript solution. I'll review it like a **PubMatic interviewer** and then give you Question 2.

[1]: https://www.glassdoor.com/Interview/PubMatic-Interview-Questions-E256835.htm?utm_source=chatgpt.com "PubMatic Interview Experience & Questions (2026) | Glassdoor"
[2]: https://www.glassdoor.co.uk/Interview/PubMatic-Software-Engineer-Interview-Questions-EI_IE256835.0%2C8_KO9%2C26.htm?utm_source=chatgpt.com "PubMatic Software Engineer Interview Questions | Glassdoor"
[3]: https://www.glassdoor.ca/Interview/PubMatic-Interview-Questions-E256835.htm?utm_source=chatgpt.com "245 PubMatic Interview Questions & Answers (2026) | Glassdoor"
[4]: https://leetcode.com/discuss/post/7235085/?utm_source=chatgpt.com "Pubmatic Java Developer Interview Experience | Pune - Discuss - LeetCode"
