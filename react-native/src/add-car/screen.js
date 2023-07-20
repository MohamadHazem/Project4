import React, {useState, useEffect} from "react";
import {Button} from 'react-native';
import {useTailwind} from "tailwind-rn";
import {TextInput, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig";

export function AddCar(){
    const insets = useSafeAreaInsets()
    const tailwind = useTailwind()
    const navigation = useNavigation()
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
            const res = await BackendAxios.post('/', formInput, {
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
        <View style={tailwind(`mx-4 flex-1 ${Platform.OS === 'android' ? "mt-9" : ""}`)}>
            <View style={tailwind('mb-3')}>
                <Text>Model</Text>
                <TextInput onChangeText={(val) => onChange("model", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Brand</Text>
                <TextInput onChangeText={(val) => onChange("brand", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Year</Text>
                <TextInput onChangeText={(val) => onChange("year", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Description</Text>
                <TextInput onChangeText={(val) => onChange("description", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Price</Text>
                <TextInput onChangeText={(val) => onChange("price", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>

            <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
                <Button title={"Add Car"} onPress={onFormSubmitHandler} />
            </View>

        </View>

    )
}