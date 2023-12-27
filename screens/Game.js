import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Game() {
    let options = [];
    fetch("http://localhost:3000/start")
          .then(response => console.log(response))
          .then(data => console.log(data))
          .catch(error => console.log(error));
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text>This city has an average temperature of :</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.question}>Does this city have higher or lower temperature?</Text>
                <View style={styles.holdButtons}>
                    <View style={styles.button}>
                        <Button title="Higher" color='white' style={styles.button}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Lower" color='white' style={styles.button}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column'
    },
    top:{
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    question: {
        padding: 20
    },
    button: {
        backgroundColor: '#1DA1F2',
        margin: 20
    },
    holdButtons:{
        flexDirection: 'row'
    }
})