import React from 'react';
import styled from 'styled-components/native';
import HomeLight from '../../assets/icons/light/home.svg';
import HomeBold from '../../assets/icons/bold/home.svg';
import MapLight from '../../assets/icons/light/map.svg';
import MapBold from '../../assets/icons/bold/map.svg';
import ProfileLight from '../../assets/icons/light/profile.svg';
import ProfileBold from '../../assets/icons/bold/profile.svg';

const iconMap = {
  light: {
    home: HomeLight,
    map: MapLight,
    profile: ProfileLight,
  },
  bold: {
    home: HomeBold,
    map: MapBold,
    profile: ProfileBold,
  },
};

const Wrapper = styled.View`
  margin: 12px auto 0;
`;
export const TabBarIcon: React.FC<{
  icon: 'home' | 'map' | 'profile';
  focused: boolean;
}> = ({ icon, focused }) => {
  const theme = focused ? 'bold' : 'light';
  const Logo = iconMap[theme][icon];

  return (
    <Wrapper>
      <Logo key={`${theme}-${icon}`} width={32} height={32} />
    </Wrapper>
  );
};
