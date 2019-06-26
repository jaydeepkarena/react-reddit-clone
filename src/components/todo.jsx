import React, { useState } from 'react';
import uuid from 'uuid/v4';

let initialTodos = [
  {
    id: uuid(),
    task: 'Task A',
    complete: false
  },
  {
    id: uuid(),
    task: 'Task B',
    complete: false
  },
  {
    id: uuid(),
    task: 'Task C',
    complete: true
  }
];

const TodoDemo = () => {
  const [todos, setTodo] = useState(initialTodos);
  const [task, setTask] = useState('');

  const addTodo = e => {
    if (task) {
      setTodo(todos.concat({ id: uuid(), task, complete: false }));
    }
    setTask('');
    e.preventDefault();
  };

  const handleCheckedChange = id => {
    setTodo(
      todos.map(todo => {
        if (todo.id == id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      })
    );
    console.log(todos)
  };

  return (
    <>
      <h1>useState Demo</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleCheckedChange(todo.id)}
            />
            <label> {todo.task}</label>
          </li>
        ))}
      </ul>
      <form onSubmit={addTodo}>
        <input
          type="text"
          name="todoItem"
          id="todoItem"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <input type="submit" value="Add Todo" />
      </form>
    </>
  );
};

export default TodoDemo;
