const { log } = require('nodeforge');
const Piscina = require('piscina');

// ─────────────────────────────────────────────
// 🔁 Original heavy function (unchanged)
// ─────────────────────────────────────────────
function runLoop() {
  let num = 0;
  for (let index = 0; index < 1_000_000_000; index++) {
    num = index;
  }
  return num;
}

// ✅ Tell Piscina this is the function to run in worker threads
module.exports = runLoop;

// ─────────────────────────────────────────────
// 🧠 Main thread logic
// ─────────────────────────────────────────────

console.log({__filename});

console.log({jee: require.main});

if (require.main === module) {
  const pool = new Piscina({
    filename: __filename,
    minThreads: 1,
    maxThreads: 2,
  });

  async function main() {
    console.time('Heavy Task');

    // 🔥 Run runLoop() inside a worker
    const heavyPromise = pool.run();

    // ⚡ Main thread does other work
    console.log('✅ Light task running on main thread...');

    const heavyResult = await heavyPromise;

    console.timeEnd('Heavy Task');
    console.log(`💪 Heavy task finished, result = ${heavyResult}`);
  }

  main();
}
