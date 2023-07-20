import React, { useEffect, useState } from "react";
import {Button} from 'react-native'
import {useTailwind} from "tailwind-rn";
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function AdminLogout(){
    const tailwind = useTailwind()
    const insets = useSafeAreaInsets()
    const adminHook = useAdminHook()
    const navigation = useNavigation()

    const [loggedOut, setLoggedOut] = useState(false)

     useEffect(() => {
         adminHook.removeAdmin()
         setLoggedOut(true)
         setTimeout(() => navigation.navigate('Admin Login'), 5000) 
     }, [])

    async function onLogoutHandler(e) {
        e.preventDefault()

        try {
            //Remove line below when Axios connected (Demo Only)
            // navigation.navigate("Admin Login")

            adminHook.removeAdmin()
            setLoggedOut(true)
            setTimeout(() => navigation.navigate('Admin Login'), 5000) 

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
            <Text style={{fontSize: 26, textAlign:'center', marginTop: 200}}>
                Confirm logout?
            </Text>
            <Button title={"Logout"} onPress={onLogoutHandler} />
        </View>
    )
}