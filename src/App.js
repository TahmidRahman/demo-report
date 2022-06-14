import * as React from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';
import { ContentHeader } from './components/ContentHeader';
import { DataTable } from './components/DataTable';
import { fetchAllGateways, fetchAllProjects } from './api';
import { DoughnutChart } from './components/DoughnutChart';

function App() {
  const [selectedFilter, setSelectedFilter] = React.useState(null);
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

  const onSubmitFilter = React.useCallback((filter) => {
    setSelectedFilter(filter);
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
            filterData={filterData}
            onSubmitFilter={onSubmitFilter}
          />
          <div className="reportContainer">
            <DataTable
              selectedFilter={selectedFilter}
              filterData={filterData}
            />
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
