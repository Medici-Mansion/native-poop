import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { init } from '../bootstrap';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SelectProfile } from '@/screens/stack';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '@/const';
import { api } from '@/apis';
import TabNavigator from './tab-navigator';
import { Pressable } from 'react-native';
import { CloseIcon } from '@/assets/icons';
import { UploadStackScreen } from '@/screens/stack/upload-toon';
import CodePush, { CodePushOptions } from 'react-native-code-push';
const Stack = createNativeStackNavigator();

function Router(): JSX.Element {
  const [isInitialize, setIsInitialize] = useState(false);
  const { login } = useUserStore();
  const queryClient = useQueryClient();
  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const res = await api.getMyProfileList();
      return res.data;
    },
    enabled: isInitialize,
  });
  const { data: me, isLoading: isMeLoading } = useQuery({
    queryKey: ['check', 'login'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem(Token.ACT);
      if (!token) return false;
      const meResponse = await api.getMe();
      if (meResponse.data) {
        const profileList = await api.getMyProfileList();
        queryClient.setQueryData(['profiles'], profileList.data, {
          updatedAt: new Date().getTime(),
        });
        login(meResponse.data);
      }
      return meResponse.data;
    },
    enabled: isInitialize,
  });

  const initialize = async () => {
    await init();
    setIsInitialize(true);
  };

  useLayoutEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isMeLoading && isInitialize) {
      SplashScreen.hide();
    }
  }, [isMeLoading, isInitialize]);

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'black' }}>
      <PaperProvider>
        <GestureHandlerRootView>
          <Host>
            <NavigationContainer>
              {isMeLoading ? null : !me ||
                (me && !me.latestProfileId && !profiles?.length) ? (
                <Stack.Navigator
                  initialRouteName={
                    me && !profiles?.length ? 'SuccessSignup' : 'Login'
                  }
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
                      headerTransparent: true,
                      title: '',
                      headerLeft: () => (
                        <Pressable>
                          <CloseIcon size={25} />
                        </Pressable>
                      ),
                    }}
                    component={SelectProfile}
                  />
                  <Stack.Screen name="shell" component={TabNavigator} />
                  <Stack.Screen
                    name="create-post"
                    component={UploadStackScreen}
                  />
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </Host>
        </GestureHandlerRootView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  rollbackRetryOptions: {
    delayInHours: 24,
    maxRetryAttempts: 1,
  },
};

export default CodePush(codePushOptions)(Router);
