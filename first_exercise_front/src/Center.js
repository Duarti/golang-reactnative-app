import React from 'react'
import { View } from 'react-native'

const Center = props => {
    return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        {props.children}
    </View>
}

export default Center