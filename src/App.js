import * as React from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';
import { Content } from './components/Content';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftNavigation />
        <Content />
      </div>
    </div>
  );
}

export default App;
