import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './HomeStack'
import UsersStack from './UsersStack'
import UserStack from './UserStack'
import ProductStack from './ProductStack'
import ProductsStack from './ProductsStack'


const Stack = createNativeStackNavigator()

const Routes = props => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeStack} options={{ header: () => null }}></Stack.Screen>
                <Stack.Screen name="Users" component={UsersStack} ></Stack.Screen>
                <Stack.Screen name="User" component={UserStack}></Stack.Screen>
                <Stack.Screen name="Product" component={ProductStack}></Stack.Screen>
                <Stack.Screen name="Products" component={ProductsStack}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes