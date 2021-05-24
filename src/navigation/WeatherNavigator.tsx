import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {Weather} from '../modules/weather/Weather';
import {Favorites} from '../modules/favorites/Favorites';
import {NavigationContainer} from '@react-navigation/native';
import {Button} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {Colors} from '../ui/Colors';

const WeatherStackNavigator = createStackNavigator<any>();

export const WeatherNavigator: React.FC = () => {
  const {Navigator, Screen} = WeatherStackNavigator;
  const [theme] = useTheme();

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme === 'light' ? Colors.grey : Colors.darkGrey,
    },
    headerTitleStyle: {
      color: theme === 'light' ? Colors.black : Colors.white,
    },
  };

  return (
    <Navigator>
      <Screen name="Weather" component={Weather} options={headerOptions} />
      <Screen name="Favorites" component={Favorites} options={headerOptions} />
    </Navigator>
  );
};
