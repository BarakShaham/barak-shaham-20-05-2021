import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {favoritesState} from '../../../atoms/FavoritesState';
import {useAsyncStorage} from '../../../hooks/useAsyncStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const {getData, storeData} = useAsyncStorage('favorites');

  const getFavorites = async () => {
    const favorites = await getData();
    if (favorites) setFavorites(favorites);
  };

  const toggleFavorites = useCallback(
    async city => {
      if (
        favorites.length > 0 &&
        favorites.filter(favorite => favorite.Key === city.Key).length > 0
      ) {
        const newFavorites = favorites.filter(
          favorite => favorite.Key !== city.Key,
        );
        await storeData(newFavorites);
        setFavorites(newFavorites);
      } else {
        const newFavorites = [...favorites, city];
        console.log('newFav', newFavorites);
        await storeData(newFavorites);
        setFavorites(newFavorites);
      }
    },
    [favorites],
  );

  const isFavorite = useCallback(
    cityKey =>
      favorites.length > 0 &&
      favorites.filter(favorite => favorite.Key === cityKey).length > 0,
    [favorites],
  );

  return {getFavorites, toggleFavorites, isFavorite};
};
