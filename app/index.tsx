import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Text, View, XStack, YStack, Button, SizableText } from 'tamagui';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

WebBrowser.maybeCompleteAuthSession();

const EXPO_REDIRECT_PARAMS = { useProxy: true, projectNameForProxy: '@username/myapp' };
const NATIVE_REDIRECT_PARAMS = { native: 'com.anish.cndpaymentmanagement://' };
const REDIRECT_PARAMS: any =
  Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>();

  const [_, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: redirectUri,
  });

  async function getUserInfo(token: string | undefined) {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
    } catch (err) {
      if (err) {
        console.error(err);
      }
    }
  }

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const image = { uri: 'https://ik.imagekit.io/hbqsxmwrz/home-bg.jpg?updatedAt=1715576691577' };
  let [fontsLoaded, fontError] = useFonts({});

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
          {/* <Text>user: {JSON.stringify(userInfo, null, 2)}</Text> */}
          <YStack flex={1}>
            <YStack flex={2} justifyContent="center">
              <SizableText
                size="$8"
                style={{ fontFamily: 'DarkerGrotesqueBold', color: '#BBCEFF' }}>
                CND Payments
              </SizableText>
              <SizableText size="$11" style={{ fontFamily: 'DarkerGrotesqueExtraBold' }}>
                Get useful{'\n'}insights of your{'\n'}business
              </SizableText>
              <SizableText
                size="$5"
                style={{ fontFamily: 'DarkerGrotesqueSemibold', color: '#BBCEFF' }}>
                Forget hustle and manage your business finance in one single app.
              </SizableText>
            </YStack>
            <YStack flex={1} justifyContent="flex-end" gap={10}>
              <Button theme="active" backgroundColor="black" onPress={() => promptAsync()}>
                Google SignIn
              </Button>
              <Button variant="outlined" onPress={() => promptAsync()} style={{ color: 'black' }}>
                Admin SignIn
              </Button>
            </YStack>
            {/* <Button
            title="Clear User"
            onPress={() => {
              AsyncStorage.removeItem('@user');
            }}
          /> */}
          </YStack>
        </Container>
      </ImageBackground>
    </>
  );
}
