import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';

export default function HomeScreen() {
  const auth = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!auth) return null;

  const { user, logout } = auth;

  const getGreeting = () => {
    // Compute greeting using US Eastern time.
    // Expo/Hermes generally supports Intl; if it doesn't, fall back to device time.
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'America/New_York',
      }).formatToParts(new Date());

      const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '12');

      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    } catch {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    }
  };

  const getFirstName = () => {
    const candidate =
      user?.firstName ||
      user?.given_name ||
      user?.displayName ||
      user?.name ||
      (typeof user?.email === 'string' ? user.email.split('@')[0] : '');

    const first = String(candidate || '').trim().split(/\s+/)[0];
    return first ? first.charAt(0).toUpperCase() + first.slice(1) : '';
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  // iPhone 15 / 15 Pro / Plus / Pro Max are typically >= 852pt tall in portrait
  const { width, height } = Dimensions.get('window');
  const maxDim = Math.max(width, height);
  const isIphone15Plus = Platform.OS === 'ios' && maxDim >= 852;

  const greeting = getGreeting();
  const firstName = getFirstName();
  const greetingText = firstName ? `${greeting}, ${firstName}` : greeting;

  return (
    <View style={styles.container}>
      {/* Top greeting (slightly lower on iPhone 15+ so it feels better spaced) */}
      <View style={[styles.header, { paddingTop: insets.top + 0 }]}>
        <Text style={styles.greeting}>{greetingText}</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.subtitle}>Logged in as {user?.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom tabs (Home stays, add Points/Profile beside it) */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, styles.tabButtonActive]}
          onPress={() => router.push('/(tabs)/home')}
          accessibilityRole="button"
          accessibilityLabel="Home"
        >
          <Ionicons name="home" size={20} color={Colors.textPrimary} />
          <Text style={[styles.tabText, styles.tabTextActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push('/(tabs)/points')}
          accessibilityRole="button"
          accessibilityLabel="Points"
        >
          <Ionicons name="star" size={20} color={Colors.textSecondary} />
          <Text style={styles.tabText}>Points</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push('/(tabs)/profile')}
          accessibilityRole="button"
          accessibilityLabel="Profile"
        >
          <Ionicons name="person" size={20} color={Colors.textSecondary} />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 18,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerIphone15: {
    paddingTop: 22, // nudges greeting lower on iPhone 15+
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  logoutText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border ?? 'rgba(0,0,0,0.12)',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: Colors.background,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  tabButtonActive: {
    backgroundColor: Colors.card ?? 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
});