import React, { createContext, 
useReducer, useContext } from 'react';

//Preparing the data layer used for StateProvider
export const StateContext = createContext();

//Here StateProvider is actual data layer and it is  a HOC
export const StateProvider  = ({ reducer,
 initialState,children }) => (

// The stuff below allows us  to setup the data layer

    <StateContext.Provider value={useReducer
    (reducer, initialState)}>
        {children}
    </StateContext.Provider>
 );

export const useStateValue = () => useContext
(StateContext);