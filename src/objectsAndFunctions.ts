//OBJECTS
let car1: { brand: string; year: number } = { brand: "landrover", year: 2020 };
car1.brand = "ford";
// car.color = 'blue'; //doesnt work obviously

let car2: { brand: string; year: number } = { brand: "audi", year: 1992 };

let book = {title:'book',cost:10};
let notebook = {title:'notebook'};
let pen = {title:'pen',cost:2};

//array of objects, with OPTIONAL PROPERTY, note that notebook misses cost property and there is no error
let items:{readonly title:string, cost?:number}[] = [book,pen,notebook];
// items[0].title = 'new book'; //wont work, the title is read only

let product1 = {brand:'yamaha',year:1983}
let product2 = {brand:'dell',year:2024}
let products:{brand:string, year:number}[] = [product1,product2];
products.push({brand: 'shoes',year:2345});
console.log('products objects in array',products)


//FUNCTIONS
function sayHi(name:string){
    console.log(`Hello there ${name.toUpperCase()}`)
}
//invoking
sayHi('Ivuska');

//-----------------------------------------//
//the :number after () means what value is expecting to be result of the function 
function calculateDiscount(price:number):number{
    const hasDiscount = true;
    if(hasDiscount){
        //return 'discount aplied' //wont work
        return price * 0.5
    }
    return price;
}
const finalPrice = calculateDiscount(200);

//-----------------------------------------//

const names2: string[] = ['John', 'Jane', 'Jim', 'Jill'];

function isNameInList(name: string): boolean {
  return names2.includes(name);
}

//the searched name declared
let nameToCheck: string = 'Jane';
//We conditionally return the result 
if (isNameInList(nameToCheck)) {
  console.log(`${nameToCheck} is in the list.`);
} else {
  console.log(`${nameToCheck} is not in the list.`);
}
