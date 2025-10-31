import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Bug, Droplets, Leaf, Camera, Calendar } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

const managementCards = [
  {
    id: 'suitability',
    title: 'Crop Suitability',
    subtitle: 'Find best crops for your soil',
    icon: CheckCircle,
    color: '#4CAF50',
    emoji: '✅',
  },
  {
    id: 'pest',
    title: 'Pest Management',
    subtitle: 'Protect from pests & diseases',
    icon: Bug,
    color: '#FF5722',
    emoji: '🐛',
  },
  {
    id: 'irrigation',
    title: 'Irrigation Planner',
    subtitle: 'Optimize water usage',
    icon: Droplets,
    color: '#2196F3',
    emoji: '💧',
  },
  {
    id: 'nutrients',
    title: 'Nutrient Management',
    subtitle: 'Fertilizer recommendations',
    icon: Leaf,
    color: '#8BC34A',
    emoji: '🍃',
  },
  {
    id: 'monitoring',
    title: 'Photo Monitoring',
    subtitle: 'Track crop health visually',
    icon: Camera,
    color: '#9C27B0',
    emoji: '📷',
  },
  {
    id: 'calendar',
    title: 'Seasonal Calendar',
    subtitle: 'Plan your farming activities',
    icon: Calendar,
    color: '#FF9800',
    emoji: '📅',
  },
];

export default function CropManagementScreen() {
  const handleCardPress = (cardId: string) => {
    console.log('Card pressed:', cardId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🌾 Crop Management</Text>
          <Text style={styles.subtitle}>
            Comprehensive tools to manage your crops throughout the growing season
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Active Crops</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Days to Harvest</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Health Score</Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {managementCards.map((card) => (
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
                <Text style={styles.cardAction}>Manage →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.alertsContainer}>
          <Text style={styles.alertsTitle}>⚠️ Today's Alerts</Text>
          <View style={styles.alertCard}>
            <Text style={styles.alertText}>• Water your tomato plants - soil moisture is low</Text>
            <Text style={styles.alertText}>• Check wheat crop for aphid infestation</Text>
            <Text style={styles.alertText}>• Apply fertilizer to corn field (Zone A)</Text>
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
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 16,
    paddingTop: 0,
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
  alertsContainer: {
    margin: 16,
    marginTop: 0,
  },
  alertsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  alertText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
});