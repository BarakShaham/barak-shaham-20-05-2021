import React from 'react';
import {Switch} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';

export const ThemeToggler = () => {
  const [theme, themeToggler] = useTheme();

  return (
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={theme === 'light' ? '#f5dd4b' : '#f4f3f4'}
      onValueChange={() => (themeToggler as Function)()}
      value={theme === 'light' ? true : false}
    />
  );
};
