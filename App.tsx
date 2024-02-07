import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

import ReactQueryProvider from '@/provider/react-query.provider';
import HomeScreen from '@/screens/home';
import PeedScreen from '@/screens/peed';
import LoginScreen from '@/screens/login';
import Settings from '@/screens/settings';
import {useUserStore} from '@/store/user-store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabIcon = () => <Icon name="delete" size={20} color="white" />;
const UserIcon = () => <Icon name="user" size={20} color="white" />;

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
              <Tab.Screen name="Peed" component={PeedScreen} />
              <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                  tabBarIcon: UserIcon,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ReactQueryProvider>
    </SafeAreaView>
  );
}

export default App;
