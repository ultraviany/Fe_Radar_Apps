// App.js
import React from 'react';
import RootNavigation from './Navigation/RootNavigation';
import { SaveProvider } from './Context/SaveContext';
import { LikeProvider } from './Context/LikeContext';

export default function App() {
  return (
    <SaveProvider>
      <LikeProvider>
        <RootNavigation />
      </LikeProvider>
    </SaveProvider>
  ); 
}
