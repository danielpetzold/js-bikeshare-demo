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
    const { altHamburger } = this.props;
    const { userName, title } = this.props.user;
    const userImage = userName
      ? require(`../../assets/users/${userName.replace(/ /g, '_')}.jpg`)
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
              <div className="nav-bar__user-name">{userName}</div>
              <div className="nav-bar__user-title">{title}</div>
            </div>
            <a className="nav-bar__log-out" onClick={e => this.handleLogout(e)}>
              Log Out
            </a>
          </div>
          <ul className={'nav-bar__top-menu'}>
            <li className={'nav-bar__item'} title="Trends and Analytics">
              <NavLink
                activeClassName="nav-bar__link--active"
                className="nav-bar__link"
                to={title === 'Driver' ? '/driverDashboard' : '/dashboard'}
              >
                <i className="icon-ic-trending-up nav-bar__icon " />
                <span className="nav-bar__text" >Trends and Analytics</span>
              </NavLink>
            </li>

            {/* Hides icons for driver view */}
            {title !== 'Driver' && (
              <>
                <li className={'nav-bar__item'} title='Franchises'>
                  <a className="nav-bar__link" href="#" onClick={this.toggleNoAccess}>
                    <i className="icon-ic-store-mall nav-bar__icon " />
                    <span className="nav-bar__text">Franchises</span>
                  </a>
                </li>
                <li className={'nav-bar__item'} title='Roles and Permissions'>
                  <a
                    className="nav-bar__link"
                    href="#"
                    onClick={this.toggleNoAccess}
                  >
                    <i className="icon-ic-people-outline nav-bar__icon " />
                    <span className="nav-bar__text">Roles and Permissions</span>
                  </a>
                </li>
                <li className={'nav-bar__item'} title="Reports">
                  <NavLink
                    activeClassName="nav-bar__link--active"
                    className="nav-bar__link"
                    to="/reports"
                  >
                    <i className="icon-ic-assignment nav-bar__icon " />
                    <span className="nav-bar__text">Reports</span>
                  </NavLink>
                </li>
              </>
            )}
            <div className="nav-bar__divider" />
            <li className="nav-bar__item" title='Notifications'>
              <a
                className="nav-bar__link"
                href="#"
                onClick={this.toggleNoAccess}
              >
                <i className="icon-ic-notifications nav-bar__icon "/>
                <span className="nav-bar__text">Notifications</span>
              </a>
            </li>
            <li className="nav-bar__item" title='Settings'>
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
          className={`nav-bar__hamburger ${isOpen ? `nav-bar--closed` : ''} ${
            altHamburger ? 'nav-bar__hamburger--alt' : ''
          }`}
          onClick={toggleMenu}
        >
          <i className="icon-ic-menu" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...state.login,
    ...ownProps.altHamburger
  };
};

export default connect(
  mapStateToProps,
  { toggleNoAccess, logOutUser }
)(NavBar);
