import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, Image, View } from 'react-native';
import { useEffect, useState } from 'react';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import { FieldArray } from 'houseform';
import NumberBox from '@/components/ui/number-box';
import { AnimatedPressable } from '@/components/ui/animate-pressable';

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

  return (
    <FieldArray name="images">
      {({ add, remove, value }) => (
        <View
          style={{ paddingTop: headerHeight }}
          className="bg-gray-600 flex-1">
          <View className="mt-8 h-9 mb-4" />
          <View style={{ flex: 1 }}>
            <FlatList
              data={photos}
              contentContainerStyle={{ gap: 2 }}
              columnWrapperStyle={{ gap: 2 }}
              renderItem={info => {
                const checkedIndex = value.findIndex(
                  item => item === info.item.node.image.uri,
                );
                const isChecked = checkedIndex > -1;
                return (
                  <AnimatedPressable
                    key={info.item.node.id}
                    className="flex-1"
                    onPress={() =>
                      isChecked
                        ? remove(
                            value.findIndex(
                              item => item === info.item.node.image.uri,
                            ),
                          )
                        : add(info.item.node.image.uri)
                    }>
                    <NumberBox
                      pressed={isChecked}
                      number={isChecked ? checkedIndex + 1 + '' : ''}
                      className="absolute z-10 right-2 top-2"
                    />
                    <Image
                      source={{ uri: info.item.node.image.uri }}
                      style={{ height: 120 }}
                    />
                  </AnimatedPressable>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
            />
          </View>
        </View>
      )}
    </FieldArray>
  );
};
