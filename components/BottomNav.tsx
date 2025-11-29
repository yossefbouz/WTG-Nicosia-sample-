import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../styles/theme';

type TabKey = 'home' | 'map' | 'events' | 'saved' | 'profile';

interface BottomNavProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'map', label: 'Map' },
  { key: 'events', label: 'Events' },
  { key: 'saved', label: 'Saved' },
  { key: 'profile', label: 'Profile' },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabPress }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.cardDarkGrey,
          borderTopColor: theme.colors.violetIndigo,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={`${tab.label} tab`}
            onPress={() => onTabPress(tab.key)}
            style={({ pressed }) => [
              styles.tab,
              { minHeight: 44 },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text
              style={{
                color: isActive ? theme.colors.neonCyan : theme.colors.mutedGrey,
                fontWeight: isActive ? '700' : '600',
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomNav;
