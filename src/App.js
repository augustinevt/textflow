import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import createStore from './createStore';

import Articles from './documents/Documents'
import Document from './documents/Document'

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
