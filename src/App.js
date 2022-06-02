import React from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';
import { ContentHeader } from './components/ContentHeader';

function App() {
  const [filter] = React.useState({
    project: '',
    gateway: '',
    from: '2021-01-01',
    to: '2021-12-31'
  });

  return (
    <div className="App">
      <Header />
      <div className="content">
        <LeftNavigation />
        <div className="pageContent">
          <ContentHeader
            title="Reports"
            subtitle="Easily generate a report of your transactions"
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
