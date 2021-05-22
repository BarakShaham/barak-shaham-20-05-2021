import {Card, MyText} from '../../../ui/Layouts';
import styled from 'styled-components';
import React from 'react';

const Content = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Name = styled(MyText)`
  font-size: 30px;
`;
const Phrase = styled(MyText)``;
const Degrees = styled(MyText)`
  font-size: 36px;
`;
const Left = styled.View``;
const Right = styled.View``;
export const FavoriteCard = ({item, name}) => {
  return (
    <Content>
      <Left>
        <Name>{name}</Name>
        <Phrase>{item.data[0].WeatherText}</Phrase>
      </Left>
      <Right>
        <Degrees>
          {item.data[0].Temperature.Metric.Value}{' '}
          {item.data[0].Temperature.Metric.Unit}
        </Degrees>
      </Right>
    </Content>
  );
};
