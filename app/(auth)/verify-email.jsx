import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { sendEmailVerification, reload, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Colors from '../../constants/colors';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleCheckVerification = async () => {
    try {
      setLoading(true);
      // Reload the user to get latest verification status
      await reload(auth.currentUser);

      if (auth.currentUser.emailVerified) {
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Not verified', 'Your email has not been verified yet. Please check your inbox and click the link.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await sendEmailVerification(auth.currentUser);
      Alert.alert('Sent!', 'A new verification email has been sent to your inbox');
    } catch (error) {
      if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Too many requests. Please wait a few minutes before trying again');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    } finally {
      setResending(false);
    }
  };

  const handleBackToLogin = async () => {
    await signOut(auth);
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/shpe-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Ionicons name="mail-outline" size={70} color={Colors.primary} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          We sent a verification link to{' '}
          <Text style={styles.email}>{auth.currentUser?.email}</Text>
          {'. '}
          Please check your inbox and click the link to activate your account.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={handleCheckVerification}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textLight} />
          ) : (
            <Text style={styles.primaryButtonText}>I've verified my email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, resending && styles.buttonDisabled]}
          onPress={handleResend}
          disabled={resending}
        >
          {resending ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <Text style={styles.secondaryButtonText}>Resend verification email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.backText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  email: {
    color: Colors.primary,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  backText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});