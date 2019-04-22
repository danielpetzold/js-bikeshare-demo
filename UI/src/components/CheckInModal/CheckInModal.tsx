import React, { Component } from 'react';
import { getStationStatus } from '../../services/apiCalls';
import './CheckInModal.scss';

interface Report {
  id: string;
  is_installed: boolean | null;
  is_renting: boolean | null;
  is_returning: boolean | null;
  last_reported: string;
  num_bikes_available: number | null;
  num_bikes_disabled: number | null;
  num_docks_available: number | null;
  num_docks_disabled: number | null;
  num_ebikes_available: number | null;
  session_id: null | string;
  station_id: string;
  system_id: string;
}

interface State {
  step: number;
  report: Report;
  bikesSeen: number;
  bikesPickedUp: number;
  bikesDroppedOff: number;
  bikesRepaired: number;
  notes: string;
}

interface Props {
  closeModal: () => void;
  selectedStationId: number | null;
}

interface Step {
  icon: string;
  text: string;
  count: number;
  stateName: any;
}

export default class CheckInModal extends Component<Props, State> {
  state: State = {
    step: 0,
    report: {
      id: '',
      is_installed: null,
      is_renting: null,
      is_returning: null,
      last_reported: '',
      num_bikes_available: null,
      num_bikes_disabled: null,
      num_docks_available: null,
      num_docks_disabled: null,
      num_ebikes_available: null,
      session_id: '',
      station_id: '',
      system_id: ''
    },
    bikesSeen: 0,
    bikesPickedUp: 0,
    bikesDroppedOff: 0,
    bikesRepaired: 0,
    notes: ''
  };

  async componentDidMount() {
    await getStationStatus(this.props.selectedStationId, (response: any) =>
      this.setState({ report: response })
    );
  }

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

    this.props.closeModal();
  };

  render() {
    // console.log(this.state);
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
        stateName: 'bikesSeen'
      },
      {
        icon: 'box-upload',
        text: 'How many bikes did you pick up for transport?',
        count: bikesPickedUp,
        stateName: 'bikesPickedUp'
      },
      {
        icon: 'box-download',
        text: 'How many bikes did you drop-off?',
        count: bikesDroppedOff,
        stateName: 'bikesDroppedOff'
      },
      {
        icon: 'wrench-screwdriver',
        text: 'How many bikes did you repair on-site?',
        count: bikesRepaired,
        stateName: 'bikesRepaired'
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
                      let { count, stateName } = steps[step];
                      this.setState({
                        [stateName]: count + 1
                      } as Pick<State, keyof State>);
                    }}
                  />
                </div>
              </div>
              {/* FOOTER */}
              <div className={'checkin-modal__footer checkin-footer'}>
                <div className={'checkin-footer__tracker'}>
                  {[0, 1, 2, 3, 4].map(num => (
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
                placeholder="(Optional) Write something here…"
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
