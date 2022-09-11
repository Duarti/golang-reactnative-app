import React, { useState } from 'react'
import { View, Button, TouchableOpacity, FlatList } from 'react-native'
import CustomModal from '../components/CustomModal'
import ListItem from '../components/ListItem'
import { useAxios } from 'use-axios-client'

const UsersStack = ({ navigation }) => {

    const url = "http://10.0.2.2:8000/api/products"
    const [showModal, setShowModal] = useState(false)
    const { data: products, loading, error, refetch } = useAxios({ url: `http://10.0.2.2:8000/api/products` })

    return (
        <View style={{ alignItems: "center", flex: 1 }}>
            <CustomModal itemType="product" refetch={refetch} visibility={showModal} onCancel={() => setShowModal(false)} />
            <TouchableOpacity style={{ width: "60%", marginTop: 10 }}><Button onPress={() => setShowModal(true)} title="CREATE NEW PRODUCT"></Button></TouchableOpacity>
            <FlatList
                style={{ marginTop: 20, width: '60%', marginBottom: 20 }}
                data={products}
                renderItem={({ item }) => <ListItem itemType="product" data={item} refetchProducts={refetch} onClick={() => navigation.navigate('Product', { data: item })} text={item.title} />}
                keyExtractor={item => item.ID}>

            </FlatList>
        </View>
    )
}



export default UsersStack