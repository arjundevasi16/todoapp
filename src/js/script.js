const task = document.querySelector("#task");
const decription = document.querySelector("#description");
const priority = document.querySelector("#priority");
const addBtn = document.querySelector("#addBtn");
const taskDate = document.querySelector("#date");
const taskContainer = document.querySelector("#taskContainer");
const removeTaskBtn = document.querySelector("#removeTaskBtn");
const searchTaskInput = document.querySelector("#search_task");
const priorite_filter = document.querySelector("#priorite_filter");
const status_filter = document.querySelector("#status_filter");

const taskData = [];

function fillterData() {
  taskContainer.innerHTML = " ";
  const filterNewData = taskData.filter((obj) => {
    const input1 =
      !searchTaskInput.value.trim() ||
      obj.userTask.includes(searchTaskInput.value.trim());
    const input2 =
      !priorite_filter.value || obj.priority1 === priorite_filter.value;
    const input3 = !status_filter.value || obj.status === status_filter.value;
    return input1 && input2 && input3;
  });
  filterNewData.forEach((element) => {
    addTodo(element);
  });
}

searchTaskInput.addEventListener("input", () => {
  fillterData();
});

priorite_filter.addEventListener("change", () => {
  fillterData();
});

status_filter.addEventListener("change", () => {
  fillterData();
});

function removeTask(id) {
  let index = taskData.findIndex((arr) => {
    return arr.id === id;
  });
  taskData.splice(index, 1);
  let x = document.querySelector(`#task${id}`).remove();
}

function getDayRemaning(dateObj) {
  let today = new Date();
  let diff = dateObj - today;
  let day = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (day === 1) {
    return "Tomorrow";
  } else {
    return `${day} days`;
  }
}

function addTodo(obj) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = ` <div class="px-5 shadow flex flex-col gap-4 py-4" id="task${obj.id}">
              <div class="flex justify-between">
                <p class="text-2xl font-bold">${obj.userTask}</p>
                <div>
                  <span class="">✔️</span>
                  <span class="" id="removeTaskBtn" onclick="removeTask(${obj.id})">❌</span>
                  <span class="">✏️</span>
                </div>
              </div>
              <p>
                ${obj.decription1}
              </p>
              <div>
                <button class="bg-amber-300 px-2 py-1 rounded-2xl">
                 ${obj.status}
                </button>
                <button class="bg-amber-300 px-2 py-1 rounded-2xl">
                  ${obj.priority1} priority
                </button>
                <span class="bg-gray-300 px-2 py-1 rounded-2xl">${obj.date}</span>
              </div>
              <span class="text-red-300">Due ${obj.dayRemaining} </span>
            </div>`;
  taskContainer.appendChild(newDiv);
}

document.querySelector("#taskSubmit").addEventListener("submit", (e) => {
  e.preventDefault();
  let dateObj = new Date(taskDate.value);
  let formattedDate = `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;

  const obj = {
    userTask: task.value,
    decription1: decription.value,
    priority1: priority.value,
    date: formattedDate,
    id: Date.now(),
    status: "pending",
    dayRemaining: getDayRemaning(dateObj),
  };
  taskData.push(obj);
  addTodo(obj);
});
