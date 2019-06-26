import React from 'react';
import './App.css';
import TodoDemo from './components/todo';
import HeaderMenu from './components/HeaderMenu';

function App() {
  return (
    <div className="main-container">
      <HeaderMenu />
      <TodoDemo />
      <div>BODY</div>
    </div>
  );
}

export default App;
