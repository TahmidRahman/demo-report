import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './DoughnutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const presetColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

export function DoughnutChart({ data = [], group, filterData }) {
  const { gateways, projects } = filterData;
  const gatewayNameMap = React.useMemo(() => {
    return gateways.reduce((t, g) => ({ ...t, [g.gatewayId]: g.name }), {});
  }, [gateways]);

  const projectNameMap = React.useMemo(() => {
    return projects.reduce((t, p) => ({ ...t, [p.projectId]: p.name }), {});
  }, [projects]);

  const transformedData = data.reduce(
    (total, item) => ({
      ...total,
      [item[group]]: !total[item[group]]
        ? [item]
        : [...total[item[group]], item]
    }),
    {}
  );

  const graphData = {
    labels: Object.keys(transformedData).map((key) =>
      group === 'gatewayId' ? gatewayNameMap[key] : projectNameMap[key]
    ),
    datasets: [
      {
        data: Object.keys(transformedData).map((id) =>
          transformedData[id].reduce((t, g) => t + g.amount, 0)
        ),
        backgroundColor: Object.keys(transformedData).map(
          (_, i) =>
            presetColors[i] ||
            `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255
            )},${Math.floor(Math.random() * 255)}),1`
        )
      }
    ]
  };
  return (
    <div className={styles.container}>
      <Doughnut data={graphData} />
    </div>
  );
}
