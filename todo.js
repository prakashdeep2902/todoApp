const AddingTaskBtn = document.querySelector("#add-btn");
const TaskInput = document.querySelector("#todo-input");
let TaskSpace = document.querySelector("#todo-list");
const DeleteBtn = document.querySelector(".delete-btn");
const EditBtn = document.querySelector(".complete-btn");

// adding task
function addingATask(e) {
  const value = TaskInput.value.trim();
  if (value === "") return alert("you are not added any task");

  const li = document.createElement("li");

  li.innerHTML = `
  <span>${value}</span>
    <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
`;

  TaskSpace.appendChild(li);

  localStorage.setItem(value, li);
  TaskInput.value = "";
}

AddingTaskBtn.addEventListener("click", addingATask);

const username = localStorage.getItem("vikash");

console.log();

TaskSpace.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("delete-btn")) {
    const li = target.closest("li");
    console.log(li);
    li.remove();
  }

  if (target.classList.contains("complete-btn")) {
    const li = target.closest("li");
    li.classList.toggle("completed");
  }
});
