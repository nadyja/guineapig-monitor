import React, {Component} from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './redux/store.js';
import Wrapper from './containers/wrapper';

require("./styles.css");

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Wrapper />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
