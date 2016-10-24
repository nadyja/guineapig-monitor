import React, {Component} from 'react';
import {render} from 'react-dom';
import Chart from './chart';
import Pig from './pig';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store.js';

const store = configureStore();

class App extends Component {
  

  render() {

    return (
      <Provider store={store}>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Guinea Pig Monitor</h3>
          </div>
          <Chart />
          <div className="row">
            <div className="col col-xs-6">
              <Pig name="gryzelda"></Pig>
            </div>
            <div className="col col-xs-6">
              <Pig name="hrumhilda"></Pig>
            </div>
          </div>

         
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
