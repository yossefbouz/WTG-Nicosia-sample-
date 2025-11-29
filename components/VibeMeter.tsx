import React, { useMemo } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../styles/theme';

type VibeValue = 'chill' | 'busy' | 'packed' | 'live-dj';
type VibeSize = 'small' | 'large';

interface VibeMeterProps {
  value: VibeValue;
  size?: VibeSize;
}

const vibes: VibeValue[] = ['chill', 'busy', 'packed', 'live-dj'];

const VibeMeter: React.FC<VibeMeterProps> = ({ value, size = 'large' }) => {
  const theme = useTheme();
  const fontSize = size === 'small' ? theme.typeScale.small : theme.typeScale.body;
  const paddingHorizontal = size === 'small' ? theme.space[1] : theme.space[2];
  const paddingVertical = size === 'small' ? theme.space[0] : theme.space[1];

  const chips = useMemo(() => {
    return vibes.map((vibe, index) => {
      const isActive = vibe === value;
      const emphasize = isActive && (vibe === 'packed' || vibe === 'live-dj');

      const animatedStyle = {
        transform: [{ scale: emphasize ? 1.05 : 1 }],
        opacity: emphasize ? 0.95 : 1,
      };

      return (
        <Animated.View
          key={vibe}
          style={[
            styles.chip,
            {
              backgroundColor: isActive ? theme.colors.neonIndigo : theme.colors.cardDarkGrey,
              borderColor: isActive ? theme.colors.electricIndigo : theme.colors.cardDarkGrey,
              paddingHorizontal,
              paddingVertical,
              marginRight: index !== vibes.length - 1 ? theme.space[1] : 0,
            },
            animatedStyle,
          ]}
        >
          <Text
            style={{
              color: isActive ? theme.colors.pureWhite : theme.colors.mutedGrey,
              fontSize,
              fontWeight: isActive ? '700' : '500',
            }}
          >
            {formatVibeLabel(vibe)}
          </Text>
        </Animated.View>
      );
    });
  }, [value, fontSize, paddingHorizontal, paddingVertical, theme]);

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Vibe: ${formatVibeLabel(value)}`}
    >
      {chips}
    </View>
  );
};

const formatVibeLabel = (vibe: VibeValue) => {
  switch (vibe) {
    case 'live-dj':
      return 'Live DJ';
    case 'packed':
      return 'Packed';
    case 'busy':
      return 'Busy';
    default:
      return 'Chill';
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
  },
});

export default VibeMeter;
