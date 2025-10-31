import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Globe, Smartphone, Mic, Camera, MapPin, FolderOpen } from 'lucide-react-native';
import { useAppContext } from '@/providers/AppProvider';
import * as Location from 'expo-location';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
];

export default function OnboardingScreen() {
  const { setLanguage, setUser } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [step, setStep] = useState(0);
  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
    microphone: false,
    storage: false,
  });

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLanguage(langCode);
  };

  const requestPermissions = async () => {
    try {
      // Request location permission
      const locationResult = await Location.requestForegroundPermissionsAsync();
      
      setPermissions(prev => ({
        ...prev,
        location: locationResult.status === 'granted',
        camera: true, // Expo handles camera permissions automatically
        microphone: true, // Expo handles microphone permissions automatically
        storage: true, // Expo handles storage permissions automatically
      }));

      setStep(2);
    } catch (error) {
      console.error('Permission request failed:', error);
      Alert.alert('Permission Error', 'Some permissions could not be granted. You can enable them later in settings.');
      setStep(2);
    }
  };

  const handlePhoneLogin = () => {
    // Mock login for demo - in real app, implement Firebase Auth
    const mockUser = {
      uid: 'demo-user-123',
      phone: '+91 98765 43210',
      name: 'Demo Farmer',
      language: selectedLanguage,
    };
    
    setUser(mockUser);
    router.replace('/chat');
  };

  const renderLanguageSelection = () => (
    <View style={styles.stepContainer}>
      <Globe size={64} color="white" style={styles.stepIcon} />
      <Text style={styles.stepTitle}>Choose Your Language</Text>
      <Text style={styles.stepSubtitle}>भाषा चुनें / भाषा निवडा</Text>
      
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLanguage === lang.code && styles.languageButtonSelected
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <Text style={[
              styles.languageText,
              selectedLanguage === lang.code && styles.languageTextSelected
            ]}>
              {lang.native}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => setStep(1)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPermissions = () => (
    <View style={styles.stepContainer}>
      <Smartphone size={64} color="white" style={styles.stepIcon} />
      <Text style={styles.stepTitle}>App Permissions</Text>
      <Text style={styles.stepSubtitle}>We need these permissions to serve you better</Text>
      
      <View style={styles.permissionsList}>
        <View style={styles.permissionItem}>
          <MapPin size={24} color="white" />
          <View style={styles.permissionText}>
            <Text style={styles.permissionTitle}>Location</Text>
            <Text style={styles.permissionDesc}>For weather and local mandi prices</Text>
          </View>
        </View>
        
        <View style={styles.permissionItem}>
          <Camera size={24} color="white" />
          <View style={styles.permissionText}>
            <Text style={styles.permissionTitle}>Camera</Text>
            <Text style={styles.permissionDesc}>For disease detection and crop monitoring</Text>
          </View>
        </View>
        
        <View style={styles.permissionItem}>
          <Mic size={24} color="white" />
          <View style={styles.permissionText}>
            <Text style={styles.permissionTitle}>Microphone</Text>
            <Text style={styles.permissionDesc}>For voice commands and queries</Text>
          </View>
        </View>
        
        <View style={styles.permissionItem}>
          <FolderOpen size={24} color="white" />
          <View style={styles.permissionText}>
            <Text style={styles.permissionTitle}>Storage</Text>
            <Text style={styles.permissionDesc}>To save your farming data offline</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.continueButton}
        onPress={requestPermissions}
      >
        <Text style={styles.continueButtonText}>Grant Permissions</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPhoneLogin = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.logo}>🌾</Text>
      <Text style={styles.stepTitle}>Welcome to Kisan Saathi</Text>
      <Text style={styles.stepSubtitle}>Your AI-powered farming companion</Text>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Get personalized farming advice, disease detection, mandi prices, and connect with the farming community.
        </Text>
        
        <TouchableOpacity
          style={styles.phoneButton}
          onPress={handlePhoneLogin}
        >
          <Smartphone size={24} color="white" style={styles.phoneIcon} />
          <Text style={styles.phoneButtonText}>Continue with Phone</Text>
        </TouchableOpacity>
        
        <Text style={styles.demoText}>
          Demo Mode - No actual phone verification required
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#2E7D32', '#4CAF50', '#8BC34A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        {step === 0 && renderLanguageSelection()}
        {step === 1 && renderPermissions()}
        {step === 2 && renderPhoneLogin()}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIcon: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
  },
  languageContainer: {
    width: '100%',
    marginBottom: 40,
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'white',
  },
  languageText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  languageTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
  },
  continueButtonText: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  permissionsList: {
    width: '100%',
    marginBottom: 40,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  permissionText: {
    marginLeft: 16,
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  permissionDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  phoneButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 16,
  },
  phoneIcon: {
    marginRight: 12,
  },
  phoneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});