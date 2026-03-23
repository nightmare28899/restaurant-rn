/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen.tsx';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PaperProvider>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#fff"
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    />
                    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                        <AppContent />
                    </SafeAreaView>
                </PaperProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}

function AppContent() {
    return (
        <HomeScreen />
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

export default App;
