import styled from 'styled-components/native';
import {Colors} from './Colors';

export const FlexedRow = styled.View`
  display: flex;
  flex-direction: row;
`;
export const FlexedCol = styled.View`
  display: flex;
  flex-direction: column;
`;
export const Header = styled.Text``;

export const MyText = styled.Text<{theme}>`
  font-size: 18px;
  color: ${({theme}) => theme.text};
`;

export const Card = styled.View<{theme}>`
  display: flex;
  padding: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.card};
  margin: 5px;
  border-radius: 10px;
`;

export const myButton = styled.Button`
  margin: 5px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: blue;
    color: white;
  }
`;
