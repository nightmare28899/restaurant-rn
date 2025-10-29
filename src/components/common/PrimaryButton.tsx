import React from 'react';
import { Button } from 'react-native-paper';
import type { ButtonProps } from 'react-native-paper';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  mode?: ButtonProps['mode'];
  loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
                                                       title,
                                                       onPress,
                                                       loading = false,
                                                       mode = 'contained',
                                                     }) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      style={{ marginVertical: 10 }}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
