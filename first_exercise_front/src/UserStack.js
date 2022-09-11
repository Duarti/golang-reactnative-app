import React, { useState } from 'react'
import { Text, FlatList, View, TouchableOpacity, Button } from 'react-native'
import ListItem from '../components/ListItem'
import globalStyles from '../gloablStyles'
import { useAxios } from 'use-axios-client'
import CustomModal from '../components/CustomModal'
import { formatPassword } from '../utils/utils'

const UserStack = ({ navigation, route }) => {

    const user = route.params.data

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showProductModal, setShowProductModal] = useState(false)
    const { data: userData, error, loading, refetch } = useAxios({ url: `http://10.0.2.2:8000/api/users/${user.email}` })
    const { data: products, error: productsError, loading: productsLoading, refetch: refetchProducts } = useAxios({ url: `http://10.0.2.2:8000/api/products` })


    return !loading ? <View style={{ flex: 1 }}>
        <CustomModal itemType="user" data={userData} actionType="update" refetch={refetch} visibility={showUpdateModal} onCancel={() => setShowUpdateModal(false)} />
        <CustomModal email={user.email} loading={loading} itemType="product" noEmail={true} data={userData} refetch={refetchProducts} visibility={showProductModal} onCancel={() => setShowProductModal(false)} />
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Info</Text>
            <Text>Name: {userData?.name}</Text>
            <Text>Email: {userData?.email}</Text>
            <Text>Password: {formatPassword(userData?.password)}</Text>
            <TouchableOpacity style={{ marginTop: 20 }}><Button onPress={() => setShowUpdateModal(true)} title="UPDATE USER"></Button></TouchableOpacity>
        </View>
        <View style={{ ...globalStyles.container, flex: 1 }}>
            <Text style={globalStyles.title}>Products</Text>

            <TouchableOpacity style={{ marginTop: 20 }}><Button onPress={() => setShowProductModal(true)} title="ADD PRODUCT"></Button></TouchableOpacity>

            <FlatList
                style={{ marginTop: 20, width: '60%' }}
                data={products?.filter(product => product.ownerEmail === user.email)}
                keyExtractor={item => item.ID}
                renderItem={({ item }) => <ListItem refetchProducts={refetchProducts} data={item} itemType="product" onClick={() => navigation.navigate("Product", { data: item })} text={item.title} refetch={refetch} style={{ textAlign: 'center' }}></ListItem>} >
            </FlatList>


        </View>
    </View> : <Text>Loading...</Text>
}





export default UserStack