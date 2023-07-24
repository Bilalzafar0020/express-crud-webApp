// script.js
document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const inputElement = document.querySelector('.input');
    const addButton = document.getElementById('add');

    // Function to add a new todo to the server and update the UI
    const addTodo = () => {
        const task = inputElement.value.trim();

        if (task === '') {
            alert('Please enter a task.');
            return;
        }

        axios.post('/Api1/todo', { task })
            .then(() => {
                inputElement.value = '';
                fetchTodos(); // Call the fetchTodos function after adding a new todo
            })
            .catch(error => console.error(error));
    };

    // Function to fetch all todos from the server and display them in the content div
    const fetchTodos = () => {
        axios.get('/Api1/todos')
            .then(response => {
                const todos = response.data;

                // Clear the content div before adding new TODOs
                contentDiv.innerHTML = '';

                todos.forEach(todo => {
                    
                    if (todo.task !== "") {
                      
                    const todoDiv = document.createElement('div');
                    todoDiv.className = 'todo-item';

                    const input = document.createElement('input');
                    input.classList.add('dynamicInput');
                    input.readOnly = 'true';
                    input.type = 'text';
                    input.value = todo.task;

                // Function to create a Font Awesome icon element
    const createIcon = (iconClass) => {
        const iconElement = document.createElement('i');
        iconElement.classList.add('fas', iconClass);
        return iconElement;
    };

    const editButton = document.createElement('button');
    editButton.classList.add('editButton');
    editButton.appendChild(createIcon('fa-edit'));
    editButton.addEventListener('click', () => editTodo(todo.id, input));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.appendChild(createIcon('fa-trash'));
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

                    todoDiv.appendChild(input);
                    todoDiv.appendChild(editButton);
                    todoDiv.appendChild(deleteButton);

                    contentDiv.appendChild(todoDiv);  
};
                });
            
            })   
            .catch(error => console.error(error));
    };

    // Fetch todos when the page loads
    fetchTodos();

    // Add event listener to the Add button
    addButton.addEventListener('click', addTodo);

    // Function to edit a todo on the server and update the UI
   // Function to edit a todo on the server and update the UI
const editTodo = (todoId, inputElement) => {
    Swal.fire({
        title: 'Edit Todo',
        input: 'text',
        inputValue: inputElement.value,
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (newTask) => {
            if (!newTask.trim()) {
                Swal.showValidationMessage('Task cannot be empty.');
            }
            return newTask.trim();
        },
    }).then((result) => {
        if (!result.isConfirmed) {
            return; // User clicked Cancel or closed the dialog
        }

        const newTask = result.value;

        axios.put(`/Api1/todo/${todoId}`, { task: newTask })
            .then(() => fetchTodos())
            .catch(error => console.error(error));
    });
};


    // Function to delete a todo from the server and update the UI
    const deleteTodo = (todoId) => {
        axios.delete(`/Api1/todo/${todoId}`)
            .then(() => fetchTodos())
            .catch(error => console.error(error));
    };
});
