// Home screen rendered from app/index.tsx as the initial route
import React, { useMemo } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VenueCard from '../components/VenueCard';
import BottomNav from '../components/BottomNav';
import { useTheme } from '../styles/theme';

interface Venue {
  id: string;
  name: string;
  imageUri: string;
  location: string;
  vibeLabel: string;
  yesVotes: number;
  openStatus: 'open' | 'closed';
  openTime: string;
  closeTime: string;
}

const Home: React.FC = () => {
  const theme = useTheme();
  const venues: Venue[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Reckless Bar',
        imageUri: 'https://picsum.photos/400/250?1',
        location: 'Nicosia City Center',
        vibeLabel: 'Packed dance floor',
        yesVotes: 49,
        openStatus: 'open',
        openTime: '4:30pm',
        closeTime: '2:00am',
      },
      {
        id: '2',
        name: 'Neon Lounge',
        imageUri: 'https://picsum.photos/400/250?2',
        location: 'Old Town',
        vibeLabel: 'Chill rooftop',
        yesVotes: 36,
        openStatus: 'open',
        openTime: '5:00pm',
        closeTime: '1:00am',
      },
      {
        id: '3',
        name: 'Midnight Club',
        imageUri: 'https://picsum.photos/400/250?3',
        location: 'University District',
        vibeLabel: 'Live DJ tonight',
        yesVotes: 52,
        openStatus: 'closed',
        openTime: '9:00pm',
        closeTime: '3:30am',
      },
    ],
    [],
  );

  const logo = require('../app/assets/images/WTGlogo.png');

  const handleVote = (id: string) => {
    console.log('Vote yes for', id);
  };

  const handleCardPress = (id: string) => {
    console.log('Card pressed', id);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.backgroundBlack }]}> 
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          accessible
          accessibilityLabel="List of popular venues in Nicosia"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.title, { color: theme.colors.backgroundBlack }]}>WHERE TO GO</Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedGrey }]}>Live votes from students near you</Text>
          </View>

          <View style={[styles.venueList, { backgroundColor: theme.colors.pureWhite }]}> 
            {venues.map((venue) => (
              <VenueCard
                key={venue.id}
                id={venue.id}
                name={venue.name}
                imageUri={venue.imageUri}
                location={venue.location}
                vibeLabel={venue.vibeLabel}
                yesVotes={venue.yesVotes}
                openStatus={venue.openStatus}
                openTime={venue.openTime}
                closeTime={venue.closeTime}
                onVote={handleVote}
                onPress={handleCardPress}
              />
            ))}
          </View>
        </ScrollView>
        <BottomNav activeTab="home" onTabPress={(tab) => console.log('tab pressed', tab)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 160,
    height: 80,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
  },
  venueList: {
    borderRadius: 16,
    padding: 16,
  },
});

export default Home;
