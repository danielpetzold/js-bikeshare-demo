import React, { Component } from 'react';
import './SendToStationModal.scss';
import {SendToStationData, SendToStationPayload} from "./SendToStationModal.types";
import { setRouteStop } from "../../services/apiCalls";
import { NotificationData } from "../Notification/Notification";

export interface SendToStationProps {
  data: SendToStationData;
  closeModal: (refresh: boolean, notificationData: NotificationData |  null) => void
}

export interface SendToStationState {
  isPriority: boolean
}

class SendToStationModal extends Component<SendToStationProps, SendToStationState> {
  state: SendToStationState = {
    isPriority: false
  };

  closeModal = () => {
    this.props.closeModal(true, null);
  };

  submitDriverUpdate = async () => {
    await setRouteStop(this.assemblePayload())
      .catch((err) => {
        this.props.closeModal(true, {
          title: 'Oops! Something went wrong.',
          message: 'The action was not completeted. Error: ' + err,
          type: 'error'
        })
      })
      .then(() => {
        this.props.closeModal(true, {
          title: 'Success!',
          message: 'The driver has been notified of the route update.',
          type: 'success'
        });
      });
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