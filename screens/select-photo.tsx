import { View, Text, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LeftArrow } from '@/assets/icons';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { useNavi } from '@/hooks/useNavi';

const SelectPhoto = () => {
  const { navigation } = useNavi();
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState('');

  const getPhotos = async () => {
    const { edges, page_info } = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    });

    setPhotos(prev => [...(prev ?? []), ...edges]);
    setHasNextPage(page_info.has_next_page);
    setNextCursor('');
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const renderItem = ({ item }: { item: PhotoIdentifier }) => (
    <Image
      style={{
        width: '33%',
        height: 120,
        margin: 1,
      }}
      source={{ uri: item.node.image.uri }}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 3,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <LeftArrow size={25} />
        </Pressable>
      </View>
      <View style={{ flex: 9 }}>
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default SelectPhoto;
