import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer,  { initialState } from "./reducer";
import { StateProvider } from  './StateProvider';

ReactDOM.render(
  <React.StrictMode>

  {/* State provider is basically like a data layer which surrounds the App.
  So here when we sign in we push the user into the  data layer and then we pull the user from data layer whenever we need it into different components. */}
    <StateProvider initialState={initialState} 
    reducer={reducer}>

    {/* So the <App/> is the children argument used in StateProvider component */}

    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
