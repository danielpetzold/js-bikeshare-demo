import React, { Component } from 'react';
import './SendToStationModal.scss';
import {SendToStationData, SendToStationPayload} from "./SendToStationModal.types";
import { setRouteStop } from "../../services/apiCalls";

export interface SendToStationProps {
  data: SendToStationData;
  closeModal: (refresh: boolean) => void
}

export interface SendToStationState {
  isPriority: boolean
}

class SendToStationModal extends Component<SendToStationProps, SendToStationState> {
  state: SendToStationState = {
    isPriority: false
  };

  closeModal = () => {
    this.props.closeModal(false);
  };

  submitDriverUpdate = async () => {
    await setRouteStop(this.assemblePayload());
    this.props.closeModal(true);
  };

  assemblePayload(): SendToStationPayload {
    return {
      stationId: this.props.data.stationId,
      routeId: this.props.data.routeId,
      highPri: this.state.isPriority ? 1 : 0
    };
  }

  render() {
    return (
      <div className="main-modal-wrapper">
        <div className="send-station-modal">
          <div className={'send-station-modal__title'}>
            <h2>Send Driver</h2>
            <i className={'icon-ic-close'} onClick={this.closeModal} />
          </div>
          <div className="send-station-modal__body">
            <div className="send-station-modal__section">
              <div className="send-station-modal__sub-title">Driver</div>
              {this.props.data.driverName}
            </div>
            <div className="send-station-modal__section">
              <div className="send-station-modal__sub-title">Route #</div>
              {this.props.data.routeId}
            </div>
            <div className="send-station-modal__section">
              <div className="send-station-modal__sub-title">Region</div>
              {this.props.data.regionName}
            </div>
            <div className="send-station-modal__section">
              <div className="send-station-modal__sub-title">Station Needs</div>
              <p>{this.props.data.numBikesDisabled} bikes need repair</p>
              <p>Add {this.props.data.numDocksAvailable} bikes to station</p>
            </div>
            <hr className="send-station-modal__divider"/>
            <div className="send-station-modal__section">
              <label className="container">Make this the next stop on route
                <input type="checkbox" onClick={() => {this.setState({isPriority: !this.state.isPriority})} }/>
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="send-station-modal__footer">
            <button className="send-station-modal__submit-button" onClick={this.submitDriverUpdate}>
              <i className={'icon-ic-truck send-station-modal__export-icon'} />
              Send to Driver
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SendToStationModal;