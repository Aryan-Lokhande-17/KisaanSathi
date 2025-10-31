import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Send, Mic, MicOff, Globe, User, Sprout, Wheat, Bug, DollarSign, ShoppingCart, Users } from 'lucide-react-native';
import { useAppContext } from '@/providers/AppProvider';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'action';
}

const quickActions = [
  { id: 'planting', title: 'Planting Advice', icon: Sprout, route: '/planting', emoji: '🌱' },
  { id: 'crop', title: 'Crop Management', icon: Wheat, route: '/crop-management', emoji: '🌾' },
  { id: 'disease', title: 'Disease Detection', icon: Bug, route: '/disease-detection', emoji: '🦠' },
  { id: 'mandi', title: 'Mandi Prices', icon: DollarSign, route: '/mandi-prices', emoji: '💰' },
  { id: 'marketplace', title: 'Marketplace', icon: ShoppingCart, route: '/marketplace', emoji: '🛒' },
  { id: 'community', title: 'Community', icon: Users, route: '/community', emoji: '👥' },
];

export default function ChatScreen() {
  const { user, language } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'hi' ? 'नमस्कार! मैं किसान साथी हूं 🌾 आपकी खेती में कैसे मदद कर सकता हूं?' : 
           language === 'mr' ? 'नमस्कार! मी किसान साथी आहे 🌾 तुमच्या शेतीत कशी मदत करू शकतो?' :
           'Namaskar! I\'m Kisan Saathi 🌾 How can I help you with your farming today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('weather') || lowerInput.includes('मौसम') || lowerInput.includes('हवामान')) {
      return language === 'hi' ? 'आज का मौसम अच्छा है। तापमान 28°C है और हल्की बारिश की संभावना है। खेत में पानी की जांच करें।' :
             language === 'mr' ? 'आजचे हवामान चांगले आहे. तापमान २८°C आहे आणि हलका पाऊस पडण्याची शक्यता आहे. शेतात पाण्याची तपासणी करा.' :
             'Today\'s weather is good. Temperature is 28°C with light rain expected. Check water levels in your fields.';
    }
    
    if (lowerInput.includes('price') || lowerInput.includes('मंडी') || lowerInput.includes('किंमत')) {
      return language === 'hi' ? 'आज के मंडी भाव: गेहूं ₹2,100/क्विंटल, धान ₹1,850/क्विंटल। पूरी जानकारी के लिए मंडी प्राइस सेक्शन देखें।' :
             language === 'mr' ? 'आजचे मंडी भाव: गहू ₹२,१००/क्विंटल, तांदूळ ₹१,८५०/क्विंटल. संपूर्ण माहितीसाठी मंडी प्राइस विभाग पहा.' :
             'Today\'s mandi rates: Wheat ₹2,100/quintal, Rice ₹1,850/quintal. Check mandi prices section for complete details.';
    }
    
    return language === 'hi' ? 'मैं आपकी मदद करने के लिए यहां हूं। कृपया अपना सवाल पूछें या ऊपर दिए गए विकल्पों में से चुनें।' :
           language === 'mr' ? 'मी तुमची मदत करण्यासाठी येथे आहे. कृपया तुमचा प्रश्न विचारा किंवा वरील पर्यायांमधून निवडा.' :
           'I\'m here to help you. Please ask your question or choose from the options above.';
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real app, implement speech-to-text here
  };

  const handleQuickAction = (route: string) => {
    router.push(route as any);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
      <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.aiMessageText]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>
        {language === 'hi' ? 'त्वरित सेवाएं' : language === 'mr' ? 'त्वरित सेवा' : 'Quick Services'}
      </Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionCard}
            onPress={() => handleQuickAction(action.route)}
          >
            <Text style={styles.quickActionEmoji}>{action.emoji}</Text>
            <Text style={styles.quickActionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Kisan Saathi</Text>
          <Text style={styles.headerSubtitle}>🌾 AI Assistant</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Globe size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/profile')}
          >
            <User size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          ListHeaderComponent={renderQuickActions}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={
              language === 'hi' ? 'अपना सवाल टाइप करें...' :
              language === 'mr' ? 'तुमचा प्रश्न टाइप करा...' :
              'Type your question...'
            }
            placeholderTextColor="#999"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.micButtonActive]}
            onPress={toggleRecording}
          >
            {isRecording ? <MicOff size={24} color="white" /> : <Mic size={24} color="white" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  quickActionsContainer: {
    marginVertical: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    textAlign: 'center',
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E7D32',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
  },
  micButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 24,
    padding: 12,
    marginRight: 8,
  },
  micButtonActive: {
    backgroundColor: '#FF4444',
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    padding: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});