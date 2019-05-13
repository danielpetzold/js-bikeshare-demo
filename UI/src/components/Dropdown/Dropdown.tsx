import React, { Component, createRef } from "react";
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

class Dropdown extends Component<Props> {
  myRef: any = createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleSelect = (value: Option) => {
    this.props.toggleDropdown();
    this.props.setSelected(value);
  };

  // Closes dropdown if clicked outside of element
  handleClick = (e: any) => {
    if (this.myRef.contains(e.target)) {
      return;
    }
    this.props.toggleDropdown();
  };

  render() {
    const items = this.props.options.map((item, key) => {
      return <div className="dropdown__option"
                  key={key}
                  onClick={() => this.handleSelect(item)}>
        {item.name}
      </div>
    });

    return (
      <div className='dropdown' style={{ width: this.props.dropdownWidth }} ref={node => this.myRef = node}>
        {items}
      </div>
    );
  }
}

export default Dropdown;
