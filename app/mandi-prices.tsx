import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, BarChart3, Calculator, Bell, Filter } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

interface PriceData {
  id: string;
  crop: string;
  mandi: string;
  price: number;
  unit: string;
  change: number;
  timestamp: string;
}

const mockPrices: PriceData[] = [
  { id: '1', crop: 'Wheat', mandi: 'Delhi', price: 2100, unit: 'quintal', change: 5.2, timestamp: '2 hours ago' },
  { id: '2', crop: 'Rice', mandi: 'Punjab', price: 1850, unit: 'quintal', change: -2.1, timestamp: '3 hours ago' },
  { id: '3', crop: 'Cotton', mandi: 'Gujarat', price: 5200, unit: 'quintal', change: 8.5, timestamp: '1 hour ago' },
  { id: '4', crop: 'Sugarcane', mandi: 'UP', price: 350, unit: 'quintal', change: 1.2, timestamp: '4 hours ago' },
  { id: '5', crop: 'Soybean', mandi: 'MP', price: 4100, unit: 'quintal', change: -1.8, timestamp: '2 hours ago' },
  { id: '6', crop: 'Maize', mandi: 'Bihar', price: 1750, unit: 'quintal', change: 3.4, timestamp: '5 hours ago' },
];

export default function MandiPricesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCalculator, setShowCalculator] = useState(false);

  const renderPriceCard = ({ item }: { item: PriceData }) => {
    const isPositive = item.change > 0;
    const changeColor = isPositive ? '#4CAF50' : '#F44336';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <View style={styles.priceCard}>
        <View style={styles.priceHeader}>
          <View style={styles.cropInfo}>
            <Text style={styles.cropName}>{item.crop}</Text>
            <Text style={styles.mandiName}>{item.mandi} Mandi</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceAmount}>₹{item.price.toLocaleString()}</Text>
            <Text style={styles.priceUnit}>per {item.unit}</Text>
          </View>
        </View>
        
        <View style={styles.priceFooter}>
          <View style={styles.changeContainer}>
            <TrendIcon size={16} color={changeColor} />
            <Text style={[styles.changeText, { color: changeColor }]}>
              {isPositive ? '+' : ''}{item.change}%
            </Text>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  const renderQuickActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <BarChart3 size={24} color="white" />
        <Text style={styles.actionText}>Price Trends</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setShowCalculator(!showCalculator)}
      >
        <Calculator size={24} color="white" />
        <Text style={styles.actionText}>Profit Calc</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionButton}>
        <Bell size={24} color="white" />
        <Text style={styles.actionText}>Price Alerts</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCalculator = () => {
    if (!showCalculator) return null;

    return (
      <View style={styles.calculatorContainer}>
        <Text style={styles.calculatorTitle}>🧮 Profitability Calculator</Text>
        <View style={styles.calculatorCard}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Quantity (quintals):</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputValue}>50</Text>
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Transport Cost:</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputValue}>₹2,000</Text>
            </View>
          </View>
          
          <View style={styles.calculatorResult}>
            <Text style={styles.resultLabel}>Estimated Revenue:</Text>
            <Text style={styles.resultValue}>₹1,05,000</Text>
            <Text style={styles.resultLabel}>Net Profit:</Text>
            <Text style={styles.resultValue}>₹1,03,000</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💰 Mandi Prices</Text>
        <Text style={styles.subtitle}>Real-time market prices and trends</Text>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#2E7D32" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderQuickActions()}
      {renderCalculator()}

      <View style={styles.pricesContainer}>
        <Text style={styles.pricesTitle}>📊 Live Prices</Text>
        <FlatList
          data={mockPrices}
          renderItem={renderPriceCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pricesList}
        />
      </View>

      <FloatingChatBubble />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    marginBottom: 16,
  },
  filterContainer: {
    alignItems: 'flex-end',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  calculatorContainer: {
    margin: 16,
    marginTop: 0,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  calculatorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputBox: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
  },
  inputValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  calculatorResult: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  pricesContainer: {
    flex: 1,
    margin: 16,
    marginTop: 0,
  },
  pricesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  pricesList: {
    gap: 12,
  },
  priceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mandiName: {
    fontSize: 14,
    color: '#666',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  priceUnit: {
    fontSize: 12,
    color: '#666',
  },
  priceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
});