import React from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { State } from './reducers/index';
import routes from './routes';
import NoAccess from './components/NoAccess/NoAccess';

interface AppProps {
  history: History;
  showNoAccess: Boolean;
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

const mapStateToProps = (state: State) => {
  return {
    showNoAccess: state.general.showNoAccess
  };
};

export default connect(mapStateToProps)(App);
