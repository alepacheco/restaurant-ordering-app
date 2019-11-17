import React, { useState } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';

const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 80 : 93;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export const Layout: React.FC<{
  backgroundImageSource: any;
  headerComponent: any;
}> = ({ children, backgroundImageSource, headerComponent }) => {
  const [stateScrollY] = useState(
    new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0
    )
  );

  const [refreshing, setRefreshing] = useState(false);

  // Because of content inset the scroll value will be negative on iOS so bring
  // it back to 0.
  const scrollY = Animated.add(
    stateScrollY,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.fill}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
      <Animated.ScrollView
        contentInset={{ top: HEADER_MAX_HEIGHT }}
        contentOffset={{ y: -HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: stateScrollY } } }],
          { useNativeDriver: true }
        )}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 300);
            }}
            progressViewOffset={HEADER_MAX_HEIGHT}
            // Android offset for RefreshControl
            refreshing={refreshing}
          />
        }
        // iOS offset for RefreshControl
        scrollEventThrottle={1}
        style={styles.fill}>
        {children}
      </Animated.ScrollView>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}>
        <Animated.Image
          source={backgroundImageSource}
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslate }],
            },
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslate }],
          },
        ]}>
        {headerComponent}
      </Animated.View>
    </View>
  );
};
