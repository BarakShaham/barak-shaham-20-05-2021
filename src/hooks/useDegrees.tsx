import {useRecoilState} from 'recoil';
import {degreesState} from '../atoms/DegreesTypeState';
export const useDegrees = () => {
  const [degreesType, setDegreesType] = useRecoilState(degreesState);

  const degreesToggler = () => {
    setDegreesType(prev => !prev);
  };

  return {degreesType, degreesToggler};
};
