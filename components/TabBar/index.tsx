import React from 'react';
import styled from 'styled-components/native';
import { BottomTabBar } from 'react-navigation-tabs';

export const TabBar = styled(BottomTabBar)`
  border-top-color: #605f60;
  ${props =>
    props.theme.colorScheme === 'dark'
      ? 'background-color: rgb(30,30,30);'
      : ''}
`;
