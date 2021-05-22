import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import {favoritesState} from '../../atoms/FavoritesState';
import {useQueries} from 'react-query';
import {fetchApi} from '../../api';
import {API_KEY, SERVER_PREFIX} from '../../constants';
import {FlexedCol} from '../../ui/Layouts';
import styled from 'styled-components';
import {FavoriteCard} from './components/FavoriteCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {selectedCityState} from '../../atoms/SelectedCityState';

const Container = styled(FlexedCol)`
  padding: 10px;
  overflow: scroll;
`;

interface Props {
  navigation: StackNavigationProp<any, 'Favorites'>;
}
export const Favorites: React.FC<Props> = ({navigation}) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const [selectedCity, setSelectedCity] = useRecoilState(selectedCityState);

  const queries = favorites
    ? favorites.map((favorite, index) => {
        return {
          queryKey: ['city', index],
          queryFn: () =>
            fetchApi(
              `${SERVER_PREFIX}/currentconditions/v1/${favorite.Key}?apikey=${API_KEY}`,
            ),
        };
      })
    : [];
  const results = useQueries(queries);

  const selectFavorite = useCallback((item, index) => {
    navigation.navigate('Weather');
    setSelectedCity(favorites[index]);
  }, []);

  return (
    <Container>
      {favorites.length > 0 ? (
        results.map((item, index) =>
          item.isLoading ? (
            <Text>Loading...</Text>
          ) : item.isError ? (
            <Text>Error...</Text>
          ) : (
            <TouchableOpacity onPress={() => selectFavorite(item, index)}>
              <FavoriteCard item={item} name={favorites[index].LocalizedName} />
            </TouchableOpacity>
          ),
        )
      ) : (
        <Text>No favorites</Text>
      )}
    </Container>
  );
};
