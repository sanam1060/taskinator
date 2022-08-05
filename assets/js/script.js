var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//createTaskHandler() function to dynamically create the task item
// Having this separate function makes our code more organized and clear

var taskFormHandler = function (event){
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //Check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();
  
  //Package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  
  //Send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj){
  //Create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //Add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // Give it a class name
  taskInfoEl.className = "task-info";
  // Add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  //Add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId){
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-action";

  //Create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //Create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //Create dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();
};

var editTask = function(taskId){
  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //change "Edit" to "Save Task"
  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
}

//On a button clikc, create a task
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event){
  // get targer element from event
  var targetEl = event.target;

  //Edit button was clicked
  if (event.target.matches(".edit-btn")){
    // get the element's task id
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }

  //Delete button was clicked
  else if (targetEl.matches(".delete-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};



pageContentEl.addEventListener("click", taskButtonHandler);