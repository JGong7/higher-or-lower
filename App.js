import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import AppNavigator from './routes/Stack.js';


export default function App() {
  return (
    <NavigationContainer> 
      <AppNavigator/>
    </NavigationContainer>
  );
}