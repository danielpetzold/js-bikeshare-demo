import React, { Component } from 'react';
import './Login.scss';
import logo from '../../assets/logo.svg';
import {
  COO_ROLE,
  DRIVER_ROLE,
  FRANCHISE_MANAGER_ROLE,
  userData
} from '../../helpers/userData';
import { connect } from 'react-redux';
import { loginUser } from '../../store/Login/login.actions';
import { User } from '../../store/Login/login.types';

interface State {
  selectedRole: string;
}

class Login extends Component<any, State> {
  readonly state: State = {
    selectedRole: ''
  };

  selectRole = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    this.setState({
      selectedRole: e.target.id
    });
  };

  handleLogin = () => {
    let user: User = userData.find((user: User) => {
      return user.role === this.state.selectedRole;
    }) as User;
    this.props.loginUser(user);
    this.props.history.push('/dashboard');
  };

  render() {
    const { selectedRole } = this.state;
    return (
      <div className={'grid login'}>
        <div className={'grid__row'}>
          <div className={'grid__column-4 grid__column-m-4'}>
            <div className={'login__wrapper'}>
              <img src={logo} alt="logo" className={'login__logo'} />
              <div className={'login__content'}>
                <div className={'login__welcome'}>
                  <h2>Welcome back</h2>
                  <p>Sign in to continue</p>
                </div>
                <div className={'user-options'}>
                  <div
                    className={
                      'user-options__role' +
                      (selectedRole === COO_ROLE
                        ? ' user-options__role--active'
                        : '')
                    }
                    id={COO_ROLE}
                    onClick={e => this.selectRole(e)}
                  >
                    COO
                  </div>
                  <div
                    className={
                      'user-options__role user-options__role--mid' +
                      (selectedRole === FRANCHISE_MANAGER_ROLE
                        ? ' user-options__role--active'
                        : '')
                    }
                    id={FRANCHISE_MANAGER_ROLE}
                    onClick={e => this.selectRole(e)}
                  >
                    Regional
                  </div>
                  <div
                    className={
                      'user-options__role' +
                      (selectedRole === DRIVER_ROLE
                        ? ' user-options__role--active'
                        : '')
                    }
                    id={DRIVER_ROLE}
                    onClick={e => this.selectRole(e)}
                  >
                    Driver
                  </div>
                </div>
                <button
                  className={'login__button btn--primary'}
                  disabled={!selectedRole}
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { loginUser }
)(Login);
