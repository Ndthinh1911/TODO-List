const nameInput = document.querySelector("#name");
const contentInput = document.querySelector(".content");
const addBtn = document.querySelector(".add");
const list = document.querySelector(".list");

let username = localStorage.getItem("username") || [];

nameInput.value = username;
nameInput.addEventListener("change", (e) => {
  nameInput = localStorage.setItem("username", e.target.value);
});

renderTasks(getTaskFromLocalStorage());

addBtn.addEventListener("click", () => {
  if (!contentInput.value) {
    alert("Add a task");
    return;
  }
  let taskId = addBtn.getAttribute("id");
  let tasks = getTaskFromLocalStorage();
  let task = { name: contentInput.value };
  if (taskId === 0 || taskId) {
    tasks[taskId] = task;
    addBtn.removeAttribute("id");
  } else {
    tasks.push(task);
  }

  contentInput.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(getTaskFromLocalStorage());
});

function editTask(id) {
  let tasks = getTaskFromLocalStorage();
  if (tasks.length > 0) {
    contentInput.value = tasks[id].name;
    addBtn.setAttribute("id", id);
  }
}

function deleteTask(id) {
  if (confirm("Do you want to delete?")) {
    let tasks = getTaskFromLocalStorage();
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  }
}

function doneTask(id) {
  let tasks = getTaskFromLocalStorage();
  let task = document.querySelectorAll(".task")[id];
  task.classList.toggle("done");
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTime(id) {
  let currentTime = new Date();
  let timeArr = getTimeFromLocalStorage();
  let hours =
    currentTime.getHours() > 10
      ? currentTime.getHours()
      : `0${currentTime.getHours()}`;

  let minutes =
    currentTime.getMinutes() > 10
      ? currentTime.getMinutes()
      : `0${currentTime.getMinutes()}`;
  let time = { now: `${hours} : ${minutes}` };

  timeArr.push(time);
  console.log(timeArr.length);
  localStorage.setItem("timeArr", JSON.stringify(timeArr));
  return getTimeFromLocalStorage();
}

function renderTasks(tasks = []) {
  let content = '<div class="todo">';
  tasks.forEach((task, index) => {
    content += `<div class = "todo-box">
                 <div class="task" onclick="doneTask(${index})">${
      task.name
    }</div>
                 <div class="time ${index}">${getTime(index)}</div>
                 <div class="action">
                  <button class = "btn edit" onclick="editTask(${index})">Edit</button>
                  <button class = "btn delete" onclick="deleteTask(${index})">Delete</button>
                 </div>
                </div>`;
  });
  content += "</div>";
  list.innerHTML = content;
}

function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

function getTimeFromLocalStorage() {
  return localStorage.getItem("timeArr")
    ? JSON.parse(localStorage.getItem("timeArr"))
    : [];
}
