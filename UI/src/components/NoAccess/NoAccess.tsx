import React, { Component } from 'react';
import { connect } from 'react-redux';
import moodBad from '../../assets/ic-mood-bad.svg';
import './NoAccess.scss';
import { toggleNoAccess } from '../../store/General/general.actions';

interface Props {
  toggleNoAccess: () => void;
}

interface NoAccess {
  wrapperRef: {
    contains: (target: React.ReactNode) => boolean;
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

  handleClickOutside = (event: MouseEvent) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleNoAccess();
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
                onClick={this.props.toggleNoAccess}
              />
              <h1>What just happened?</h1>
              <p>
                Sorry, but that’s all you can see so far with the demo software.
                If you want to see more, you could always purchase Jaspersoft.
              </p>
              <a
                href="https://www.jaspersoft.com/"
                target="_blank"
                className={'no-access__button btn--primary'}
              >
                Contact Sales Team
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
  { toggleNoAccess }
)(NoAccess);
