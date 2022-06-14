import * as React from 'react';
import { fetchAllReports } from '../../api';
import { EmptyContent } from './EmptyContent';
import { dateComparator } from '../../utils';
import styles from './DataTable.module.css';
import format from 'date-fns/format';

export function DataTable({ filter, filterData }) {
  const [data, setData] = React.useState(null);
  const { gateways, projects } = filterData;

  React.useEffect(() => {
    async function getReports() {
      const reports = await fetchAllReports(filter);
      setData(reports);
    }
    getReports();
  }, [filter]);

  const gatewayNameMap = React.useMemo(() => {
    return gateways.reduce((t, g) => ({ ...t, [g.gatewayId]: g.name }), {
      '': 'All gateways'
    });
  }, [gateways]);

  const projectNameMap = React.useMemo(() => {
    return projects.reduce((t, p) => ({ ...t, [p.projectId]: p.name }), {
      '': 'All projects'
    });
  }, [projects]);

  if (!data) {
    return null;
  }

  if (Array.isArray(data) && !data.length) {
    return <EmptyContent />;
  }

  const transformedData = data.reduce(
    (total, item) => ({
      ...total,
      [item.projectId]: !total[item.projectId]
        ? [item]
        : [...total[item.projectId], item]
    }),
    {}
  );

  const sortedTransformedData = Object.keys(transformedData).reduce(
    (total, key) => ({
      ...total,
      [key]: transformedData[key].sort(dateComparator)
    }),
    {}
  );

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        {`${projectNameMap[filter.projectId]} | ${
          gatewayNameMap[filter.gatewayId]
        }`}
      </div>
      {Object.keys(sortedTransformedData).map((projectId) => (
        <div key={projectId}>
          <div className={styles.itemTitle}>
            <span>{projectNameMap[projectId]}</span>
            <span>
              Total amount:{' '}
              {Number(
                sortedTransformedData[projectId].reduce(
                  (t, g) => t + g.amount,
                  0
                )
              ).toFixed(2)}
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Gateway</th>
                <th>Transaction id</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransformedData[projectId].map((project, i) => (
                <tr key={`${projectId}_${project.gatewayId}_${i}`}>
                  <td>{format(new Date(project.created), 'dd.MM.yyyy')}</td>
                  <td>{gatewayNameMap[project.gatewayId]}</td>
                  <td>{project.paymentId}</td>
                  <td>{project.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
