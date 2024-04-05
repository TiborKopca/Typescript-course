//OBJECTS
let car1: { brand: string; year: number } = { brand: "landrover", year: 2020 };
car1.brand = "ford";
// car.color = 'blue'; //doesnt work obviously

let car2: { brand: string; year: number } = { brand: "audi", year: 1992 };

let book = { title: "book", cost: 10 };
let notebook = { title: "notebook" };
let pen = { title: "pen", cost: 2 };

//array of objects, with OPTIONAL PROPERTY, note that notebook misses cost property and there is no error
let items: { readonly title: string; cost?: number }[] = [book, pen, notebook];
// items[0].title = 'new book'; //wont work, the title is read only

let product1 = { brand: "yamaha", year: 1983 };
let product2 = { brand: "dell", year: 2024 };
let products: { brand: string; year: number }[] = [product1, product2];
products.push({ brand: "shoes", year: 2345 });
console.log("products objects in array", products);

//FUNCTIONS
function sayHi(name: string) {
  console.log(`Hello there ${name.toUpperCase()}`);
}
//invoking
sayHi("Ivuska");

//-----------------------------------------//
//the :number after () means what value is expecting to be result of the function
function calculateDiscount(price: number): number {
  const hasDiscount = true;
  if (hasDiscount) {
    //return 'discount aplied' //wont work
    return price * 0.5;
  }
  return price;
}
const finalPrice = calculateDiscount(200);

//-----------------------------------------//

const names2: string[] = ["John", "Jane", "Jim", "Jill"];

function isNameInList(name: string): boolean {
  return names2.includes(name); //returns true/false
}
//the searched name declared
let nameToCheck: string = "john"; //note that 'john' !== 'John'
//We conditionally return the result
if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list.`);
} else {
  console.log(`${nameToCheck} is not in the list.`);
}

//OPTIONAL PARAMS-----------------------------------------//
// the `?` operator here marks parameter `c` as optional
function add(a: number, b: number, c?: number) {
  return a + b + (c || 0);
}
console.log(add(2, 5)); //7

function calculateDiscountParams(price: number, discount?: number): number {
  return price - (discount || 0);
}
let priceAfterDiscount = calculateDiscountParams(100, 20); //80

//DEFAULT PARAMS-----------------------------------------//
function pow(value: number, exponent: number = 10) {
  return value ** exponent;
}
console.log(pow(10)); //10000000000

function calculateScore(
  initialScore: number,
  penaltyPoints: number = 0
): number {
  return initialScore - penaltyPoints;
}
let scoreAfterPenalty = calculateScore(100, 20);
let scoreWithoutPenalty = calculateScore(300);

//NAMED PARAMS-----------------------------------------//
function divide({ dividend, divisor }: { dividend: number; divisor: number }) {
  return dividend / divisor;
}
console.log(divide({ dividend: 10, divisor: 2 })); //5

//REST PARAMS-----------------------------------------//
function add2(a: number, b: number, ...rest: number[]) {
  return a + b + rest.reduce((p, c) => p + c, 0);
}
console.log(add2(10, 10, 10, 10, 10)); //50

//Every number passed as parameter from the array will be *2 and put into new array
function sum(message: string, ...numbers: number[]): string {
  const doubled = numbers.map((num) => num * 2);
  console.log(doubled);

  let total = numbers.reduce((previous, current) => {
    return previous + current;
  }, 0); //0 === default value
  return `${message}${total}`;
}
//the first part of the parameter === message
let result = sum("The total is: ", 1, 2, 3, 4, 5, 6); //if we have string in the data, we need to think the data will be collected in the number array
console.log(result); //no need to write some description, the message is already in the function

//TYPE ALIASES-----------------------------------------//
type Negate = (value: number) => number;

// in this function, the parameter `value` automatically gets assigned the type `number` from the type `Negate`
const negateFunction: Negate = (value) => value * -1;

console.log(negateFunction(10)); //-10

//VOID - ABSENCE OF A VALUE-----------------------------------------//
function logMessage(message: string): void {
  console.log(message);
}
logMessage("Hello losers!");

//-----------------------------------------------------------//
function processInput(input: string | number) {
  if (typeof input === "number") {
    console.log(input * 2);
  } else {
    console.log(input.toLowerCase());
  }
}
processInput(10);
processInput("Hello");

//OBJECTS AS PROPERTY IN FUNCTIONS----------------------------------------------------//
function createEmployee({ id }: { id: number }): {
  id: number;
  isActive: boolean;
} {
  return { id, isActive: id % 2 === 0 }; //the isActive depends on value of the id
}
const firstObject = createEmployee({ id: 1 });
const secondObject = createEmployee({ id: 2 });
console.log(firstObject, secondObject);

//OBJECTS AS PROPERTY IN FUNCTIONS ALTERNATIVE ----------------------------------------------------//
function createStudent(student: { id: number; name: string }): void {
  console.log(`Welcome to the hell ${student.name.toUpperCase()}!!`);
}
const newStudent = {
  id: 5,
  name: "Anna",
};
createStudent(newStudent);
createStudent({ id: 1, name: "Ivet" });

//--------------------------------------------------------------//
function processData(
  input: string | number,
  config: { reverse: boolean } = { reverse: false }//default value
): string | number {
  if (typeof input === "number") {
    return input * input;
  } else {
    return config.reverse
      ? input.toUpperCase().split("").reverse().join("")
      : input.toUpperCase();
  }
}
console.log(processData(10));
console.log(processData("Hello"));
console.log(processData("Hello", { reverse: true })); //OLLEH
console.log(processData("1234", { reverse: true })); //4321
