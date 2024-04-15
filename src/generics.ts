//ARRAYS -----------------------------------------------------------------//
// In TypeScript, you can declare an array using two syntaxes:
// let array1: string[] = ['Apple', 'Banana', 'Mango'];
// let array2: number[] = [1, 2, 3];
// let array3: boolean[] = [true, false, true];

let array1: Array<string> = ["Apple", "Banana", "Mango"];
let array2: Array<number> = [1, 2, 3];
let array3: Array<boolean> = [true, false, true];
console.log(array1, array2, array3);

//Create Generic Function-----------------------------------------------------------------//
// function createString(arg: string): string {
//   return arg;
// }
// function createNumber(arg: number): number {
//   return arg;
// }

// Define a generic function, this replaces the previous(above)functions, as they are too specific and we would need a specific function for every type
//T --> type
function genericFunction<T>(arg: T): T {
  return arg;
}

const someStringValue = genericFunction<string>("Hello World");
console.log(someStringValue); //Hello World
const someNumberValue = genericFunction<number>(2);
console.log(someNumberValue); //2

//Define a generic interface-----------------------------------------------------------------//
interface GenericInterface<T> {
  value: T;
  getValue: () => T;
}

const genericString: GenericInterface<string> = {
  value: "Hello World",
  getValue() {
    return this.value;
  },
};

console.log(genericString); //{value: 'Hello World', getValue: ƒ}

//Promise Example----------------------------------------------------------------//
// A Promise in JavaScript (and thus TypeScript) is an object representing the eventual completion or failure of an asynchronous operation.
async function someFunc(): Promise<string> {
  return "Hello World";
}

const result = someFunc();
console.log(result); //Promise {<fulfilled>: 'Hello World'}

//Generate Normal String Array----------------------------------------------------------------//
function generateStringArray(length: number, value: string): string[] {
  let result: string[] = [];
  result = Array(length).fill(value);
  return result;
}

console.log(generateStringArray(3, "hello")); //(3) ['hello', 'hello', 'hello']

//Generate Generic Array(upgraded previous function)--------------------------------------------//
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  result = Array(length).fill(value);
  return result;
}

let arrayStrings = createArray<string>(3, "hello"); // ["hello", "hello", "hello"]
let arrayNumbers = createArray<number>(4, 100); // [100, 100, 100, 100]

console.log(arrayStrings); //(3) ['hello', 'hello', 'hello']
console.log(arrayNumbers); //(4) [100, 100, 100, 100]

//Multiple variable types in generic function
function pair<T, U>(param1: T, param2: U): [T, U] {
  return [param1, param2];
}

// Usage
let result2 = pair<number, string>(123, "Hello");
console.log(result2); // Output: [123, "Hello"]
