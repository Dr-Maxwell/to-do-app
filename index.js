const todoForm = document.forms[0];
const todosHolder = document.querySelector(".todo_list");
const todosHolderCompleted = document.querySelector(".todo_list.completed");

todoForm.addEventListener("submit", addTodo);
const todos = [];
function addTodo(event) {
  event.preventDefault();
  const todoData = {
    text: event.target[0].value,
    completed: false,
  };
  todos.push(todoData);
  event.target[0].value = "";
  displayTodos();
  saveTodosToLocalStorage();
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function displayTodos() {
  const uncompleted = todos.filter((todo) => !todo.completed);
  const completed = todos.filter((todo) => todo.completed);

  todosHolder.innerHTML = "";
  if (uncompleted.length === 0) {
    const noItem = document.createElement("h6");
    noItem.innerHTML = "No Item";
    todosHolder.appendChild(noItem);
  } else {
    const uncompletedElements = uncompleted.map(generateElements);
    todosHolder.append(...uncompletedElements);
  }

  todosHolderCompleted.innerHTML = "";
  if (completed.length === 0) {
    const noItem2 = document.createElement("h6");
    noItem2.innerHTML = "No Item";
    todosHolderCompleted.appendChild(noItem2);
  } else {
    const completedElements = completed.map(generateElements);
    todosHolderCompleted.append(...completedElements);
  }

  console.log(todos);
}

function generateElements(todo) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = todo.text;

  const div = document.createElement("div");
  div.classList.add("actions");
  const bt1 = document.createElement("button");
  bt1.onclick = () => {
    todo.completed = !todo.completed;
    displayTodos();
    saveTodosToLocalStorage();
  };
  bt1.innerHTML = "&check;";
  const bt2 = document.createElement("button");
  bt2.innerHTML = "x";
  bt2.onclick = () => {
    const newTodos = todos.filter((t) => t.text !== todo.text);
    todos.length = 0;
    todos.push(...newTodos);
    displayTodos();
    saveTodosToLocalStorage();
  };

  div.append(bt1, bt2);

  li.append(p, div);
  return li;
}

window.addEventListener("DOMContentLoaded", (e) => {
  const data = localStorage.getItem("todos");
  if (data) {
    todos.push(...JSON.parse(data));
  }
  displayTodos();
});

//truthfuly values -1 1 3 58 3000 "dfsdfsd" "0" true -> true
//falsy values 0 undefined null "" -> false

// (a,b)=> a+b

// (a,b)=>{
//     return a+b
// }

// (a,b)=>(
//     {
//         name: "rasta"
//     }
// )

// (a,b)=>{
//     return {

//     }
// }
