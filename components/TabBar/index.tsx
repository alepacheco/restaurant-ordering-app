import React from 'react';
import styled from 'styled-components/native';
import { BottomTabBar } from 'react-navigation-tabs';

export const TabBar = styled(BottomTabBar)`
  border-top-width: 0;
  padding-top: 12px;
  background-color: ${props => props.theme.contrast0_5};
`;
