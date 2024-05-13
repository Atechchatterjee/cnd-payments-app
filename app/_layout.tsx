import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    DarkerGrotesqueBlack: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Black.ttf'),
    DarkerGrotesqueBold: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Bold.ttf'),
    DarkerGrotesqueExtraBold: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-ExtraBold.ttf'),
    DarkerGrotesqueLight: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Light.ttf'),
    DarkerGrotesqueMedium: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Medium.ttf'),
    DarkerGrotesqueRegular: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-Regular.ttf'),
    DarkerGrotesqueSemiBold: require('../assets/fonts/Darker_Grotesque/static/DarkerGrotesque-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Stack />
    </TamaguiProvider>
  );
}
