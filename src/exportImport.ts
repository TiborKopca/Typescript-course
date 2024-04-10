import newStudent, { sayHello, person, type Student } from './actions';
import {someValue} from './javascript.js' //Not possible without modifying tsconfig.json

sayHello('TypeScript');
console.log(person);
console.log(newStudent);

const anotherStudent: Student = {
  name: 'bob',
  age: 23,
};

console.log(anotherStudent);

//import from JS file
console.log(someValue) //somevalue

