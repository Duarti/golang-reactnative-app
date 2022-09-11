import axios from 'axios'
import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'

const ListItem = ({ text, onClick, data, refetch, refetchProducts, itemType }) => {


    const deleteHandler = () => {

        if (itemType === "product") {
            axios.delete(`http://10.0.2.2:8000/api/products/${data.ID}`)
                .then(res => console.log("Product deleted")).catch(err => console.log(err))
            refetchProducts()
        }
        else {
            axios.delete(`http://10.0.2.2:8000/api/users/${data.email}`)
                .then((res) => console.log("User deleted!")).catch(err => console.log(err))
            refetch()
        }
    }

    return <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <TouchableOpacity onPress={onClick} style={{ flex: 1 }}>
            <Text style={{
                padding: 10,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "blue",
                textAlign: 'center',
                marginBottom: 5,
                backgroundColor: 'cyan',
                fontWeight: 'bold',
            }}>{text}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            padding: 10,
            borderRadius: 5
        }}
        >
            <Button onPress={deleteHandler} color="red" title="DEL"></Button>
        </TouchableOpacity>
    </View>
}

export default ListItem