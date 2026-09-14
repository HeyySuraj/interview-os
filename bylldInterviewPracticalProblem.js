
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());






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
//       if (this.birthYear >= 1981 && this.birthYear <= 1996) { // gina
//         console.log(You are also a Millennial!); // You are also a Millennial!
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