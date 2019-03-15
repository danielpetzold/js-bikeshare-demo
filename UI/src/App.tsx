import React, { Component } from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { State } from './store/index';
import routes from './routes';
import NoAccess from './components/NoAccess/NoAccess';
import { loginUser } from './store/Login/login.actions';

interface AppProps {
  history: History;
  showNoAccess: Boolean;
  loginUser: typeof loginUser;
}

class App extends Component<AppProps> {
  componentWillMount() {
    // Login user if page is refreshed with active token
    let user = localStorage.getItem('user');
    if (user && JSON.parse(user).token) {
      console.log('login user', JSON.parse(user));
      this.props.loginUser(JSON.parse(user));
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <>
          {this.props.showNoAccess && <NoAccess />}
          {routes}
        </>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    showNoAccess: state.general.showNoAccess
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(App);
