import { Sheet } from '@tamagui/sheet';
import React, { useState, useContext } from 'react';
import { Button, Input, Label, SizableText, TextArea, YStack } from 'tamagui';
import Icon from 'react-native-remix-icon';
import { supabase } from '~/lib/supabase';
import { CreateProjectContext } from '~/context/CreateProjectContext';

export function CreateProjectModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const { refetchProjects } = useContext(CreateProjectContext);

  return (
    <>
      <Button
        theme="active"
        backgroundColor="#333BFF"
        position="absolute"
        right="$3"
        bottom="$4"
        onPress={() => setOpen(true)}>
        <Icon name="add-line" color="white" />
        <SizableText color="white">New Project</SizableText>
      </Button>
      <Sheet
        open={open}
        dismissOnSnapToBottom
        onOpenChange={setOpen}
        snapPoints={[60]}
        moveOnKeyboardChange={false}>
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" paddingHorizontal="$5">
          <YStack flex={1} flexDirection="column" gap={'$4'} marginTop="$2">
            <YStack flexDirection="column" gap={'$1'}>
              <Label htmlFor="name" style={{ fontSize: 12 }}>
                Project Name <SizableText color="red">*</SizableText>
              </Label>
              <Input placeholder="Project Name" onChangeText={(text) => setProjectName(text)} />
            </YStack>
            <YStack flexDirection="column" gap={'$1'}>
              <Label htmlFor="name" style={{ fontSize: 12 }}>
                Project Description
              </Label>
              <TextArea
                placeholder="Add a description"
                onChangeText={(text) => setProjectDescription(text)}
              />
            </YStack>
            <Button
              theme="active"
              backgroundColor="#333BFF"
              onPress={() => {
                if (projectName.length > 0) {
                  supabase
                    .from('project')
                    .insert({ name: projectName, description: projectDescription })
                    .then(() => {
                      if (refetchProjects) refetchProjects();
                      setOpen(false);
                    });
                } else {
                  alert('Project title is require');
                }
              }}>
              <SizableText color="white">Add</SizableText>
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
