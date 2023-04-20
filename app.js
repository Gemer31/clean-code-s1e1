const COMPLETED_TASKS_LIST = 'completed';
const INCOMPLETE_TASKS_LIST = 'incomplete';

const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-button');
const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskName) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskName;
  label.className = 'task task__label';

  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';

  editInput.type = 'text';
  editInput.className = 'task task__input';

  editButton.innerText = 'Edit';
  editButton.className = 'button edit';

  deleteButtonImg.src = 'assets/remove.svg';
  deleteButton.className = 'button delete';

  deleteButton.append(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
}

const addTask = function () {
  if (!taskInput.value) {
    return;
  }

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.append(listItem);
  bindTaskEvents(listItem, checkboxEvent(COMPLETED_TASKS_LIST));
  taskInput.value = '';
}

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');

  if (listItem.classList.contains('edit-mode')) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

const checkboxEvent = function (type) {
  return function () {
    const listItem = this.parentNode;

    (type === COMPLETED_TASKS_LIST
        ? completedTasksHolder
        : incompleteTasksHolder
    ).appendChild(listItem);

    bindTaskEvents(
      listItem,
      checkboxEvent(type === COMPLETED_TASKS_LIST ? INCOMPLETE_TASKS_LIST : COMPLETED_TASKS_LIST),
    );
  }
}

const bindTaskEvents = function (taskListItem, checkboxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkboxEventHandler;
}

function fillTasksList(type) {
  const holder = type === COMPLETED_TASKS_LIST ? completedTasksHolder : incompleteTasksHolder;
  const checkBoxEventHandler = checkboxEvent(type === COMPLETED_TASKS_LIST ? INCOMPLETE_TASKS_LIST : COMPLETED_TASKS_LIST);

  for (let i = 0; i < holder.children.length; i++) {
    bindTaskEvents(holder.children[i], checkBoxEventHandler);
  }
}

fillTasksList(INCOMPLETE_TASKS_LIST);
fillTasksList(COMPLETED_TASKS_LIST);

addButton.addEventListener('click', addTask);

//TODO: prevent creation of empty tasks.
//TODO: Change edit to save when you are in edit mode.