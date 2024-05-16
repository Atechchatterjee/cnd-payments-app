import { Stack } from 'expo-router';
import { useContext } from 'react';
import { router } from 'expo-router';

import { Container } from '~/components/Container';
import { YStack, Button, SizableText } from 'tamagui';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, { useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { ImageBackground } from 'react-native';
import { supabase } from '~/lib/supabase';
import { AuthContext } from '~/context/AuthContext';
import Icon from 'react-native-remix-icon';

WebBrowser.maybeCompleteAuthSession();

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@username/myapp' };
const NATIVE_REDIRECT_PARAMS = { native: 'com.anish.cndpaymentmanagement://' };
const REDIRECT_PARAMS: any =
  Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

export default function Home() {
  const { session } = useContext(AuthContext);

  const [_, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: redirectUri,
  });

  async function handleSignInWithGoogle(): Promise<void> {
    if (!session) {
      if (response?.type === 'success') {
        console.log('id_token: ', (response as any).params.id_token);
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: (response as any).params.id_token,
        });
        console.log(error, data);
      }
    } else {
      console.log('Already Signed In!!');
      alert('Already Signed In!!');
    }
    return new Promise((resolve) => {
      resolve();
    });
  }

  useEffect(() => {
    if (response) {
      handleSignInWithGoogle().then(() => {
        router.replace('/dashboard');
      });
    }
  }, [response]);

  const image = { uri: 'https://ik.imagekit.io/hbqsxmwrz/home-bg.jpg?updatedAt=1715576691577' };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Container>
          <YStack flex={1}>
            <YStack flex={2} justifyContent="center">
              <SizableText
                size="$8"
                style={{ fontFamily: 'DarkerGrotesqueBold', color: '#BBCEFF' }}>
                CND Payments
              </SizableText>
              <SizableText
                size="$11"
                style={{ fontFamily: 'DarkerGrotesqueExtraBold' }}
                color="white">
                Get useful{'\n'}insights of your{'\n'}business
              </SizableText>
              <SizableText
                size="$5"
                style={{ fontFamily: 'DarkerGrotesqueSemibold', color: '#BBCEFF' }}>
                Forget hustle and manage your business finance in one single app.
              </SizableText>
            </YStack>
            <YStack flex={1} justifyContent="flex-end" gap={10}>
              <Button
                theme="active"
                backgroundColor="black"
                color="white"
                gap="$1"
                onPress={() => promptAsync()}>
                <Icon name="google-fill" color="white" size="15px" />
                Google SignIn
              </Button>
              <Button variant="outlined" onPress={() => promptAsync()} style={{ color: 'black' }}>
                Admin SignIn
              </Button>
            </YStack>
          </YStack>
        </Container>
      </ImageBackground>
    </>
  );
}
