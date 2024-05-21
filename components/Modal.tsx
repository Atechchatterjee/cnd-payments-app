import { useContext, useState } from 'react';
import { AlertDialog, AlertDialogProps, Button, Input, Label, SizableText, XStack, YStack } from 'tamagui';
import { z } from "zod";
import { AuthContext } from '~/context/AuthContext';
import { supabase } from '~/lib/supabase';

export default function PromptPhoneNumber({ ...props }: AlertDialogProps) {
  const [phNumber, setPhNumber] = useState<string>("");
  const [validPhNumber, setValidPhNumber] = useState<boolean>(true);
  const { session } = useContext(AuthContext);

  function validatePhNumber() {
    const phoneNumberValidationSchema = z.string().min(10).max(10).refine(v => { let n = Number(v); return !isNaN(n) && v?.length > 0 }, { message: "Invalid number" });
    return phoneNumberValidationSchema.parse(phNumber);
  }

  return (
    <AlertDialog {...props}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          w="90%"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title style={{ fontSize: 25 }}>Phone Number</AlertDialog.Title>
            <AlertDialog.Description>
              Please enter your phone number
            </AlertDialog.Description>
            <YStack space="$2" spaceDirection="vertical">
              <Input placeholder="Phone number" keyboardType="numeric" focusStyle={{ borderColor: !validPhNumber ? "red" : "$gray7" }} onChangeText={(value) => setPhNumber(value)} />
              {!validPhNumber && <Label color="red">incorrect number</Label>}
            </YStack>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button
                  theme="active"
                  backgroundColor="#333BFF"
                  onPress={
                    async () => {
                      try {
                        validatePhNumber();
                        setValidPhNumber(true);
                        console.log("sending request to update");
                        if (session && session.user) {
                          const { data: authData, error: authError } = await supabase.auth.updateUser({ data: { phone: phNumber } });
                          console.log("auth data = ", authData);
                          if (!authError) {
                            const { data: customerData, error: customerError } = await supabase.from('customer').update({ phone: phNumber }).eq('user_id', session.user.id)
                            console.log("updated data = ", customerData);
                            if (!customerError) {
                              console.log("user updated");
                            } else {
                              console.error(customerError);
                            }
                          } else {
                            console.error(authError);
                          }
                        }
                      } catch (err) {
                        console.log(err);
                        setValidPhNumber(false);
                      }
                    }}
                >
                  <SizableText color="white">Add</SizableText>
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog >
  )
}
