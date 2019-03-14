import React, { Component } from 'react';
import './Login.scss';
import logo from '../../assets/logo.svg';

interface State {
  selectedRole: string;
}

export default class Login extends Component<any, State> {
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
    this.props.history.push('/Dashboard');
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
                      (selectedRole === 'COO'
                        ? ' user-options__role--active'
                        : '')
                    }
                    id="COO"
                    onClick={e => this.selectRole(e)}
                  >
                    COO
                  </div>
                  <div
                    className={
                      'user-options__role user-options__role--mid' +
                      (selectedRole === 'Regional'
                        ? ' user-options__role--active'
                        : '')
                    }
                    id="Regional"
                    onClick={this.selectRole}
                  >
                    Regional
                  </div>
                  <div
                    className={
                      'user-options__role' +
                      (selectedRole === 'Driver'
                        ? ' user-options__role--active'
                        : '')
                    }
                    id="Driver"
                    onClick={this.selectRole}
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
