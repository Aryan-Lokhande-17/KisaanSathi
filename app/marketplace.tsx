import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wrench, ShoppingCart, Store, Handshake, Users, MapPin, Phone } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

interface MarketplaceItem {
  id: string;
  title: string;
  category: string;
  price: string;
  location: string;
  seller: string;
  image: string;
  description: string;
}

const categories = [
  { id: 'equipment', title: 'Equipment', icon: Wrench, emoji: '🚜' },
  { id: 'buyers', title: 'Buyers', icon: ShoppingCart, emoji: '🛒' },
  { id: 'produce', title: 'Produce', icon: Store, emoji: '🌾' },
  { id: 'cosale', title: 'Co-Sale', icon: Handshake, emoji: '🤝' },
  { id: 'labor', title: 'Labor', icon: Users, emoji: '👷' },
];

const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Tractor - Mahindra 575 DI',
    category: 'equipment',
    price: '₹8,50,000',
    location: 'Punjab',
    seller: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
    description: 'Well maintained tractor, 2019 model, 1200 hours usage',
  },
  {
    id: '2',
    title: 'Fresh Wheat - 100 Quintals',
    category: 'produce',
    price: '₹2,10,000',
    location: 'Haryana',
    seller: 'Suresh Singh',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    description: 'Premium quality wheat, ready for immediate delivery',
  },
  {
    id: '3',
    title: 'Harvesting Labor Required',
    category: 'labor',
    price: '₹500/day',
    location: 'UP',
    seller: 'Ramesh Yadav',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop',
    description: 'Need 10 workers for wheat harvesting, 15 days work',
  },
  {
    id: '4',
    title: 'Rice Buyer - Bulk Purchase',
    category: 'buyers',
    price: '₹1,900/quintal',
    location: 'Delhi',
    seller: 'Agro Traders Ltd',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    description: 'Looking to buy 500+ quintals of premium rice',
  },
];

export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(mockItems);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredItems(mockItems);
    } else {
      setFilteredItems(mockItems.filter(item => item.category === categoryId));
    }
  };

  const renderCategoryCard = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.categoryCardSelected
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <Text style={styles.categoryEmoji}>{category.emoji}</Text>
      <Text style={[
        styles.categoryTitle,
        selectedCategory === category.id && styles.categoryTitleSelected
      ]}>
        {category.title}
      </Text>
    </TouchableOpacity>
  );

  const renderMarketplaceItem = ({ item }: { item: MarketplaceItem }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        
        <View style={styles.itemDetails}>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#666" />
            <Text style={styles.itemLocation}>{item.location}</Text>
          </View>
        </View>
        
        <View style={styles.itemFooter}>
          <Text style={styles.sellerName}>By {item.seller}</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Phone size={16} color="white" />
            <Text style={styles.contactText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🛒 Marketplace</Text>
        <Text style={styles.subtitle}>Buy, sell, and connect with farmers</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesRow}>
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  selectedCategory === 'all' && styles.categoryCardSelected
                ]}
                onPress={() => handleCategorySelect('all')}
              >
                <Text style={styles.categoryEmoji}>📋</Text>
                <Text style={[
                  styles.categoryTitle,
                  selectedCategory === 'all' && styles.categoryTitleSelected
                ]}>
                  All
                </Text>
              </TouchableOpacity>
              {categories.map(renderCategoryCard)}
            </View>
          </ScrollView>
        </View>

        <View style={styles.itemsContainer}>
          <Text style={styles.itemsTitle}>
            {selectedCategory === 'all' ? 'All Items' : 
             categories.find(c => c.id === selectedCategory)?.title || 'Items'}
          </Text>
          
          <FlatList
            data={filteredItems}
            renderItem={renderMarketplaceItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.itemsList}
          />
        </View>

        <View style={styles.sellContainer}>
          <Text style={styles.sellTitle}>💼 Want to Sell?</Text>
          <TouchableOpacity style={styles.sellButton}>
            <Text style={styles.sellButtonText}>Post Your Item</Text>
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  categoriesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#2E7D32',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  categoryTitleSelected: {
    color: '#2E7D32',
  },
  itemsContainer: {
    padding: 16,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  itemsList: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sellerName: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  contactButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  contactText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  sellContainer: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sellTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  sellButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  sellButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});