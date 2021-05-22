import {Card, MyText} from '../../../ui/Layouts';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Colors} from '../../../ui/Colors';
import {useFetchApi} from '../../../hooks/useFetchApi';
import {Text} from 'react-native';
import {API_KEY, SERVER_PREFIX} from '../../../constants';

const Container = styled(Card)`
  background-color: ${Colors.grey};
`;
const CityName = styled(MyText)`
  font-size: 30px;
`;
const Phrase = styled(MyText)``;
const Degrees = styled(MyText)`
  font-size: 44px;
`;

export const CurrentCondition = ({selectedCityData, cityKey}) => {
  const endpoint = `${SERVER_PREFIX}/currentconditions/v1/${cityKey}?apikey=${API_KEY}`;

  const {
    data: conditionData,
    isLoading: isLoadingCondition,
    isError: isErrorCondition,
    error: errorCondition,
    refetch: refetchCondition,
  } = useFetchApi('currentCondition', endpoint, {
    enabled: false,
  });
  useEffect(() => {
    refetchCondition();
  }, [selectedCityData]);

  if (isLoadingCondition) {
    return <Text>Loading...</Text>;
  }
  if (isErrorCondition) {
    return <Text>Error</Text>;
  }
  return (
    <Container>
      {selectedCityData && (
        <CityName>{selectedCityData.LocalizedName}</CityName>
      )}
      {conditionData && (
        <>
          <Phrase>{conditionData[0].WeatherText}</Phrase>
          <Degrees>
            {conditionData[0].Temperature.Metric.Value}{' '}
            {conditionData[0].Temperature.Metric.Unit}
          </Degrees>
        </>
      )}
    </Container>
  );
};
