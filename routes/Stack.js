import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import End from '../screens/End.js';
import Game from '../screens/Game.js';
import Home from '../screens/Home.js';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="End" component={End} />
      </Stack.Navigator>
  );
}