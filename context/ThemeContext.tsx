import React, { createContext } from 'react';
import { theme } from '../utils/theme';

export const ThemeContext = createContext(theme);

export const ThemeProvider = ({children}) => {

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );

};

