import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user } = useAuth();

  if (user && user.emailVerified) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}