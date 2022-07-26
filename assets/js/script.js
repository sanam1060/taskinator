var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//createTaskHandler() function to dynamically create the task item
// Having this separate function makes our code more organized and clear

var createTaskHandler = function (){
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
}

//On a button clikc, create a task
buttonEl.addEventListener("click", createTaskHandler);
