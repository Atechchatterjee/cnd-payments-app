import { router, Stack } from 'expo-router';
import { XStack, Button, YStack, SizableText, Image } from 'tamagui';
import Icon from 'react-native-remix-icon';
import React, { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { FALLBACK_IMG_URL } from '~/lib/defaults';

export default function Dashboard() {
  const { session } = useContext(AuthContext);

  if (!session) router.replace('/');
  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: () => (
            <XStack
              flex={1}
              style={{
                alignItems: 'center',
              }}>
              <Button variant="outlined" style={{ color: 'black', paddingLeft: '0' }}>
                <Icon name="menu-4-line" />
              </Button>
              <SizableText
                fontSize={20}
                alignSelf="center"
                flex={1}
                style={{
                  fontFamily: 'DarkerGrotesqueBold',
                  color: 'black',
                  justifySelf: 'center',
                  margin: 'auto',
                }}>
                Manage Payments
              </SizableText>
              <Image
                src={session?.user.user_metadata.avatar_url || FALLBACK_IMG_URL}
                width={35}
                height={35}
                marginRight={30}
                alignSelf="center"
                style={{ borderRadius: 50 }}
                onPress={() => router.replace('/profile')}
              />
            </XStack>
          ),
        }}
      />
      <YStack backgroundColor="white" h="100%"></YStack>
    </>
  );
}
