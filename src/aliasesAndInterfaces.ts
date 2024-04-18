//syntax can be also lowercase, it can be exported too
//export type User = { id: number; name: string; isActive: boolean };
type User = { id: number; name: string; isActive: boolean };

const john: User = {
  id: 1,
  name: 'john',
  isActive: true,
};
const susan: User = {
  id: 1,
  name: 'susan',
  isActive: false,
};

function createUser(user: User): User {
  console.log(`Hello there ${user.name.toUpperCase()} !!!`);
  return user;
}
createUser(susan);//Hello there SUSAN !!!

//------------------------------------------------------//
//This can be later used anywhere
type StringOrNumber = string | number; // Type alias for string | number

let value: StringOrNumber;
value = 'hello'; // This is valid
value = 123; // This is also valid
//------------------------------------------------------//
type Theme = 'light' | 'dark'; // Type alias for theme

let theme: Theme;
theme = 'light'; // This is valid
theme = 'dark'; // This is also valid

// Function that accepts the Theme type alias
function setTheme(t: Theme) {
  theme = t;
}

setTheme('dark'); // This will set the theme to 'dark'

//------------------------------------------------------//

type Employee = { id: number; name: string; department: string };
type Manager = { id: number; name: string; employees: Employee[] }; //manager has array of employees

type Staff = Employee | Manager;

function printStaffDetails(staff: Staff):void {
  //only Manager type has employees as property, this is how we diferenciate
  if ('employees' in staff) {
    console.log(
      `${staff.name} is a manager of ${staff.employees.length} employees.`
    );
  } else {
    console.log(
      `${staff.name} is an employee in the ${staff.department} department.`
    );
  }
}

const alice: Employee = { id: 1, name: 'Alice', department: 'Sales' };
const steve: Employee = { id: 1, name: 'Steve', department: 'HR' };
const bob: Manager = { id: 2, name: 'Bob', employees: [alice, steve] };

printStaffDetails(alice); // Outputs: Alice is an employee in the Sales department.
printStaffDetails(bob);

//INTERSECTION TYPE------------------------------------------------------//
type Book = { id: number; name: string; price: number };
type DiscountedBook = Book & { discount: number }; //combination of 2 types

const book1: Book = {
  id: 2,
  name: 'How to Cook a Dragon',
  price: 15,
};

const book2: Book = {
  id: 3,
  name: 'The Secret Life of Unicorns',
  price: 18,
};

const discountedBook: DiscountedBook = {
  id: 4,
  name: 'Gnomes vs. Goblins: The Ultimate Guide',
  price: 25,
  discount: 0.15,
};
console.log(discountedBook)

//TYPE ALIAS COMPUTED PROPERTIES------------------------------------------------------//
const propName = 'age';

type Animal = {
  [propName]: number;
};

let tiger: Animal = { [propName]: 5 };

//INTERFACES------------------------------------------------------//
interface Book2 {
  readonly isbn: number;
  title: string;
  author: string;
  genre?: string;
}

// const deepWork1 = {
//   isbn: 9781455586691,
//   title: 'Deep Work',
//   author: 'Cal Newport',
//   genre: 'Self-help',
// };

//instead of constant we use interface/alias aswell
const deepWork2: Book2 = {
  isbn: 9781455586691,
  title: 'Deep Work',
  author: 'Cal Newport',
  genre: 'Self-help',
};

deepWork2.title = 'New Title'; // allowed
// deepWork.isbn = 654321; // not allowed / readonly

//INTERFACES-METHODS-----------------------------------------------------//
interface Book3 {
  readonly isbn: number,
  title: string,
  author: string,
  genre?: string,
  // method
  printAuthor(): void;
  printTitle(message: string): string;
  printSomething: (someValue: number) => number; //its not function, just syntax
}

const deepWork: Book3 = {
  isbn: 9781455586691,
  title: 'Deep Work',
  author: 'Cal Newport',
  // genre: 'Self-help', //optional
  printAuthor() {
    console.log(this.author);
  },
  printTitle(message) {
    //this need to be return, since the printTitle outputs string
    return `${this.title} ${message}`;
  },

  //first option
  // printSomething: function (someValue) {
  //   return someValue;
  // },

  //second option
  printSomething: (someValue) => {
    // "this" gotcha, we need to use the name of the instance
    console.log(deepWork.author); //or any other code that will run
    return someValue;
  },

  //third option
  // printSomething(someValue) {
  //   return someValue;
  // }

  //fourth option
  // printAuthor: () => {
  //   console.log(deepWork.author);
  // },
};
console.log(deepWork.printSomething(34)); //34

deepWork.printAuthor(); //Cal Newport
const result2 = deepWork.printTitle('is an awesome book');
console.log(result2); //Deep Work is an awesome book

//INTERFACES-Challenge-----------------------------------------------------//
interface Computer {
  readonly id: number; // cannot be changed once initialized
  brand: string;
  ram: number;
  upgradeRam(increase: number): number;
  storage?: number; // optional property
}

const laptop: Computer = {
  id: 1,
  brand: 'random brand',
  ram: 8, // in GB
  upgradeRam(amount: number) {
    this.ram += amount;
    return this.ram;
  },
};

laptop.storage = 256; // assigning value to optional property

console.log(laptop.upgradeRam(4)); // upgrades RAM by 4GB
console.log(laptop);

//INTERFACES-EXTEND-MERGING-----------------------------------------------------//
interface Person {
  name: string;
  getDetails(): string;
}

interface DogOwner {
  dogName: string;
  getDogDetails(): string;
}

//Merging (reopening) an interface in TypeScript is a process where you declare an interface with the same name more than once, and TypeScript will merge their members.
//Merging the interface
interface Person {
  age: number;
}

//Usage of the interface
const person: Person = {
  name: 'John',
  age: 30,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
};

// Extending an interface in TypeScript is a way to create a new interface that inherits the properties and methods of an existing interface. You use the extends keyword to do this. When you extend an interface, the new interface will have all the members of the base interface, plus any new members that you add.

// Extending the interface
interface Employee2 extends Person {
  employeeId: number;
}

const employee: Employee2 = {
  name: 'jane',
  age: 28,
  employeeId: 123,
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Employee ID: ${this.employeeId}`;
  },
};
console.log(employee.getDetails());//Name: jane, Age: 28, Employee ID: 123


// Interface multiple inheritance
interface Manager2 extends Person, DogOwner {
  managePeople(): void;
}

const manager: Manager2 = {
  name: 'Bob',
  age: 35,
  dogName: 'Rex',
  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  getDogDetails() {
    return `Dog Name: ${this.dogName}`;
  },
  managePeople() {
    console.log('Managing people...');
  },
};
console.log(manager.managePeople())//Managing people...

//INTERFACES-Challenge-----------------------------------------------------//
function getEmployee(): Person3 | DogOwner3 | Manager3 {
  const random = Math.random(); //between 0-1

  if (random < 0.33) {
    return {
      name: 'john',
    };
  } else if (random < 0.66) {
    return {
      name: 'sarah',
      dogName: 'Rex',
    };
  } else {
    return {
      name: 'bob',
      managePeople: () => console.log('Managing people...'),
      delegateTasks: () => console.log('Delegating tasks...'),
    };
  }
}
//
function isManager(obj: Person3 | DogOwner3 | Manager3): obj is Manager3 {
  return 'managePeople' in obj;
}

//interfaces
interface Person3 {
  name: string;
}
interface DogOwner3 extends Person3 {
  dogName: string;
}
interface Manager3 extends Person3 {
  managePeople(): void;
  delegateTasks(): void;
}
//instance
const employee3: Person3 | DogOwner3 | Manager3 = getEmployee();
// console.log(employee3);
if (isManager(employee3)) {
  //this code will run only if the object is of type Manager3
  employee3.delegateTasks();
}

//INTERFACES-IMPLEMENTS-----------------------------------------------------//
interface Person4 {
  name: string;
  greet(): void;
}

class Employee4 implements Person4 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let john4 = new Employee4('John');
john4.greet(); // Outputs: Hello, my name is John

//CLASS IMPLEMENTS INTERFACE-----------------------------------------------------//
interface IPerson {
  name: string;
  age: number;
  greet(): void;
}

//Class implements interface
class Person5 implements IPerson {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const hipster = new Person5('shakeAndBake', 100); 
hipster.greet();  //Hello, my name is shakeAndBake and I'm 100 years old.




