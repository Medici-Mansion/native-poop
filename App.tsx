import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

import ReactQueryProvider from '@/provider/react-query.provider';
import HomeScreen from '@/screens/home';
import UploadScreen from '@/screens/upload';
import LoginScreen from '@/screens/login';
import Settings from '@/screens/settings';
import {useUserStore} from '@/store/user-store';
import SignUp from './screens/sign-up';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UploadIcon = () => <Icon name="up-square-o" size={20} color="white" />;
const HomeTabIcon = () => <Icon name="bars" size={20} color="white" />;
const SettingIcon = () => <Icon name="setting" size={20} color="white" />;

function App(): JSX.Element {
  const {isLogin} = useUserStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ReactQueryProvider>
        <NavigationContainer>
          {isLogin ? (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {backgroundColor: 'black'},
                tabBarActiveTintColor: 'white',
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
                name="Upload"
                component={UploadScreen}
                options={{
                  tabBarIcon: UploadIcon,
                }}
              />
              <Tab.Screen
                name="Setting"
                component={Settings}
                options={{
                  tabBarIcon: SettingIcon,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ReactQueryProvider>
    </SafeAreaView>
  );
}

export default App;
