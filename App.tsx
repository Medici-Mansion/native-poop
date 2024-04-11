import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import { useUserStore } from '@/store/user-store';
import ReactQueryProvider from '@/provider/react-query.provider';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from '@/screens/home';
import UploadScreen from '@/screens/upload';
import LoginScreen from '@/screens/login';
import Settings from '@/screens/settings';
import SearchScreen from '@/screens/search';
import SignUp from '@/screens/sign-up';
import SuccessSignup from '@/screens/success-signup';

import {
  HomeTabIcon,
  ListIcon,
  PlusIcon,
  SearchIcon,
  SettingIcon,
} from '@/assets/icons';
import ListScreen from '@/screens/list';
import CreateProfile from '@/screens/create-profile';
import SelectPhoto from '@/screens/select-photo';
import SelectBreeds from '@/screens/select-breeds';
import { init } from './bootstrap';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

init();

function App(): JSX.Element {
  const { isLogin } = useUserStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ReactQueryProvider>
        <PaperProvider>
          <NavigationContainer>
            {isLogin ? (
              <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  tabBarStyle: { backgroundColor: 'black' },
                  tabBarActiveTintColor: 'black',
                }}>
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: 'Home',
                    tabBarIcon: HomeTabIcon,
                  }}
                />
                <Tab.Screen
                  name="Search"
                  component={SearchScreen}
                  options={{
                    title: 'Home',
                    tabBarIcon: SearchIcon,
                  }}
                />
                <Tab.Screen
                  name="Upload"
                  component={UploadScreen}
                  options={{
                    title: 'Upload',
                    tabBarIcon: PlusIcon,
                  }}
                />
                <Tab.Screen
                  name="List"
                  component={ListScreen}
                  options={{
                    title: 'Upload',
                    tabBarIcon: ListIcon,
                  }}
                />
                <Tab.Screen
                  name="Setting"
                  component={Settings}
                  options={{
                    title: 'Setting',
                    tabBarIcon: SettingIcon,
                  }}
                />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CreateProfile" component={CreateProfile} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SuccessSignup" component={SuccessSignup} />
                <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
                <Stack.Screen name="SelectBreeds" component={SelectBreeds} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PaperProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}

export default App;
