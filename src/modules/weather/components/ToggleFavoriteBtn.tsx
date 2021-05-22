import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useFavorites} from '../hooks/useFavorites';

export const ToggleFavoriteBtn = ({city, cityKey}) => {
  const {toggleFavorites, isFavorite} = useFavorites();
  return (
    <TouchableOpacity onPress={() => toggleFavorites(city)}>
      {isFavorite(cityKey) ? (
        <Text>remove from favorites</Text>
      ) : (
        <Text>add to favorites</Text>
      )}
    </TouchableOpacity>
  );
};
