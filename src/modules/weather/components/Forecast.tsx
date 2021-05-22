import {Card, FlexedRow, MyText} from '../../../ui/Layouts';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useFetchApi} from '../../../hooks/useFetchApi';
import {FlatList, Text} from 'react-native';
import {DayCard} from './DayCard';
import {API_KEY, SERVER_PREFIX} from '../../../constants';

const Container = styled(FlexedRow)`
  margin-top: 20%;
`;

export const Forecast = ({selectedCity, cityKey}) => {
  const endpoint = `${SERVER_PREFIX}/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`;

  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    isError: isErrorForecast,
    error: errorForecast,
    refetch: refetchForecast,
  } = useFetchApi('forecast', endpoint, {enabled: false});

  useEffect(() => {
    refetchForecast();
  }, [selectedCity]);

  if (isLoadingForecast) {
    return <Text>Loading...</Text>;
  }
  if (isErrorForecast) {
    return <Text>Error</Text>;
  }

  return (
    <Container>
      {forecastData && (
        <FlatList
          data={forecastData.DailyForecasts}
          renderItem={DayCard}
          keyExtractor={item => item.Date}
          horizontal={true}
        />
      )}
    </Container>
  );
};
