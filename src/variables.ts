console.log('typescript runs');

let theName:string = 'Tibor';
theName = theName.toLowerCase()
console.log('theName value:',theName) //tibor

let theName2 = 'Kopca';
theName2 = theName2.toLowerCase()
console.log('theName2 value:',theName2) //kopca

let amount:number = 20;
amount = 12 -1;
console.log('amount value:',amount)

let isAwesome:boolean = true
isAwesome = false;
// isAwesome = 'name' -> cant do it, immediately will show us
console.log('isAwesome value:', isAwesome)

// UNION TYPES
let tax:number | string = 10;
tax = 100
tax = '$10'
console.log('tax value',tax)

function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
  }
  
  printStatusCode(404);
  printStatusCode('404');

let requestStatus: 'pending'|'success'|'error';
requestStatus = 'error'; //typescript will automatically offers options when typing


//ANY
let notSure:any = 4;
notSure = 'notSure is now string';
notSure = false;

let random; //by default is any

//ARRAYS
const books = ['1984','Brave new world','Farenheit 451']
let foundBook: string | undefined; //if we are successful, the foundBook would be a string, but otherwise we dont know = undefined

for(let book of books){
    if(book === '1984'){
        foundBook = book;
        foundBook.length; // this is correct in the loop
        break;
    }
}
//outside the loop we dont know IF the variable would be a string
//this syntax wont trigger runtime error
console.log('FoundBook length:',foundBook?.length);
console.log('Book found in array of books',foundBook);


//-----------------------------------------//

const numbers = [1, 2, 3]; // inferred to type number[]
numbers.push(4); // no error
// comment line below out to see the successful assignment 
// numbers.push("2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log('array numbers:',numbers);

let head: number = numbers[0]; // no error
console.log('head number comming from array numbers:',head);

//-----------------------------------------//

let prices:number[] = [100,72,34,8];
//prices.push('hello'); //not possible because the type is set

//EMPTY ARRAY = THIS IS NOT GOOD IDEA, TYPESCRIPT WILL ASUME THE VALUE IS ALWAYS EMPTY
// let randomValues:[] = [120,1014,10];
//this is fine>
let emptyValues:string[] = [];

let names = ['peter','ivetka','tibor','lucka','zorka']
console.log('names array', names)

let array:(string | boolean)[] = ['apple',true,'orange']
console.log('array which is boolean or string', array)

//--------------------------------------------//
let temperatures:number[] = [20,25,23];
//temperatures.push('hot');
let colors:string[] = ['black','white','red','green'];
// colors.push(true);

let mixedArray:(number|string)[] = [1,'two',3];