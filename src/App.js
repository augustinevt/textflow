import React from 'react';
import { Provider } from 'react-redux';

import Document from './documents/Document'

import './App.css';

import createStore from './createStore';

const store = createStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Document/>
      </Provider>
    </div>
  );
}

export default App;
