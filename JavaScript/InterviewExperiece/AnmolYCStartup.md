Frontend interview experience at a YC startup.

I interviewed for an SDE-2 Frontend position at Clinikally (YC S22).
There were two technical rounds. I don’t remember every question word for word, but here’s a close reconstruction of what I was asked.

Round 1: JavaScript and React fundamentals
The round began with several output-based questions:

What will this print?

console.log(0.1 + 0.2 === 0.3);
console.log(typeof null);
console.log(typeof (0 / 0));

What will be the order of execution?

console.log("start");

async function foo1() {
  console.log("A");
  await foo2();
  console.log("B");
}

async function foo2() {
  console.log("C");
}

setTimeout(() => {
  console.log("D");
}, 0);

foo1();

new Promise((resolve) => {
  console.log("E");
  resolve();
}).then(() => {
  console.log("F");
});

console.log("end");

The follow-up questions included:
→ How does the JavaScript event loop work?
→ What is the difference between the microtask queue and the macrotask queue?
→ What is hoisting, and how does it work for var, let, const, and function declarations?
→ What is the difference between Promise.all() and Promise.any()?
→ What are higher-order functions in JavaScript?
→ What is a higher-order component in React?
→ What is the difference between useMemo and useCallback?

Round 2: CSS and machine coding

The CSS questions included:
→ What is a CSS stacking context?
→ Why might an element with a higher z-index still appear behind another element?
→ What is the difference between display: none and visibility: hidden?
→ How would you animate the expansion and collapse of an accordion?
→ What is the difference between pseudo-classes and pseudo-elements?

Then I was given two machine-coding problems:

1. Reusable data table
I was given a column definition and asked to build a reusable React data table that could render different datasets using the provided configuration.

2. Modal using React Portals
I was asked:
→ What are React Portals?
→ Why are portals useful when building a modal?
→ Build a reusable modal component using createPortal.

Overall, the interview tested JavaScript fundamentals, React concepts, browser behavior, CSS knowledge, and reusable component design.

I’ll share more frontend interview experiences if this is helpful.
