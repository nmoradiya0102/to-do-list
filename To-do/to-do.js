 const todoForm = document.getElementById('todo-form');
 const todoInput = document.getElementById('todo-input');
 const todoList = document.getElementById('todo-list');
 const undoButton = document.getElementById('undo-button');

 let deletedItems = [];

 // Add event listener to the form
 todoForm.addEventListener('submit', function(event) {
   event.preventDefault(); // Prevent form submission
 
   const todoText = todoInput.value.trim();
 
   if (todoText !== '') {
     const todoItem = createTodoItem(todoText);
     todoList.appendChild(todoItem);
     todoInput.value = '';
   }
 });

 // Function to create a new todo item
 function createTodoItem(text) {
   const todoItem = document.createElement('div');
   todoItem.className = 'todo-item';
 
   const checkbox = document.createElement('input');
   checkbox.type = 'checkbox';
 
   const label = document.createElement('label');
   label.textContent = text;
 
   const deleteButton = document.createElement('button');
   deleteButton.className = 'delete-button';
   deleteButton.textContent = 'Delete';
 
   // Event listener for delete button
   deleteButton.addEventListener('click', function() {
     const deletedItem = {
       text: label.textContent,
       completed: checkbox.checked
     };
 
     deletedItems.push(deletedItem);
     todoItem.remove();
 
     undoButton.style.display = 'inline-block';
   });
   // Append elements to the todo item
   todoItem.appendChild(checkbox);
   todoItem.appendChild(label);
   todoItem.appendChild(deleteButton);
 
   return todoItem;
 }
 // Event listener for undo button
 undoButton.addEventListener('click', function() {
   if (deletedItems.length > 0) {
     const lastDeletedItem = deletedItems.pop();
     const todoItem = createTodoItem(lastDeletedItem.text);
     todoItem.querySelector('input[type="checkbox"]').checked = lastDeletedItem.completed;
     todoList.appendChild(todoItem);
   }
 
   if (deletedItems.length === 0) {
     undoButton.style.display = 'none';
   }
 });