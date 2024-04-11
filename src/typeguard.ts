//TYPEOF TYPEGUARD -----------------------------------------------------------------//
type ValueType = string | number | boolean;

let value: ValueType;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;

function checkValue(value: ValueType) {
  if (typeof value === "string") {
    console.log(value.toLowerCase());
    return;
  }
  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }
  console.log(`boolean: ${value}`);
}

checkValue(value);

//Equality Narrowing TYPEGUARD -----------------------------------------------------------------//
type Dog = { type: "dog"; name: string; bark: (someValue: string) => string };
type Cat = { type: "cat"; name: string; meow(message: string): string };
type MuteCat = { type: "mutecat"; name: string; none?: () => void };
type Animal = Dog | Cat | MuteCat;

//OBJECT TYPE VALUE CHECK
function makeSound(animal: Animal) {
  if (animal.type === "dog") {
    // TypeScript knows that `animal` is a Dog in this block
    console.log(animal.bark("woof"));
  }
  if (animal.type === "cat") {
    //TypeScript knows that `animal` is a Cat in this block
    console.log(animal.meow("miau"));
  } else {
    console.log("animal.none()");
  }
}
//OBJECT METHOD CHECK
function makeSound2(animal: Animal) {
  if ('bark' in animal) {
    // TypeScript knows that `animal` is a Dog in this block
    console.log(animal.bark("woof"));
  }
  if ('meow' in animal) {
    //TypeScript knows that `animal` is a Cat in this block
    console.log(animal.meow("miau"));
  } else {
    console.log("animal.none()");
  }
}

//INSTANCES
const animal1: Animal = {
  type: "dog",
  name: "Rex",
  //this is property, not method!
  bark: (someValue) => {
    return someValue;
  },
};

const animal2: Animal = {
  type: "cat",
  name: "Certinko",
  //this is method
  meow(message) {
    return `${this.name} robi ${message}!`;
  },
};

const animal3: Animal = {
  type: "mutecat",
  name: "unknown",
};

makeSound(animal1); //woof
makeSound(animal2); //Certinko robi miau!
makeSound(animal3); //animal.none
makeSound2(animal1); //animal.none --> because the bark is not a method!!

//TRUTHY/FALSY TYPEGUARD -----------------------------------------------------------------//
function printLength(str: string | null | undefined) {
  if (str) {
    // In this block, TypeScript knows that `str` is a string
    // because `null` and `undefined` are falsy values.
    console.log(str.length);
  } else {
    console.log('No string provided');
  }
}

printLength('Hello');    // Outputs: 5
printLength('');         // Outputs: No string provided
printLength(null);       // Outputs: No string provided
printLength(undefined);  // Outputs: No string provided

//INSTANCEOF TYPEGUARD -----------------------------------------------------------------//
try {
  // Some code that may throw an error
  //throw 'some error'; --> this will not be an instance of an Error
  throw new Error('This is an error');
} catch (error) {
  if (error instanceof Error) {
    console.log('Caught an Error object: ' + error.message); //Caught an Error object: This is an error
  } else {
    console.log('Caught an unknown error');
  }
}

function checkInput(input: Date | string): string {
  if (input instanceof Date) {
    return input.getFullYear().toString(); //converted to string, without it the Date would be a number
  }
  return input;
}

const year = checkInput(new Date());
const random2 = checkInput('2020-05-05');
console.log(year,'is typeof :', typeof(year));    //2024 is typeof : string --> this is an instance
console.log(random2); //2020-05-05 --> this is not an instance

//TYPE PREDICATE -----------------------------------------------------------------//
type Student = {
  name: string;
  study: () => void;
};

type User = {
  name: string;
  login: () => void;
};

type Person = Student | User;

const randomPerson = (): Person => {
  return Math.random() > 0.5
    ? { name: 'john', study: () => console.log('Studying') }
    : { name: 'mary', login: () => console.log('Logging in') };
};

const person = randomPerson();



function isStudent(person: Person): person is Student {
  // return 'study' in person;
  return (person as Student).study !== undefined;
}

// Usage

if (isStudent(person)) {
  person.study(); // This is safe because TypeScript knows that 'person' is a Student.
} else {
  person.login();
}