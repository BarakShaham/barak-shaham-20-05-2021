import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaView, Text, View} from 'react-native';
import {WeatherNavigator} from './src/navigation/WeatherNavigator';
import {ThemeProvider} from 'styled-components';
import {useTheme} from './src/hooks/useTheme';
import {darkTheme, lightTheme} from './src/ui/Theme';
import MainApp from './MainApp';

const queryClient = new QueryClient();

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MainApp />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
