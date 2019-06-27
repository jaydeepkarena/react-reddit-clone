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

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error(`Invalid action type - ${action.type}`);
  }
};

const TodoDemo = () => {
  const [todos, dispatchTodos] = useReducer(todosReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [task, setTask] = useState('');

  const addTodo = e => {
    console.log(todos)
    if (task) {
      dispatchTodos({ type: 'ADD', task });
    }
    setTask('');
    e.preventDefault();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true;
    else if (filter === 'COMPLETE' && todo.complete) return true;
    else if (filter === 'INCOMPLETE' && !todo.complete) return true;
    return false;
  });

  return (
    <>
      <div>
        <button onClick={() => dispatchFilter({ type: 'SHOW_ALL' })}>All</button>
        <button onClick={() => dispatchFilter({ type: 'SHOW_COMPLETE' })}>
          COMPLETE
        </button>
        <button onClick={() => dispatchFilter({ type: 'SHOW_INCOMPLETE' })}>
          INCOMPLETE
        </button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() =>
                dispatchTodos({
                  type: `${todo.complete ? 'UNDO' : 'DONE'}`,
                  id: todo.id
                })
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
