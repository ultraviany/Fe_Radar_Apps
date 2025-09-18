// App.js
import React from 'react';

import RootNavigation from './Navigation/RootNavigation';
import { SaveProvider } from './Context/SaveContext';

export default function App() {
  return (
    <SaveProvider>
      <RootNavigation />
    </SaveProvider>
  )}
