import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';

export const UploadImage = () => {
  const headerHeight = useHeaderHeight();

  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [_, setHasNextPage] = useState(false);
  const [__, setNextCursor] = useState('');

  const getPhotos = async () => {
    const { edges, page_info } = await CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
      include: ['filename', 'fileSize', 'fileExtension', 'sourceType'],
    });

    setPhotos(prev => [...(prev ?? []), ...edges]);
    setHasNextPage(page_info.has_next_page);
    setNextCursor('');
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const renderItem = ({ item }: { item: PhotoIdentifier }) => {
    return (
      <Pressable className="flex-1">
        <Image source={{ uri: item.node.image.uri }} style={{ height: 120 }} />
      </Pressable>
    );
  };

  return (
    <View style={{ paddingTop: headerHeight }} className="bg-gray-600 flex-1">
      <View className="mt-8 h-9 mb-4" />
      <View style={{ flex: 1 }}>
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
