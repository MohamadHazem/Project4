import React, {useState, useEffect} from "react";
import {Button, Modal, ModalHeader, ModalFooter, ModalBody} from 'react-native'
import {useTailwind} from "tailwind-rn";
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig";

export function Edit (props){

    const [modal, setModal] = useState(false);
    const toggle =()=> setModal(!modal);

    const navigation = useNavigation()
    const tailwind = useTailwind()
    const insets = useSafeAreaInsets()
    const adminHook = useAdminHook()

    const [formInput, setFormInput] = useState({
        model: '',
        brand: '',
        year: '',
        description: '',
        price: ''
    })

    useEffect(() => {
        if (adminHook.admin) {
            navigation.navigate('Admin Home')
        }
    }, [adminHook.admin])

    function onChange(key, value){
        setFormInput(prevState => ({...prevState, [key]: value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        try {
            alert(formInput)

            //Delete line below when connect Axios
            // toggle()

            const res = await BackendAxios.put('/', {data: formInput ,_id: props._id,}, {
              headers: {
                  authorization: `Bearer ${adminHook.admin.token}`
              }
          } )
            if (res.status === 200) {
                navigation.navigate("Admin Home")
            }
        } catch (err) {
          console.log(err);
        }
      }
      
return (
<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title={"Edit"} onPress={toggle} />
    <Modal visible={modal} toggle={toggle}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                Edit Car
        </Text>

        <View style={tailwind(`mx-4 flex-1 ${Platform.OS === 'android' ? "mt-9" : ""}`)}>
            <View style={tailwind('mb-3')}>
                <Text>Model</Text>
                <TextInput placeholder={props.model} onChangeText={(val) => onChange("model", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Brand</Text>
                <TextInput placeholder={props.brand} onChangeText={(val) => onChange("brand", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Year</Text>
                <TextInput placeholder={props.year} onChangeText={(val) => onChange("year", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Description</Text>
                <TextInput placeholder={props.description} onChangeText={(val) => onChange("description", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Price</Text>
                <TextInput placeholder={props.price} onChangeText={(val) => onChange("price", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
            <Button title={"Edit Car"} onPress={onFormSubmitHandler} />
            </View>
        </View>


           <Button title={"Close Modal"} onPress={toggle} />
    </Modal>
</View>
)}
