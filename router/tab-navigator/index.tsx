import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/home';
import UploadScreen from '@/screens/upload';
import Settings from '@/screens/settings';
import SearchScreen from '@/screens/search';
import {
  HomeTabIcon,
  ListIcon,
  PlusIcon,
  SearchIcon,
  SettingIcon,
} from '@/assets/icons';
import ListScreen from '@/screens/list';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
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
  );
};

export default TabNavigator;
