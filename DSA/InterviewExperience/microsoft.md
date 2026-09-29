
SHIVAM SOMANI

  • 2nd

SDE2 @ Microsoft | Tech, Al & Career Coach | Top 1% LinkedIn | Gen Al | Mentor | Content Creator | Backend Engineer | 50K+ Followers  | Open for Brand Collaborations reach here : somani2025shivam@gmail.com

Visit my website

9h • 


Follow
💼 Amazon SDE2 Interview – Round 2 Experience

My Round 2 at Amazon shifted from pure DSA to problem-solving + system thinking.

The first problem was:
Given a list of nodes from an N-ary tree and a level `L`, return all nodes present at that level.

A standard BFS / level-order traversal solves this pretty directly.

But the follow-up changed the problem:

What if nodes can be dynamically added or removed, and you need to return the count of nodes at any level in O(1)?

Now BFS on every query is no longer enough.

The approach I discussed was to maintain level-wise node counts separately.

When a node is inserted or deleted, update the count for its corresponding level.
This adds some extra space and update work, but gives you O(1) queries for the count.

That trade-off was the interesting part.

The interview wasn’t just checking whether I knew tree traversal.

It was checking whether I could:
→ Adapt when constraints changed
→ Identify the new bottleneck
→ Trade space/update complexity for faster queries
→ Explain why the new approach made sense

That’s something I’ve noticed in SDE2-level interviews: the follow-up often tells you more than the original problem.

And Amazon also evaluated the discussion around Learn & Be Curious and Deliver Results.

If you're an experienced engineer aiming to make that jump to senior or leadership roles, then having the right structure, feedback, & mentorship can make all the difference.