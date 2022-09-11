import React from 'react'
import Center from './Center'
import { Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native'

const HomeStack = ({ navigation }) => {
    return (
        <Center>
            <Text>Welcome Home!</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttons}><Button title="USERS" onPress={() => navigation.navigate("Users")}></Button></TouchableOpacity>
                <TouchableOpacity style={styles.buttons}><Button title="PRODUCTS" onPress={() => navigation.navigate("Products")}></Button></TouchableOpacity>
            </View>
        </Center>
    )
}


const styles = StyleSheet.create({
    buttonsContainer: {
        width: "60%",
    },
    buttons: {
        width: "100%",
        marginTop: 10
    }
})

export default HomeStack