import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import { useUserStore } from '@/store/user-store';
import { PaperProvider } from 'react-native-paper';

import LoginScreen from '@/screens/login';
import SignUp from '@/screens/sign-up';
import SuccessSignup from '@/screens/success-signup';

import CreateProfile from '@/screens/create-profile';
import SelectPhoto from '@/screens/select-photo';
import SelectBreeds from '@/screens/select-breeds';
import { init } from '../bootstrap';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SelectProfile } from '@/screens/stack';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '@/const';
import { api } from '@/apis';
import TabNavigator from './tab-navigator';
import { Pressable } from 'react-native';
import { CloseIcon } from '@/assets/icons';

const Stack = createNativeStackNavigator();
init();

export function Router(): JSX.Element {
  const { login } = useUserStore();
  const { data: me, isLoading: isMeLoading } = useQuery({
    queryKey: ['check', 'login'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem(Token.ACT);
      if (!token) return false;
      const meResponse = await api.getMe();
      if (meResponse.data) {
        login(meResponse.data);
      }
      return meResponse.data;
    },
  });

  useEffect(() => {
    if (!isMeLoading) {
      SplashScreen.hide();
    }
  }, [isMeLoading]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <PaperProvider>
        <GestureHandlerRootView>
          <Host>
            <NavigationContainer>
              {isMeLoading ? (
                <></>
              ) : !me ? (
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="CreateProfile"
                    component={CreateProfile}
                  />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="SuccessSignup"
                    component={SuccessSignup}
                  />
                  <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
                  <Stack.Screen name="SelectBreeds" component={SelectBreeds} />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator
                  initialRouteName={
                    me.latestProfileId ? 'shell' : 'select-profile'
                  }
                  screenOptions={{
                    headerShown: false,
                  }}>
                  <Stack.Screen
                    name="select-profile"
                    options={{
                      headerShown: true,
                      headerTransparent: true,
                      title: '',
                      headerLeft(props) {
                        return (
                          <Pressable>
                            <CloseIcon size={25} />
                          </Pressable>
                        );
                      },
                    }}
                    component={SelectProfile}
                  />
                  <Stack.Screen name="shell" component={TabNavigator} />
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </Host>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
