import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const UploadIcon = () => (
  <Icon name="up-square-o" size={20} color="white" />
);
export const HomeTabIcon = () => (
  <MaterialIcon name="home-variant" size={20} color="white" />
);
export const SettingIcon = () => (
  // <Icon name="setting" size={20} color="white" />
  <Image
    source={require('../images/setting.png')}
    style={{width: 20, height: 20}}
  />
);

export const ListIcon = () => (
  <Image
    source={require('../images/list.png')}
    style={{width: 20, height: 20}}
  />
);
export const PlusIcon = () => (
  <Icon name="pluscircleo" size={20} color="white" />
);

export const CloseIcon = () => <Icon name="close" size={20} color={'white'} />;
export const NotificationIcon = () => (
  <IonicIcon name="notifications-outline" size={20} color={'white'} />
);
export const SearchIcon = () => (
  <IonicIcon name="search-outline" size={20} color={'white'} />
);

export const GenderIcon = ({gender}: {gender: boolean}) => (
  <MaterialIcon
    name={gender ? 'gender-female' : 'gender-male'}
    size={16}
    color={gender ? 'red' : '#397DFF'}
  />
);

export const LogoImage = () => (
  <Image
    source={require('../images/logo.png')}
    style={{width: 100, height: 100}}
  />
);
