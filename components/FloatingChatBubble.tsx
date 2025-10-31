import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MessageCircle, X } from 'lucide-react-native';
import { router } from 'expo-router';

interface FloatingChatBubbleProps {
  visible?: boolean;
}

export function FloatingChatBubble({ visible = true }: FloatingChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visible) return null;

  const handlePress = () => {
    router.push('/chat');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bubble}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <MessageCircle size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  bubble: {
    backgroundColor: '#2E7D32',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});