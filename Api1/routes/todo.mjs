
import express from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();


//  local variable but in case of database we will use database not this 
let todos = [{
    id: nanoid(),
    task: "",
    completed: false
}];


///////////////////////////////            post http method 

router.post('/todo', (req, res, next) => {
    if (!req.body.task) {
        res.status(403).send('Task field is required');
        return;
    }

    const newTodo = {
        id: nanoid(),
        task: req.body.task,
        completed: false,
    };

    todos.unshift(newTodo);
    res.send('Todo added successfully');
});


///////////////////////////////            get http method 


router.get('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;

    const todo = todos.find(todo => todo.id === todoId);

    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send('Todo not found with id ' + todoId);
    }
});

router.get('/todos', (req, res, next) => {
    res.send(todos);
});



///////////////////////////////            delete http method 


router.delete('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;

    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        res.send('Todo deleted');
    } else {
        res.status(404).send('Todo not found');
    }
});

///////////////////////////////            put http method 


router.put('/todo/:todoId', (req, res, next) => {
    const todoId = req.params.todoId;

    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) {
        res.status(404).send('Todo not found');
        return;
    }

    if (!req.body.task) {
        res.status(403).send('Task field is required');
        return;
    }

    todo.task = req.body.task;
    todo.completed = req.body.completed || false;

    res.send('Todo updated');
});

export default router;

