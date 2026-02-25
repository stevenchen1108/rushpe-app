import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '../../constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../../assets/shpe-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Society of Hispanic Engineers</Text>
        <Text style={styles.subtitle}>Welcome!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  signInButton: {
    backgroundColor: Colors.textLight,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    borderWidth: 2,
    borderColor: Colors.textLight,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
});