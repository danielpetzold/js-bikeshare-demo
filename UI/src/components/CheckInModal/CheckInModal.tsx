import React, { Component } from 'react';
import './CheckInModal.scss';

interface State {
  step: number;
  report: {
    id: string;
    systemId: string;
    stationId: number;
    lastReported: string;
    sessionId: string;
    bikesAvailable: number;
    eBikesAvailable: number;
    bikesDisabled: number;
    docksAvailable: number;
    isRenting: boolean;
    isInstalled: boolean;
    isReturning: boolean;
    docksDisabled: number;
  };
  bikesSeen: number;
  bikesPickedUp: number;
  bikesDroppedOff: number;
  bikesRepaired: number;
  notes: string;
}

interface Props {
  closeModal: () => void;
}

interface Step {
  icon: string;
  text: string;
  count: number;
  minus: () => void;
  plus: () => void;
}

export default class CheckInModal extends Component<Props, State> {
  state: State = {
    step: 0,
    report: {
      id: '',
      systemId: '',
      stationId: 0,
      lastReported: '',
      sessionId: '',
      bikesAvailable: 0,
      eBikesAvailable: 0,
      bikesDisabled: 0,
      docksAvailable: 0,
      isRenting: false,
      isInstalled: false,
      isReturning: false,
      docksDisabled: 0
    },
    bikesSeen: 0,
    bikesPickedUp: 0,
    bikesDroppedOff: 0,
    bikesRepaired: 0,
    notes: ''
  };

  componentDidMount() {
    this.tempFunction();
  }

  // Replace with api call
  tempFunction = () => {
    this.setState({
      report: {
        id: '456',
        systemId: 'BA',
        stationId: 10,
        lastReported: '2019-03-29 06:31:00+00',
        sessionId: '8ecd6441065e4f93b19ba7ca20562ae9',
        bikesAvailable: 5,
        eBikesAvailable: 5,
        bikesDisabled: 4,
        docksAvailable: 4,
        isRenting: true,
        isInstalled: true,
        isReturning: true,
        docksDisabled: 4
      },
      // Pull these from report.bikesAvailable to be manipulated but keep original for reference
      bikesSeen: 5,
      bikesPickedUp: 5
    });
  };

  // Hook this up to send finishedReport to the back-end
  submitWizard = () => {
    const {
      report,
      bikesSeen,
      bikesPickedUp,
      bikesDroppedOff,
      bikesRepaired,
      notes
    } = this.state;

    const finishedReport = { ...report, notes };
    finishedReport.bikesAvailable = bikesSeen - bikesPickedUp + bikesDroppedOff;
    finishedReport.bikesDisabled = finishedReport.bikesDisabled - bikesRepaired;

    // console.log('finishedReport: ', finishedReport);
    this.props.closeModal();
  };

  render() {
    const {
      step,
      notes,
      bikesSeen,
      bikesPickedUp,
      bikesDroppedOff,
      bikesRepaired
    } = this.state;
    const { closeModal } = this.props;

    // Passes all contents to the wizard based on step in state
    const steps: Step[] = [
      {
        icon: 'bicycle-2',
        text: 'How many bikes did you see at the station?',
        count: bikesSeen,
        minus: () => {
          bikesSeen > 0 &&
            this.setState({
              bikesSeen: bikesSeen - 1
            });
        },
        plus: () => {
          this.setState({
            bikesSeen: bikesSeen + 1
          });
        }
      },
      {
        icon: 'box-upload',
        text: 'How many bikes did you pick up for transport?',
        count: bikesPickedUp,
        minus: () => {
          bikesPickedUp > 0 &&
            this.setState({
              bikesPickedUp: bikesPickedUp - 1
            });
        },
        plus: () => {
          this.setState({
            bikesPickedUp: bikesPickedUp + 1
          });
        }
      },
      {
        icon: 'box-download',
        text: 'How many bikes did you drop-off?',
        count: bikesDroppedOff,
        minus: () => {
          bikesDroppedOff > 0 &&
            this.setState({
              bikesDroppedOff: bikesDroppedOff - 1
            });
        },
        plus: () => {
          this.setState({
            bikesDroppedOff: bikesDroppedOff + 1
          });
        }
      },
      {
        icon: 'wrench-screwdriver',
        text: 'How many bikes did you repair on-site?',
        count: bikesRepaired,
        minus: () => {
          bikesRepaired > 0 &&
            this.setState({
              bikesRepaired: bikesRepaired - 1
            });
        },
        plus: () => {
          this.setState({
            bikesRepaired: bikesRepaired + 1
          });
        }
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
          {step < 4 ? (
            <>
              <div className={'checkin-modal__body checkin-content'}>
                <i
                  className={`icon-ic-${
                    steps[step].icon
                  } checkin-content__icon`}
                />
                <h3 className={'checkin-content__text'}>{steps[step].text}</h3>
                <div className={'checkin-content__counter'}>
                  <i className={`icon-ic-minus`} onClick={steps[step].minus} />
                  <input
                    type="number"
                    value={steps[step].count}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      this.setState({ bikesSeen: +e.target.value })
                    }
                  />
                  <i className={`icon-ic-add`} onClick={steps[step].plus} />
                </div>
              </div>
              {/* FOOTER */}
              <div className={'checkin-modal__footer checkin-footer'}>
                <div className={'checkin-footer__tracker'}>
                  <div
                    className={`checkin-footer__dot ${
                      step === 0 ? 'checkin-footer__dot--active' : ''
                    }`}
                  />
                  <div
                    className={`checkin-footer__dot ${
                      step === 1 ? 'checkin-footer__dot--active' : ''
                    }`}
                  />
                  <div
                    className={`checkin-footer__dot ${
                      step === 2 ? 'checkin-footer__dot--active' : ''
                    }`}
                  />
                  <div
                    className={`checkin-footer__dot ${
                      step === 3 ? 'checkin-footer__dot--active' : ''
                    }`}
                  />
                  <div
                    className={`checkin-footer__dot ${
                      step === 4 ? 'checkin-footer__dot--active' : ''
                    }`}
                  />
                </div>
                <div
                  className={'checkin-footer__button'}
                  onClick={() => step < 4 && this.setState({ step: step + 1 })}
                >
                  <i className={'icon-ic-arrow-forward'} />
                </div>
              </div>
            </>
          ) : (
            // FINAL STEP IN WIZARD
            <div className={'checkin-modal__body checkin-final'}>
              <p className={'checkin-final__text'}>
                If you would like to request any additional needs, leave a
                message below.
              </p>
              <textarea
                className={'checkin-final__notes'}
                name=""
                value={notes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  this.setState({ notes: e.target.value })
                }
              />
              <button
                className={'checkin-final__button'}
                onClick={this.submitWizard}
              >
                Check in and send maintenance report
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
