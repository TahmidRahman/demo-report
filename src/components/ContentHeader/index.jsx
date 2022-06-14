import * as React from 'react';
import styles from './ContentHeader.module.css';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { DatePicker } from '../DatePicker';
import format from 'date-fns/format';

const defaultDropdownOptions = {
  gateway: [{ label: 'All gateways', value: '' }],
  project: [{ label: 'All projects', value: '' }]
};

const INITIAL_FILTER_STATE = {
  projectId: '',
  gatewayId: '',
  from: '',
  to: ''
};

export function ContentHeader({ title, subtitle, onSubmitFilter, filterData }) {
  const [filter, setFilter] = React.useState(INITIAL_FILTER_STATE);
  const [dropdownOptions, setDropdownOptions] = React.useState(
    defaultDropdownOptions
  );
  const onChangeGateway = React.useCallback((value) => {
    setFilter((filter) => ({ ...filter, gatewayId: value }));
  }, []);
  const onChangeProject = React.useCallback((value) => {
    setFilter((filter) => ({ ...filter, projectId: value }));
  }, []);

  const onChangeFrom = React.useCallback((value) => {
    setFilter((filter) => ({ ...filter, from: format(value, 'yyyy-MM-dd') }));
  }, []);

  const onChangeTo = React.useCallback((value) => {
    setFilter((filter) => ({ ...filter, to: format(value, 'yyyy-MM-dd') }));
  }, []);

  const onClickGenerateReport = React.useCallback(() => {
    onSubmitFilter(filter);
  }, [filter, onSubmitFilter]);

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
        <DatePicker
          selected={new Date(filter.from)}
          onChange={onChangeFrom}
          placeholder="From date"
        />
        <DatePicker
          selected={new Date(filter.to)}
          onChange={onChangeTo}
          placeholder="To date"
        />
        <Button type="secondary" onClick={onClickGenerateReport}>
          Generate report
        </Button>
      </div>
    </div>
  );
}
