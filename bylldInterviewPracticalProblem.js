
// const shape = {
//   radius: 10,
//   diameter() {
//     return this.radius * 2;
//   },
//   perimeter: () => 2 * Math.PI * this.radius,
// };

// console.log(shape.diameter());
// console.log(shape.perimeter());






// let a = 1;
// function foo() {
//   console.log(a); // 2
//   let a = 2;
//   function bar() {
//     console.log(a); // 3
//     let a = 3;
//     console.log(a); // 3
//   }
//   bar();
// }
// foo();
// console.log(a); // 1









// const gina = {
//   firstName: "Gina",
//   birthYear: 1990,

//   greet: function () {
//     console.log(`Hi ${this.firstName}`); // Gina 
//     // console.log(`Hi ${this.firstName}`); // undefined // greet

//     const isMillenial = function () {
//       console.log(this.birthYear);
      
//       if (this.birthYear >= 1981 && this.birthYear <= 1996) { // gina
//         console.log(`You are also a Millennial!`); // You are also a Millennial!
//        }
//     };


//     isMillenial();
//   },
// };
// gina.greet();









// const myPromise = () => Promise.resolve("I have resolved!"); // 1

// function firstFunction() {
//   myPromise().then((res) => console.log(res));
//   console.log("second");
// }

// async function secondFunction() {
//   console.log(await myPromise()); // 2
//   console.log("second"); // 3
// }

// firstFunction();
// secondFunction();
//  second
// I have resolved!  // firstFunction
// I have resolved!
// second














// function outer() {
//   function inner() {
//     console.log(x); // 10
//   }
//   inner();
//   let x = 10; 
//   console.log(x); // 10
//   if (true) {
//     let x = 5;
//     console.log(x); // 5
//   }
//   console.log(x); // 10
// }
// outer();



// start with introduction 

// Scan entire resume. He is was very particular about what exactly you mentioned in the resume. 

// he asked you mentioned parrele procession how you have done that?
// he ask me abt Connector API, ( I have written 50% reduce development type he asked me how u come with this number how u calculate this )
// the he ask about payment middleware that I mentioned in my resume . 
// the he  check my person projects 

// this was first secontion then second section has theory quetoin in 3rd  practical coding problems 


// 1. Function declaration and function expression
// 2. What are the different types of functions declaration
// 1. 
// what are components of javascript engine // smthing like this questions ? like event loop 
// 2 is js single threaded or multi threaded 
// 3 how it handle the processing  then ? 
// 4. hoisting? 
// 5. closure?


// what are promises?
// HOF