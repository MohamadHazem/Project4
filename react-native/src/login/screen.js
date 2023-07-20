import React, { useEffect, useState } from "react";
import {Button} from 'react-native'
import {useTailwind} from "tailwind-rn";
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useUserHook} from "../use-auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig";

export function Login(){
    const tailwind = useTailwind()
    const insets = useSafeAreaInsets()
    const userHook = useUserHook()
    const navigation = useNavigation()

    const [formInput, setFormInput] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (userHook.user) {
            navigation.navigate('Home')
        }
    }, [userHook.user])

    function onChange(key, value){
        setFormInput(prevState => ({...prevState, [key]: value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        try {
            alert(formInput)

            //Remove line below when Axios connected (Demo Only)
            // navigation.navigate("Home")

            const res = await BackendAxios.post('/user/login', formInput)
            if (res.status === 200) {
                userHook.storeUser(res.data.user)
                navigation.navigate("Home")
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <View style={tailwind(`mx-4 flex-1 ${Platform.OS === 'android' ? "mt-9" : ""}`)}>
            <View style={tailwind('mb-3')}>
                <Text>Username</Text>
                <TextInput onChangeText={(val) => onChange("username", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
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