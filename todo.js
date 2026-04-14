const AddingTaskBtn = document.querySelector("#add-btn");
const TaskInput = document.querySelector("#todo-input");
let TaskSpace = document.querySelector("#todo-list");
const DeleteBtn = document.querySelector(".delete-btn");
const EditBtn = document.querySelector(".complete-btn");

// adding task
function addingATask(e) {
  const value = TaskInput.value.trim();
  if (value === "") return alert("you are not added any task");
  const data = {
    key: "task",
    value: value,
  };
  const res = createList(data);
  if (res === true) {
    TaskInput.value = "";
  }
}

const createList = function (data) {
  const { key, value } = data;
  if (data) {
    const ls = document.createElement("li");
    ls.innerHTML = `
      <span>${value}</span>
      <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
     </div>
      `;

    TaskSpace.appendChild(ls);
    const tasks = JSON.parse(localStorage.getItem("task")) || [];
    let obj = {
      value: value,
      status: "pending",
    };

    tasks.push(obj);
    localStorage.setItem("task", JSON.stringify(tasks));

    return true;
  }
};

AddingTaskBtn.addEventListener("click", addingATask);

TaskSpace.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-btn")) {
    const li = target.closest("li");
    const ls = JSON.parse(localStorage.getItem("task"));
    const removeValue = li.querySelector("span").textContent;
    const removedarray = ls.filter(({ value }) => value !== removeValue);
    localStorage.setItem("task", JSON.stringify(removedarray));
    li.remove();
  }

  if (target.classList.contains("complete-btn")) {
    const li = target.closest("li");
    const getName = li.querySelector("span").textContent;

    const LS = JSON.parse(localStorage.getItem("task"));

    const ChangedStatus = LS.map(({ value, status }) => {
      if (getName.trim() === value) {
        status = "done";
      }
      return { value, status };
    });

    console.log("ChangedStatus::==>", ChangedStatus);
    localStorage.setItem("task", JSON.stringify(ChangedStatus));

    li.classList.toggle("completed");
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];

  if (tasks.length > 0) {
    tasks.map(({ value, status }) => {
      const ls = document.createElement("li");
      ls.innerHTML = `
      <span>${value}</span>
      <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
     </div>
      `;

      if (status == "done") {
        ls.classList.toggle("completed");
      }
      TaskSpace.appendChild(ls);
    });
  }
});
