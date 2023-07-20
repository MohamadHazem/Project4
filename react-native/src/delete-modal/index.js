import React, {useState, useEffect} from "react";
import {Button, Modal, ModalHeader, ModalFooter, ModalBody} from 'react-native'
import {useTailwind} from "tailwind-rn";
import {SafeAreaView, TextInput, TouchableOpacity, View, Text, Platform} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useAdminHook} from "../use-auth-admin";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import BackendAxios from "../../configs/BackendConfig"

export function Delete (props){

    const [modal, setModal] = useState(false);
    const toggle =()=> setModal(!modal);
    const navigation = useNavigation()
    const tailwind = useTailwind()
    const insets = useSafeAreaInsets()
    const adminHook = useAdminHook()

    useEffect(() => {
        if (adminHook.admin) {
            navigation.navigate('Admin Home')
        }
    }, [adminHook.admin])

    async function remove(e) {
        e.preventDefault()
        try {

            //Delete when Axios connected
            // navigation.navigate("Admin Home")

            const res = await BackendAxios.delete('/', {
              data: {id: props.id},
              headers: {
                  authorization: `Bearer ${adminHook.admin.token}`
              }
          })
            if (res.status === 200) {
                props.setupdated (true)
                toggle()      
            }
        } catch (err) {
            console.log(err);
        }
      }

return (
<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title={"Delete"} onPress={toggle} />
    <Modal visible={modal} toggle={toggle}>
        <Text style={{fontSize: 26, textAlign:'center', marginTop: 350}}>
                Confirm delete car with ID:{props.id}?
        </Text>
        <View style={{marginTop: 20}}>
            <Button title={"Delete"} onPress={remove} style={{marginTop: 400}} />
        </View>
        <View style={{marginTop: 20}}>
            <Button title={"Cancel"} onPress={toggle} style={{marginTop: 400}} />
        </View>
    </Modal>
</View>

    // const [modal, setModal] = useState(false);
    // const toggle = ()=> setModal(!modal);

    // const navigate = useNavigation()
    // const tailwind = useTailwind()
    // const insets = useSafeAreaInsets()
    // const userHook = useUserHook()

    // useEffect(() => {
    //     if (userHook.user) {
    //         navigate('/admin')
    //     }
    // }, [userHook.user])
  
    // async function remove(e) {
    //     e.preventDefault()
    //     try {
    //         const res = await BackendAxios.delete('/admin', {
    //           data: {id: props.id},
    //           headers: {
    //               authorization: `Bearer ${userHook.user.token}`
    //           }
    //       })
    //         if (res.status === 200) {
    //             props.setupdated (true)
    //             toggle()      
    //         }
    //     } catch (err) {
    //       console.log(e);
    //         if (err.response.status === 400 && err.response.data.message === 'Failed to update') {
    //             setErrorMessage('Failed to update')
    //         }
    //     }
    //   }

    // return (
    //     <View style={[tailwind('flex-1'), { marginTop: insets.top, marginBottom: insets.bottom}]}>
    //         <Button title={"Remove"} onPress={toggle} />
    //     <Modal isOpen={modal} toggle={toggle} {...props}>
    //       <ModalHeader toggle={toggle}>{props.model}</ModalHeader>
    //       <ModalBody>


    //       </ModalBody>
    //       <ModalFooter>

    //       </ModalFooter>
    //     </Modal>
    //         <Button title={"Logout"} onPress={userHook.logout} />
    //     </View>
    // )
)}