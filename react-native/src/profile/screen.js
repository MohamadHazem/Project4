import React, { useEffect, useState } from "react";
import {useTailwind} from "tailwind-rn";
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useUserHook} from "../use-auth";
import BackendAxios, {user} from "../../configs/BackendConfig"

export function Profile () {

    const tailwind = useTailwind()
    const userHook = useUserHook()



     const [userInfos,setUserInfos]= useState([]);
     const [updated,setUpdated]= useState(false);
    
     useEffect (()=>{
         if (userHook.user === null) {return }
        BackendAxios.get ('/profile', {
         headers: {
             authorization: `Bearer ${userHook.user.token}`
         }
       }
       ).then (res=>{
           setUserInfos (res.data.userinfo)
         })
        setUpdated(false)
       },[updated,userHook.user])
      
//Uncomment above and comment out line below when connected to Axios
//   let  userInfos = user;
      

    return(
    <View style={tailwind(`mx-4 flex-1 ${Platform.OS === 'android' ? "mt-9" : ""}`)}>
            {userInfos.map((prof) => {
                return(
                    <View>
                        <View style={tailwind('mb-6')}>
                            <Text>Username: {prof.username} </Text>
                        </View>
                        <View style={tailwind('mb-6')}>
                            <Text>Full Name: {prof.fullName} </Text>
                        </View>
                        <View style={tailwind('mb-6')}>
                            <Text>Contact No.: {prof.contactNo} </Text>
                        </View>
                        <View style={tailwind('mb-6')}>
                            <Text>Email:{prof.email} </Text>
                        </View>
                    </View>
                )})}
    </View>
    )
}