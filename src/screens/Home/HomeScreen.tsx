import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import PrimaryButton from '../../components/common/PrimaryButton';

const HomeScreen: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View style={styles.container}>

      <Appbar.Header>
        <Appbar.Content title="Mi Aplicación Paper con TS" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium">Contador: {count}</Text>

        <PrimaryButton
          title="Incrementar"
          onPress={() => setCount(prev => prev + 1)}
        />

        <PrimaryButton
          title="Reiniciar (Outlined)"
          onPress={() => setCount(0)}
          mode="outlined"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
