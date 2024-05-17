import { forwardRef } from 'react';
import { ButtonProps, TouchableOpacity } from 'react-native';

import { Button as TButton, ButtonText } from '../tamagui.config';

export const PrimaryButton = forwardRef<TouchableOpacity, ButtonProps>(
  ({ onPress, title, ...props }, ref) => {
    return (
      <TButton backgroundColor="#333BFF" onPress={onPress} style={{ color: 'white' }} {...props}>
        <ButtonText>{title}</ButtonText>
      </TButton>
    );
  }
);
