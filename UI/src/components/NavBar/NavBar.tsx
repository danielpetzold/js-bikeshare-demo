import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NavBar.scss';
import { toggleNoAccess } from '../../store/General/general.actions';
import { logOutUser } from '../../store/Login/login.actions';
import { User } from '../../helpers/userData';

type State = {
  isOpen: boolean;
};

interface NavBarProps {
  toggleNoAccess: () => void;
  logOutUser: () => void;
  user: User;
}

class NavBar extends Component<any, State> {
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

  handleLogout = (event: any) => {
    event.preventDefault();
    this.props.logOutUser();
  };

  render() {
    const { toggleMenu } = this;
    const { isOpen } = this.state;
    const userImage = this.props.user.userName
      ? require(`../../assets/users/${this.props.user.userName.replace(
          / /g,
          '_'
        )}.jpg`)
      : '';
    return (
      <div>
        <nav
          className={`nav-bar ${
            !isOpen ? `nav-bar--closed` : `nav-bar--expanded`
          }`}
        >
          <div className={'nav-bar__user'}>
            <img className="nav-bar__user-image" src={userImage} />
            <div className="nav-bar__user-info">
              <div className="nav-bar__user-name">
                {this.props.user.userName}
              </div>
              <div className="nav-bar__user-title">{this.props.user.title}</div>
            </div>
            <a className="nav-bar__log-out" onClick={e => this.handleLogout(e)}>
              Log Out
            </a>
          </div>
          <ul className={'nav-bar__top-menu'}>
            <li className={'nav-bar__item'}>
              <NavLink
                activeClassName="nav-bar__link--active"
                className="nav-bar__link"
                to="/Dashboard"
              >
                <i className="icon-ic-trending-up nav-bar__icon " />
                <span className="nav-bar__text">Trends and Analytics</span>
              </NavLink>
            </li>
            <li className={'nav-bar__item'}>
              <a className="nav-bar__link" href="#">
                <i className="icon-ic-store-mall nav-bar__icon " />
                <span className="nav-bar__text">Franchises</span>
              </a>
            </li>
            <li className={'nav-bar__item'}>
              <a
                className="nav-bar__link"
                href="#"
                onClick={this.toggleNoAccess}
              >
                <i className="icon-ic-people-outline nav-bar__icon " />
                <span className="nav-bar__text">Roles and Permissions</span>
              </a>
            </li>
            <li className={'nav-bar__item'}>
              <NavLink
                activeClassName="nav-bar__link--active"
                className="nav-bar__link"
                to="/reports"
              >
                <i className="icon-ic-assignment nav-bar__icon " />
                <span className="nav-bar__text">Reports</span>
              </NavLink>
            </li>
            <div className="nav-bar__divider" />
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
          {/* Toggle */}
          {isOpen && (
            <div className={`nav-bar__close-button`} onClick={toggleMenu}>
              <i className="icon-ic-close " />
            </div>
          )}
        </nav>
        {/* Hamburger */}
        <div
          className={`nav-bar__hamburger ${isOpen ? `nav-bar--closed` : ''} `}
          onClick={toggleMenu}
        >
          <i className="icon-ic-menu" />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => state.login,
  { toggleNoAccess, logOutUser }
)(NavBar);
