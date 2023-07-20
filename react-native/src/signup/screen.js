import React, {useState, useEffect} from "react";
import {useTailwind} from "tailwind-rn";
import {Button} from 'react-native'
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useUserHook} from "../use-auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig"
import axios from "axios";


export function Signup(){

    const tailwind = useTailwind()
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const userHook = useUserHook()

    const [formInput, setFormInput]= useState({
        username: '',
        password: '',
        fullName: '',
        contactNo: '',
        email:''
    })

    useEffect(() => {
        if (userHook.user) {
            navigation.navigate('Login')
        }
    }, [userHook.user])

   function onChange(key, value){
        setFormInput(prevState => ({...prevState, [key]: value,}))
    }

    async function onFormSubmitHandler(e) {
        e.preventDefault()
        try {
            const res = await BackendAxios.post('/user', formInput)
            if (res.status === 200) {
                userHook.storeUser(res.data.user)
                navigation.navigate("Login")
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
            <View style={tailwind('mb-3')}>
                <Text>Full Name</Text>
                <TextInput onChangeText={(val) => onChange("fullName", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Contact No.</Text>
                <TextInput onChangeText={(val) => onChange("contactNo", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={tailwind('mb-3')}>
                <Text>Email</Text>
                <TextInput onChangeText={(val) => onChange("email", val)} style={tailwind('border-2 border-solid border-indigo-500 rounded-lg p-3')} />
            </View>
            <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
            <Button title={"Sign Up"} onPress={onFormSubmitHandler} />
        </View>
        </View>
    )
}
