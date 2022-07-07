import * as React from 'react';
import { ContentHeader } from '../ContentHeader';
import { DataTable } from '../DataTable';
import { fetchAllGateways, fetchAllProjects, fetchAllReports } from '../../api';
import { DoughnutChart } from '../DoughnutChart';
import { getGroupName } from '../../utils';
import styles from './Content.module.css';

export function Content() {
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
    <div className={styles.container}>
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
  );
}
