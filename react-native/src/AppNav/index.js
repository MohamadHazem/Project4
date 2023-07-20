import {View, Text, Button} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTailwind} from "tailwind-rn";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import Icon from 'react-native-ionicons';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useUserHook} from "../use-auth";
import {useAdminHook} from "../use-auth-admin";
import {HomeScreen} from "../home-screen/screen";
import {AddCar} from "../add-car/screen";
import {Profile} from "../profile/screen";
import {Logout} from "../logout/screen";
import {Signup} from "../signup/screen";
import {Login} from "../login/screen";
import {AdminLogin} from "../admin-login/screen";
import {AdminSignup} from "../admin-signup/screen";
import {AdminHomeScreen} from "../admin-home-screen/screen";
import {AdminLogout} from "../admin-logout/screen";

const AppStack = createBottomTabNavigator()
export function AppNav(){
    const userHook = useUserHook()
    const adminHook = useAdminHook()

if (adminHook.admin === !null) {
              return  <>
                <AppStack.Navigator>
                <AppStack.Screen name={"Admin Home"} component={AdminHomeScreen} />
                <AppStack.Screen name={"Add Car"}  component={AddCar} />
                <AppStack.Screen name={"Admin Logout"}  component={AdminLogout} />
                </AppStack.Navigator>
                </>
                }
                if (userHook.user === !null) {
              return  <>
                <AppStack.Navigator>
                    <AppStack.Screen name={"Home"} component={HomeScreen} />
                    <AppStack.Screen name={"Profile"} component={Profile} />
                    <AppStack.Screen name={"Logout"}  component={Logout} />
                    </AppStack.Navigator>
                </>
                }else {
                return <>
                <AppStack.Navigator>
                <AppStack.Screen name={"Sign Up"}  component={Signup} />
                <AppStack.Screen name={"Login"}  component={Login} />
                <AppStack.Screen name={"Admin Login"}  component={AdminLogin} />
                <AppStack.Screen name={"Admin Signup"}  component={AdminSignup} />
                </AppStack.Navigator>
            </>

            }
}



// function Home(props){
//     const tailwind = useTailwind()
//     const navigation = useNavigation()
//     const insets = useSafeAreaInsets()
//    return (
//        <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
//            <Text>Home component</Text>
//            <Button title={"Go to About"} onPress={() => {
//                navigation.navigate("About", { person: "Pravin"})
//                // if(navigation.canGoBack()) {
//                //     navigation.goBack()
//                // }
//            }} />
//        </View>
//    )
// }
//
// function About(){
//     const navigation = useNavigation()
//     const route = useRoute()
//     const insets = useSafeAreaInsets()
//     const tailwind = useTailwind()
//     return (
//         <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
//             <Text>About component {route.params?.person}</Text>
//             <Button title={"Go to Home"} onPress={() => {
//                 navigation.navigate("Home", {
//                     screen: "AboutChild",
//                     params:{
//                         screen: ""
//                     }})
//             }} />
//         </View>
//     )
// }
//
//
// const HomeStackViewStack = createNativeStackNavigator()
// function HomeStackView(){
//     return (
//         <HomeStackViewStack.Navigator initialRouteName={"HomeChild"}>
//             <HomeStackViewStack.Screen name={"AboutChild"} component={AboutChild} />
//             <HomeStackViewStack.Screen name={"HomeChild"} component={HomeChild} />
//         </HomeStackViewStack.Navigator>
//     )
// }
//
// function HomeChild(props){
//     const tailwind = useTailwind()
//     const navigation = useNavigation()
//     const insets = useSafeAreaInsets()
//     return (
//         <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
//             <Text>Home component</Text>
//             <Button title={"Go to About"} onPress={() => {
//                 navigation.navigate("About", { person: "Pravin"})
//                 // if(navigation.canGoBack()) {
//                 //     navigation.goBack()
//                 // }
//             }} />
//         </View>
//     )
// }
//
// function AboutChild(){
//     const navigation = useNavigation()
//     return (
//         <View>
//             <Text>About Child component</Text>
//             <Button title={"Go to Home"} onPress={() => {
//                 navigation.goBack()
//             }} />
//         </View>
//     )
// }
