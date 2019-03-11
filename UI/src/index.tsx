import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import configureStore, { history } from './configureStore';
import { visualizeHelper } from './helpers/VisualizeHelper';

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <div className={'app'}>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </div>,
    document.getElementById('root')
  );
};

render();
