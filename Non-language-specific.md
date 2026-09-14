Absolutely. For a **Senior Developer (3–5+ YOE)** interview, interviewers usually go beyond language/framework questions. They want to know whether you can **design, make trade-offs, own a project, debug production issues, review code, communicate with teams, and take senior-level decisions**.

Below is a section-wise **Senior Developer Interview Question + Answer bank**. The answers are intentionally written in a **simple, spoken interview style**, so you can actually say them in an interview.

---

# Senior Developer Interview Questions & Answers

### 3–5+ YOE | Non-language-specific

## 1. SOLID Principles

### Q1. What are SOLID principles?

**Answer:**

> SOLID is a set of five principles used to write maintainable, flexible, and scalable software.
>
> * **S — Single Responsibility Principle**
> * **O — Open/Closed Principle**
> * **L — Liskov Substitution Principle**
> * **I — Interface Segregation Principle**
> * **D — Dependency Inversion Principle**
>
> The main purpose is to reduce tight coupling and make the code easier to maintain and extend.

---

### Q2. What is Single Responsibility Principle?

**Answer:**

> Single Responsibility means a class or module should have only one responsibility or one reason to change.
>
> For example, if one class is handling payment processing, generating reports, and sending emails, it has multiple responsibilities.
>
> I would separate these responsibilities into different services so changes in one area don't affect the others.

---

### Q3. What is Open/Closed Principle?

**Answer:**

> Software should be open for extension but closed for modification.
>
> Basically, when we want to add a new behavior, we should preferably extend the existing design rather than continuously modifying stable existing code.
>
> For example, if we have different payment methods, instead of adding many if-else conditions every time, we can use a common abstraction and add a new implementation for each payment method.

---

### Q4. What is Liskov Substitution Principle?

**Answer:**

> It means a child or derived implementation should be replaceable with its parent abstraction without breaking the expected behavior.
>
> If I have an abstraction called Payment and implementations like CardPayment and UPIPayment, both should follow the contract expected from Payment.

---

### Q5. What is Interface Segregation Principle?

**Answer:**

> A class should not be forced to depend on methods that it doesn't need.
>
> Instead of creating one very large interface, I prefer smaller, focused interfaces.
>
> This reduces unnecessary dependencies and makes the design easier to maintain.

---

### Q6. What is Dependency Inversion Principle?

**Answer:**

> High-level modules should not directly depend on low-level implementations. Both should depend on abstractions.
>
> For example, instead of my business logic directly depending on MongoDB or PostgreSQL, I can define a repository abstraction and provide the database implementation separately.
>
> This also makes testing easier because I can replace the actual implementation with a mock.

---

### Q7. Which SOLID principle do you use most in your projects?

**Good senior answer:**

> I commonly use SRP and Dependency Inversion.
>
> For example, I try to keep controllers responsible mainly for request handling, business logic inside services, and database operations inside repository or data-access layers.
>
> This keeps responsibilities separated and makes individual components easier to test and change.

---

# 2. Design Patterns

### Q8. What is a design pattern?

**Answer:**

> A design pattern is a reusable solution to a commonly occurring software design problem.
>
> It is not ready-made code. It is more like a proven approach for structuring the code.

---

### Q9. What design patterns have you used?

**Answer:**

> I have mainly worked with patterns like **Adapter, Strategy, Factory, Singleton, Repository, Observer and Dependency Injection**.
>
> I don't use patterns just because they exist. I first look at the problem and then choose a pattern if it actually simplifies the design.

That last sentence is important for a senior interview.

---

### Q10. Explain Adapter Pattern.

**Answer:**

> Adapter pattern is useful when two systems have incompatible interfaces but we want them to work together.
>
> For example, if our application expects a standard CRM interface but different CRM providers have different APIs, I can create an adapter for each provider.
>
> The business logic then communicates with the common interface instead of knowing the details of every CRM.

---

### Q11. Explain Strategy Pattern.

**Answer:**

> Strategy pattern is useful when we have multiple algorithms or behaviors for the same operation.
>
> For example, if we support different payment strategies like UPI, card and net banking, each strategy can have its own implementation while the main application selects the required strategy dynamically.

---

### Q12. Factory vs Strategy Pattern?

**Answer:**

> Factory is mainly responsible for **creating or selecting an object**, while Strategy is about **selecting behavior or an algorithm**.
>
> For example, a factory can create the required payment processor, while the strategy defines how that payment processor performs the operation.

---

### Q13. What is Repository Pattern?

**Answer:**

> Repository pattern separates business logic from data-access logic.
>
> Instead of the service directly writing database queries, it communicates with a repository.
>
> This gives us cleaner architecture and makes it easier to change the database implementation or mock it during testing.

---

### Q14. When should you NOT use a design pattern?

**Answer:**

> I don't introduce a pattern just to make the code look architecturally complex.
>
> If the problem is simple, I prefer a simple solution.
>
> A design pattern should solve a real problem. Overusing patterns can increase abstraction and make the code harder to understand.

---

# 3. Software Architecture

### Q15. What is the difference between monolithic and microservices architecture?

**Answer:**

> In a monolith, multiple business functionalities are deployed as one application.
>
> In microservices, the application is divided into smaller independently deployable services.
>
> Microservices can provide independent scaling and deployment, but they also introduce complexity like network communication, monitoring, distributed transactions and deployment management.
>
> So I wouldn't choose microservices just because they are popular. I would consider the team's size, domain complexity, scalability and operational requirements.

---

### Q16. When would you choose a monolith?

**Answer:**

> For a small or medium application, especially when the domain is not very complex, I would prefer a modular monolith.
>
> It is easier to develop, deploy, debug and monitor.
>
> Later, if some modules need independent scaling or deployment, we can extract them into services.

---

### Q17. What is modular monolith?

**Answer:**

> A modular monolith is still deployed as one application, but internally it is divided into well-defined modules with clear boundaries.
>
> For example:
>
> `User → Order → Payment → Notification`
>
> Each module has its own responsibility and limited dependency on others.
>
> This gives us many benefits of good service boundaries without immediately introducing distributed-system complexity.

---

### Q18. What factors do you consider before choosing an architecture?

**Answer:**

> I consider:
>
> 1. Business requirements
> 2. Expected traffic
> 3. Scalability requirements
> 4. Team size and expertise
> 5. Deployment requirements
> 6. Availability requirements
> 7. Data consistency requirements
> 8. Operational complexity
> 9. Cost
> 10. Future growth
>
> I try to choose the simplest architecture that satisfies the requirements.

---

# 4. Project Lifecycle

### Q19. Explain the complete software development lifecycle.

**Answer:**

> Generally, the lifecycle starts with requirement gathering.
>
> Then we do requirement analysis, design, development, testing, deployment and monitoring.
>
> After deployment, we collect feedback, fix issues and continue improving the product.
>
> In Agile projects, these activities happen iteratively across multiple sprints instead of doing everything only once.

---

### Q20. What happens after receiving a new requirement?

**Answer:**

> First, I try to understand the business problem rather than directly jumping into implementation.
>
> Then I clarify:
>
> * What is the expected behavior?
> * Who will use it?
> * What are the edge cases?
> * What are the dependencies?
> * What are the performance/security requirements?
>
> After that I estimate the work, discuss the technical approach, identify risks and then start implementation.

---

### Q21. How do you estimate a task?

**Answer:**

> I break the requirement into smaller technical tasks.
>
> I consider development, testing, integration, deployment and possible dependencies.
>
> I also consider unknowns and risks.
>
> If there is significant uncertainty, I prefer doing a small spike or proof of concept before giving a final estimate.

---

### Q22. What do you do when requirements are unclear?

**Answer:**

> I don't start implementation based on assumptions.
>
> I discuss the requirement with the product owner, business team or relevant stakeholder and clarify the expected behavior.
>
> I also document important decisions so that everyone has the same understanding.

---

# 5. Requirement Analysis

### Q23. Functional vs non-functional requirements?

**Answer:**

> Functional requirements describe **what the system should do**.
>
> For example, users should be able to make payments.
>
> Non-functional requirements describe **how the system should behave**.
>
> For example, payment requests should respond within two seconds and the system should support a certain number of concurrent users.

---

### Q24. What questions do you ask before starting a feature?

**Answer:**

> I normally ask:
>
> * What problem are we solving?
> * Who is the user?
> * What is the expected flow?
> * What happens in failure cases?
> * What are the validations?
> * What are the security requirements?
> * What existing modules are affected?
> * Are there external dependencies?
> * What is the expected traffic?
> * How will we measure success?

---

# 6. Code Review

### Q25. What do you check during code review?

**Answer:**

> I don't only check whether the code works.
>
> I check:
>
> * Correctness
> * Readability
> * Maintainability
> * Error handling
> * Security
> * Performance
> * Edge cases
> * Test coverage
> * Naming
> * Unnecessary duplication
> * Impact on existing functionality
>
> I also try to understand whether the implementation is unnecessarily complex.

---

### Q26. How do you handle disagreement during code review?

**Answer:**

> I try to keep the discussion technical rather than personal.
>
> I explain why I think a particular approach is better and, if possible, support it with documentation, benchmarks or examples.
>
> If both approaches are valid, I discuss the trade-offs with the team and follow the agreed decision.

---

### Q27. How do you review code written by a junior developer?

**Answer:**

> I don't just tell them what to change.
>
> I explain why the change is required and try to help them understand the underlying principle.
>
> For example, instead of saying "don't write this code", I explain the maintainability or performance problem and show an alternative.

---

# 7. Production Issues & Debugging

### Q28. Production application suddenly becomes slow. What will you do?

**Senior-level answer:**

> First, I would avoid making random changes.
>
> I would identify whether the problem is frontend, backend, database, network or infrastructure related.
>
> I would check:
>
> * Application logs
> * Error rate
> * CPU and memory
> * Response latency
> * Database performance
> * External API latency
> * Recent deployments
> * Traffic increase
>
> I would compare the current behavior with the previous healthy state.
>
> Once I identify the bottleneck, I would apply the smallest safe fix, monitor the system and then work on the permanent solution.

---

### Q29. What if the issue started immediately after your deployment?

**Answer:**

> First, I would verify whether there is a correlation with the deployment.
>
> If the deployment is causing significant production impact, I would prioritize restoring service, which could mean rollback or disabling the affected feature.
>
> After stabilization, I would identify the root cause, fix it, add appropriate tests or monitoring, and then redeploy safely.

**Senior keyword:** Restore first → RCA second → prevention third.

---

### Q30. What is RCA?

**Answer:**

> RCA means Root Cause Analysis.
>
> The goal is not only to identify what failed but also why it failed and how we can prevent the same issue from happening again.
>
> A good RCA normally includes impact, timeline, root cause, resolution and preventive actions.

---

# 8. Incident Management

### Q31. What would you do during a critical production incident?

**Answer:**

> My first priority would be to understand the impact and stabilize the system.
>
> I would:
>
> 1. Identify the affected functionality.
> 2. Check monitoring and logs.
> 3. Identify recent changes.
> 4. Roll back or disable the problematic feature if required.
> 5. Communicate the impact to stakeholders.
> 6. Monitor recovery.
> 7. Perform RCA after the system is stable.
>
> During an incident, communication is as important as debugging.

---

### Q32. What is the difference between workaround and permanent fix?

**Answer:**

> A workaround reduces the immediate impact but may not solve the underlying problem.
>
> A permanent fix addresses the root cause.
>
> During production incidents, we may first apply a workaround to restore service and then implement the permanent fix after proper analysis and testing.

---

# 9. Scalability & System Design Thinking

### Q33. How do you design a system for scalability?

**Answer:**

> First, I understand the expected traffic and workload.
>
> Then I identify potential bottlenecks.
>
> Depending on the requirement, I consider:
>
> * Horizontal scaling
> * Caching
> * Database indexing
> * Read replicas
> * Load balancing
> * Asynchronous processing
> * Message queues
> * CDN
> * Database partitioning
>
> I don't introduce all of these by default. I choose them based on the actual bottleneck.

---

### Q34. Vertical vs horizontal scaling?

**Answer:**

> Vertical scaling means increasing the resources of the existing machine, like CPU or RAM.
>
> Horizontal scaling means adding more instances.
>
> Horizontal scaling generally provides better scalability and fault tolerance, but it requires the application to support distributed execution.

---

### Q35. What is a bottleneck?

**Answer:**

> A bottleneck is the part of the system limiting the overall performance.
>
> It could be CPU, memory, database queries, network calls, external APIs or even inefficient application logic.
>
> Before optimizing, I prefer measuring the system to identify the actual bottleneck.

---

# 10. Database & Data Architecture Decisions

### Q36. How do you decide between SQL and NoSQL?

**Answer:**

> I consider the data structure, relationships, transaction requirements, query patterns, scalability requirements and consistency requirements.
>
> If the application has strong relationships and transactional requirements, SQL can be a better choice.
>
> If the data is more flexible and the application benefits from document-oriented storage and horizontal scaling, NoSQL can be considered.
>
> The decision should be based on requirements rather than popularity.

---

### Q37. What is database normalization?

**Answer:**

> Normalization is organizing data to reduce duplication and maintain consistency.
>
> It is useful when we have highly relational data.
>
> However, in some read-heavy systems, controlled denormalization can improve performance.
>
> So again, it is a trade-off.

---

# 11. Performance Optimization

### Q38. How do you approach performance optimization?

**Answer:**

> First, I measure the current performance.
>
> Then I identify the bottleneck using profiling, logs, metrics or monitoring.
>
> After identifying the bottleneck, I optimize that specific area and measure again.
>
> I follow:
>
> **Measure → Identify → Optimize → Measure again.**
>
> I avoid premature optimization.

---

### Q39. What is premature optimization?

**Answer:**

> Premature optimization means optimizing parts of the system before knowing whether they are actually causing a performance problem.
>
> It can increase complexity without providing meaningful benefits.
>
> I prefer optimizing based on actual measurements.

---

# 12. Testing

### Q40. What types of testing do you know?

**Answer:**

> Common types are:
>
> * Unit testing
> * Integration testing
> * API testing
> * End-to-end testing
> * Regression testing
> * Performance testing
> * Security testing
> * Smoke testing
>
> Different tests provide confidence at different levels.

---

### Q41. Unit test vs integration test?

**Answer:**

> Unit testing focuses on a small isolated piece of functionality.
>
> Integration testing checks whether multiple components work correctly together.
>
> For example, a service function can be unit tested independently, while a complete API interacting with a database can be tested as an integration test.

---

### Q42. Do you test your own code?

**Answer:**

> Yes. I normally test the happy path as well as important edge cases and failure scenarios.
>
> For critical functionality, I prefer having automated tests so future changes don't accidentally break existing behavior.

---

# 13. Git & Development Process

### Q43. What branching strategy do you follow?

**Answer:**

> It depends on the team's process.
>
> A common approach is feature branches with pull requests into a development or main branch.
>
> The important part is that changes are reviewed, tested and integrated in a controlled manner.

---

### Q44. Merge vs rebase?

**Answer:**

> Merge creates a merge commit and preserves the branch history.
>
> Rebase moves my commits on top of another branch and creates a cleaner linear history.
>
> I generally use rebase for keeping my local feature branch updated, but I avoid rebasing shared branches because it rewrites history.

---

# 14. CI/CD & Release Management

### Q45. What is CI/CD?

**Answer:**

> CI means Continuous Integration, where developers frequently integrate code and automated checks validate the changes.
>
> CD means Continuous Delivery or Deployment, where validated code can be released through an automated pipeline.
>
> The goal is to make releases safer, faster and repeatable.

---

### Q46. What should happen before production deployment?

**Answer:**

> I would verify:
>
> * Code review completed
> * Tests passed
> * Build successful
> * Environment variables/configuration checked
> * Database migrations reviewed
> * Backward compatibility considered
> * Monitoring/logging available
> * Rollback strategy available
> * Deployment approval completed if required

---

### Q47. What is rollback strategy?

**Answer:**

> Rollback means returning the application to the previous stable version when a new release causes serious issues.
>
> For senior-level development, I believe every important production deployment should have a clear rollback or recovery strategy.

---

# 15. Security

### Q48. What security aspects do you consider while developing an application?

**Answer:**

> I consider authentication, authorization, input validation, secure secrets management, encryption, HTTPS, rate limiting, dependency vulnerabilities, logging and protection against common attacks.
>
> I also follow the principle of least privilege wherever possible.

---

### Q49. Authentication vs authorization?

**Answer:**

> Authentication answers **"Who are you?"**
>
> Authorization answers **"What are you allowed to do?"**
>
> For example, login verifies the user's identity, while checking whether that user can access an admin operation is authorization.

---

### Q50. What is least privilege?

**Answer:**

> It means giving a user, service or application only the permissions it actually needs.
>
> If a service only needs read access to a resource, I should not give it full read-write access.

---

# 16. Technical Debt

### Q51. What is technical debt?

**Answer:**

> Technical debt is the future cost created when we choose a quick or temporary technical solution instead of a cleaner long-term solution.
>
> Technical debt isn't always bad. Sometimes we intentionally take it to meet an urgent business requirement.
>
> But we should track it and pay it down before it becomes a major maintenance problem.

---

### Q52. How do you convince management to fix technical debt?

**Answer:**

> I don't explain it only from a technical perspective.
>
> I explain the business impact:
>
> * Slower development
> * More production issues
> * Increased maintenance cost
> * Security risks
> * Difficulty onboarding developers
>
> Then I propose a practical plan instead of asking for a complete rewrite.

---

# 17. Refactoring

### Q53. What is refactoring?

**Answer:**

> Refactoring means improving the internal structure of existing code without changing its external behavior.
>
> The goal is to improve readability, maintainability, performance or testability while keeping functionality intact.

---

### Q54. When would you refactor existing code?

**Answer:**

> I usually refactor when I'm already modifying that area, when the code is causing bugs, when duplication is increasing or when the current design is blocking new requirements.
>
> I avoid rewriting stable code without a clear business or technical reason.

---

# 18. Leadership & Ownership

### Q55. What does ownership mean to you as a senior developer?

**Answer:**

> Ownership means taking responsibility for the complete outcome, not just writing the code.
>
> That includes understanding requirements, designing the solution, implementation, testing, deployment, monitoring and resolving issues after release.
>
> If something goes wrong, I focus on solving the problem rather than finding someone to blame.

---

### Q56. How do you mentor junior developers?

**Answer:**

> I try to guide them rather than directly solving every problem for them.
>
> I explain the reasoning behind decisions, review their code and encourage them to think about edge cases, maintainability and trade-offs.
>
> The goal is that next time they can solve a similar problem independently.

---

### Q57. How do you handle a developer who repeatedly makes mistakes?

**Answer:**

> First, I try to understand why the mistakes are happening.
>
> It could be lack of domain knowledge, unclear requirements or insufficient testing.
>
> I would discuss it privately, provide guidance and define clear expectations.
>
> If the issue continues, I would involve the appropriate lead or manager with specific examples.

---

# 19. Conflict Management

### Q58. What if you disagree with your senior/architect?

**Answer:**

> I would first understand their reasoning.
>
> Then I would explain my concerns using technical facts, trade-offs or examples.
>
> If the final decision is different from my suggestion, I would support the team's decision unless there is a serious security or correctness concern.

---

### Q59. Two developers strongly disagree about architecture. What would you do?

**Answer:**

> I would bring the discussion back to requirements and measurable trade-offs.
>
> We can compare both solutions based on scalability, maintainability, complexity, cost and development effort.
>
> If required, we can create a small proof of concept.
>
> The decision should be based on the problem rather than personal preference.

---

# 20. Agile / Scrum

### Q60. What happens in a sprint?

**Answer:**

> Typically, we start with sprint planning where requirements are selected and estimated.
>
> Developers work on the stories during the sprint while collaborating with QA, product and other teams.
>
> We have daily standups to discuss progress and blockers.
>
> At the end, we have a sprint review or demo and retrospective to discuss what went well and what can be improved.

---

### Q61. What happens if you cannot complete a story in the sprint?

**Answer:**

> I don't wait until the last day.
>
> As soon as I identify the risk, I communicate it to the team.
>
> We then understand the reason—dependency, underestimated effort, requirement change, etc.—and decide whether to reduce scope, move the story or get additional support.

---

### Q62. What do you discuss in a retrospective?

**Answer:**

> Usually:
>
> * What went well?
> * What didn't go well?
> * What should we improve?
>
> The important thing is that retrospective actions should result in actual improvements rather than becoming just a discussion.

---

# 21. Communication With Product/Business

### Q63. Product manager asks for a feature urgently. What do you do?

**Answer:**

> First, I understand why it is urgent and what the minimum required scope is.
>
> Then I estimate the technical impact and identify risks.
>
> If the timeline is aggressive, I communicate what can realistically be delivered and what trade-offs we would have to make.

---

### Q64. Business asks for something that you believe is technically wrong. What do you do?

**Answer:**

> I wouldn't simply say no.
>
> I would explain the technical consequences in terms of business impact.
>
> Then I would propose an alternative solution that satisfies the actual business requirement with fewer technical risks.

---

# 22. Senior-Level Trade-Off Questions

### Q65. Faster development or better architecture?

**Answer:**

> It depends on the context.
>
> For a temporary proof of concept, speed may be more important.
>
> For a critical long-term product, maintainability and reliability become more important.
>
> As a senior developer, I should understand the business context and make the trade-off consciously.

---

### Q66. Build vs buy?

**Answer:**

> I consider development cost, maintenance, security, scalability, customization, vendor dependency and time to market.
>
> If an existing reliable solution satisfies most requirements, buying or using a managed service can be better than maintaining everything ourselves.

---

### Q67. Consistency vs availability?

**Answer:**

> It depends on the business requirement.
>
> For something like financial transactions, strong consistency may be more important.
>
> For something like analytics or social activity feeds, eventual consistency may be acceptable if it improves availability and scalability.

---

### Q68. When would you choose synchronous vs asynchronous processing?

**Answer:**

> If the user needs the result immediately and the operation is relatively quick, synchronous processing is usually appropriate.
>
> For long-running or non-critical background operations, I prefer asynchronous processing using queues or background workers.
>
> For example, sending notifications after an important transaction can often be handled asynchronously.

---

# 23. Project Ownership Questions

These are **very likely for someone with 3–5 YOE**.

### Q69. Explain your current project.

Don't answer only with technologies.

Use:

> **Problem → Users → Architecture → Your responsibility → Challenges → Result**

Example:

> "The project solves X problem for Y users. At a high level, we have frontend, backend services, database and external integrations. My responsibility is mainly around backend/API development and some frontend work. One major challenge we faced was X, where I implemented Y approach, which resulted in Z improvement."

---

### Q70. What was the most challenging feature you worked on?

Prepare one strong story.

Structure:

> **Problem → Why difficult → Options considered → Solution → Challenges → Result**

---

### Q71. What technical decision did you personally make?

**Answer structure:**

> "We had problem X. Initially we considered A and B. I evaluated them based on scalability, complexity and maintenance. We selected B because... I implemented it and the result was..."

This is much stronger than saying:

> "My senior told me to use X."

---

### Q72. Tell me about a production issue you handled.

Use:

**Situation → Impact → Investigation → Root Cause → Fix → Prevention**

This is one of the most important senior-level questions.

---

### Q73. Tell me about a time you improved performance.

Use measurable results if you have them.

> "We were facing X performance issue. I analyzed Y and found Z was the bottleneck. I changed A to B and after measuring again, response time/load/resource usage improved by approximately X%."

---

### Q74. Tell me about a mistake you made.

Don't say:

> "I never made a mistake."

Better:

> "In one feature, I initially underestimated X. During implementation we discovered Y. I communicated it early, adjusted the approach and completed it. After that, I started considering Y during estimation."

---

# 24. Behavioral Senior Questions

### Q75. Why should we hire you as a senior developer?

**Answer:**

> I can contribute beyond just implementation. I can understand requirements, break down problems, design solutions, identify risks and take ownership until production.
>
> I also care about code quality and helping other developers.
>
> At the same time, I'm comfortable learning new technologies when the project requires them.

---

### Q76. What is your biggest strength?

**Answer:**

> One of my strengths is problem solving and ownership. When I get a problem, I don't stop at fixing the immediate issue. I try to understand the root cause and see whether we can prevent the same issue in the future.

---

### Q77. What is your weakness?

Avoid fake answers like:

> "I'm a perfectionist."

Better:

> Earlier, I sometimes spent too much time trying to make an implementation perfect. With experience, I've learned to balance code quality with business priority and delivery timelines.

---

### Q78. How do you prioritize multiple tasks?

**Answer:**

> I prioritize based on production impact, business priority, dependencies and deadlines.
>
> Critical production issues come first, followed by high-priority business requirements and then normal development tasks.
>
> If priorities conflict, I communicate with the relevant stakeholders instead of making assumptions.

---

# 25. Very Important Senior "What Would You Do?" Questions

### Q79. You join a project with 5-year-old code. What do you do first?

> I wouldn't immediately rewrite it.
>
> First, I understand the architecture, business flow, deployment process and known issues.
>
> Then I identify high-risk areas and technical debt.
>
> I would improve the system incrementally while delivering business requirements.

---

### Q80. Your team wants to rewrite the entire application. Do you agree?

> Not immediately.
>
> I would first understand why we want to rewrite it.
>
> If the current architecture has serious limitations, I would compare rewrite versus incremental migration based on cost, risk, timeline and business impact.
>
> In many cases, incremental migration is safer than a complete rewrite.

---

### Q81. A feature works but the code is very bad. What do you do?

> If it is not blocking anything, I would avoid unnecessarily stopping delivery.
>
> I would document the technical debt and refactor it when we're modifying that area or when the debt starts creating real problems.
>
> If the code creates security, reliability or major maintenance issues, I would prioritize fixing it sooner.

---

### Q82. Your API is working but suddenly response time increases. What do you check?

> I would compare current metrics with the previous healthy period.
>
> Then I would check:
>
> * Recent deployments
> * Request volume
> * Database latency
> * Slow queries
> * External services
> * CPU/memory
> * Network latency
> * Cache behavior
> * Logs and error rates
>
> Then I would identify the actual bottleneck before changing the code.

---

# 26. Questions Interviewers Ask to Test Seniority

These are particularly important because **the answer differentiates a 3-year developer from a senior developer**.

### Q83. Why did you choose this architecture?

Don't answer:

> "Because this is what we use."

Say:

> "We evaluated the requirements and chose this architecture because of X. The main trade-off was Y, but it was acceptable because Z."

---

### Q84. What trade-offs did you make?

Be ready to answer:

> "We chose X over Y because X gave us better scalability, although it introduced additional operational complexity."

---

### Q85. What would you do differently if you built the project today?

Excellent senior question.

Answer:

> "I would keep the overall business flow, but I would improve X and Y based on what we learned. At that time the priority was delivery, but today I would introduce better observability, automated testing and clearer module boundaries."

---

### Q86. What is the biggest technical risk in your current project?

They want to know whether you can **think ahead**.

Mention something like:

> scalability, single point of failure, external dependency, database bottleneck, technical debt, observability, deployment risk, security, etc.

---

### Q87. How do you know your solution is good?

Strong answer:

> "I don't judge it only by whether it works. I look at correctness, maintainability, performance, reliability, security and whether it satisfies the actual business requirement."

---

# 27. Questions You Should Ask the Interviewer

At the end, don't simply say:

> "No questions."

Ask 2–3 good questions.

### Q88. What are the biggest technical challenges the team is currently facing?

### Q89. How is ownership divided between developers, QA and product?

### Q90. What does success look like for this role in the first 3–6 months?

### Q91. How do you handle architecture and technical decisions within the team?

### Q92. What is the current development and deployment process?

### Q93. What kind of production ownership does the development team have?

---

# ⭐ Most Important 20 to Prepare First

If your interview is coming soon, **don't try to memorize all 93**. Prepare these first:

| #  | Question                                      |
| -- | --------------------------------------------- |
| 1  | Explain SOLID principles                      |
| 2  | SRP with real example                         |
| 3  | Design patterns you've used                   |
| 4  | Adapter / Strategy pattern                    |
| 5  | Monolith vs Microservices                     |
| 6  | How do you choose architecture?               |
| 7  | Complete project lifecycle                    |
| 8  | How do you handle unclear requirements?       |
| 9  | How do you estimate a task?                   |
| 10 | How do you perform code review?               |
| 11 | Production issue debugging                    |
| 12 | Production incident handling                  |
| 13 | RCA                                           |
| 14 | Performance optimization approach             |
| 15 | Technical debt                                |
| 16 | Refactoring                                   |
| 17 | CI/CD and deployment                          |
| 18 | How do you handle disagreements?              |
| 19 | How do you mentor juniors?                    |
| 20 | Explain a difficult project/feature you owned |

## The senior-level answer formula

For almost every **3–5+ YOE** question, try to answer using:

> **Problem → Analysis → Options → Trade-off → Decision → Implementation → Result → What you learned**

This is much stronger than giving only textbook definitions.

For example, instead of:

> "Microservices are independently deployable services."

Say:

> "We considered microservices because some modules needed independent scaling and deployment. But it also introduced distributed communication and monitoring complexity. So I would first check whether those requirements justify that complexity. If not, I would prefer a modular monolith."

**That is the kind of answer that sounds senior.**
