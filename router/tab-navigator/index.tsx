import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/home';
import Settings from '@/screens/settings';
import SearchScreen from '@/screens/search';
import { HomeTabIcon, ListIcon, SearchIcon, SettingIcon } from '@/assets/icons';
import ListScreen from '@/screens/list';

import { UploadButton } from '@/router/tab-navigator/tab-icon';

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
        headerTransparent: true,
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
        component={Noop}
        listeners={({}) => ({
          tabPress: event => {
            event.preventDefault();
          },
        })}
        options={{
          title: 'Upload',
          tabBarIcon: UploadButton,
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

const Noop = () => null;
