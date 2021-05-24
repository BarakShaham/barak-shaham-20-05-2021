import {Card, MyText} from '../../../ui/Layouts';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Colors} from '../../../ui/Colors';
import {useFetchApi} from '../../../hooks/useFetchApi';
import {Text} from 'react-native';
import {API_KEY, SERVER_PREFIX} from '../../../constants';
import {useDegrees} from '../../../hooks/useDegrees';

const Container = styled(Card)``;
const CityName = styled(MyText)`
  font-size: 30px;
`;
const Phrase = styled(MyText)``;
const Degrees = styled(MyText)`
  font-size: 44px;
`;

export const CurrentCondition = ({city}) => {
  const {degreesType} = useDegrees();
  //console.log(selectedCityData, cityKey);
  const endpoint = `${SERVER_PREFIX}/currentconditions/v1/${city.Key}?apikey=${API_KEY}`;

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
  }, [city]);

  if (isLoadingCondition) {
    return <Text>Loading...</Text>;
  }
  if (isErrorCondition) {
    return <Text>Error</Text>;
  }

  const degType = degreesType ? 'Metric' : 'Imperial';
  return (
    <Container>
      {city && <CityName>{city.LocalizedName}</CityName>}
      {conditionData && (
        <>
          <Phrase>{conditionData[0].WeatherText}</Phrase>
          <Degrees>
            {conditionData[0].Temperature[degType].Value}{' '}
            {conditionData[0].Temperature[degType].Unit}
          </Degrees>
        </>
      )}
    </Container>
  );
};
