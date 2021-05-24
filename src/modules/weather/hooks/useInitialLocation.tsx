import {useEffect, useState} from 'react';
import RNLocation from 'react-native-location';
import {useRecoilState} from 'recoil';
import {currentLocationState} from '../../../atoms/CurrentLocationState';
export const useInitialLocation = () => {
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationState);

  const getLocation = () => {
    RNLocation.configure({
      distanceFilter: 5.0,
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          setCurrentLocation({
            lat: locations[0].latitude,
            long: locations[0].longitude,
          });
        });
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {currentLocation};
};
