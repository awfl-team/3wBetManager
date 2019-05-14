import react from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.css';
import App from './App';
import './scss/main.scss';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
