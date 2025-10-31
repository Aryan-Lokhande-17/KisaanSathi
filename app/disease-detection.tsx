import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, History, AlertTriangle } from 'lucide-react-native';
import { FloatingChatBubble } from '@/components/FloatingChatBubble';
import * as ImagePicker from 'expo-image-picker';

interface DetectionResult {
  id: string;
  image: string;
  disease: string;
  confidence: number;
  remedy: string;
  timestamp: Date;
}

export default function DiseaseDetectionScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [history] = useState<DetectionResult[]>([
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      disease: 'Leaf Blight',
      confidence: 87,
      remedy: 'Apply copper-based fungicide and improve air circulation',
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300&h=200&fit=crop',
      disease: 'Healthy Plant',
      confidence: 95,
      remedy: 'Continue current care routine',
      timestamp: new Date(Date.now() - 172800000),
    },
  ]);

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Gallery permission is required to select photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    setDetectionResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: DetectionResult = {
        id: Date.now().toString(),
        image: imageUri,
        disease: Math.random() > 0.5 ? 'Powdery Mildew' : 'Healthy Plant',
        confidence: Math.floor(Math.random() * 20) + 80,
        remedy: Math.random() > 0.5 
          ? 'Apply neem oil spray every 3 days. Ensure proper ventilation.'
          : 'Plant looks healthy! Continue current care routine.',
        timestamp: new Date(),
      };
      
      setDetectionResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const renderDetectionResult = () => {
    if (!detectionResult) return null;

    const isHealthy = detectionResult.disease.toLowerCase().includes('healthy');
    const resultColor = isHealthy ? '#4CAF50' : '#FF5722';

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>🔍 Analysis Result</Text>
        <View style={[styles.resultCard, { borderLeftColor: resultColor }]}>
          <View style={styles.resultHeader}>
            <View style={[styles.confidenceContainer, { backgroundColor: resultColor }]}>
              <Text style={styles.confidenceText}>{detectionResult.confidence}%</Text>
            </View>
            <View style={styles.resultInfo}>
              <Text style={[styles.diseaseText, { color: resultColor }]}>
                {detectionResult.disease}
              </Text>
              <Text style={styles.timestampText}>
                {detectionResult.timestamp.toLocaleString()}
              </Text>
            </View>
          </View>
          
          <View style={styles.remedyContainer}>
            <Text style={styles.remedyTitle}>💊 Recommended Action:</Text>
            <Text style={styles.remedyText}>{detectionResult.remedy}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🦠 Disease Detection</Text>
          <Text style={styles.subtitle}>
            Upload or capture plant images for AI-powered disease detection
          </Text>
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadTitle}>📷 Capture or Upload Image</Text>
          
          {selectedImage && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              {isAnalyzing && (
                <View style={styles.analyzingOverlay}>
                  <Text style={styles.analyzingText}>🔄 Analyzing...</Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.uploadButton, styles.cameraButton]}
              onPress={pickImageFromCamera}
              disabled={isAnalyzing}
            >
              <Camera size={24} color="white" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.uploadButton, styles.galleryButton]}
              onPress={pickImageFromGallery}
              disabled={isAnalyzing}
            >
              <ImageIcon size={24} color="white" />
              <Text style={styles.buttonText}>From Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderDetectionResult()}

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>📋 Recent Detections</Text>
          {history.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <Image source={{ uri: item.image }} style={styles.historyImage} />
              <View style={styles.historyContent}>
                <Text style={styles.historyDisease}>{item.disease}</Text>
                <Text style={styles.historyConfidence}>{item.confidence}% confidence</Text>
                <Text style={styles.historyDate}>
                  {item.timestamp.toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Photography Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>• Take photos in good natural light</Text>
            <Text style={styles.tipText}>• Focus on affected leaves or parts</Text>
            <Text style={styles.tipText}>• Keep the camera steady and close</Text>
            <Text style={styles.tipText}>• Include healthy parts for comparison</Text>
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
  uploadContainer: {
    margin: 16,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 16,
  },
  imagePreview: {
    position: 'relative',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  cameraButton: {
    backgroundColor: '#2E7D32',
  },
  galleryButton: {
    backgroundColor: '#1976D2',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    margin: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  confidenceContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  confidenceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultInfo: {
    flex: 1,
  },
  diseaseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
  },
  remedyContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  remedyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  remedyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  historyContainer: {
    margin: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  historyDisease: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historyConfidence: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
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