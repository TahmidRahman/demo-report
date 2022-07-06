import * as React from 'react';
import { Header } from './components/Header';
import { LeftNavigation } from './components/LeftNavigation';
import './App.css';
import { ContentHeader } from './components/ContentHeader';
import { DataTable } from './components/DataTable';
import { fetchAllGateways, fetchAllProjects, fetchAllReports } from './api';
import { DoughnutChart } from './components/DoughnutChart';
import { getGroupName } from './utils';

function App() {
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const [reportData, setReportData] = React.useState(null);
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

  const onSubmitFilter = React.useCallback(async (filter) => {
    const reports = await fetchAllReports(filter);
    setReportData(reports);
    setSelectedFilter(filter);
  }, []);

  const group = getGroupName(selectedFilter);

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
              data={reportData}
              selectedFilter={selectedFilter}
              filterData={filterData}
              group={group}
            />
            {group &&
              reportData &&
              Array.isArray(reportData) &&
              Boolean(reportData.length) && (
                <DoughnutChart
                  group={group}
                  data={reportData}
                  filterData={filterData}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
