import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import routes from './routes';
import NoAccess from './components/NoAccess/NoAccess';

interface AppProps {
  history: History;
  showNoAccess: Boolean;
}

interface ReduxState {
  general: {
    showNoAccess: Boolean;
  };
}

const App = ({ history, showNoAccess }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <>
        {showNoAccess && <NoAccess />}
        {routes}
      </>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state: ReduxState) => {
  return {
    showNoAccess: state.general.showNoAccess
  };
};

export default connect(mapStateToProps)(App);
