import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "@/providers/AppProvider";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="planting" options={{ title: "Planting Advice", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="crop-management" options={{ title: "Crop Management", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="disease-detection" options={{ title: "Disease Detection", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="mandi-prices" options={{ title: "Mandi Prices", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="marketplace" options={{ title: "Marketplace", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="community" options={{ title: "Community", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerStyle: { backgroundColor: '#2E7D32' }, headerTintColor: 'white' }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppProvider>
            <RootLayoutNav />
          </AppProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}