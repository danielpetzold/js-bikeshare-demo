import React, { Component } from 'react';
import './ExportModal.scss';
import Dropdown from '../Dropdown/Dropdown';
import { Option } from '../Dropdown/Dropdown';

interface Props {
  closeModal: () => void;
}

interface State {
  openDropdown: boolean;
  selectedFormat: string;
  options: Option[];
}

export default class ExportModal extends Component<Props, State> {
  state: State = {
    openDropdown: false,
    selectedFormat: '',
    options: [
      { name: 'Select a format', value: '', id: '1' },
      { name: 'PDF', value: 'pdf', id: '2' },
      { name: 'XLSX', value: 'xlsx', id: '3' },
      { name: 'XLS', value: 'xls', id: '4' },
      { name: 'CSV', value: 'csv', id: '5' },
      { name: 'DOCX', value: 'docx', id: '6' }
    ]
  };

  toggleDropdown = () => {
    this.setState({
      openDropdown: !this.state.openDropdown
    });
  };

  setSelected = (option: Option) => {
    this.setState({
      selectedFormat: option.name
    });
  };

  exportSubmit = () => {
    // Do something with this format.
    const { selectedFormat } = this.state;

    this.props.closeModal();
  };

  render() {
    const { openDropdown, selectedFormat, options } = this.state;
    const { closeModal } = this.props;

    return (
      <div className={'modal-wrapper'}>
        <div className={'export-modal'}>
          <div className={'export-modal__title'}>
            <h2>Export Report</h2>
            <i className={'icon-ic-close'} onClick={closeModal} />
          </div>
          <div className={'export-modal__select'}>
            <div className={'modal-select'} onClick={this.toggleDropdown}>
              <div>{selectedFormat ? selectedFormat : options[0].name}</div>
              <i className={'icon-ic-unfold-more'} />
            </div>
            {openDropdown && (
              <Dropdown
                setSelected={this.setSelected}
                toggleDropdown={this.toggleDropdown}
                options={options}
                dropdownWidth="234px"
              />
            )}
          </div>
          <button
            className={'export-modal__submit-btn'}
            disabled={
              selectedFormat === '' || selectedFormat === options[0].value
            }
            onClick={this.exportSubmit}
          >
            <i className={'icon-ic-download export-modal__export-icon'} />
            Export
          </button>
        </div>
      </div>
    );
  }
}
