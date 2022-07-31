var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//createTaskHandler() function to dynamically create the task item
// Having this separate function makes our code more organized and clear

var createTaskHandler = function (event){
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //Create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // Give it a class name
  taskInfoEl.className = "task-info";
  // Add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  listItemEl.appendChild(taskInfoEl);

  //Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  console.dir(listItemEl);
};

//On a button clikc, create a task
formEl.addEventListener("submit", createTaskHandler);
