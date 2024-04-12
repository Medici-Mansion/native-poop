import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export interface ContentImage {
  filename: string | null;
  filepath: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
}

export async function getImageData(
  content: ContentImage,
): Promise<ContentImage> {
  switch (Platform.OS) {
    case 'ios':
      const iosFile = await CameraRoll.iosGetImageDataById(content.uri);
      return { ...iosFile.node.image, uri: iosFile.node.image.filepath! };
    case 'android':
      const androidFile = await RNFS.stat(content.uri);
      return { ...content, uri: `file://${androidFile.originalFilepath}` };
    default:
      throw new Error('Not Support.');
  }
}
