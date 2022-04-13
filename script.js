let todoInput; // place where user writes the conten of the task
let errorInfo; // info about no tasks info / need to enter text
let addBtn; // button ADD - adding new elemnets to the List
let ulList; //  the List of the tasks, ul tags

let popup; // popup
let popupInfo; // text in popup , if empty string
let todoToEdit; // todo Edited
let popupInput; // input in popup
let popupAddBtn; // button "confirm" in popup
let popupCloseBtn; // button "cancel" in popup

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  //adding elemnts
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  // adding listners
  addBtn.addEventListener("click", addNewTodo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  todoInput.addEventListener("keyup", enerKeyCheck);
};

const addNewTodo = () => {
  if (todoInput.value !== "") {
    const newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    createToolsArea2(newTodo);
    ulList.append(newTodo);

    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania";
  }
};
const createToolsArea2 = (todos) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");

  todos.append(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
  toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deleteTodo(e);
  }
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");

  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value;
    popupInfo.textContent = "";
    closePopup();
  } else {
    popupInfo.textContent = "Musisz podać treść zadania";
  }
};

const deleteTodo = (e) => {
  e.target.closest("li").remove();
  const allTodos = ulList.querySelectorAll("li");
  if (allTodos.length === 0) {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const enerKeyCheck = (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
};

document.addEventListener("DOMContentLoaded", main);
