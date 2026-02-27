import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';

export default function HomeScreen() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;

  const { user, logout } = auth;

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RU SHPE!</Text>
      <Text style={styles.subtitle}>Logged in as {user?.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
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
});