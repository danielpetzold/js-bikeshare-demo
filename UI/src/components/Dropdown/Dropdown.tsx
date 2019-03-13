import React from 'react';
import './Dropdown.scss';

interface Props {
  options: string[];
  setSelected: (option: string) => void;
  toggleDropdown: () => void;
  dropdownWidth: string;
}

export default function Dropdown(props: Props) {
  const { options, dropdownWidth } = props;

  const handleSelect = (option: string) => {
    props.toggleDropdown();
    props.setSelected(option);
  };

  const optionList = options.map((option, i) => {
    return (
      <div
        key={i}
        className={'dropdown__option'}
        onClick={() => handleSelect(option)}
      >
        {option}
      </div>
    );
  });

  return (
    <div className={'dropdown'} style={{ width: dropdownWidth }}>
      {optionList}
    </div>
  );
}
