import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '@/providers/AppProvider';

export default function SplashScreen() {
  const { user, isLoading } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && !isLoading) {
      if (user) {
        router.replace('/chat');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [showSplash, isLoading, user]);

  if (showSplash) {
    return (
      <LinearGradient
        colors={['#2E7D32', '#4CAF50', '#8BC34A']}
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🌾</Text>
            <Text style={styles.title}>Kisan Saathi</Text>
            <Text style={styles.subtitle}>Your Farming Companion</Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Empowering Farmers with AI</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
});