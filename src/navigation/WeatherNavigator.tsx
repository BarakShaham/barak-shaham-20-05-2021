import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {Weather} from '../modules/weather/Weather';
import {Favorites} from '../modules/favorites/Favorites';
import {NavigationContainer} from '@react-navigation/native';
import {Button} from 'react-native';

const WeatherStackNavigator = createStackNavigator<any>();

export const WeatherNavigator: React.FC = () => {
  const {Navigator, Screen} = WeatherStackNavigator;

  return (
    <Navigator>
      <Screen name="Weather" component={Weather} />
      <Screen name="Favorites" component={Favorites} />
    </Navigator>
  );
};
