import React from 'react';
import './Dropdown.scss';

export interface Option {
  name: string;
  value: string;
  id: string;
}

interface Props {
  options: Option[];
  setSelected: (option: Option) => void;
  toggleDropdown: () => void;
  dropdownWidth: string;
}

export default function Dropdown(props: Props) {
  const { options, dropdownWidth } = props;

  const handleSelect = (value: Option) => {
    props.toggleDropdown();
    props.setSelected(value);
  };

  const items = options.map((item, key) => {
    return <div className="dropdown__option"
         key={key}
         onClick={() => handleSelect(item)}>
      {item.name}
    </div>
  });

  return (
    <div className='dropdown' style={{ width: dropdownWidth }}>
      {items}
    </div>
  );
}
