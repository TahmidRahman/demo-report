import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftNavigation />
        <div className="pageContent"></div>
      </div>
    </div>
  );
}

export default App;
