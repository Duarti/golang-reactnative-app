import React, { useState } from 'react'
import { View, Button, TouchableOpacity, FlatList } from 'react-native'
import CustomModal from '../components/CustomModal'
import ListItem from '../components/ListItem'
import { useAxios } from 'use-axios-client';

const UsersStack = ({ navigation }) => {

    const url = "http://10.0.2.2:8000/api/users"
    const { data, loading, error, refetch } = useAxios({ url: url })
    const [showModal, setShowModal] = useState(false)

    return (
        <View style={{ alignItems: "center", flex: 1 }}>
            <CustomModal itemType="user" refetch={refetch} visibility={showModal} onCancel={() => setShowModal(false)} />
            <TouchableOpacity style={{ width: "60%", marginTop: 10 }}><Button onPress={() => setShowModal(true)} title="CREATE NEW USER"></Button></TouchableOpacity>
            <FlatList
                style={{ marginTop: 20, width: '60%', marginBottom: 20 }}
                data={data}
                renderItem={({ item }) => <ListItem onClick={() => navigation.navigate('User', { data: item })} text={item.name} data={item} refetch={refetch} />}
                keyExtractor={item => item.ID}>

            </FlatList>
        </View>
    )
}



export default UsersStack