import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';
import {MyText} from '../../../ui/Layouts';
import {useFavorites} from '../hooks/useFavorites';

export const ToggleFavoriteBtn = ({city}) => {
  const {toggleFavorites, isFavorite} = useFavorites();
  return (
    <TouchableOpacity onPress={() => toggleFavorites(city)}>
      {isFavorite(city.Key) ? (
        <MyText>remove from favorites</MyText>
      ) : (
        <MyText>add to favorites</MyText>
      )}
    </TouchableOpacity>
  );
};
