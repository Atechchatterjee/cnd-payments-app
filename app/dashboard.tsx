import { router, Stack } from 'expo-router';
import { Text, XStack, Button, YStack, SizableText, Image, Card, H2, Spinner } from 'tamagui';
import Icon from 'react-native-remix-icon';
import React, { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { FALLBACK_IMG_URL } from '~/lib/defaults';
import { CreateProjectModal } from '~/components/CreateProjectModal';
import { ImageBackground } from 'react-native';
import { supabase } from '~/lib/supabase';
import { CreateProjectContext } from '~/context/CreateProjectContext';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const { session } = useContext(AuthContext);

  const {
    data: projects,
    refetch: refetchProjects,
    isLoading,
  } = useQuery({
    initialData: null,
    queryKey: [],
    queryFn: async function fetchProjects() {
      console.log('fetching project data...');
      const { data, error } = await supabase.from('project').select();
      if (error) {
        console.error(error);
      } else {
        return data;
      }
    },
  });

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
      <YStack backgroundColor="white" h="100%" w="100%" flex={1} gap={'$4'}>
        <ImageBackground
          source={require('../assets/card-bg.jpg')}
          resizeMode="cover"
          resizeMethod="resize"
          borderRadius={10}
          style={{
            width: 'auto',
            minWidth: '95%',
            maxWidth: '95%',
            height: 'auto',
            minHeight: 280,
            maxHeight: 280,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <YStack w="100%" h="100%">
            <YStack
              w="97%"
              m="auto"
              marginTop="$2"
              backgroundColor={'white'}
              borderRadius={10}
              height="$4"
              flexDirection="row"
              padding="$2.5">
              <H2 style={{ fontSize: 20 }} alignSelf="center">
                Cummulative Balance
              </H2>
              <Icon name="arrow-right-line" marginLeft="auto" />
            </YStack>
            <YStack w="94%" m="auto" marginTop="0">
              <SizableText color="#BEC1FF" style={{ fontSize: 13 }}>
                Total balance
              </SizableText>
              <Text color="white" fontSize="$10" fontWeight="500">
                ₹1005000
              </Text>
              <XStack gap="$1">
                <Icon name="arrow-left-up-line" color="#7FF081" size={20} />
                <Text color="#7FF081" fontSize="$4" fontWeight="500">
                  positive balance
                </Text>
              </XStack>
              <XStack marginTop="$9" gap="$5">
                <XStack gap="$2" alignItems="center">
                  <SizableText color="#BEC1FF" style={{ fontSize: 13 }}>
                    Total Debit:
                  </SizableText>
                  <Text color="white">₹30400</Text>
                </XStack>
                <XStack gap="$2" alignItems="center">
                  <SizableText color="#BEC1FF" style={{ fontSize: 13 }}>
                    Total Credit:
                  </SizableText>
                  <Text color="white">₹90400</Text>
                </XStack>
              </XStack>
            </YStack>
          </YStack>
        </ImageBackground>
        <XStack flexDirection="row" w="93%" m="auto" h="$2" marginTop="$2" gap="$3">
          <Image
            source={require('../assets/hourglass-fill.png')}
            width={20}
            height={20}
            alignSelf="center"
          />
          <H2 style={{ fontSize: 20 }} alignSelf="center">
            Your Projects
          </H2>
        </XStack>
        <YStack flex={1} flexDirection="column" w="93%" m="auto" marginTop="0" gap={'$3'}>
          {!isLoading ? (
            projects?.map((project, i) => (
              <Card
                padding="$4"
                paddingTop="$3"
                key={i}
                bordered
                backgroundColor="white"
                onPress={() => {
                  router.replace(`/project/${project.id}`);
                }}>
                <H2 style={{ fontSize: 20 }}>{project.name}</H2>
                <Text>{project.description}</Text>
              </Card>
            ))
          ) : (
            <Spinner color="#333BFF" size="large" />
          )}
        </YStack>

        <CreateProjectContext.Provider value={{ refetchProjects }}>
          <CreateProjectModal />
        </CreateProjectContext.Provider>
      </YStack>
    </>
  );
}
