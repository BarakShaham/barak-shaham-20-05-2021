import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useAsyncStorage} from './useAsyncStorage';
import {themeState} from '../atoms/ThemeState';
export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const {getData, storeData} = useAsyncStorage('theme');

  const setMode = mode => {
    // storeData(mode)
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  // const getTheme = async () => {
  //   const localTheme = await getData();
  // };

  // //   useEffect(() => {
  // //     const localTheme =  getData()
  // //     localTheme && setTheme(localTheme);
  // //   }, []);

  return [theme, themeToggler];
};
