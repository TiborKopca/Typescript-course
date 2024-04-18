//CLASSES + INSTANCES / DEFAULT PROPERTY---------------------------------------------------------//
class Book {
  readonly title: string; //readonly modifier
  author: string;
  checkedOut: boolean = false; //default property
  checkedOut2 = false; //TS will infer the type
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

const deepWork = new Book("deep work ", "cal newport");
console.log(deepWork); //Book {title: 'deep work ', author: 'cal newport'}

deepWork.checkedOut = true;
// deepWork2.checkedOut2 = 'something else'; //this wont work, because type is boolean
console.log(deepWork.checkedOut); //true

//PRIVATE & PUBLIC MODIFIERS---------------------------------------------------------//
class Book2 {
  public readonly title: string;
  public author: string;
  private checkedOut: boolean = false;
  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
  public checkOut() {
    this.checkedOut = this.toggleCheckedOutStatus();
  }
  public isCheckedOut() {
    return this.checkedOut; //by using public getter we can access the private value
  }
  private toggleCheckedOutStatus() {
    return !this.checkedOut;
  }
}

const deepWork2 = new Book2("Deep Work", "Cal Newport");
deepWork2.checkOut();
console.log(deepWork2.isCheckedOut()); // true
// deepWork2.toggleCheckedOutStatus(); // Error: Property 'toggleCheckedOutStatus' is private and only accessible within class 'Book'.

//SHORTHAND SYNTAX---------------------------------------------------------//
class Book3 {
  private checkedOut3: boolean = false;
  //note that we didnt provide base values, these are directly in constructor
  constructor(
    public readonly title: string,
    public author: string,
    private someValue: number
  ) {}
  public getSomeValue() {
    return this.someValue;
  }
}
const deepwork3 = new Book3("Fantom", "Dick Francis", 9);
console.log(deepwork3.author, "wrote", deepwork3.title); //Dick Francis wrote Fantom
console.log(deepwork3.getSomeValue()); //9

//GETTERS & SETTERS---------------------------------------------------------//
class Book4 {
  private checkedOut: boolean = false;
  constructor(public readonly title: string, public author: string) {}
  //GETTERS
  get info() {
    return `${this.title} by ${this.author}`;
  }
  get checkOut() {
    return this.checkedOut;
  }
  public get someInfo() {
    this.checkOut = true;   //calls the setter method and changes the value of 'checkedOut'
    return `${this.title} by ${this.author}`;
  }
  //SETTERS, the name can be the same as getter
  private set checkOut(checkedOut: boolean) {
    this.checkedOut = checkedOut;
  }
}

const deepWork4 = new Book4("deep work", "cal newport");
console.log(deepWork4.info);    //deep work by cal newport
// deepWork4.checkOut() = true;    //will work when we remove private modifier in the setter
console.log(deepWork4.someInfo); //deep work by cal newport
console.log(deepWork4.checkOut); //true, because the 'someInfo' method changed the value