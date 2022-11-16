import React from 'react'
import { Text, View } from 'react-native'
import globalStyles from '../gloablStyles'

const ProductStack = ({ navigation, route }) => {
    const product = route.params.data


    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Info</Text>
            <Text>Title: {product.title}</Text>
            <Text>Description: {product.description}</Text>
            <Text>Owner Email: {product.ownerEmail}</Text>

        </View>
    )
}

export default ProductStack