import React, { Component } from 'react';
import './Login.scss';
import logo from '../../assets/group-41.svg';

interface State {
  selectedRole: string;
}

export default class Login extends Component<State> {
  state = {
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

  handleLogin = () => {};

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
                <div className={'login__options'}>
                  <div
                    className={
                      'login__options__role' +
                      (selectedRole === 'COO'
                        ? ' login__options__role--active'
                        : '')
                    }
                    id="COO"
                    onClick={this.selectRole}
                  >
                    COO
                  </div>
                  <div
                    className={
                      'login__options__role login__options__role--mid' +
                      (selectedRole === 'Regional'
                        ? ' login__options__role--active'
                        : '')
                    }
                    id="Regional"
                    onClick={this.selectRole}
                  >
                    Regional
                  </div>
                  <div
                    className={
                      'login__options__role' +
                      (selectedRole === 'Local'
                        ? ' login__options__role--active'
                        : '')
                    }
                    id="Local"
                    onClick={this.selectRole}
                  >
                    Local
                  </div>
                </div>
                <button
                  className={'login__button btn--primary--green'}
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
