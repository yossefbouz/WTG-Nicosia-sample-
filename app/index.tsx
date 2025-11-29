import React from 'react';
import { ThemeProvider } from '../styles/theme';
import Home from '../screens/Home';

const Index = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default Index;
