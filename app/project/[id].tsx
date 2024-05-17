import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext } from 'react';
import Icon from 'react-native-remix-icon';
import { XStack, SizableText, Button, Image, Text, YStack } from 'tamagui';
import { FALLBACK_IMG_URL } from '~/lib/defaults';
import { AuthContext } from '~/context/AuthContext';

export default function Page() {
  const { session } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

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
              <Button
                variant="outlined"
                style={{ color: 'black', paddingLeft: '0' }}
                onPress={() => router.replace('/dashboard')}>
                <Icon name="arrow-left-line" />
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
                Manage Project
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
      <YStack backgroundColor={'white'} w="100%" h="100%">
        <Text>project: {id}</Text>
      </YStack>
    </>
  );
}
