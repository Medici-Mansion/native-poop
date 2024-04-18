import { View, Pressable, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LeftArrow } from '@/assets/icons';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { useNavi } from '@/hooks/useNavi';
import { useImageStore } from '@/store/use-image';
import { getImageData } from '../lib/utils';
import ImagePicker from 'react-native-image-crop-picker';

const SelectPhoto = () => {
  const { navigation } = useNavi();

  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [_, setHasNextPage] = useState(false);
  const [__, setNextCursor] = useState('');

  const { setImage } = useImageStore();
  const getPhotos = async () => {
    const { edges, page_info } = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
      include: ['filename', 'fileSize', 'fileExtension', 'sourceType'],
    });

    setPhotos(prev => [...(prev ?? []), ...edges]);
    setHasNextPage(page_info.has_next_page);
    setNextCursor('');
  };

  const handleSelectImage = (item: PhotoIdentifier) => async () => {
    const image = await getImageData(item.node.image);
    ImagePicker.openCropper({
      path: image.uri,
      width: 320,
      height: 320,
      mediaType: 'photo',
    }).then(newImage => {
      image.uri = `file://${newImage.path}`;
      setImage(image);
      navigation.pop();
    });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const renderItem = ({ item }: { item: PhotoIdentifier }) => {
    return (
      <Pressable
        className="h-[120px] w-[33%] p-1"
        onPress={handleSelectImage(item)}>
        <Image source={{ uri: item.node.image.uri }} style={{ height: 120 }} />
      </Pressable>
    );
  };

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
