import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlaskConical, Map, Cross, Flower, CloudSnow, Droplets, MapPin } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

const plantingCards = [
  {
    id: 'soil-health',
    title: 'Soil Health',
    subtitle: 'Test and analyze your soil',
    icon: FlaskConical,
    color: '#8D6E63',
    emoji: '🧪',
  },
  {
    id: 'geological',
    title: 'Geological Insights',
    subtitle: 'Understand your land better',
    icon: Map,
    color: '#5D4037',
    emoji: '🌍',
  },
  {
    id: 'fertility',
    title: 'Fertility Analysis',
    subtitle: 'Optimize soil nutrients',
    icon: Cross,
    color: '#689F38',
    emoji: '🌾',
  },
  {
    id: 'nutrients',
    title: 'Nutrient Guidance',
    subtitle: 'Perfect nutrient balance',
    icon: Flower,
    color: '#7B1FA2',
    emoji: '🥬',
  },
  {
    id: 'climate',
    title: 'Climate Planning',
    subtitle: 'Weather-based decisions',
    icon: CloudSnow,
    color: '#1976D2',
    emoji: '☔',
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    subtitle: 'Water management tips',
    icon: Droplets,
    color: '#0288D1',
    emoji: '💧',
  },
  {
    id: 'mapping',
    title: 'Soil Mapping',
    subtitle: 'Digital field mapping',
    icon: MapPin,
    color: '#F57C00',
    emoji: '🗺',
  },
];

export default function PlantingScreen() {
  const handleCardPress = (cardId: string) => {
    console.log('Card pressed:', cardId);
    // Navigate to specific feature or show details
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🌱 Planting Advice</Text>
          <Text style={styles.subtitle}>
            Get expert guidance for successful planting and soil management
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {plantingCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, { borderLeftColor: card.color }]}
              onPress={() => handleCardPress(card.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                  <Text style={styles.cardEmoji}>{card.emoji}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardAction}>Tap to explore →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              • Test soil pH before planting - ideal range is 6.0-7.5 for most crops
            </Text>
            <Text style={styles.tipText}>
              • Check weather forecast for next 7 days before sowing
            </Text>
            <Text style={styles.tipText}>
              • Ensure proper drainage to prevent waterlogging
            </Text>
            <Text style={styles.tipText}>
              • Use certified seeds from trusted sources
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <FloatingChatBubble />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cardAction: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  tipsContainer: {
    margin: 16,
    marginTop: 0,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
});