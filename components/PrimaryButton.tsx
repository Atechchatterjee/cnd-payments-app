// import { Children, forwardRef } from 'react';
// import { ButtonProps, TouchableOpacity } from 'react-native';

// import { Button as TButton, ButtonText } from '../tamagui.config';

// export const Button = ({children, ...props}) => {
//   return (
//     <Button {...props}>
//       {children}
//     </Button>
//   );
// };

// @ts-nocheck
import { getSize, getSpace } from '@tamagui/get-token';

import {
  GetProps,
  SizeTokens,
  View,
  Text,
  createStyledContext,
  styled,
  useTheme,
  withStaticProperties,
} from '@tamagui/web';

import { cloneElement, useContext } from 'react';
export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
});

export const ButtonFrame = styled(View, {
  name: 'Button',

  context: ButtonContext,

  backgroundColor: '#333BFF',

  alignItems: 'center',

  flexDirection: 'row',
  hoverStyle: {
    backgroundColor: '#333BFF',
  },
  pressStyle: {
    backgroundColor: '#333BFF',
  },
  variants: {
    size: {
      '...size': (name, { tokens }) => {
        return {
          height: tokens.size[name],

          borderRadius: tokens.radius[name],

          // note the getSpace and getSize helpers will let you shift down/up token sizes

          // whereas with gap we just multiply by 0.2

          // this is a stylistic choice, and depends on your design system values

          gap: tokens.space[name].val * 0.2,

          paddingHorizontal: getSpace(name, {
            shift: -1,
          }),
        };
      },
    },
  } as const,
  defaultVariants: {
    size: '$md',
  },
});
type ButtonProps = GetProps<typeof ButtonFrame>;
export const ButtonText = styled(Text, {
  name: 'ButtonText',

  context: ButtonContext,

  style: {
    color: '#ffffff',
  },

  userSelect: 'none',
  variants: {
    size: {
      '...fontSize': (name, { font }) => ({
        fontSize: font?.size[name],
      }),
    },
  } as const,
});
const ButtonIcon = (props: { children: any }) => {
  const { size } = useContext(ButtonContext.context);

  const smaller = getSize(size, {
    shift: -2,
  });

  const theme = useTheme();

  return cloneElement(props.children, {
    size: smaller.val * 0.5,

    color: theme.color.get(),
  });
};

export const PrimaryButton = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
  Icon: ButtonIcon,
});
