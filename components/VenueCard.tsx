import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../styles/theme';

interface VenueCardProps {
  id: string;
  name: string;
  imageUri: string;
  location: string;
  vibeLabel: string;
  yesVotes: number;
  openStatus: 'open' | 'closed';
  openTime: string;
  closeTime: string;
  onVote: (id: string) => void;
  onPress: (id: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  imageUri,
  location,
  vibeLabel,
  yesVotes,
  openStatus,
  openTime,
  closeTime,
  onVote,
  onPress,
}) => {
  const theme = useTheme();
  const statusColor = openStatus === 'open' ? theme.colors.successGreen : theme.colors.mutedGrey;

  const handlePress = () => onPress(id);
  const handleVote = () => onVote(id);

  return (
    <Pressable
      style={[styles.card, { borderColor: theme.colors.cardDarkGrey, shadowColor: theme.colors.royalIndigo }]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${name} card`}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
        accessible
        accessibilityLabel={`Image of ${name}`}
      />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={[styles.name, { color: theme.colors.backgroundBlack }]}>{name}</Text>
            <Text style={[styles.location, { color: theme.colors.mutedGrey }]}>{location}</Text>
          </View>
          <View style={styles.voteContainer}>
            <Pressable
              onPress={handleVote}
              accessibilityRole="button"
              accessibilityLabel={`Vote yes for ${name}`}
              style={({ pressed }) => [
                styles.voteButton,
                {
                  borderColor: theme.colors.neonCyan,
                  backgroundColor: pressed ? theme.colors.neonIndigo : 'transparent',
                },
              ]}
            >
              <Text style={[styles.voteText, { color: theme.colors.electricIndigo }]}>Vote Yes</Text>
            </Pressable>
          </View>
        </View>
        <Text style={[styles.votes, { color: theme.colors.alertRed }]}>{`${yesVotes} people voted yes`}</Text>
        <View style={styles.statusRow}>
          <Text style={[styles.status, { color: statusColor }]}> {openStatus === 'open' ? 'open' : 'closed'} </Text>
          <Text style={[styles.times, { color: theme.colors.backgroundBlack }]}>{`${openTime} - ${closeTime}`}</Text>
        </View>
        <Text style={[styles.vibe, { color: theme.colors.backgroundBlack }]}>Vibe: {vibeLabel}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleBlock: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
  },
  location: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '500',
  },
  voteContainer: {
    alignItems: 'flex-end',
  },
  voteButton: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  voteText: {
    fontSize: 14,
    fontWeight: '700',
  },
  votes: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  times: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  vibe: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default VenueCard;
