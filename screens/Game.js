import React, { useEffect, useState } from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

export default function Game({navigation}) {
    const [options, setOptions] = useState([]);
    const [showButtons, setShowButtons] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
        fetch(`http://192.168.1.120:3000/start`)
            .then(response => response.json())
            .then(data => setOptions(data))  // Set the state to the data returned by the server
            .catch(error => console.log(error));
    }, []);
    async function determineHigher(){
        setShowButtons(false);
        if (options[0]?.temperature <= options[1]?.temperature){
            fetch('http://192.168.1.120:3000/next',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: options[1],
                }),
            })
            .then(response => response.json())
            .then(data => nextRound(data))
            .catch(error => console.log(error));

        }else{
            navigation.navigate('End');
        }
    }
    
    async function determineLower(){
        setShowButtons(false);
        if (options[0]?.temperature >= options[1]?.temperature){
            fetch('http://192.168.1.120:3000/next',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    city: options[1],
                }),
            })
            .then(response => response.json())
            .then(data => nextRound(data))
            .catch(error => console.log(error));
        }else{
            navigation.navigate('End');
        }
    }

    function nextRound(city){
        setOptions([options[1], city]);
        setShowButtons(true);
    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text>{options[0]?.city_name} has an average temperature of: {options[0]?.temperature} Celsius</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.text}>Does {options[1]?. city_name} have higher or lower temperature?</Text>
                {showButtons ? (
                    <View style={styles.holdButtons}>
                    <View style={styles.button}>
                        <Button title='higher' color='white' style={styles.button} onPress={determineHigher}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Lower" color='white' style={styles.button} onPress={determineLower}/>
                    </View>
                </View>
                ) : null}
                {showResult ? (
                    <View style={styles.text}> 
                         <Text>{options[1]?. city_name} has a average temperature of {options[1]?. temperature}</Text>
                     </View>
                 ) : null}
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
    text: {
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