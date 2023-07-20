import React, { useEffect, useState } from "react";
import {Button} from 'react-native'
import {useTailwind} from "tailwind-rn";
import {TextInput, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig";

export function AdminLogin(){
    const tailwind = useTailwind()
    const insets = useSafeAreaInsets()
    const adminHook = useAdminHook()
    const navigation = useNavigation()

    const [formInput, setFormInput] = useState({
        email: '',
        password: ''
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
            // alert(formInput)

            //Remove line below when Axios connected (Demo Only)
            // navigation.navigate("Admin Home")

            const res = await BackendAxios.post('/admin/login', formInput)
            if (res.status === 200) {
                adminHook.storeAdmin(res.data.admin)
                navigation.navigate("Admin Home")
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <View style={tailwind(`mx-4 flex-1 ${Platform.OS === 'android' ? "mt-9" : ""}`)}>
            <View style={tailwind('mb-3')}>
                <Text>Email</Text>
                <TextInput onChangeText={(val) => onChange("email", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Password</Text>
                <TextInput onChangeText={(val) => onChange("password", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
        <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
            <Button title={"Login"} onPress={onFormSubmitHandler} />
        </View>
        </View>
    )
}