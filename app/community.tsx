import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Building, Wrench, Heart, MessageCircle, ThumbsUp, Share } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  category: string;
}

const communityCategories = [
  { id: 'farmers', title: 'Farmers', icon: Users, emoji: '👨‍🌾' },
  { id: 'schemes', title: 'Schemes', icon: Building, emoji: '🏛' },
  { id: 'workshops', title: 'Workshops', icon: Wrench, emoji: '🛠' },
  { id: 'wellness', title: 'Wellness', icon: Heart, emoji: '💙' },
];

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Great harvest this season! Used organic fertilizers and the yield increased by 20%. Sharing some tips in the comments.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    likes: 45,
    comments: 12,
    timestamp: '2 hours ago',
    category: 'farmers',
  },
  {
    id: '2',
    author: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'New PM-KISAN scheme update: Direct benefit transfer of ₹6000 per year. Check eligibility criteria and apply online.',
    likes: 78,
    comments: 23,
    timestamp: '4 hours ago',
    category: 'schemes',
  },
  {
    id: '3',
    author: 'Suresh Singh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Attended the drone technology workshop yesterday. Amazing how technology is transforming agriculture. Highly recommend!',
    likes: 32,
    comments: 8,
    timestamp: '6 hours ago',
    category: 'workshops',
  },
  {
    id: '4',
    author: 'Dr. Meera Patel',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
    content: 'Mental health is as important as physical health. Remember to take breaks, connect with family, and seek help when needed. You are not alone! 💚',
    likes: 156,
    comments: 34,
    timestamp: '8 hours ago',
    category: 'wellness',
  },
];

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredPosts(mockPosts);
    } else {
      setFilteredPosts(mockPosts.filter(post => post.category === categoryId));
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

  const renderPost = ({ item }: { item: CommunityPost }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.image && (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <ThumbsUp size={18} color="#666" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={18} color="#666" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Share size={18} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👥 Community</Text>
        <Text style={styles.subtitle}>Connect, learn, and grow together</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Community Sections</Text>
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
                  All Posts
                </Text>
              </TouchableOpacity>
              {communityCategories.map(renderCategoryCard)}
            </View>
          </ScrollView>
        </View>

        <View style={styles.createPostContainer}>
          <TouchableOpacity style={styles.createPostButton}>
            <Text style={styles.createPostText}>💬 Share your experience...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postsContainer}>
          <FlatList
            data={filteredPosts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.postsList}
          />
        </View>

        <View style={styles.resourcesContainer}>
          <Text style={styles.resourcesTitle}>📚 Helpful Resources</Text>
          <View style={styles.resourceCard}>
            <Text style={styles.resourceText}>• Farmer Helpline: 1800-180-1551</Text>
            <Text style={styles.resourceText}>• Kisan Call Center: 1800-180-1551</Text>
            <Text style={styles.resourceText}>• Soil Health Card Portal</Text>
            <Text style={styles.resourceText}>• Weather Advisory Services</Text>
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
    minWidth: 90,
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
  createPostContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  createPostButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  createPostText: {
    fontSize: 16,
    color: '#666',
  },
  postsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  postsList: {
    gap: 16,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  resourcesContainer: {
    margin: 16,
    marginTop: 0,
  },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  resourceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  resourceText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
});