import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import routes from './routes';
import NoAccess from './components/NoAccess/NoAccess';
import { State } from './store';
import { loginUser } from './store/Login/login.actions';

interface AppProps {
  history: History;
  showNoAccess: Boolean;
  loginUser: typeof loginUser;
}

class App extends React.Component<any> {
  componentWillMount() {
    // Logs in user if refreshed while still logged in
    let user = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.token) {
      this.props.loginUser(user.role);
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
