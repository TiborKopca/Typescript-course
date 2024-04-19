/*
// console.log('tasks')
const btn = document.querySelector(".btn");

//this is the only way the button can be handled by event listener/TS doesnt know what the btn is
btn?.addEventListener("click", () => {
  console.log("button clicked");
});

if (btn) {
  // do something
}

//Non-null assertion operator --> "!" It is used to assert that its preceding expression is not null or undefined.
const btn2 = document.querySelector(".btn")!;
btn2.addEventListener("click", () => {
  console.log("something");
});

const btn3 = document.querySelector<HTMLButtonElement>(".selector")!;
if (btn3) {
  btn3.disabled = true;
}

const btn4 = document.querySelector(".selector")! as HTMLButtonElement;
btn4.disabled = true;
*/

//REAL DEAL------------------------------------------------------------------------------//
const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const taskListElement = document.querySelector<HTMLUListElement>(".list");

//task type Alias/ it can be also interface - by your preference
type Task = {
  description: string;
  isCompleted: boolean;
};

const tasks: Task[] = [];

//CALLBACK GOTCHA - we need to explicitly write what is the type of the EVENT
// function createTask(event: SubmitEvent) {
//   event.preventDefault();
//   const taskDescription = formInput?.value;
//   if (taskDescription) {
//     // add task to list
//     // render tasks
//     // update local storage

//     formInput.value = "";
//     return;
//   }
//   alert("Please enter a task description");
// }
// taskForm?.addEventListener("submit", createTask);

//? - optional chaining operator
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  //if user provide something in the input
  if (taskDescription) {
    // console.log(taskDescription);

    // add task to list
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    addTask(task);

    // render tasks - when we refresh the page OR the first time the user navigates to the page, from the local storage
    renderTask(task);

    // update local storage

    
    formInput.value = "";
    return;
  }
  alert("Please enter a task description");
});

//FUNCTIONS
function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

function renderTask(task: Task): void {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;
  taskListElement?.appendChild(taskElement);
}
