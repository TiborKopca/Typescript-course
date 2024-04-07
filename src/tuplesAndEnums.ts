//TUPPLES-----------------------------------------------------//
let person5: [string, number] = ['john', 25]; //these values are fixed
console.log(person5[0]); // Outputs: john
console.log(person5[1]); // Outputs: 25

let john5: [string, number?] = ['john'];
console.log(john5) //john
//THIS IS GOTCHA, ACTUALLY WE CAN ADD VALUES, UNLESS ITS BEING DONE BY READONLY
//syntax -> let john5: readonly [string, number?] = ['john'];
john5.push(1)
console.log(john5) //[john,1]
 

function getPerson(): [string, number] {
  return ['john', 25];
}

let randomPerson = getPerson();
console.log(randomPerson[0]); // Outputs: john
console.log(randomPerson[1]); //25

// let susan4:  [string, number] = ['susan', 25];
// susan4[0] = 'bob';
// susan4.push('some random value');

let susan5: readonly [string, number] = ['susan', 25];
// susan[0] = 'bob';
// susan.push('some random value');
console.log(susan5);//['susan', 25]

//ENUMS-----------------------------------------------------//
//you can use Enum when you need store constant in your project
//we need to be carefull when setting up the vale
enum ServerResponseStatus {
    Unknown,        //without passing value this have value 0, next one 1, etc
    Success = 200,  //if we have number values, this will do the reverse mapping(default setup)
    Error = 'Error',//if we have string values, this is correct 
}
Object.values(ServerResponseStatus).forEach((value) => {
        console.log('mixed enum values',value);
        //Unknown
        //Success
        //0
        //200
        //Error
        if(typeof value === 'number'){
            console.log('enum only number value',value); //0, 200
        }
    }
)
console.log(ServerResponseStatus)//{0: 'Unknown', 200: 'Success', Unknown: 0, Success: 200, Error: 'Error'}

//ENUMS-STRING VALUES----------------------------------------------------//
enum ServerResponseStatus2 {
    Success = 'Success',
    Error = 'Error',
  }
Object.values(ServerResponseStatus2).forEach((value) => {
    console.log('string enum values',value);//Success, Error
});

//ENUMS-NUMERIC VALUES----------------------------------------------------//
enum ServerResponseStatus3 {
    Success = 200,
    Error = 500,
}
Object.values(ServerResponseStatus3).forEach((value) => {
    if (typeof value === 'number') {
      console.log('number enum values',value);//200, 500
    }
});



interface ServerResponse {
    result: ServerResponseStatus;
    data: string[];
}
  
function getServerResponse(): ServerResponse {
    return {
        //result: 200,      //this will work, because there is this reverse mapping
        //result: 'Success' //will not work
        result: ServerResponseStatus.Success,
        data: ['first item', 'second item'],
    };
}
  
const response: ServerResponse = getServerResponse();
console.log(response); //{result: 200, data: Array(2)}

//ENUMS-CHALLENGE----------------------------------------------------//
// Define an enum named UserRole
enum UserRole {
    Admin,
    Manager,
    Employee,
}
  
// Define a type alias named User
type User2 = {
    id: number;
    name: string;
    role: UserRole;
    contact: [string, string]; // Tuple: [email, phone]
};
  
// Define a function named createUser
function createUser2(user2: User2): User2 {
    return user2;
}
  
//instance
const user2: User2 = createUser2({
    id: 1,
    name: 'John Doe',
    role: UserRole.Admin,
    contact: ['john.doe@example.com', '123-456-7890'],
});
  
console.log(user2); //{id: 1, name: 'John Doe', role: 0, contact: Array(2)}
