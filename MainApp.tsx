import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {WeatherNavigator} from './src/navigation/WeatherNavigator';
import {ThemeProvider} from 'styled-components';
import {useTheme} from './src/hooks/useTheme';
import {darkTheme, lightTheme} from './src/ui/Theme';

export const MainApp = () => {
  const [theme] = useTheme();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <NavigationContainer>
        <WeatherNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default MainApp;
