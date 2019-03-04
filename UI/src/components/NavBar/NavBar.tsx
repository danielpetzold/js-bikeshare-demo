import './NavBar.scss';
import { Component } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNoAccess } from '../../actions/general';

type State = {
  isOpen: boolean;
};

interface NavBarProps {
  toggleNoAccess: () => void;
}

class NavBar extends Component<NavBarProps, any> {
  readonly state: State = {
    isOpen: false
  };

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleNoAccess = (event: any) => {
    event.preventDefault();
    this.props.toggleNoAccess();
  };

  render() {
    const { toggleMenu } = this;
    const { isOpen } = this.state;
    return (
      <div>
        <nav className={`nav-bar ${!isOpen ? `nav-bar--closed` : ``} `}>
          <div className={'nav-bar__user'}>
            <div className="nav-bar__user-image" />
            <div className="nav-bar__user-info">
              <div className="nav-bar__user-name">Test Person</div>
              <div className="nav-bar__user-title">COO</div>
            </div>
            <Link className="nav-bar__log-out" to="/Login">
              Log Out
            </Link>
          </div>
          <ul className={'nav-bar__top-menu'}>
            <li className="nav-bar__item nav-bar__item--active">
              <Link className="nav-bar__link" to="/Dashboard">
                <i className="icon-ic-trending-up nav-bar__icon " />
                <span className="nav-bar__text">Trends and Analytics</span>
              </Link>
            </li>
            <li className="nav-bar__item">
              <a className="nav-bar__link" href="#">
                <i className="icon-ic-store-mall nav-bar__icon " />
                <span className="nav-bar__text">Franchises</span>
              </a>
            </li>
            <li className="nav-bar__item">
              <a
                className="nav-bar__link"
                href="#"
                onClick={this.toggleNoAccess}
              >
                <i className="icon-ic-people-outline nav-bar__icon " />
                <span className="nav-bar__text">Roles and Permissions</span>
              </a>
            </li>
            <li className="nav-bar__item">
              <a className="nav-bar__link" href="#">
                <i className="icon-ic-assignment nav-bar__icon " />
                <span className="nav-bar__text">Reports</span>
              </a>
            </li>
          </ul>
          <ul className="nav-bar__bottom-menu">
            <li className="nav-bar__item">
              <a
                className="nav-bar__link"
                href="#"
                onClick={this.toggleNoAccess}
              >
                <i className="icon-ic-notifications nav-bar__icon " />
                <span className="nav-bar__text">Notifications</span>
              </a>
            </li>
            <li className="nav-bar__item">
              <a
                className="nav-bar__link"
                href="#"
                onClick={this.toggleNoAccess}
              >
                <i className="icon-ic-settings nav-bar__icon " />
                <span className="nav-bar__text">Settings</span>
              </a>
            </li>
          </ul>
          <div className="nav-bar__close-button" onClick={toggleMenu}>
            <i className="icon-ic-close " />
          </div>
        </nav>
        <div
          className={`nav-bar__hamburger ${isOpen ? `nav-bar--closed` : ``} `}
          onClick={toggleMenu}
        >
          <i className="icon-ic-menu" />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { toggleNoAccess }
)(NavBar);
