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

//task array(without local storage)
// const tasks: Task[] = [];

//task array + Retrieve tasks from localStorage
const tasks: Task[] = loadTask();
//Load data from local storage
function loadTask():Task[]{
  const storedTasks = localStorage.getItem('tasks');
  //to handle null values --> show data or empty array
  return storedTasks ? JSON.parse(storedTasks) : []
}

//RENDER EXISTING TASKS (after creating the task array)
//tasks.forEach((task) => renderTask(task)); //alternative syntax
tasks.forEach(renderTask);

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
    updateStorage()

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

  //checkbox element
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.checked = task.isCompleted; //retrieves the value from the type object

  //toggle checkbox event listener
  taskCheckbox.addEventListener('change',() => {
    task.isCompleted = !task.isCompleted;   //toggle
    updateStorage();
  })

  //appending elements to the DOM
  taskElement.appendChild(taskCheckbox); 
  taskListElement?.appendChild(taskElement);
}

// Update tasks in localStorage - in the form of array of items
//we cant store objects in the local storage, only strings
function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
