import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Colors from '../../constants/colors';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!email.endsWith('@rutgers.edu') && !email.endsWith('@scarletmail.rutgers.edu')) {
    Alert.alert('Error', 'Please use your Rutgers email address (@rutgers.edu or @scarletmail.rutgers.edu)');
    return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No account found with this email');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../assets/shpe-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {sent ? (
          // Success State
          <View style={styles.successContainer}>
            <Ionicons name="mail-outline" size={60} color={Colors.primary} />
            <Text style={styles.title}>Check your email</Text>
            <Text style={styles.subtitle}>
              We sent a password reset link to {email}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace('/(auth)/login')}
            >
              <Text style={styles.buttonText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Form State
          <View style={styles.card}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              Enter your Rutgers email and we'll send you a reset link
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Rutgers Email"
                placeholderTextColor={Colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleReset}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.textLight} />
              ) : (
                <Text style={styles.buttonText}>Send Reset Link</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => router.back()}
            >
              <Text style={styles.backToLoginText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backToLoginText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
});