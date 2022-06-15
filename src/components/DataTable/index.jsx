import * as React from 'react';
import { fetchAllReports } from '../../api';
import { EmptyContent } from './EmptyContent';
import { dateComparator } from '../../utils';
import styles from './DataTable.module.css';
import format from 'date-fns/format';

export function DataTable({ selectedFilter: filter, filterData, group }) {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const { gateways, projects } = filterData;

  React.useEffect(() => {
    async function getReports() {
      const reports = await fetchAllReports(filter);
      setData(reports);
    }
    if (filter) {
      getReports();
    }
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

  const onClickRow = React.useCallback(
    (event) => {
      const clickedId = event.target.id;
      if (open === clickedId) {
        setOpen(null);
      } else {
        setOpen(clickedId);
      }
    },
    [open]
  );

  if (!data) {
    return null;
  }

  if (Array.isArray(data) && !data.length) {
    return <EmptyContent />;
  }

  const transformedData = data.reduce(
    (total, item) => ({
      ...total,
      [item[group || 'projectId']]: !total[item[group || 'projectId']]
        ? [item]
        : [...total[item[group || 'projectId']], item]
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
      {Object.keys(sortedTransformedData).map((id) => (
        <div key={id}>
          <div className={styles.itemTitle} id={id} onClick={onClickRow}>
            <span>
              {group === 'gatewayId' ? gatewayNameMap[id] : projectNameMap[id]}
            </span>
            <span>
              Total amount:{' '}
              {Number(
                sortedTransformedData[id].reduce((t, g) => t + g.amount, 0)
              ).toFixed(2)}
            </span>
          </div>
          {id === open && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {!group && <th>Gateway</th>}
                  <th>Transaction id</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sortedTransformedData[id].map((item, i) => (
                  <tr
                    key={`${id}_${
                      item[group === 'gatewayId' ? 'projectId' : 'gatewayId']
                    }_${i}`}
                  >
                    <td>{format(new Date(item.created), 'dd.MM.yyyy')}</td>
                    {!group && <td>{gatewayNameMap[item.gatewayId]}</td>}
                    <td>{item.paymentId}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
