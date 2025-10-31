import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from "react-native-gesture-handler";

// Importa tu pantalla tipada
import HomeScreen from './src/screens/Home/HomeScreen';

// El import de '@react-native/new-app-screen' no es necesario en una app real

function App(): React.JSX.Element { // Usar React.JSX.Element para el tipado de componentes
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
            <PaperProvider>
                <AppContent/>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

function AppContent(): React.JSX.Element {
    //const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles.container]}>
            <GestureHandlerRootView>
                <HomeScreen/>
            </GestureHandlerRootView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
