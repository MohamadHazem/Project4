import { createContext, useContext, useEffect, useState } from "react";
import BackendAxios from "../../configs/BackendConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminContext = createContext()

export function useAdminHook() {
    if (!AdminContext) {
        throw new Error("You must use inside AdminContext.Provider")
    }
    return useContext(AdminContext)
}

export function AdminProvider({children}) {
    const [admin, setAdmin] = useState(null)
    const [adminUpdated, setAdminUpdated] = useState(false)

    useEffect(() => {
        const verifyAdmin = async () => {
            const tempAdmin = getAdmin()
            if (!tempAdmin) {
                setAdmin(null) 
                setAdminUpdated(false)
                return
            }
            try {
                await BackendAxios.get('/admin', {
                    headers: {
                        authorization: `Bearer ${tempAdmin.token}`
                    }
                })
                setAdmin(tempAdmin)   
                setAdminUpdated(false)
            } catch (err) {
                setAdminUpdated(false)
                console.log(err)
                if (err.response.status === 400 && err.response.data.message === 'Invalid token') {
                    removeAdmin()
                    return
                } 
                if (err.response.status === 500 && err.response.data.message === 'Something went wrong') {
                    removeAdmin()
                    return
                }
                console.log(err)
            }
        }
        verifyAdmin()
    }, [adminUpdated])

    async function storeAdmin(adm) {
        setAdminUpdated(true)
        await AsyncStorage.setItem('admin', JSON.stringify(adm))
    }

    async function getAdmin() {
        const storageAdmin = await AsyncStorage.getItem('admin')
        return JSON.parse(storageAdmin)
    }

    async function removeAdmin() {
        setAdminUpdated(true)
        await AsyncStorage.removeItem('admin')
    }

    return (
        <AdminContext.Provider value={{admin, storeAdmin, removeAdmin, getAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}


//Ebere NoteApp Login Temporary Solution
// ...............................................................................................

// const AuthContext = React.createContext(undefined)
// export function useAuth(){
//     const useAuthContext = React.useContext(AuthContext)
//     if(!useAuthContext){
//         throw new Error("Not in provider")
//     }
//     return useAuthContext
// }

// const AuthAdminContext = React.createContext(undefined)
// export function useAuthAdmin(){
//     const useAuthAdminContext = React.useContext(AuthAdminContext)
//     if(!useAuthAdminContext){
//         throw new Error("Not in provider")
//     }
//     return useAuthAdminContext
// }

// export function AuthAdminProvider(props){
//     const [isAuthAdmin, setIsAuthAdmin]  = React.useState(false)
//     const [carsList, setCarsList]  = React.useState([])
//     function adminLogin(){
//         setIsAuthAdmin(true)
//     }

//     function AddCar(car){
//         setCarsList(prevState => [...prevState, car])
//     }
//     return (
//         <AuthContext.Provider value={{isAuthAdmin, adminLogin, carsList, AddCar}}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

// export function AuthProvider(props){
//     const [isAuth, setIsAuth]  = React.useState(false)
//     const [carsList, setCarsList]  = React.useState([])
//     function login(){
//         setIsAuth(true)
//     }

//     function logout(){
//         setIsAuth(false)
//     }
//     function AddCar(car){
//         setCarsList(prevState => [...prevState, car])
//     }
//     return (
//         <AuthContext.Provider value={{isAuth, login, logout, carsList, AddCar}}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

