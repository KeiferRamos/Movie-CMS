import { createContext, useReducer } from 'react';
import { initialState } from '../store';
import { reducer } from '../reducer';

export const GlobalContext = createContext({});

function Context({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default Context;
