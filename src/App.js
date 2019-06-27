import React, { createContext } from 'react';
import './App.css';
import HeaderMenu from './components/HeaderMenu';
import uuid from 'uuid/v4';

const users = [
  {
    id: uuid(),
    name: 'jaydeep',
    email: 'jaydeep7karena7@gmail.com',
    password: '123456'
  },
  {
    id: uuid(),
    name: 'parul',
    email: 'paruljay7@gmail.com',
    password: '123456'
  }
];

const UsersContext = createContext(null);

function App() {
  return (
    <UsersContext.Provider value={users}>
      <div className="main-container">
        <HeaderMenu />
        <h1>posts...</h1>
      </div>
    </UsersContext.Provider>
  );
}

export default App;
export { UsersContext };
