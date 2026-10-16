Absolutely. Since this is **today's PubMatic Senior Software Engineer – UI interview**, focus less on memorizing 100 Angular definitions and more on being able to **explain senior-level decisions clearly**.

I’ll structure this as **question → easy interview answer → senior-level point**, so you can revise it quickly.

# 🚀 PubMatic Senior UI Engineer — Angular Interview Crash Guide

## 1. Angular Fundamentals — Must Know

### Q1. What is Angular?

**Answer:**

> Angular is a TypeScript-based frontend framework developed by Google for building scalable web applications.
> It provides features like components, dependency injection, routing, forms, HTTP client, RxJS, and state management patterns out of the box.

**Remember:**
**Angular = Components + DI + Routing + Forms + HTTP + RxJS**

---

### Q2. Angular vs React?

> React is mainly a UI library, while Angular is a complete frontend framework.
>
> React gives us more freedom to choose libraries for routing, state management, forms, etc. Angular provides many of these features officially.
>
> Angular uses TypeScript heavily and has dependency injection and RxJS deeply integrated into the framework.

**Senior point:**

Don't say one is "better".

Say:

> "The choice depends on project requirements, team expertise and ecosystem."

---

### Q3. What is a component?

> A component is the basic building block of an Angular application. It contains three main things: the UI template, the component class containing logic, and styles.

Example:

```ts
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  name = 'Suraj';
}
```

**Remember:**

> Component = Template + Logic + Style

---

# 2. Angular Lifecycle Hooks ⭐⭐⭐

### Q4. Explain Angular lifecycle hooks.

The easiest way to remember:

**Create → Change → Check → Destroy**

Important hooks:

```text
constructor()
ngOnChanges()
ngOnInit()
ngDoCheck()
ngAfterContentInit()
ngAfterContentChecked()
ngAfterViewInit()
ngAfterViewChecked()
ngOnDestroy()
```

### Q5. constructor vs ngOnInit?

This is commonly asked.

> `constructor()` is mainly used for dependency injection and basic class initialization.
>
> `ngOnInit()` is Angular's lifecycle hook and is used for initialization logic after Angular has initialized the component's inputs.

Example:

```ts
constructor(private userService: UserService) {}

ngOnInit() {
  this.loadUsers();
}
```

**Remember:**

> Constructor = Dependency injection
> ngOnInit = Component initialization

---

### Q6. What is ngOnDestroy used for?

> It is used for cleanup before a component is destroyed.

For example:

* unsubscribe from subscriptions
* remove event listeners
* clear timers
* cleanup resources

With modern Angular, you can use `takeUntilDestroyed()` to simplify subscription cleanup.

---

# 3. Change Detection ⭐⭐⭐⭐⭐

This is **very important for Senior UI**.

### Q7. What is change detection?

> Change detection is Angular's mechanism for checking whether component data has changed and updating the DOM accordingly.

Simple flow:

```text
Data changes
     ↓
Angular detects change
     ↓
Component/template checked
     ↓
DOM updated
```

---

### Q8. Default vs OnPush change detection?

**Default:**

Angular checks the component tree more frequently.

**OnPush:**

Angular checks a component mainly when:

1. An input reference changes
2. An event happens inside the component
3. An observable used with `async` emits
4. Change detection is explicitly triggered

Example:

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Interview answer:

> I prefer OnPush for larger applications because it reduces unnecessary change detection and improves performance. But when using OnPush, I need to be careful about object mutation because Angular relies heavily on reference changes.

Example:

❌

```ts
user.name = 'John';
```

Better:

```ts
this.user = {
  ...this.user,
  name: 'John'
};
```

**Remember:**

> OnPush → Think **references**, not mutations.

---

# 4. Signals ⭐⭐⭐⭐⭐

Modern Angular interviews can absolutely ask this.

### Q9. What are Angular Signals?

> Signals are Angular's reactive primitive for tracking state changes. A signal stores a value and Angular knows which parts of the application depend on that value.

Example:

```ts
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

Reading:

```ts
count()
```

---

### Q10. Signal vs Observable?

Easy answer:

> Signals are mainly useful for local synchronous reactive state, while Observables are better suited for asynchronous streams such as HTTP requests, WebSockets and event streams.

Remember:

```text
Signal → State
Observable → Stream
```

---

### Q11. computed vs effect?

> `computed()` derives a value from other signals, while `effect()` is used when we need to perform a side effect whenever signals change.

Example:

```ts
total = computed(() => this.price() * this.quantity());
```

Effect:

```ts
effect(() => {
  console.log(this.count());
});
```

**Important:**

Don't use `effect()` for normal derived state.

---

# 5. RxJS ⭐⭐⭐⭐⭐

For Angular, **RxJS is extremely important.**

### Q12. What is Observable?

> An Observable represents a stream of values over time. It can emit zero, one, or multiple values and can be subscribed to.

Example:

```ts
this.http.get('/users')
  .subscribe(users => {
    console.log(users);
  });
```

---

### Q13. Promise vs Observable?

| Promise              | Observable      |
| -------------------- | --------------- |
| Usually one value    | Multiple values |
| Eager                | Lazy            |
| Cannot easily cancel | Can unsubscribe |
| `async/await`        | RxJS operators  |

Interview answer:

> HTTP requests in Angular return Observables, which gives us operators for transformation, cancellation and composition.

---

# 6. RxJS Operators ⭐⭐⭐⭐⭐

Know these extremely well:

```text
map
filter
tap
switchMap
mergeMap
concatMap
exhaustMap
debounceTime
distinctUntilChanged
catchError
retry
forkJoin
combineLatest
shareReplay
```

---

### Q14. switchMap vs mergeMap?

This is a **very common interview question.**

### switchMap

> Cancels the previous inner observable when a new value arrives.

Best example:

**Search box**

```text
"ang"
"angul"
"angular"
```

We only care about the latest search.

```ts
search$.pipe(
  switchMap(query => this.api.search(query))
);
```

### mergeMap

> Executes inner observables concurrently and doesn't cancel previous ones.

Useful when multiple requests can run independently.

**Remember:**

> switchMap = latest
> mergeMap = parallel

---

### Q15. concatMap vs exhaustMap?

**concatMap:**

> Executes requests one after another in order.

```text
A → B → C
```

**exhaustMap:**

> Ignores new emissions while the current request is running.

Perfect example:

**Submit button**

```text
Click → API running
Click → ignored
Click → ignored
API complete
```

**Remember:**

```text
switchMap  → latest
mergeMap   → parallel
concatMap  → queue
exhaustMap → ignore while busy
```

🔥 Memorize this table.

---

# 7. RxJS Subscription Management

### Q16. How do you avoid memory leaks?

> I make sure subscriptions are properly managed. For Angular component subscriptions, I prefer the `async` pipe where possible, and for manual subscriptions I can use `takeUntilDestroyed()` or another lifecycle-based cleanup mechanism.

Example:

```ts
users$ = this.userService.getUsers();
```

Template:

```html
<div *ngFor="let user of users$ | async">
```

No manual unsubscribe required.

---

# 8. Dependency Injection ⭐⭐⭐⭐

### Q17. What is Dependency Injection?

> Dependency Injection means a class receives the dependencies it needs instead of creating them itself.

Instead of:

```ts
const service = new UserService();
```

Angular provides it:

```ts
constructor(private userService: UserService) {}
```

Benefits:

* loose coupling
* easier testing
* reusable services
* better maintainability

---

### Q18. What is providedIn root?

```ts
@Injectable({
  providedIn: 'root'
})
```

> It registers the service with the application's root injector, generally giving us a singleton service for the application.

---

# 9. Angular Services

### Q19. Why do we use services?

> Services are used to separate reusable business logic and data access from components.

For example:

```text
Component
    ↓
UserService
    ↓
HttpClient
    ↓
Backend API
```

This keeps components focused mainly on presentation and interaction.

---

# 10. Routing ⭐⭐⭐⭐

### Q20. What is lazy loading?

> Lazy loading means loading a feature only when the user navigates to it instead of loading everything during the initial application load.

Benefits:

* smaller initial bundle
* faster startup
* better scalability

Modern Angular can use lazy routes with `loadComponent` or `loadChildren`.

---

### Q21. What is route guard?

> A route guard controls whether navigation to a route is allowed.

Examples:

* authentication
* authorization
* unsaved changes
* feature access

Example concept:

```text
User
 ↓
Route
 ↓
Auth Guard
 ↓
Authenticated?
 ↙       ↘
Yes       No
 ↓         ↓
Page      Login
```

---

# 11. Authentication & Authorization ⭐⭐⭐⭐⭐

### Q22. How would you implement authentication in Angular?

Good senior answer:

> After login, the backend authenticates the user and provides a session mechanism or token. The frontend maintains the authenticated state, attaches credentials to API requests using an interceptor where appropriate, and protects routes using guards.
>
> I would also handle token expiry centrally and avoid storing sensitive long-lived credentials insecurely.

If JWT is used:

```text
Login
 ↓
JWT
 ↓
HTTP Interceptor
 ↓
Authorization header
 ↓
Backend
```

---

### Q23. What is an HTTP interceptor?

> An interceptor allows us to process HTTP requests and responses globally.

Typical uses:

* authentication headers
* logging
* error handling
* retry logic
* loading indicators

Example:

```text
Component
 ↓
HttpClient
 ↓
Interceptor
 ↓
Backend
```

---

# 12. State Management ⭐⭐⭐⭐⭐

### Q24. How do you manage state in Angular?

A senior answer:

> It depends on the scope of the state.

```text
Local component state → Signals
Shared simple state → Service + Signals/Observables
Complex global state → NgRx or another structured state solution
Server state → caching/data-fetching strategy
```

Don't immediately say:

> "I use NgRx for everything."

That's not senior.

---

### Q25. What is NgRx?

> NgRx is a reactive state management library based on Redux principles. It provides a predictable centralized state model using actions, reducers, selectors and effects.

Remember:

```text
Action
  ↓
Reducer
  ↓
Store
  ↓
Selector
  ↓
Component
```

**Effect:**

```text
Action → Effect → API → New Action
```

---

# 13. Angular Forms ⭐⭐⭐⭐

### Q26. Template-driven vs Reactive Forms?

**Template-driven:**

> Logic is mostly defined in HTML and is simpler for small forms.

**Reactive forms:**

> Form structure and validation are defined in TypeScript, making them more scalable and testable.

For enterprise applications:

> I generally prefer reactive forms for complex forms.

---

### Q27. How do you validate forms?

```ts
this.form = this.fb.group({
  email: ['', [
    Validators.required,
    Validators.email
  ]]
});
```

Can have:

* synchronous validators
* asynchronous validators
* custom validators

---

# 14. Performance Optimization ⭐⭐⭐⭐⭐

This is **very important for a Senior UI Engineer.**

### Q28. Application suddenly becomes slow. How do you debug it?

Give this answer:

> I wouldn't immediately start changing code. First I identify whether the bottleneck is rendering, JavaScript execution, network, backend or memory.

Then:

```text
1. Reproduce
2. Measure
3. Identify bottleneck
4. Fix
5. Measure again
```

I would use:

* Chrome Performance
* Lighthouse
* Network tab
* Memory profiler
* Angular DevTools
* bundle analysis

Then investigate:

### Rendering

* unnecessary change detection
* huge DOM
* missing `trackBy`/stable tracking
* expensive template expressions

### JavaScript

* expensive calculations
* large loops
* memory leaks

### Network

* large bundles
* unnecessary API calls
* duplicate requests
* slow APIs

### Architecture

* missing lazy loading
* unnecessary global state
* poor caching

**Excellent senior statement:**

> "I prefer profiling first rather than optimizing based on assumptions."

---

# 15. Angular List Performance ⭐⭐⭐⭐⭐

### Q29. How do you optimize large lists?

> For large lists, I would avoid rendering thousands of DOM nodes at once. I would use pagination or virtual scrolling, use stable tracking keys, avoid expensive template expressions, and use OnPush where appropriate.

Example concept:

```text
100,000 records
       ↓
Don't render all
       ↓
Virtual scroll
       ↓
Render only visible items
```

---

# 16. trackBy / Tracking

### Q30. Why do we need trackBy?

> Angular needs to identify which list items changed. A stable tracking key allows Angular to reuse existing DOM elements instead of recreating them unnecessarily.

Concept:

```ts
trackById(index: number, item: User) {
  return item.id;
}
```

Modern Angular also has `@for (...; track item.id)`.

---

# 17. Standalone Components ⭐⭐⭐⭐⭐

### Q31. What are standalone components?

> Standalone components don't require an NgModule to declare them. Their dependencies can be imported directly into the component.

Example:

```ts
@Component({
  standalone: true,
  imports: [CommonModule]
})
```

Benefits:

* simpler architecture
* easier lazy loading
* less module boilerplate
* better dependency visibility

---

# 18. Angular Architecture ⭐⭐⭐⭐⭐

### Q32. How would you structure a large Angular application?

A good answer:

```text
src/
 ├── core/
 │    ├── auth
 │    ├── interceptors
 │    └── services
 │
 ├── shared/
 │    ├── components
 │    ├── directives
 │    └── pipes
 │
 ├── features/
 │    ├── users
 │    ├── dashboard
 │    └── reports
 │
 └── app/
```

Explain:

> Core contains application-wide functionality, shared contains reusable UI/utilities, and features contain business-specific functionality.

**Senior point:**

> "I prefer organizing primarily by feature rather than creating huge global folders based only on file type."

---

# 19. Component Communication ⭐⭐⭐⭐

### Q33. How can Angular components communicate?

```text
Parent → Child
@Input

Child → Parent
@Output

Sibling / unrelated
Service / shared state

Global
NgRx / state store
```

Modern Angular also provides signal-based input/output APIs.

---

# 20. Pipes ⭐⭐⭐

### Q34. What is a pipe?

> A pipe transforms data for display in the template.

Example:

```html
{{ username | uppercase }}
```

---

### Q35. Pure vs impure pipe?

**Pure pipe:**

> Runs when its input value/reference changes.

**Impure pipe:**

> Can run during every change detection cycle.

Therefore:

> I prefer pure pipes whenever possible because impure pipes can negatively affect performance.

---

# 21. Directives ⭐⭐⭐

### Q36. What is a directive?

> A directive changes the behavior or appearance of DOM elements.

Types:

```text
Component directive
Attribute directive
Structural directive
```

Examples:

```html
*ngIf
*ngFor
ngClass
ngStyle
```

Modern Angular also supports control-flow syntax such as:

```html
@if
@for
@switch
```

---

# 22. HTTP & API Handling ⭐⭐⭐⭐⭐

### Q37. How do you handle API errors globally?

> I would centralize common HTTP error handling using an interceptor, while keeping business-specific error handling closer to the feature that understands the context.

Example:

```text
401 → authentication handling
403 → authorization
500 → generic server error
network → connectivity handling
```

Don't put every error decision inside the interceptor.

---

# 23. Caching ⭐⭐⭐⭐

### Q38. How would you prevent duplicate API calls?

Possible approaches:

* cache responses
* `shareReplay`
* state management
* request deduplication
* appropriate backend caching

Example:

```ts
users$ = this.http.get('/users').pipe(
  shareReplay(1)
);
```

Explain:

> `shareReplay(1)` can share the latest emitted value among subscribers, avoiding repeated execution for a shared observable when used appropriately.

---

# 24. Security ⭐⭐⭐⭐⭐

### Q39. What frontend security issues do you know?

Mention:

```text
XSS
CSRF
CORS
Clickjacking
Sensitive data exposure
Insecure token storage
Dependency vulnerabilities
```

### XSS

> XSS happens when an attacker gets malicious script executed in another user's browser.

Angular provides escaping and sanitization mechanisms, but developers should still avoid unsafe DOM APIs and bypassing sanitization unnecessarily.

---

### Q40. What is CORS?

> CORS is a browser security mechanism that controls whether a web page from one origin can access resources from another origin.

Example:

```text
Frontend:
https://app.example.com

Backend:
https://api.example.com
```

The backend must return appropriate CORS headers.

---

# 25. Testing ⭐⭐⭐⭐

### Q41. How do you test Angular applications?

Mention:

```text
Unit testing
Integration testing
Component testing
E2E testing
```

Tools can include:

* Jest
* Karma/Jasmine in legacy setups
* Cypress
* Playwright

Senior answer:

> I focus unit tests on business logic and component behavior, integration tests on interactions between pieces, and E2E tests on critical user journeys.

---

# 26. Accessibility ⭐⭐⭐⭐

PubMatic UI role may value this.

### Q42. How do you make Angular applications accessible?

Mention:

* semantic HTML
* keyboard navigation
* labels
* focus management
* ARIA where necessary
* color contrast
* screen reader testing

Good answer:

> Accessibility should be considered during component design rather than added at the end.

---

# 27. TypeScript ⭐⭐⭐⭐⭐

You should be prepared for TypeScript because Angular heavily relies on it.

### Q43. interface vs type?

Simple:

> Both can describe types. Interfaces are particularly useful for object contracts and can be extended/merged, while type aliases are more flexible for unions, intersections and other type compositions.

Example:

```ts
interface User {
  id: number;
  name: string;
}
```

```ts
type Status = 'active' | 'inactive';
```

---

### Q44. any vs unknown?

> `any` disables type checking, while `unknown` forces us to perform type checking before using the value.

Prefer:

```ts
unknown
```

over:

```ts
any
```

when the type is genuinely unknown.

---

# 28. JavaScript Questions They Can Ask

Don't ignore JavaScript just because the role says Angular.

### Q45. Explain event loop.

Easy answer:

> JavaScript is single-threaded for executing JavaScript code. Asynchronous operations are handled through browser or runtime APIs, and callbacks are scheduled through queues. The event loop coordinates when those callbacks are moved to the call stack.

Remember:

```text
Call Stack
    ↓
Async API
    ↓
Queue
    ↓
Event Loop
    ↓
Call Stack
```

---

### Q46. var vs let vs const?

```text
var   → function scoped
let   → block scoped
const → block scoped + cannot reassign
```

Also mention:

> `let` and `const` are hoisted but remain in the temporal dead zone until initialization.

---

# 29. Promise.all vs Promise.allSettled

### Q47.

**Promise.all**

> Fails when one promise rejects.

**Promise.allSettled**

> Waits for all promises and gives the result of each, whether fulfilled or rejected.

Remember:

```text
all        → everyone must succeed
allSettled → tell me everyone's result
```

---

# 30. Debouncing ⭐⭐⭐⭐⭐

### Q48. Where would you use debounce?

Search boxes.

```text
User types:
A
An
Ang
Angu
Angular
```

Instead of making 6 API calls:

```text
Angular
   ↓
wait 300ms
   ↓
API call
```

Use:

```ts
debounceTime(300)
```

Combine with `distinctUntilChanged()` to avoid repeating identical searches.

---

# 31. Senior Scenario Questions ⭐⭐⭐⭐⭐

These are **more important than definitions**.

## Q49. User says your Angular application is slow. What will you do?

Answer:

> First I reproduce the issue and measure it. Then I identify whether it is related to initial bundle size, network, rendering, JavaScript execution or memory.
>
> I check Lighthouse, Chrome Performance, Network and Memory tools and Angular DevTools.
>
> Depending on the bottleneck, I might use lazy loading, OnPush, better list rendering, virtual scrolling, caching, reducing API calls or code splitting.
>
> Finally, I measure again to confirm the improvement.

🔥 This sounds senior.

---

# 32. API is called multiple times. Why?

Possible reasons:

```text
Multiple subscriptions
Component recreated
Effect/subscription triggered repeatedly
HTTP observable subscribed multiple times
Route changes
Improper RxJS chain
```

Solution:

> First identify where the subscription originates, then decide whether sharing, caching, lifecycle management or restructuring the observable is appropriate.

---

# 33. Memory leak in Angular?

Answer:

> I would look for subscriptions that outlive their components, timers, event listeners, retained references and large cached objects.

Use:

```text
async pipe
takeUntilDestroyed()
proper cleanup
Chrome Memory Profiler
```

---

# 34. How would you design a reusable component library?

Senior answer:

> I would first identify common UI patterns and define clear component APIs. Components should have minimal dependencies, predictable inputs and outputs, accessibility built in, consistent styling and good documentation.
>
> I would also avoid putting business-specific logic inside generic components.

Example:

```text
Button
Modal
Table
Dropdown
DatePicker
Pagination
```

Business logic stays outside.

---

# 35. How do you handle a huge table?

Answer:

> I would first determine whether all records really need to be loaded on the client. Usually I prefer server-side pagination, filtering and sorting.
>
> For large visible datasets, I can use virtual scrolling. I would also optimize rendering with stable tracking, OnPush and avoid expensive template computations.

Excellent.

---

# 36. How do you improve initial page load?

Say:

```text
Lazy loading
Code splitting
Tree shaking
Compress assets
Optimize images
Reduce JS bundle
SSR/SSG where appropriate
Caching
Preload only critical resources
```

Most important:

> First measure the bundle and network waterfall before deciding what to optimize.

---

# 37. SSR — What is it?

### Q:

What is Server-Side Rendering?

> In SSR, HTML is generated on the server and sent to the browser. This can improve initial rendering and SEO compared with waiting for the client to build the page entirely.

Angular supports SSR through Angular's modern server-rendering tooling.

---

# 38. CSR vs SSR

```text
CSR
Server → JavaScript
Browser → renders UI

SSR
Server → HTML
Browser → displays HTML
       → hydrates application
```

SSR benefits:

* SEO
* initial content
* perceived performance

---

# 39. What is hydration?

> Hydration allows Angular to reuse the server-rendered DOM and attach client-side behavior instead of rebuilding the entire page from scratch.

Remember:

**SSR creates HTML → Hydration makes it interactive.**

---

# 40. What makes you a Senior Developer?

This can be asked directly.

Don't say:

> "I know Angular very well."

Say:

> "For me, seniority is not only about knowing the framework. It's about making good technical decisions, understanding trade-offs, designing maintainable solutions, debugging production issues, improving performance, writing testable code and helping the team follow good engineering practices."

🔥 Very strong answer.

---

# 🧠 15 QUESTIONS YOU MUST REVISE BEFORE ENTERING

If you have very little time, revise these **in this exact order**:

### 🔥 Tier 1 — MUST KNOW

1. **Angular architecture**
2. **Lifecycle hooks**
3. **Change detection**
4. **OnPush**
5. **Signals**
6. **Observable**
7. **switchMap vs mergeMap vs concatMap vs exhaustMap**
8. **Dependency Injection**
9. **Interceptors**
10. **Routing + Guards**
11. **State management / NgRx**
12. **Performance optimization**
13. **Lazy loading**
14. **Angular security**
15. **Component architecture**

### 🔥 Tier 2

16. Reactive Forms
17. Pipes
18. Directives
19. Standalone components
20. SSR/hydration
21. Testing
22. Accessibility
23. HTTP error handling
24. Caching
25. TypeScript

---

# 🎯 One-Line Memory Sheet

Read this **3–4 times before your interview**:

```text
Component
→ UI + logic + style

Service
→ reusable/business logic

DI
→ Angular provides dependencies

Lifecycle
→ Create → Change → View → Destroy

OnPush
→ reference-based change detection

Signal
→ reactive state

Observable
→ asynchronous stream

switchMap
→ latest request

mergeMap
→ parallel requests

concatMap
→ queue requests

exhaustMap
→ ignore while running

Interceptor
→ common HTTP processing

Guard
→ control navigation

Lazy loading
→ load feature when needed

NgRx
→ centralized predictable state

Pure pipe
→ input change

Impure pipe
→ frequent change detection

track
→ reuse DOM efficiently

Virtual scroll
→ render visible items

SSR
→ HTML from server

Hydration
→ make SSR HTML interactive

XSS
→ malicious script

CORS
→ browser cross-origin rules

Reactive Form
→ form logic in TypeScript

Senior developer
→ measure → design → trade-off → implement → test → monitor
```

## ⚠️ One important thing for YOUR interview

Because this is a **Senior Software Engineer – UI** role, don't answer everything like a fresher:

❌ **Junior answer:**

> "OnPush improves performance."

✅ **Senior answer:**

> "I use OnPush when appropriate to reduce unnecessary checks. But I also need to maintain immutable state/reference changes because mutating an existing object may not trigger the expected update."

That **"why + trade-off + when"** style is what you should use throughout the interview.

If they give you a scenario, use:

> **Understand → Measure → Identify bottleneck → Consider trade-offs → Implement → Test → Monitor**

That single structure will help you sound much more senior.
