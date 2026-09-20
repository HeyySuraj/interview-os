
## 1. Youtube Simple Straight  Forward Implementation
link: https://www.youtube.com/watch?v=F7HmcX7F4fY
```
function resolvePromiseAll(iterator) {

	const result = new Array(iterator.length);
	console.log("result", result);
	let resolveCount = 0;

	return new Promise((resolve, reject) => {
		for (let i = 0; i < iterator.length; i++) {
			iterator[i].then((data) => {

				result[i] = data;
				resolveCount++;

				if (resolveCount === iterator.length) {
					resolve(result)
				}

			}).catch(error => {
				reject(error)
			})

		}
	})
}


function task(time) {
	return new Promise(function (res, rej) {
		setTimeout(function () {
			res(time);
		}, time)
	})
	// return new Promise((res, rej)=> ()=>res(time), time)
}

const promises = [task(300), task(450), task(33)]

// console.log("da'dsa", await resolvePromiseAll(promises));

resolvePromiseAll(promises).then(res => {
	console.log("got result", res);

}).catch((err) => {
	console.log(err)
})
```


----


## 2. Claude.ai Implemention (Senior Level | Hard to implement in an interview) 

https://claude.ai/share/61ce44f3-a7bf-45ea-856a-a703ca5732bc

Here's a senior-level implementation, plus what interviewers actually probe for.

```javascript
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    let total = 0;
    let settled = false;

    for (const item of iterable) {
      const index = total++;
      results.length = total;

      Promise.resolve(item).then(
        (value) => {
          if (settled) return;
          results[index] = value;
          completed++;
          if (completed === total) {
            settled = true;
            resolve(results);
          }
        },
        (err) => {
          if (settled) return;
          settled = true;
          reject(err);
        }
      );
    }

    if (total === 0) resolve([]);
  });
}
```

**Why this hits senior-level bar:**

1. **`Promise.resolve(item)`** — handles non-promise values (numbers, plain objects) in the array, not just promises. This is the detail most people miss.
2. **Order preservation via `index`** — results must match input order, not resolution order. Never `push()`.
3. **`total === 0` check** — empty array must resolve immediately with `[]`, not hang forever.
4. **`completed === total` inside a growing loop** — because you're iterating and each `.then` can fire before the loop finishes, you can't just check length against a fixed array size determined pre-loop. Using a `total` counter incremented per item handles both sync and async resolution timing correctly. This is the classic bug candidates hit: capturing `iterable.length` upfront breaks for non-array iterables (generators, Sets).
5. **`settled` guard** — prevents double resolve/reject if the iterable somehow yields extra events, and clarifies intent (fail-fast: first rejection wins, matches native behavior).
6. **Works with any iterable**, not just arrays (`for...of`, not `.map`/`.length` indexing).

**Talking points to say out loud during the interview** (this is what actually impresses, more than the code):
- Explain *why* `Promise.resolve(item)` is needed — non-thenable values must still resolve immediately in-order.
- Mention this is fail-fast, contrast briefly with `Promise.allSettled` (waits for all, never rejects) and `Promise.any` (resolves on first fulfillment).
- Mention the native spec detail: `Promise.all` internally uses `IteratorClose` semantics — you don't need to implement it, but knowing it exists shows depth.
- If asked to extend: implement `Promise.allSettled` as a follow-up (same skeleton, no reject path — just collect `{status, value/reason}`).

Want me to also write `Promise.allSettled` / `Promise.race` / `Promise.any` from scratch — interviewers often chain these as follow-ups?