import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SaveProvider } from './Context/SaveContext';
import MainNavigator from './BottomNavigation';

export default function App() {
  return (
    <SaveProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SaveProvider>
  );
}
