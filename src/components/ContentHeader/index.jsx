import * as React from 'react';
import styles from './ContentHeader.module.css';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import Calendar from './Calendar.svg';

const defaultDropdownOptions = {
  gateway: [{ label: 'All gateways', value: '' }],
  project: [{ label: 'All projects', value: '' }]
};

export function ContentHeader({
  title,
  subtitle,
  filter,
  onChangeFilter,
  filterData
}) {
  const [dropdownOptions, setDropdownOptions] = React.useState(
    defaultDropdownOptions
  );
  const onChangeGateway = React.useCallback(
    (value) => {
      onChangeFilter({ gatewayId: value });
    },
    [onChangeFilter]
  );
  const onChangeProject = React.useCallback(
    (value) => {
      onChangeFilter({ projectId: value });
    },
    [onChangeFilter]
  );

  React.useEffect(() => {
    function setupDropdownOptions() {
      const { gateways, projects } = filterData;
      setDropdownOptions({
        gateway: [
          ...defaultDropdownOptions.gateway,
          ...gateways.map((gateway) => ({
            label: gateway.name,
            value: gateway.gatewayId
          }))
        ],
        project: [
          ...defaultDropdownOptions.project,
          ...projects.map((project) => ({
            label: project.name,
            value: project.projectId
          }))
        ]
      });
    }
    setupDropdownOptions();
  }, [filterData]);

  return (
    <div className={styles.container}>
      <div className={styles.subject}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      <div className={styles.filter}>
        <Dropdown
          value={filter.gatewayId}
          options={dropdownOptions.gateway}
          onChange={onChangeGateway}
        />
        <Dropdown
          value={filter.projectId}
          options={dropdownOptions.project}
          onChange={onChangeProject}
        />
        <Button icon={<img src={Calendar} alt="Calendar" />} type="primary">
          From Date
        </Button>
        <Button icon={<img src={Calendar} alt="Calendar" />} type="primary">
          To Date
        </Button>
        <Button type="secondary">Generate report</Button>
      </div>
    </div>
  );
}
