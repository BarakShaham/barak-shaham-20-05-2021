import React, {useCallback, useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {selectedCityState} from '../../../atoms/SelectedCityState';
import {API_KEY, SERVER_PREFIX} from '../../../constants';
import {useDebounce} from '../../../hooks/useDebounce';
import {useFetchApi} from '../../../hooks/useFetchApi';
import styled from 'styled-components';
import {Colors} from '../../../ui/Colors';

const List = styled.ScrollView`
  z-index: 1;
  background-color: ${Colors.white};
  border-style: solid;
  position: relative;
`;

export const Search = () => {
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

  const debouncedSearchVal = useDebounce(searchVal, 500);
  useEffect(() => {
    if (debouncedSearchVal) {
      refetchCity();
    }
  }, [debouncedSearchVal]);

  return (
    <>
      <TextInput
        placeholder="city name..."
        onChangeText={text => search(text)}
        value={searchVal}
      />
      {isLoadingCity ? (
        <Text>Loading...</Text>
      ) : isErrorCity ? (
        <Text>Error...</Text>
      ) : searchVal != '' && autoCompleteData ? (
        <List>
          {autoCompleteData.map(city => (
            <TouchableOpacity onPress={() => selectCity(city)} key={city.Key}>
              <Text>
                {city.LocalizedName}, {city.Country.LocalizedName}
              </Text>
            </TouchableOpacity>
          ))}
        </List>
      ) : null}
    </>
  );
};
