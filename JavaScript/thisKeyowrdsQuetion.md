

[Explain Variable Scope] https://chatgpt.com/share/6aad05cd-cb30-83e8-861a-32d4a4630207

NOTE: Arrow function dont provide theire own `this` binding (it retains the `this` value of the "enclosing lexical context")





------------------------------------------------
## Important Problems on this keyword 

const employee = {
  name: "Suraj",

  greet: function () {
    console.log(this.name);
  },

  greet2: () => {
    console.log(this.name);
  }
};

// employee.greet()

class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }

  greet2 = () => {
    console.log(this.name);
  };

  greet3() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }

  greet4() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }

  greet5() { // 23. Another old-school solution: self = this
    const self = this;

    setTimeout(function () {
      console.log(self.name);
    }, 1000);
  }
}

const user = new User("Surasj");

// user.greet();
// user.greet4()


const name = "Global";

const company = {
  name: "Suraj",

  greet() {
    console.log(name);
    console.log(this.name);
  }
};

// company.greet();

// 27. The this priority/order

// When multiple rules appear together, remember this rough priority:

// 1. new
// 2. explicit binding: call/apply/bind
// 3. implicit binding: obj.method()
// 4. default binding

// However, arrow functions are the exception because their this is lexical.


function welcome() {
  console.log(this.name);
}

const customer = {
  name: "Suraj"
};

// welcome.call(customer);


const disco = {
  name: "Suraj",

  greet() {
    console.log(this.name);

    function inner() {
      console.log(this.name);
    }

    const inner2 = () => {
      console.log(this.name);
    }

    inner();
    inner2();
  }
};

disco.greet();

| Code                                  | `this`                               |
| ------------------------------------- | ------------------------------------ |
| `obj.fn()`                            | `obj`                                |
| `fn()` strict mode                    | `undefined`                          |
| `fn.call(obj)`                        | `obj`                                |
| `fn.apply(obj)`                       | `obj`                                |
| `fn.bind(obj)`                        | `obj`                                |
| `new Fn()`                            | new object                           |
| Arrow function                        | lexical `this`                       |
| `obj.fn` assigned to `fn` then `fn()` | binding lost                         |
| Class method `obj.method()`           | `obj`                                |
| DOM normal event handler              | event target/current element context |
| ES module top-level `this`            | `undefined`                          |



const obj = {
  value: 10,

  regular() {
    console.log(this.value); // this will print 10
  },

  arrow: () => {
    console.log(this.value);  // this will also print 10 bcz arrow fn look for lexical scope variable 
  }
};

obj.regular();
obj.arrow();
------------------------------------------------