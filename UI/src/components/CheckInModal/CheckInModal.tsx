import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State as ReduxState } from '../../store';
import { getStationStatus, postStationStatus } from '../../services/apiCalls';
import { State, Props, Step, Report } from './CheckInModal.types';
import './CheckInModal.scss';

class CheckInModal extends Component<Props, State> {
  state: State = {
    step: 0,
    report: {
      id: '',
      is_installed: null,
      is_renting: null,
      is_returning: null,
      last_reported: '',
      num_bikes_available: 0,
      num_bikes_disabled: 0,
      num_docks_available: 0,
      num_docks_disabled: 0,
      num_ebikes_available: 0,
      session_id: '',
      station_id: '',
      system_id: ''
    },
    bikesSeen: 0,
    bikesPickedUp: 0,
    bikesDroppedOff: 0,
    bikesRepaired: 0
  };

  async componentDidMount() {
    await getStationStatus(this.props.selectedStationId, (response: Report) =>
      this.setState({
        report: response,
        bikesSeen: response.num_bikes_available,
        bikesDroppedOff: response.num_docks_available,
        bikesRepaired: response.num_bikes_disabled
      })
    );
  }

  // Hook this up to send finishedReport to the back-end
  submitWizard = () => {
    const {
      report,
      bikesSeen,
      bikesPickedUp,
      bikesDroppedOff,
      bikesRepaired
    } = this.state;

    const finishedReport = { ...report };

    // Final Bikes Available
    finishedReport.num_bikes_available =
      bikesSeen - bikesPickedUp + bikesDroppedOff;
    // Final Docks Available
    finishedReport.num_docks_available =
      finishedReport.num_docks_available - bikesDroppedOff;
    // Final Bikes Disabled
    finishedReport.num_bikes_disabled =
      finishedReport.num_bikes_disabled - bikesRepaired;
    // Attach Session Id
    finishedReport.session_id = this.props.sessionId;

    postStationStatus(finishedReport);
    this.props.refreshPage();
    this.props.closeModal();
  };

  render() {
    const {
      step,
      bikesSeen,
      bikesPickedUp,
      bikesDroppedOff,
      bikesRepaired,
      report
    } = this.state;
    const { closeModal } = this.props;

    // Passes all contents to the wizard based on step in state
    const steps: Step[] = [
      {
        icon: 'bicycle-2',
        text: 'How many available bikes at the station?',
        count: bikesSeen,
        stateName: 'bikesSeen',
        max: 999
      },
      {
        icon: 'box-upload',
        text: 'How many bikes did you pick up for transport?',
        count: bikesPickedUp,
        stateName: 'bikesPickedUp',
        max: bikesSeen
      },
      {
        icon: 'box-download',
        text: 'How many bikes did you drop-off?',
        count: bikesDroppedOff,
        stateName: 'bikesDroppedOff',
        max: report.num_docks_available
      },
      {
        icon: 'wrench-screwdriver',
        text: 'How many bikes did you repair on-site?',
        count: bikesRepaired,
        stateName: 'bikesRepaired',
        max: report.num_bikes_disabled
      }
    ];

    return (
      <div className={'modal-wrapper'}>
        <div className={'checkin-modal'}>
          {/* NAV BUTTONS/TITLE */}
          <div className={'checkin-modal__nav'}>
            {step !== 0 ? (
              <i
                className={'icon-ic-arrow-back'}
                onClick={() => this.setState({ step: step - 1 })}
              />
            ) : (
              <div className={'icon-filler'} />
            )}
            <p>check-in</p>
            <i className={'icon-ic-close'} onClick={closeModal} />
          </div>
          {/* CONTENT */}
          <>
            <div className={'checkin-modal__body checkin-content'}>
              <i
                className={`icon-ic-${steps[step].icon} checkin-content__icon`}
              />
              <h3 className={'checkin-content__text'}>{steps[step].text}</h3>
              <div className={'checkin-content__counter'}>
                <i
                  className={`icon-ic-minus`}
                  onClick={() => {
                    let { count, stateName } = steps[step];
                    count > 0 &&
                      this.setState({
                        [stateName]: count - 1
                      } as Pick<State, keyof State>);
                  }}
                />
                <input
                  className={'checkin-content__number-input'}
                  type="string"
                  readOnly
                  value={steps[step].count}
                />
                <i
                  className={`icon-ic-add`}
                  onClick={() => {
                    let { count, stateName, max } = steps[step];
                    count < max &&
                      this.setState({
                        [stateName]: count + 1
                      } as Pick<State, keyof State>);
                  }}
                />
              </div>
            </div>
            {/* FOOTER */}
            {step < 3 ? (
              <div className={'checkin-modal__footer checkin-footer'}>
                <div className={'checkin-footer__tracker'}>
                  {[0, 1, 2, 3].map(num => (
                    <div
                      key={num}
                      className={`checkin-footer__dot ${
                        step === num ? 'checkin-footer__dot--active' : ''
                      }`}
                    />
                  ))}
                </div>
                <div
                  className={'checkin-footer__button'}
                  onClick={() => step < 3 && this.setState({ step: step + 1 })}
                >
                  <i className={'icon-ic-arrow-forward'} />
                </div>
              </div>
            ) : (
              <button
                className={'checkin-final__button'}
                onClick={this.submitWizard}
              >
                Check in and send maintenance report
              </button>
            )}
          </>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    sessionId: state.general.sessionId
  };
};

export default connect(mapStateToProps)(CheckInModal);
