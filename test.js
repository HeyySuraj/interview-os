async function test() {
  return await Promise.resolve("Hello");
}

test().then(console.log);
console.log("End");