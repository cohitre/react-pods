import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers';
import Application from './Application';

const store = createStore(reducers);

document.addEventListener('DOMContentLoaded', function() {
  render(<Provider store={store}><Application/></Provider>, document.getElementById('react'));
}, true);
