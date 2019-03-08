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
      <div className={'grid export-modal-wrapper'}>
        <div className={'grid__row'}>
          <div className={'grid__column-12 grid__column-m-4'}>
            <div className={'export-modal'}>
              <div className={'export-modal__title-wrapper'}>
                <h2>Export Report</h2>
                <i className={'icon-ic-close'} onClick={closeModal} />
              </div>
              <div className={'export-modal__custom-select'}>
                <div
                  className={'export-modal__custom-select__selected-box'}
                  onClick={this.toggleDropdown}
                >
                  <div>{selectedFormat ? selectedFormat : options[0]}</div>
                  <div className={'export-modal__custom-select__select-arrows'}>
                    <i
                      className={
                        'icon-ic-arrow-down export-modal__custom-select__arrow-flip'
                      }
                    />
                    <i className={'icon-ic-arrow-down'} />
                  </div>
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
                className={'export-modal__btn'}
                disabled={
                  selectedFormat === '' || selectedFormat === options[0]
                }
                onClick={this.exportSubmit}
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
