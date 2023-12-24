import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({navigation}) {
    const pressHandler = () =>{
        navigation.navigate('Game');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.gameTitle}>Higher or Lower</Text>
            <View style={styles.startButton}>
                <Button title="Start Game" color='white' onPress={pressHandler}/>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitle: {
    fontWeight: 'bold',
    margin: 70
  },
  startButton: {
    backgroundColor: '#1DA1F2',
  }
});
