import { Session } from '@supabase/supabase-js';
import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack, useRootNavigationState } from 'expo-router';
import { useEffect, useState } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { supabase } from '~/lib/supabase';
import { AuthContext } from '~/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  const [session, setSession] = useState<Session | null>();

  const queryClient = new QueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // redirects to the dashboard if the user is already signed in
      if (session) {
        router.replace('/dashboard');
      }
    }
  }, [loaded, session]);

  if (!loaded) return null;

  return (
    <AuthContext.Provider
      value={{
        session,
      }}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Theme name="light">
            <Stack />
          </Theme>
        </TamaguiProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
