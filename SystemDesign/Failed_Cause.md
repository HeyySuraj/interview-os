10 ways a system breaks at scale. Not one of them throws an error. They show up in production, never in your tests.

𝟭. 𝗖𝗮𝗰𝗵𝗲 𝘀𝘁𝗮𝗺𝗽𝗲𝗱𝗲.
 - A hot key expires. Every request that wanted it misses at the same moment and slams the database together.
 - Fix: rebuild the cache with one request while everyone else serves the slightly stale copy.

𝟮. 𝗧𝗵𝘂𝗻𝗱𝗲𝗿𝗶𝗻𝗴 𝗵𝗲𝗿𝗱.
 - A service restarts and every client reconnects in the exact same second.
 - Fix: add random jitter to the retry, so they do not all come back at once.

𝟯. 𝗛𝗼𝘁 𝗸𝗲𝘆.
 - One key takes most of the traffic. That one shard gets overloaded while the others sit idle.
 - Fix: copy the hot key across a few nodes, or add a random suffix to spread the load.

𝟰. 𝗡+𝟭 𝗾𝘂𝗲𝗿𝗶𝗲𝘀.
 - A loop that fires one query per item. Nobody notices at 10 rows. At 10,000 it takes the page down.
 - Fix: pull it all in one query with a join, or batch the fetch.

𝟱. 𝗥𝗲𝘁𝗿𝘆 𝘀𝘁𝗼𝗿𝗺.
 - A service gets slow. Everyone retries. The retries pile more load on the thing that was already struggling and finish it off.
 - Fix: back off between retries, and put a circuit breaker in front so it fails fast.

𝟲. 𝗨𝗻𝗯𝗼𝘂𝗻𝗱𝗲𝗱 𝗰𝗮𝗰𝗵𝗲.
 - An in-memory cache with nothing to evict old entries. Runs fine for months, then fills the heap and crashes with an OutOfMemoryError.
 - Fix: cap the size, evict the least used, put a TTL on it.

𝟳. 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗶𝗼𝗻 𝗽𝗼𝗼𝗹 𝗲𝘅𝗵𝗮𝘂𝘀𝘁𝗶𝗼𝗻.
 - One slow query holds its connection too long. Under load the pool empties and every other request just waits in line.
 - Fix: size the pool properly, add timeouts, and cut off queries that run too long.

𝟴. 𝗥𝗲𝗮𝗱 𝗿𝗲𝗽𝗹𝗶𝗰𝗮 𝗹𝗮𝗴.
 - A user saves something, reloads, and it is gone. The read hit a replica that had not caught up yet.
 - Fix: send that user's reads to the primary for a few seconds after they write.

𝟵. 𝗠𝗶𝘀𝘀𝗶𝗻𝗴 𝗶𝗱𝗲𝗺𝗽𝗼𝘁𝗲𝗻𝗰𝘆.
 - A network hiccup sends the same request twice. Now the customer is charged twice.
 - Fix: attach a unique key to each request and check it before you process, so the second one is ignored.

𝟭𝟬. 𝗡𝗼 𝗯𝗮𝗰𝗸𝗽𝗿𝗲𝘀𝘀𝘂𝗿𝗲.
 - A fast producer keeps pushing to a slow consumer. The queue keeps growing until it runs out of memory and fails.
 - Fix: cap the queue, and make the producer slow down when it fills up.

Save this one. Every point here is a system design interview question, and a production incident waiting to happen.