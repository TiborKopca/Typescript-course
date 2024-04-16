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

//Multiple variable types in generic function, i've added union type syntax---------------------//
function pair<T, U, V>(param1: T, param2: U | V): [T, U | V] {
  return [param1, param2];
}

//Usage
let result2 = pair<number, string, boolean>(123, "Hello");
console.log(result2); // Output: [123, "Hello"]
let result3 = pair<number, string, boolean>(456, true);
console.log(result3); // Output: [456, true]

//Inferred Type -- Typescript can function like this, but we need to be carefull to pass the correct values
let result4 = pair(0, "This works too, but carefull with values");
console.log(result4); // Output: [0, This works too, but carefull with values]
//  const [name,setName] = useState('')
//  const [products,setProducts] = useState<Product[]>([])

//Type Constraints--------------------------------------------//
//type constraint on the generic type T, generic type can be either a number or a string.
function processValue<T extends number | string>(value: T): T {
  console.log(value);
  return value;
}

//the same function can handle string or number, but no boolean in this case
processValue("hello"); //hello
processValue(12); //12
// processValue(true);     //true - it will be logged out but typescript shows us this is not correct

//More Type Constraints--------------------------------------------//
type Product = {
  name: string;
  price: number;
};

const product: Product = {
  name: "shoes",
  price: 1.99,
};

type Student = {
  name: string;
  age: number;
};

const student: Student = {
  name: "peter",
  age: 20,
};

// T extends Student is a type constraint on the generic type T. It means that the type T can be any type, but it must be a subtype of Student or Student itself. In other words, T must have at least the same properties and methods that Student has.
function printName<T extends Student>(input: T): void {
  console.log(input.name);
}
printName(student); //peter

function printNameUnion<T extends Student | Product>(input: T): void {
  console.log(input.name);
}
printNameUnion(product); //shoes

//The extends "any object" { name: string } part is a type constraint on T.
//It means that T can be any type, but it must be an object that has at least a name property of type string.
//In other words, T must have at least the same properties and methods that { name: string } has.
function printName2<T extends { name: string }>(input: T): void {
  console.log(input.name);
}
printName2(student); //peter
printName2(product); //shoes

//Generics - Default Value --> set the interface by default to some type-----------------------//
interface StoreData<T = any> {
  data: T[];
}

const storeNumbers: StoreData<number> = {
  data: [1, 2, 3, 4],
};
console.log(storeNumbers) //{data: Array(4)} data: [1, 2, 3, 4]

//Store data has no type provided, because we set it by default above
const randomStuff: StoreData = {
  data: ["random", 1],
};
console.log(randomStuff) //{data: Array(2)}data: ["random", 1]


//AXIOS - HTTP REQUESTS
//data is located in the data property of the object
// let someUrl = 'https://volando.art'
// const { data } = axios.get(someUrl);

// axios.get<{ name: string }[]>(someUrl);

// export class Axios {
//   get<T = any, R = AxiosResponse<T>, D = any>(
//     url: string,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
// }

// export interface AxiosResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//   config: InternalAxiosRequestConfig<D>;
//   request?: any;
// }