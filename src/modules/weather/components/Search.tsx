import React, {useCallback, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {useRecoilState} from 'recoil';
import {selectedCityState} from '../../../atoms/SelectedCityState';
import {API_KEY, SERVER_PREFIX} from '../../../constants';
import {useDebounce} from '../../../hooks/useDebounce';
import {useFetchApi} from '../../../hooks/useFetchApi';
import styled from 'styled-components/native';
import {Colors} from '../../../ui/Colors';
import {useTheme} from '../../../hooks/useTheme';
import {MyText} from '../../../ui/Layouts';

const List = styled.View`
  background-color: ${Colors.darkGrey};
  padding: 10px;
  border-radius: 5px;
`;
const City = styled.TouchableOpacity`
  margin: 5px 0px;
`;

export const Search = () => {
  const [theme] = useTheme();
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);

  const [searchVal, setSearchval] = useState('');

  const search = useCallback(text => {
    setSearchval(text);
  }, []);

  const selectCity = useCallback(city => {
    setSelectedCity(city);
    setSearchval('');
  }, []);

  const endpointSelectCity = `${SERVER_PREFIX}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${searchVal}`;
  const {
    data: autoCompleteData,
    isLoading: isLoadingCity,
    isError: isErrorCity,
    error,
    refetch: refetchCity,
  } = useFetchApi('selectedCity', endpointSelectCity, {enabled: false});

  const debouncedSearchVal = useDebounce(searchVal, 1000);
  useEffect(() => {
    if (debouncedSearchVal) {
      refetchCity();
    }
  }, [debouncedSearchVal]);

  console.log(autoCompleteData);

  return (
    <>
      <TextInput
        placeholder="city name..."
        onChangeText={text => search(text)}
        value={searchVal}
        placeholderTextColor={
          theme === 'light' ? Colors.black : Colors.darkGrey
        }
      />
      {isLoadingCity ? (
        <Text>Loading...</Text>
      ) : isErrorCity ? (
        <Text>Error...</Text>
      ) : searchVal != '' && autoCompleteData ? (
        <List>
          {autoCompleteData.map(city => (
            <City onPress={() => selectCity(city)} key={city.Key}>
              <MyText>
                {city.LocalizedName}, {city.Country.LocalizedName}
              </MyText>
            </City>
          ))}
        </List>
      ) : null}
    </>
  );
};
