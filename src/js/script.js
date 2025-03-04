const task = document.querySelector("#task");
const decription = document.querySelector("#description");
const priority = document.querySelector("#priority");
const addBtn = document.querySelector("#addBtn");
const taskDate = document.querySelector("#date");
const taskContainer = document.querySelector("#taskContainer");
const searchTaskInput = document.querySelector("#search_task");
const priorite_filter = document.querySelector("#priorite_filter");
const status_filter = document.querySelector("#status_filter");
const taskform = document.querySelector("#taskSubmit");
const filterResetBtn = document.querySelector("#filterResetBtn");
const filterform = document.querySelector("#filterForm");
let taskData = JSON.parse(localStorage.getItem("userTaskData")) || [];
let editIndex = null;
function resetForm() {
  editIndex = null;
  addBtn.textContent = "ADD";
  addBtn.style.backgroundColor = "blue";
  cancelBTN.remove();
  taskform.reset();
}
function saveTask() {
  localStorage.setItem("userTaskData", JSON.stringify(taskData));
}
function findArrayIndex(id) {
  let index = taskData.findIndex((arr) => {
    return arr.id === id;
  });
  return index;
}
function fillterData() {
  taskContainer.innerHTML = "";
  const filterNewData = taskData.filter((obj) => {
    const input1 =
      !searchTaskInput.value.trim() ||
      obj.userTask.includes(searchTaskInput.value.trim());
    const input2 =
      !priorite_filter.value || obj.priority1 === priorite_filter.value;
    const input3 = !status_filter.value || obj.status === status_filter.value;
    return input1 && input2 && input3;
  });
  addBtn.disabled = true;
  addBtn.setAttribute(
    "class",
    "bg-blue-500 text-white font-bold w-full py-2 rounded mt-4 opacity-50 cursor-not-allowed"
  );

  if (!filterNewData.length) {
    taskContainer.innerHTML = "<p center>no such task found in list</p>";
  } else {
    filterNewData.forEach(addTodo);
  }
}

searchTaskInput.addEventListener("input", fillterData);
priorite_filter.addEventListener("change", fillterData);
status_filter.addEventListener("change", fillterData);

function removeTask(id) {
  let index = findArrayIndex(id);
  taskData.splice(index, 1);
  document.querySelector(`#task${id}`).remove();
  saveTask();
}

function getDayRemaning(date) {
  let diff = new Date(date) - new Date();
  let day = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (day === 1) {
    return "Tomorrow";
  } else {
    return `${day} days`;
  }
}
function changeStatus(id) {
  let index = findArrayIndex(id);
  taskData[index].status =
    taskData[index].status == "completed" ? "pending" : "completed";
  saveTask();
  renderTasks();
}
let cancelBTN = document.createElement("button");
function updateTask(id) {
  const index = findArrayIndex(id);
  task.value = taskData[index].userTask;
  decription.value = taskData[index].decription1;
  priority.value = taskData[index].priority1;
  taskDate.value = taskData[index].date;
  cancelBTN.innerText = "❌";
  taskform.appendChild(cancelBTN);
  addBtn.textContent = "Update";
  addBtn.style.backgroundColor = "green";
  editIndex = id;
}

function addTodo(obj) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = ` <div class="px-5 shadow flex flex-col gap-4 py-4" id="task${
    obj.id
  }">
                <div class="flex justify-between">
                  <p class="text-2xl font-bold">${obj.userTask}</p>
                  <div>
                    <span class=""  onclick="changeStatus(${obj.id})">✔️</span>
                    <span class="" id="delet${obj.id}"  onclick="removeTask(${
    obj.id
  })">❌</span>
                    <span class="" id="update${obj.id}" onclick="updateTask(${
    obj.id
  })">✏️</span>
                  </div>
                </div>
                <p>
                  ${obj.decription1}
                </p>
                <div>
                  <button id="status${
                    obj.id
                  }"  class= "px-2 py-1 rounded-2xl text-white ${
    obj.status === "pending" ? "bg-amber-300" : "bg-green-500"
  }">
                   ${obj.status}
                  </button>
                  <button class="bg-amber-300 px-2 py-1 rounded-2xl text-white">
                    ${obj.priority1} priority
                  </button>
                  <span class="bg-gray-300 px-2 py-1 rounded-2xl text-white">${
                    obj.date
                  }</span>
                </div>
                <span class="text-red-300">Due ${getDayRemaning(
                  obj.date
                )} </span>
              </div>`;
  taskContainer.appendChild(newDiv);
}

taskform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editIndex !== null) {
    const index = findArrayIndex(editIndex);
    taskData[index] = {
      userTask: task.value,
      decription1: decription.value,
      priority1: priority.value,
      date: taskDate.value,
      id: editIndex,
      status: "pending",
    };
    renderTasks();
  } else {
    const obj = {
      userTask: task.value.trim(),
      decription1: decription.value.trim(),
      priority1: priority.value,
      date: taskDate.value,
      id: Date.now(),
      status: "pending",
    };
    taskData.push(obj);
    addTodo(obj);
  }
  saveTask();
  editIndex = null;
  resetForm();
});

function renderTasks() {
  taskContainer.innerHTML = " ";
  taskData.forEach(addTodo);
}

cancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  resetForm();
});
filterResetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBtn.setAttribute(
    "class",
    "bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 rounded mt-4 "
  );
  addBtn.disabled = false;
  filterform.reset();
  renderTasks();
});
renderTasks();
