import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text, Switch, TouchableOpacity} from 'react-native';
import {useRecoilState} from 'recoil';
import {API_KEY, SERVER_PREFIX} from '../../constants';
import {useAddButtonToNav} from '../../hooks/useAddButtonToNav';
import {useFavorites} from './hooks/useFavorites';
import {CurrentCondition} from './components/CurrentCondition';
import {useFetchApi} from '../../hooks/useFetchApi';
import {FlexedCol, FlexedRow, MyText} from '../../ui/Layouts';
import {ToggleFavoriteBtn} from './components/ToggleFavoriteBtn';
import {selectedCityState} from '../../atoms/SelectedCityState';
import {Forecast} from './components/Forecast';
import {Search} from './components/Search';
import {useInitialLocation} from './hooks/useInitialLocation';
import {DegreesToggler} from './components/DegreesToggler';
import {ThemeToggler} from './components/ThemeToggler';

const Container = styled(FlexedCol)`
  align-items: center;
  padding-top: 5%;
  padding: 10px;
  background: ${({theme}) => theme.background};
  height: 100%;
`;
const Togglers = styled(FlexedRow)`
  width: 100%;
  justify-content: space-between;
`;
const Toggle = styled(FlexedCol)`
  justify-content: center;
  align-items: center;
`;
const FavoritesBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

interface Props {
  navigation: StackNavigationProp<any, 'Weather'>;
}
export const Weather: React.FC<Props> = ({navigation}) => {
  const {currentLocation} = useInitialLocation();
  const [endpoint, setEndpoint] = useState(null);
  const {getFavorites} = useFavorites();
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);

  const favButton = useCallback(
    () => (
      <FavoritesBtn onPress={() => navigation.navigate('Favorites')}>
        <MyText> Favorites</MyText>
      </FavoritesBtn>
    ),
    [],
  );
  useAddButtonToNav(navigation, favButton);

  const {
    data: currentLocationData,
    isLoading: isLoadingCurrentLocation,
    isError: isErrorCurrentLocation,
    error: currentLocationError,
    refetch: refetchCurrentLocationData,
  } = useFetchApi('currentLocation', endpoint, {enabled: false});

  // sync current location with endpoint
  useEffect(() => {
    if (currentLocation)
      setEndpoint(
        `${SERVER_PREFIX}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${currentLocation.lat}%2C${currentLocation.long}`,
      );
  }, [currentLocation]);

  // refetch current location data when endpoint recieves value
  useEffect(() => {
    if (endpoint) refetchCurrentLocationData();
  }, [endpoint]);

  // set the selected city to the api data response
  useEffect(() => {
    if (currentLocationData) setSelectedCity(currentLocationData);
  }, [currentLocationData]);

  useEffect(() => {
    getFavorites();
  }, []);

  if (isLoadingCurrentLocation) {
    return <Text>Loading...</Text>;
  }
  if (isErrorCurrentLocation) {
    return <Text>Error</Text>;
  }
  return (
    <Container>
      {selectedCity && (
        <>
          <Togglers>
            <Toggle>
              <ThemeToggler />
              <MyText>Theme</MyText>
            </Toggle>
            <Toggle>
              <DegreesToggler />
              <MyText>F / C</MyText>
            </Toggle>
          </Togglers>
          <Search />
          <CurrentCondition city={selectedCity} />
          <ToggleFavoriteBtn city={selectedCity} />
          <Forecast city={selectedCity} />
        </>
      )}
    </Container>
  );
};
