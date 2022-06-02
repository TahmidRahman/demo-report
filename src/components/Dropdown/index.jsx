import Select, { components } from 'react-select';
import DropdownIndicatorIcon from './DropdownIndicator.svg';

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#1bc5bd',
    width: 135,
    height: 32,
    borderRadius: 5,
    color: 'white',
    border: 'none'
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
    fontSize: 14
  })
};
export function Dropdown({ value, options }) {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <Select
      styles={customStyles}
      value={selectedOption}
      options={options}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <img src={DropdownIndicatorIcon} alt="dropDownIndicator" />
          </components.DropdownIndicator>
        )
      }}
    />
  );
}
