import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import Colors from '../../constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validate fields aren't empty
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate Rutgers email
    if (!email.endsWith('@rutgers.edu') && !email.endsWith('@scarletmail.rutgers.edu')) {
      Alert.alert('Error', 'Please use your Rutgers email address (@rutgers.edu or @scarletmail.rutgers.edu)');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        router.replace('/(auth)/verify-email');
      } else {
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Error', 'Incorrect email or password');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Too many failed attempts. Please try again later');
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
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Logo */}
        <Image
          source={require('../../assets/shpe-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Header */}
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Card */}
        <View style={styles.card}>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signInButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textLight} />
            ) : (
              <Text style={styles.signInText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleButton}>
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text style={styles.googleText}>Continue with Google</Text>
          </TouchableOpacity>

        </View>

        {/* Sign Up Link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupPrompt}>Don't have an account?  </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
  forgotText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  signInButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signInText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.inputBorder,
  },
  dividerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: Colors.card,
  },
  googleText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  signupPrompt: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
});