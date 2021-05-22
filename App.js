import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';
import {SafeAreaView, Text, View} from 'react-native';
import {WeatherNavigator} from './src/navigation/WeatherNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <WeatherNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
