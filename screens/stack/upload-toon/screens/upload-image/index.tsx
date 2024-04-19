import { useHeaderHeight } from '@react-navigation/elements';
import { FlatList, Image, Text, View } from 'react-native';
import { FieldArray } from 'houseform';
import NumberBox from '@/components/ui/number-box';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import { ContentImage, formatTime, getImageData } from '@/lib/utils';
import { useGallery } from '@/hooks/useCameraRoll';
import Video from 'react-native-video';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { useCallback, useLayoutEffect, useState } from 'react';
export const UploadImage = () => {
  const headerHeight = useHeaderHeight();

  const { loadNextPagePictures, photos, hasNextPage } = useGallery({
    pageSize: 20,
  });

  return (
    <FieldArray name="images">
      {({ add, remove, value }) => (
        <View
          style={{ paddingTop: headerHeight }}
          className="bg-gray-600 flex-1">
          <View style={{ flex: 1 }}>
            <FlatList
              data={photos}
              ListHeaderComponent={<View className="mt-8 h-9 mb-4" />}
              onEndReachedThreshold={0.6}
              onEndReached={() => {
                if (hasNextPage) {
                  loadNextPagePictures();
                }
              }}
              contentContainerStyle={{ gap: 2 }}
              columnWrapperStyle={{ gap: 2 }}
              renderItem={({ item: { node }, index }) => {
                const checkedIndex = value.findIndex(
                  v => v.id === `${node.id}-${index}`,
                );
                const isChecked = checkedIndex > -1;

                return (
                  <UploadImageRenderItem
                    node={node}
                    key={`${node.id}-${index}`}
                    checkedIndex={checkedIndex}
                    onPress={pressedImage => {
                      if (isChecked) {
                        remove(checkedIndex);
                        return;
                      }

                      add({
                        id: `${node.id}-${index}`,
                        uri: pressedImage.filepath,
                        type: node.type,
                        duration: pressedImage.playableDuration,
                      });
                    }}
                  />
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

const UploadImageRenderItem = ({
  node,
  checkedIndex,
  onPress,
}: {
  checkedIndex: number;
  node: PhotoIdentifier['node'];
  onPress?: (pressedIamge: ContentImage) => void;
}) => {
  const isChecked = checkedIndex > -1;

  const [image, setImage] = useState<ContentImage | null>(null);

  const fetchImage = useCallback(async () => {
    const img = await getImageData(node.image);
    setImage(img);
  }, [node.image]);

  useLayoutEffect(() => {
    fetchImage();
  }, [fetchImage]);
  return (
    <AnimatedPressable
      className="flex-1"
      onPress={() => onPress && image && onPress(image)}>
      <NumberBox
        pressed={isChecked}
        number={isChecked ? checkedIndex + 1 + '' : ''}
        className="absolute z-10 right-2 top-2"
      />
      {image &&
        (node.type === 'video' ? (
          <Video
            style={{
              height: 120,
            }}
            muted
            allowsExternalPlayback={false}
            repeat
            resizeMode="stretch"
            source={{
              uri: image.uri,
            }}
          />
        ) : (
          <Image source={{ uri: image.uri }} style={{ height: 120 }} />
        ))}

      {node.type === 'video' && (
        <Text className="absolute right-2 bottom-2 text-white text-xs font-medium font-pretendard">
          {formatTime(node.image.playableDuration)}
        </Text>
      )}
    </AnimatedPressable>
  );
};
