import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import {API_KEY, DEFAULT_CITY_KEY, SERVER_PREFIX} from '../../constants';
import {useAddButtonToNav} from '../../hooks/useAddButtonToNav';
import {useFavorites} from './hooks/useFavorites';
import {CurrentCondition} from './components/CurrentCondition';
import {useFetchApi} from '../../hooks/useFetchApi';
import {FlexedCol, FlexedRow} from '../../ui/Layouts';
import {ToggleFavoriteBtn} from './components/ToggleFavoriteBtn';
import {selectedCityState} from '../../atoms/SelectedCityState';
import {Forecast} from './components/Forecast';
import {Search} from './components/Search';

const Container = styled(FlexedCol)`
  align-items: center;
  margin-top: 5%;
  padding: 10px;
`;

interface Props {
  navigation: StackNavigationProp<any, 'Weather'>;
}
export const Weather: React.FC<Props> = ({navigation}) => {
  const initialEndpoint = `${SERVER_PREFIX}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=tel-aviv`;

  const {getFavorites} = useFavorites();
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);
  const cityKey = selectedCity ? selectedCity.Key : DEFAULT_CITY_KEY;

  const button = () => (
    <Button
      onPress={() => navigation.navigate('Favorites')}
      title="Favorites"
    />
  );
  useAddButtonToNav(navigation, button);

  const {
    data: initialCityData,
    isLoading: isLoadingInitialCity,
    isError: isErrorInitialCity,
    error: initialError,
  } = useFetchApi('initial', initialEndpoint);

  useEffect(() => {
    if (initialCityData) setSelectedCity(initialCityData[0]);
  }, [initialCityData]);

  useEffect(() => {
    getFavorites();
  }, []);

  if (isLoadingInitialCity) {
    return <Text>Loading...</Text>;
  }
  if (isErrorInitialCity) {
    return <Text>Error</Text>;
  }
  return (
    <Container>
      <Search />
      <CurrentCondition selectedCityData={selectedCity} cityKey={cityKey} />
      <ToggleFavoriteBtn city={selectedCity} cityKey={cityKey} />
      <Forecast selectedCity={selectedCity} cityKey={cityKey} />
    </Container>
  );
};
