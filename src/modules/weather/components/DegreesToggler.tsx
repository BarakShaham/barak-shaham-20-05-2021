import React from 'react';
import {Switch} from 'react-native';
import {useDegrees} from '../../../hooks/useDegrees';
import {useTheme} from '../../../hooks/useTheme';

export const DegreesToggler = () => {
  const {degreesType, degreesToggler} = useDegrees();
  const [theme, themeToggler] = useTheme();

  return (
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={theme === 'light' ? '#f5dd4b' : '#f4f3f4'}
      onValueChange={degreesToggler}
      value={degreesType ? true : false}
    />
  );
};
