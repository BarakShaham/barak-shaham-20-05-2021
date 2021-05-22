import {Text} from 'react-native';
import moment from 'moment';
import {Card, MyText} from '../../../ui/Layouts';
import React from 'react';
import styled from 'styled-components';

const Day = styled(MyText)`
  font-size: 22px;
`;
const Phrase = styled(MyText)``;
const Degrees = styled(MyText)`
  font-size: 22px;
`;

export const DayCard = ({item}) => (
  <Card>
    <Day>
      {moment(item.Date, 'YYYY-MM-DD HH:mm:ss')
        .format('dddd')
        .substr(0, 3)
        .toUpperCase()}
    </Day>
    <Degrees>
      {item.Temperature.Minimum.Value}-{item.Temperature.Maximum.Value}{' '}
      {item.Temperature.Minimum.Unit}
    </Degrees>
    <Phrase>{item.Day.IconPhrase}</Phrase>
  </Card>
);
