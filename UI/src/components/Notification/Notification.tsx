import React, { Component } from "react";
import './Notification.scss';

interface Props {
  title: string;
  message: string;
  type: string;
  close: () => void;
}

export interface NotificationData {
  title: string;
  message: string;
  type: string;
};

class Notification extends Component<Props> {

  closeNotification = () => {
    this.props.close();
  };

  render() {
    const typeClass: string = this.props.type ? `notification--${this.props.type}`: '';
    return (
      <div className={`notification ${typeClass}`}>
        <i className='icon-ic-truck notification__truck'/>
        <i className='icon-ic-close notification__close' onClick={this.closeNotification}/>
        <div className='notification__body'>
          <div className='notification__title'>{this.props.title}</div>
          <div className='notification__message'>{this.props.message}</div>
        </div>
      </div>
    );
  }
}

  export default Notification;