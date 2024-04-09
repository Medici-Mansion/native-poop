import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';

interface ContentImage {
  filename: string | null;
  filepath: string | null;
  extension: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
  orientation: number | null;
}

export async function getImageData(
  content: ContentImage,
): Promise<ContentImage> {
  switch (Platform.OS) {
    case 'ios':
      const iosFile = await CameraRoll.iosGetImageDataById(content.uri);
      return iosFile.node.image;
    case 'android':
      const androidFile = await RNFS.stat(content.uri);
      return { ...content, uri: `file://${androidFile.originalFilepath}` };
    default:
      throw new Error('Not Support.');
  }
}
