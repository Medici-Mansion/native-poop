import { useHeaderHeight } from '@react-navigation/elements';
import { Text, View } from 'react-native';
import { FieldArray, useFieldArrayContext } from 'houseform';
import NumberBox from '@/components/ui/number-box';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import { ContentImage, formatTime, getImageData } from '@/lib/utils';
import { useGallery } from '@/hooks/useCameraRoll';
import Video from 'react-native-video';
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll';
import { memo, useCallback, useLayoutEffect, useState } from 'react';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
export const UploadImage = () => {
  const headerHeight = useHeaderHeight();

  const { loadNextPagePictures, photos, hasNextPage } = useGallery({
    pageSize: 20,
  });

  const _renderItem = useCallback(
    (info: ListRenderItemInfo<PhotoIdentifier>) => (
      <UploadImageRenderItem {...info} />
    ),
    [],
  );

  const _keyExtractor = useCallback(
    (item: PhotoIdentifier) => item.node.id,
    [],
  );

  return (
    <FieldArray name="images">
      {() => (
        <View
          style={{ paddingTop: headerHeight }}
          className="bg-gray-600 flex-1">
          <View style={{ flex: 1 }}>
            <FlashList
              data={photos}
              removeClippedSubviews
              estimatedItemSize={200}
              ListHeaderComponent={<View className="mt-8 h-9 mb-4" />}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (hasNextPage) {
                  loadNextPagePictures();
                }
              }}
              style={{ gap: 2 }}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
              numColumns={3}
            />
          </View>
        </View>
      )}
    </FieldArray>
  );
};

const UploadImageRenderItem = memo(
  ({ item, index }: ListRenderItemInfo<PhotoIdentifier>) => {
    const { node } = item;
    const { value, remove, add } = useFieldArrayContext<any>();
    const checkedIndex = value.findIndex(v => v.id === `${node.id}-${index}`);
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
        className="flex-1 p-[1]"
        onPress={() => {
          if (!image) return;
          if (isChecked) {
            remove(checkedIndex);
            return;
          }

          add({
            id: `${node.id}-${index}`,
            uri: image.filepath,
            type: node.type,
            duration: image.playableDuration,
          });
        }}>
        <NumberBox
          pressed={isChecked}
          number={isChecked ? checkedIndex + 1 + '' : ''}
          className="absolute z-10 right-2 top-2"
        />
        {image &&
          (node.type === 'video' ? (
            <Video
              style={{
                aspectRatio: 1 / 1,
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
            <FastImage
              source={{ uri: image.uri, priority: FastImage.priority.normal }}
              resizeMode={FastImage.resizeMode.cover}
              style={{ aspectRatio: 1 / 1 }}
            />
          ))}

        {node.type === 'video' && (
          <Text className="absolute right-2 bottom-2 text-white text-xs font-medium font-pretendard">
            {formatTime(node.image.playableDuration)}
          </Text>
        )}
      </AnimatedPressable>
    );
  },
);
