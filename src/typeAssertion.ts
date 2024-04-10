//TYPE ASSERTIONS---------------------------------------------------------------//
let someValue: any = 'This is a string';

// Using type assertion to treat 'someValue' as a string
let strLength: number = (someValue as string).length;
console.log(strLength); //16

//---------------------------------------------------------------//
type Bird = {
  name: string;
};

// Assume we have a JSON string from an API or local file
let birdString = '{"name": "Eagle"}';
let dogString = '{"breed": "Poodle"}';

// Parse the JSON string into an object, type is 'any' at the moment
let birdObject = JSON.parse(birdString);
let dogObject = JSON.parse(dogString);

// We're sure that the jsonObject is actually a Bird
let bird = birdObject as Bird;
let dog = dogObject as Bird;

console.log(bird.name);//Eagle
console.log(dog.name); //undefined, the 'dogString', the origin data doesnt have property 'name'!

//---------------------------------------------------------------//
enum Status {
  Pending = 'pending',
  Declined = 'declined',
}

type User3 = {
  name: string;
  status: Status; 
};
// save Status.Pending in the DB as a string
// retrieve string from the DB
const statusValue = 'pending';

const user: User3 = { name: 'john', status: statusValue as Status };
console.log(user) //{name: 'john', status: 'pending'}



//TYPE UNKNOWN---------------------------------------------------------------//
//similar to "any"
let unknownValue: unknown;

// Assign different types of values to unknownValue
unknownValue = 'Hello World';   // OK
unknownValue = [1, 2, 3];       // OK
unknownValue = 42.3344556;      // OK
//unknownValue.toFixed( );      // Error: Object is of type 'unknown', before of use the value, we need to check for the type of the value of type "unknown" 

//Type checking, after this, it can run the method on the value
if (typeof unknownValue === 'number') {
  // TypeScript knows that unknownValue is a string in this block
  console.log(unknownValue.toFixed(2)); //42.33
}

function runSomeCode() {
  const random = Math.random();
  if (random < 0.5) {
    throw new Error('Something went wrong with the math.random function');
  } else {
    throw 'some other error';
  }
}

try {
  runSomeCode();
} catch (error) {
  //here we check if the error that is thrown is actually a string or an actual error
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log(error);
    console.log('Not thrown by an instance of error....');
  }
}

//TYPE NEVER---------------------------------------------------------------//
// let someValue: never = 0;  //not possible to asign ANY value to type"never"

type Theme2 = 'light' | 'dark';

function checkTheme(theme: Theme2) {
  if (theme === 'light') {
    console.log('light theme');
    return;
  }
  if (theme === 'dark') {
    console.log('dark theme');
    return;
  }
  //theme is of type never, because it can never have a value that is not 'light' or 'dark'.
  theme; 
}
const theme:Theme2 = 'light';
console.log(checkTheme(theme)) //light theme
//---------------------------------------------------------------//

enum Color {
  Red,
  Blue,
  // Green,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return 'Red';
    case Color.Blue:
      return 'Blue';
    default:
      //The problem that 'Green' as unexpected value will be caught at build time
      let unexpectedColor: never = color;
      //with this code the error in our programming will be shown only at runtime
      throw new Error(`Unexpected color value: ${unexpectedColor}`);
  }
}

console.log(getColorName(Color.Red)); // Red
console.log(getColorName(Color.Blue)); // Blue
// console.log(getColorName(Color.Green)); // Uncaught Error: Unexpected color value: 2 - the enum color green doesnt return anything
