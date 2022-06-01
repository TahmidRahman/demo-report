import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftNavigation />
        <span>Content will go here</span>
      </div>
    </div>
  );
}

export default App;
