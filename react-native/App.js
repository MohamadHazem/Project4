import { StatusBar } from 'expo-status-bar';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {NavigationContainer} from "@react-navigation/native";
import {AppNav} from "./src/AppNav";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {UserProvider} from "./src/use-auth";
import {AdminProvider} from "./src/use-auth-admin";

export default function App() {
  return (
      <NavigationContainer>
        <AdminProvider>
          <UserProvider>
              <SafeAreaProvider>
                  <TailwindProvider utilities={utilities}>
                        <StatusBar style="auto" />
                        <AppNav />
                  </TailwindProvider>
              </SafeAreaProvider>
          </UserProvider>
        </AdminProvider>
      </NavigationContainer>
  );
}

