import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from 'react-native';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ForwardedRef } from 'react';

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

export function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // 시간, 분, 초 문자열 생성, 분이 0이어도 "00"으로 표시
  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
  const formattedMinutes = String(minutes).padStart(2, '0') + ':';
  const formattedSeconds = String(Math.round(remainingSeconds)).padStart(
    2,
    '0',
  );

  const formattedTimeString =
    formattedHours + formattedMinutes + formattedSeconds;

  return formattedTimeString.includes('NaN') ? '' : formattedTimeString;
};
