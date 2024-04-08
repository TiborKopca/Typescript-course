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
