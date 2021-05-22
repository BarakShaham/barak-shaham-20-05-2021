import React from 'react';

export const useAddButtonToNav = (navigation, Button: () => JSX.Element) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button />,
    });
  }, [navigation]);
};
