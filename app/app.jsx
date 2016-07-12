require("../assets/stylesheets/scss/application.scss");

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';


import { connect } from 'react-redux';
import store from './reducers/reducer';


class App extends React.Component {

  handlerInrementa = (event) => {
    store.dispatch({ type: 'INCREMENT' });
  }

  handlerDecrementa = (event) => {
    store.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
        <div>
          <div>
            Hola {store.getState()}
          </div>
          <button onClick={this.handlerInrementa}>+</button>
          <button onClick={this.handlerDecrementa}>-</button>
        </div>
    )
  }
}

function render() {
  ReactDOM.render(<App/>, document.getElementById('root'));
}

render();
store.subscribe(render);
