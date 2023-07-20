import {useTailwind} from "tailwind-rn";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import React, { useEffect, useState } from "react";
import {cars} from "../../configs/BackendConfig"
import {Edit} from "../edit-modal/index";
import {Delete} from "../delete-modal/index";
import BackendAxios from "../../configs/BackendConfig";
import {useSafeAreaInsets} from "react-native-safe-area-context";


export function AdminHomeScreen(){

    const tailwind = useTailwind()
    const navigation = useNavigation()
    const adminHook = useAdminHook()
    const insets = useSafeAreaInsets()

     const [cars,setCars]= useState([]);

      useEffect (()=>{
         BackendAxios.get('/').then (res=>{
         console.log(res)
         setCars (res.data.car)
          })
        }, [])


    return (
        <SafeAreaView style={tailwind('mx-4 flex-1')}>
            <Text style={tailwind('text-xl font-bold')}>Malaysian Car Encyclopedia</Text>
            <View style={tailwind('flex-row justify-between my-4')}>
            </View>
            <ScrollView>
                 {cars.map((car, i) => (
                    <View key={i} style={[tailwind('rounded bg-blue-800 p-3 w-4/5 '),{textAlign:'center', marginTop: 20}]}>
                    <View style={tailwind('mb-6')}>
                        <Text style={[tailwind('text-xl text-white'), ,{textAlign:'center'}]}>{car.brand}</Text>
                        <Text style={[tailwind('text-xl text-white'), ,{textAlign:'center'}]}>{car.model}</Text>
                        <Text style={tailwind('text-xs text-white')}>{car.year}</Text>
                        <Text style={tailwind('text-xs text-white')}>RM {car.price}</Text>
                    </View>
                    <View>
                        <Text style={tailwind('text-xs text-white')}>{car.description}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
            <Delete 
                setupdated={"setUpdated"} 
                id={car._id} 
            />
                    </View>
                    <View style={{marginTop: 10}}>
            <Edit  
            model={car.model} 
            brand={car.brand} 
            year={car.year} 
            description={car.description} 
            price={car.price} 
            img={car.img} 
            setupdated={"setUpdated"} 
            id={car._id} 
            />
                    </View>
                    <View style={tailwind('relative flex-1 justify-end')}>
            </View>
                </View>))}
            </ScrollView>
        </SafeAreaView>
    )
}