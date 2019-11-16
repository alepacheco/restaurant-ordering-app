import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import HomeLight from 'assets/icons/light/home.svg';
import HomeBold from 'assets/icons/bold/home.svg';
import MapLight from 'assets/icons/light/map.svg';
import MapBold from 'assets/icons/bold/map.svg';
import ProfileLight from 'assets/icons/light/profile.svg';
import ProfileBold from 'assets/icons/bold/profile.svg';
import LottieView from 'lottie-react-native';
import splashAnimation from 'assets/animations/splash.json';

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

const StyledLottieView = styled(LottieView)`
  height: 90px;
  width: 90px;
`;

const SplashWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const Splash: React.FC<{ selected: boolean; icon: string }> = ({
  selected,
  icon,
}) => {
  const [animation, setAnimation] = useState(null);

  if (animation !== null && selected) {
    animation.play();
  }

  return (
    <SplashWrapper>
      <StyledLottieView
        loop={false}
        progress={1}
        ref={animation => setAnimation(animation)}
        source={splashAnimation}
        speed={3}
      />
    </SplashWrapper>
  );
};

const Wrapper = styled.View`
  margin: 12px auto 0;
`;
export const TabBarIcon: React.FC<{
  icon: 'home' | 'map' | 'profile';
  focused: boolean;
}> = ({ icon, focused }) => {
  const themeContext = useContext(ThemeContext);
  const theme = focused ? 'bold' : 'light';
  const Logo = iconMap[theme][icon];
  const color = focused ? '#f00fff' : themeContext.textColor;

  return (
    <Wrapper>
      <Splash icon={icon} selected={focused} />
      <Logo width={32} height={32} fill={color} />
    </Wrapper>
  );
};
