var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//createTaskHandler() function to dynamically create the task item
// Having this separate function makes our code more organized and clear

var createTaskHandler = function (event){
  event.preventDefault();
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
  tasksToDoEl.appendChild(listItemEl);
}

//On a button clikc, create a task
formEl.addEventListener("submit", createTaskHandler);
