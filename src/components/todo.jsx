import React, { useState, useReducer } from 'react';
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

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'DONE':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD':
      return [...state, { id: uuid(), task: action.task, complete: false }];
    default:
      break;
  }
};

const TodoDemo = () => {
  const [state, dispatch] = useReducer(todosReducer, initialTodos);
  const [task, setTask] = useState('');

  const addTodo = e => {
    if (task) {
      dispatch({ type: 'ADD', task });
    }
    setTask('');
    e.preventDefault();
  };

  return (
    <>
      <h1>useState Demo</h1>
      <ul>
        {state.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() =>
                dispatch({ type: `${todo.complete ? 'UNDO' : 'DONE'}`, id: todo.id })
              }
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
