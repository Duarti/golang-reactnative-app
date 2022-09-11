import { Modal, Text, TouchableOpacity, Button, View, StyleSheet, TextInput } from 'react-native'
import { Formik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'


const userSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(3),
})

const productSchema = yup.object({
    title: yup.string().required().min(3),
    description: yup.string().required().min(5),
})

const CustomModal = ({ email, data, visibility, onCancel, refetch, itemType, actionType, noEmail, loading }) => {



    const onSubmit = values => {

        if (itemType === "user") {
            actionType === "update" ? (axios.patch(`http://10.0.2.2:8000/api/users/${data.email}`, values))
                .then(res => console.log("User Updated!")).catch(err => console.log(err)) : (axios.post("http://10.0.2.2:8000/api/users", values)
                    .then(res => console.log("User Created!")).catch(err => console.log(err)))
        }
        if (itemType === "product") {
            actionType === "update" ? "" : (!noEmail ? (axios.post(`http://10.0.2.2:8000/api/products`, { ownerEmail: email, ...values }).then(res => console.log("Product addedv1!")).catch(err => console.log(err))) : (axios.post(`http://10.0.2.2:8000/api/products`, { ...values, ownerEmail: email }).then(res => console.log("Product addedv2!")).catch(err => console.log(err))))

            // axios.post(`http://10.0.2.2:8000/api/products`, { ...values, ownerEmail: email }).then(res => console.log("Product addedv2!")).catch(err => console.log(err))

        }
        refetch()
        onCancel()
    }


    return (
        <Modal visible={visibility} animationType="slide">
            <View style={styles.form}>
                {itemType === "user" ? <Formik
                    validationSchema={userSchema}
                    initialValues={actionType === "update" ? { name: data?.name, email: data?.email, password: data?.password } : { name: '', email: '', password: '' }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.errorText}>{touched.name && errors.name} </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Text style={styles.errorText}>{touched.email && errors.email}</Text>
                            <TextInput
                                style={styles.formInput}
                                secureTextEntry={true}
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <Text style={styles.errorText}>{touched.password && errors.password}</Text>

                            <TouchableOpacity style={{ marginTop: 40 }}><Button onPress={handleSubmit} title={actionType === "update" ? "UPDATE" : "CREATE"} /></TouchableOpacity>
                        </View>
                    )}
                </Formik> : <Formik
                    validationSchema={productSchema}
                    initialValues={actionType === "update" ? { name: data?.name, email: data?.email, password: data?.password } : { title: '', description: '', ownerEmail: '' }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Title"
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.name}
                            />
                            <Text style={styles.errorText}>{touched.title && errors.title} </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Description"
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.email}
                            />
                            <Text style={styles.errorText}>{touched.description && errors.description} </Text>
                            {!noEmail && <><TextInput
                                style={styles.formInput}
                                placeholder="Owner Email"
                                onChangeText={handleChange('ownerEmail')}
                                onBlur={handleBlur('ownerEmail')}
                                value={values.password}
                            />
                                <Text style={styles.errorText}>{touched.ownerEmail && errors.ownerEmail} </Text></>}

                            <TouchableOpacity style={{ marginTop: 40 }}><Button onPress={handleSubmit} title={actionType === "update" ? "UPDATE" : "CREATE"} /></TouchableOpacity>
                        </View>
                    )}
                </Formik>}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity><Button onPress={onCancel} title={"CANCEL"} color="red"></Button></TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    form: {
        padding: 30,
        marginTop: 20,
    },
    formInput: {
        padding: 6,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    errorText: {
        color: 'red',
        fontSize: 10
    }
})

export default CustomModal

