export function sayHello(name: string): void {
  console.log(`Hello ${name}!`);
}

export let person = "susan";

//Type
export type Student = {
  name: string;
  age: number;
};

//Instance
const newStudent: Student = {
  name: "peter",
  age: 24,
};

export default newStudent;
//using DEFAULT === in another file => " import newStudent from './actions'; " instead of using variable import in {}
