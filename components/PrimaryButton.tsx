// Usage: <PrimaryButton label="Vote" onPress={() => {}} />
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../styles/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
  style,
}) => {
  const theme = useTheme();

  const { buttonStyle, textStyle } = getStyles(theme, variant, disabled);

  return (
    <Pressable
      style={[buttonStyle, style]}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      disabled={disabled}
    >
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
};

const getStyles = (theme: ReturnType<typeof useTheme>, variant: PrimaryButtonProps['variant'], disabled: boolean) => {
  const baseButton: ViewStyle = {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const variants: Record<NonNullable<PrimaryButtonProps['variant']>, ViewStyle> = {
    primary: {
      backgroundColor: disabled ? theme.colors.mutedGrey : theme.colors.electricIndigo,
      borderWidth: 0,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.neonCyan,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.neonCyan,
    },
  };

  const buttonStyle = StyleSheet.create({
    button: {
      ...baseButton,
      ...(variants[variant || 'primary'] || variants.primary),
      opacity: disabled ? 0.7 : 1,
    },
  }).button;

  const variantTextColors: Record<NonNullable<PrimaryButtonProps['variant']>, string> = {
    primary: theme.colors.pureWhite,
    ghost: theme.colors.electricIndigo,
    outline: theme.colors.pureWhite,
  };

  const textStyle = StyleSheet.create({
    text: {
      color: variantTextColors[variant || 'primary'] || theme.colors.pureWhite,
      fontSize: 16,
      fontWeight: '600',
    },
  }).text;

  return { buttonStyle, textStyle };
};

export default PrimaryButton;
