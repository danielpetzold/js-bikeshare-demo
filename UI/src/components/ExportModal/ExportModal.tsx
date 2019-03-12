import React, { Component } from 'react';
import './ExportModal.scss';
import Dropdown from '../Dropdown/Dropdown';

interface Props {
  closeModal: () => void;
}

interface State {
  openDropdown: boolean;
  selectedFormat: string;
  options: string[];
}

export default class ExportModal extends Component<Props, State> {
  state: State = {
    openDropdown: false,
    selectedFormat: '',
    options: ['Select a format', 'PDF', 'XLSX', 'XLS', 'CVS', 'DOCX']
  };

  toggleDropdown = () => {
    this.setState({
      openDropdown: !this.state.openDropdown
    });
  };

  setSelected = (option: string) => {
    this.setState({
      selectedFormat: option
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
              <div>{selectedFormat ? selectedFormat : options[0]}</div>
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
            disabled={selectedFormat === '' || selectedFormat === options[0]}
            onClick={this.exportSubmit}
          >
            Export
          </button>
        </div>
      </div>
    );
  }
}
