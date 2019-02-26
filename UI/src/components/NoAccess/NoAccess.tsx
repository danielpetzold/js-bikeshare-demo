import React, { Component } from 'react';
import { connect } from 'react-redux';
import moodBad from '../../assets/ic-mood-bad.svg';
import './NoAccess.scss';
import { hideNoAccess } from '../../actions/general';

interface Props {
  hideNoAccess: () => void;
}

interface NoAccess {
  wrapperRef: {
    contains: (e: React.ReactNode) => boolean;
  };
}

class NoAccess extends Component<Props, NoAccess> {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node: any) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log('test');
      this.props.hideNoAccess();
    }
  };

  render() {
    return (
      <div className={'grid modal-wrapper'}>
        <div className={'grid__row'}>
          <div className={'grid__column-12 grid__column-m-4'}>
            <div className={'no-access'} ref={this.setWrapperRef}>
              <img
                src={moodBad}
                alt="no-access icon"
                className={'no-access__mood-icon'}
              />
              <i
                className={'icon-ic-close no-access__close'}
                onClick={this.props.hideNoAccess}
              />
              <h1>What just happened?</h1>
              <p>
                Sorry, but that’s all you can see so far with the demo software.
                If you want to see more, you could always purchase Jaspersoft.
              </p>
              <a href="https://www.jaspersoft.com/" target="_blank">
                <button className={'no-access__button btn--primary'}>
                  Contact Sales Team
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { hideNoAccess }
)(NoAccess);
