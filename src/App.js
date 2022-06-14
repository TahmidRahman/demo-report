import * as React from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';
import { ContentHeader } from './components/ContentHeader';
import { DataTable } from './components/DataTable';
import { fetchAllGateways, fetchAllProjects } from './api';

const INITIAL_FILTER_STATE = {
  projectId: '',
  gatewayId: '',
  from: '',
  to: ''
};

function App() {
  const [filter, setFilter] = React.useState(INITIAL_FILTER_STATE);
  const [filterData, setFilterData] = React.useState({
    gateways: [],
    projects: []
  });
  React.useEffect(() => {
    async function fetchFilterData() {
      const [gateways, projects] = await Promise.all([
        fetchAllGateways(),
        fetchAllProjects()
      ]);
      setFilterData({
        gateways,
        projects
      });
    }
    fetchFilterData();
  }, []);
  const onChangeFilter = React.useCallback((values) => {
    setFilter((filter) => ({
      ...filter,
      ...values
    }));
  }, []);

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
            filterData={filterData}
            onChangeFilter={onChangeFilter}
          />
          <DataTable filter={filter} filterData={filterData} />
        </div>
      </div>
    </div>
  );
}

export default App;
