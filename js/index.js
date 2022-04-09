'use strict';
// ?Declarations:
const tasksContainer = document.querySelector('.container');
const input = document.querySelector('.input');
const addBtn = document.querySelector('.add');
const removeAllBtn = document.querySelector('.removeAll')
let tasksArray = [];
let localData = localStorage.getItem('tasksKey');
let editStatus = 'off';
let checkStatus = 'off';

// !-------------AddTask FUNCTION:-------------
addBtn.addEventListener('click', addTask);
function addTask(e) {
  e.preventDefault();
  if (input.value === '') {
    return;
  }
  buildTaskDom(input.value);
  let taskObject = {};
  taskObject.input = e.target.previousElementSibling.value;
  taskObject.check = 'off';
  tasksArray.push(taskObject);
  saveToLocal();
  input.value = '';
} // end Add.

// !-------------BuildTaskDom FUNCTION:-------------
// build basic task dom elements, with all their functions next to them.
function buildTaskDom(data) {
  //taskParent A
  const task = document.createElement('div');
  task.classList.add('task');
  tasksContainer.appendChild(task);
  //taskText A-a
  const taskText = document.createElement('p');
  taskText.classList.add('taskText');
  task.appendChild(taskText);
  taskText.textContent = data;
  //remove A-b
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove');
  removeBtn.classList.add('btn');
  // removeBtn.classList = 'far fa-trash-alt delete';
  removeBtn.textContent = 'remove';
  task.appendChild(removeBtn);
  //edit A-c
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit');
  editBtn.classList.add('btn');
  editBtn.textContent = 'edit';
  task.appendChild(editBtn);
  //check A-d
  const checkBtn = document.createElement('button');
  checkBtn.classList.add('check');
  checkBtn.classList.add('btn');
  checkBtn.textContent = 'check';
  task.appendChild(checkBtn);

  // !-------------Remove FUNCTION:-------------
  removeBtn.addEventListener('click', removeTask);
  function removeTask(e) {
    let removedValue = e.target.previousElementSibling.textContent;
    e.target.parentElement.remove();
    tasksArray = JSON.parse(localStorage.getItem('tasksKey'));
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].input == removedValue) {
        tasksArray.splice(i, 1);
      }
    }
    saveToLocal();
  } // end REMOVE

  // !-------------Edit FUNCTION:-------------
  editBtn.addEventListener('click', editTask);
  function editTask(e) {
    if (editStatus === 'off') {
      // 1st click
      input.value =
        e.target.previousElementSibling.previousElementSibling.textContent;
      editBtn.textContent = 'save';
      editStatus = 'on';
      saveToLocal();
    } else {
      // 2nd click
      tasksArray = JSON.parse(localStorage.getItem('tasksKey'));
      // store old value
      let oldValue =
        e.target.previousElementSibling.previousElementSibling.textContent;
      // submit new value
      e.target.previousElementSibling.previousElementSibling.textContent =
        input.value;
      // replace old input 'indexOf(old)' with new
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].input == oldValue) {
          tasksArray[i].input = input.value;
        }
      }
      input.value = '';
      editBtn.textContent = 'edit';
      editStatus = 'off';
      saveToLocal();
    }
  } // end EDIT

  // !-------------Check FUNCTION:-------------
  checkBtn.addEventListener('click', CheckTask);
  function CheckTask() {
    if (checkStatus === 'off') {
      // 1st click
      taskText.style.textDecoration = 'line-through';
      checkBtn.textContent = 'uncheck';
      // let oldValue = e.target.parentElement.firstElementChild.textContent;
      let currentValue = taskText.textContent
      tasksArray = JSON.parse(localStorage.getItem('tasksKey'));
      // replace the default off to on
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].input == currentValue ) {
          console.log(currentValue);
          console.log(tasksArray[i].input );
          console.log(tasksArray[i].check );

          tasksArray[i].check = 'on';
        }
      }
      checkStatus = 'on';
    } else {
      // 2nd click
      taskText.style.textDecoration = 'none';
      checkBtn.textContent = 'check';
      // let oldValue = e.target.parentElement.firstElementChild.textContent;
      let currentValue = taskText.textContent
      // replace on back to off
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].input == currentValue ) {
          tasksArray[i].check = 'off';
        }
      }
      checkStatus = 'off';
    }
  }
} // end DOM

// !-------------RemoveAll FUNCTION:-------------
removeAllBtn.addEventListener('click', removeAllTasks)
function removeAllTasks(e){
  e.preventDefault()
  const task = document.querySelectorAll('.task')
  for(let i = 0; i < task.length; i++){
    task[i].remove()
  }
  localStorage.removeItem('tasksKey')
}

// !-------------saveToLocal FUNCTION:-------------
function saveToLocal() {
  localStorage.setItem('tasksKey', JSON.stringify(tasksArray));
}

// !-------------OnReload FUNCTION:-------------
document.addEventListener('DOMContentLoaded', onReload);
function onReload() {
  // if there are already the 2 arrays in local, bring them.
  if (localData) {
    tasksArray = JSON.parse(localData);
  }

  tasksArray.forEach((localValue) => {
    buildTaskDom(localValue.input);
  });

  // give check style to all already decorated browser tasks.
  const taskText = document.querySelectorAll('.taskText')
  const checkBtn = document.querySelectorAll('.check')
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].check === 'on') {
      taskText[i].style.textDecoration = 'line-through';
      checkBtn[i].textContent = 'uncheck'
      checkStatus = 'on';
    }
  }
}
