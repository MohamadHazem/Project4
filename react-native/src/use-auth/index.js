import { createContext, useContext, useEffect, useState } from "react";
import BackendAxios from "../../configs/BackendConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext()

export function useUserHook() {
    if (!UserContext) {
        throw new Error("You must use inside UserContext.Provider")
    }
    return useContext(UserContext)
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [userUpdated, setUserUpdated] = useState(false)

    useEffect(() => {
        const verifyUser = async () => {
            const tempUser = getUser()
            if (!tempUser) {
                setUser(null) 
                setUserUpdated(false)
                return
            }
            try {
                await BackendAxios.get('/user', {
                    headers: {
                        authorization: `Bearer ${tempUser.token}`
                    }
                })
                setUser(tempUser)   
                setUserUpdated(false)
            } catch (err) {
                setUserUpdated(false)
                console.log(err)
                if (err.response.status === 400 && err.response.data.message === 'Invalid token') {
                    removeUser()
                    return
                } 
                if (err.response.status === 500 && err.response.data.message === 'Something went wrong') {
                    removeUser()
                    return
                }
                console.log(err)
            }
        }
        verifyUser()
    }, [userUpdated])

    async function storeUser(usr) {
        setUserUpdated(true)
        await AsyncStorage.setItem('user', JSON.stringify(usr))
    }

    async function getUser() {
        const storageUser = await AsyncStorage.getItem('user')
        return JSON.parse(storageUser)
    }

    async function removeUser() {
        setUserUpdated(true)
        await AsyncStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{user, storeUser, removeUser, getUser}}>
            {children}
        </UserContext.Provider>
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

