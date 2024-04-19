import { useHeaderHeight } from '@react-navigation/elements';
import { useFormContext } from 'houseform';
import { Text, View } from 'react-native';
import { UploadToonParam } from '../..';
import { useCallback, useLayoutEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { isValidVideo, showEditor } from 'react-native-video-trim';

export const EditImage = () => {
  const headerHeight = useHeaderHeight();
  const {
    value: { images },
  } = useFormContext<UploadToonParam>();

  const [idx, setIdx] = useState(0);

  const currentImage = images?.[idx];

  const handleShowCropVideo = useCallback(async () => {
    if (!currentImage) return;
    await isValidVideo(currentImage.uri);
    showEditor(currentImage?.uri, { maxDuration: 5 });
  }, [currentImage]);

  useLayoutEffect(() => {
    handleShowCropVideo();
  }, [currentImage, handleShowCropVideo]);
  return (
    <View style={{ paddingTop: headerHeight }} className="bg-gray-600 flex-1">
      <Text>Edit Image</Text>
    </View>
  );
};
