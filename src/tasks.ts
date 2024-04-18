// console.log('tasks')
const btn = document.querySelector('.btn');

//this is the only way the button can be handled by event listener/TS doesnt know what the btn is
btn?.addEventListener('click', () => {
  console.log('button clicked');
});

if (btn) {
  // do something
}

//Non-null assertion operator --> "!" It is used to assert that its preceding expression is not null or undefined.
const btn2 = document.querySelector('.btn')!;
btn2.addEventListener('click', () => {
  console.log('something');
});

const btn3 = document.querySelector<HTMLButtonElement>('.selector')!;
if(btn3){
    btn3.disabled = true;
}

const btn4 = document.querySelector('.selector')! as HTMLButtonElement;
btn4.disabled = true;



