import { router, Stack } from 'expo-router';
import { Button, XStack, SizableText, YStack, Card, H2, Avatar } from 'tamagui';
import Icon from 'react-native-remix-icon';
import React, { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { supabase } from '~/lib/supabase';
import { FALLBACK_IMG_URL } from '~/lib/defaults';

export default function Profile() {
  const { session } = useContext(AuthContext);
  if (!session) router.replace('/');

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: 'Profile',
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
                Your Profile
              </SizableText>
            </XStack>
          ),
        }}
      />
      <YStack flex={1} flexDirection="column" h="100%" padding={'$4'} gap="$4">
        <Card size="$4" bordered flex={1} maxHeight="$10" backgroundColor={'white'}>
          <Card.Header padded flex={1} flexDirection={'row'} gap="$5">
            <Avatar circular size="$6" alignSelf="center">
              <Avatar.Image
                accessibilityLabel="Cam"
                src={session?.user.user_metadata.avatar_url || FALLBACK_IMG_URL}
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <YStack flex={1} flexDirection="column" alignSelf="center">
              <H2 style={{ fontSize: 22 }}>{session?.user.user_metadata.name}</H2>
              <SizableText>{session?.user.user_metadata.email}</SizableText>
            </YStack>
          </Card.Header>
        </Card>
        <Button
          theme="active"
          backgroundColor={'black'}
          color="white"
          onPress={() => {
            supabase.auth.signOut().then(() => {
              router.replace('/');
            });
          }}>
          <Icon name="logout-box-line" color="white" size="15px" />
          <SizableText color="white">Sign Out</SizableText>
        </Button>
      </YStack>
    </>
  );
}
