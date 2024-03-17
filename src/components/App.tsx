import React from 'react';
import logo from '../assets/images/logo.svg';
import '../styles/App.css';
import TagComponent from './TagComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TagComponent />
      </header>
    </div>
  );
}

export default App;
