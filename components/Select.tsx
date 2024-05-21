import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import type { SelectProps } from 'tamagui';
import { Adapt, Select, Sheet, SizableText } from 'tamagui';

interface SelectDemoProps extends SelectProps {
  label?: string;
  defaultValue?: string;
  items: {
    name: string;
    value: string;
  }[];
  showValue?: boolean;
  floatingLabel?: string;
  val: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  onSelect?: (_: string) => void;
}

export function SelectDemo({
  onSelect,
  items,
  val,
  setVal,
  showValue,
  floatingLabel,
  ...props
}: SelectDemoProps) {
  useEffect(() => {
    if (val !== 'default' && onSelect) onSelect(val);
  }, [val]);

  return (
    <Select
      value={val}
      defaultValue={'default'}
      onValueChange={setVal}
      disablePreventBodyScroll
      onOpenChange={() => Keyboard.dismiss()}
      {...props}>
      <Select.Trigger width={220} style={{ width: '100%' }}>
        <Select.Value placeholder="To Customer" />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"></Select.ScrollUpButton>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>{floatingLabel ?? 'Select'}</Select.Label>
            {items &&
              items.length > 0 &&
              items.map((item, i) => (
                <Select.Item
                  index={i}
                  key={i}
                  value={item.value}
                  display={item.value === 'default' ? 'none' : 'block'}>
                  <Select.ItemText id={item.value}>{item.name}</Select.ItemText>
                  {showValue && <SizableText>{item.value}</SizableText>}
                </Select.Item>
              ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"></Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
