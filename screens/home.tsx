import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PeedList from '@/screens/peed-list';
import UserDetail from './user-detail';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PeedList" component={PeedList} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
