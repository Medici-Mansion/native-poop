import {
  CameraRoll,
  PhotoIdentifier,
  cameraRollEventEmitter,
} from '@react-native-camera-roll/camera-roll';

import { useCallback, useEffect, useState } from 'react';

import { AppState, EmitterSubscription, Platform } from 'react-native';

interface GalleryOptions {
  pageSize?: number;
  mimeTypeFilter?: Array<string>;
}

interface GalleryLogic {
  photos?: PhotoIdentifier[];
  loadNextPagePictures: () => void;
  isLoading: boolean;
  isLoadingNextPage: boolean;
  isReloading: boolean;
  hasNextPage: boolean;
}

export const useGallery = ({ pageSize = 30 }: GalleryOptions): GalleryLogic => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string>();
  const [photos, setPhotos] = useState<PhotoIdentifier[]>();
  const isAboveIOS14 =
    Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 14;

  const loadNextPagePictures = useCallback(async () => {
    if (isLoading || isLoadingNextPage) return;
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true);
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: 'All',
        include: [
          'fileExtension',
          'sourceType',
          'playableDuration',
          ...(Platform.OS === 'android'
            ? (['fileSize', 'filename'] as const)
            : []),
        ],
      });

      setPhotos(prev => [...(prev ?? []), ...edges]);

      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('useGallery getPhotos error:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingNextPage(false);
    }
  }, [isLoading, isLoadingNextPage, nextCursor, pageSize]);

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true);
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: !photos || photos.length < pageSize ? pageSize : photos.length,
        assetType: 'All',
        include: [
          'fileExtension',
          'sourceType',
          'playableDuration',
          ...(Platform.OS === 'android'
            ? (['fileSize', 'filename'] as const)
            : []),
        ],
      });

      setPhotos(edges);

      setNextCursor(page_info.end_cursor);
      setHasNextPage(page_info.has_next_page);
    } catch (error) {
      console.error('useGallery getNewPhotos error:', error);
    } finally {
      setIsReloading(false);
    }
  }, [pageSize, photos]);

  useEffect(() => {
    if (!photos) {
      loadNextPagePictures();
    }
  }, [loadNextPagePictures]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'active') {
          getUnloadedPictures();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [getUnloadedPictures]);

  useEffect(() => {
    let subscription: EmitterSubscription;
    if (isAboveIOS14) {
      subscription = cameraRollEventEmitter.addListener(
        'onLibrarySelectionChange',
        _event => {
          getUnloadedPictures();
        },
      );
    }

    return () => {
      if (isAboveIOS14 && subscription) {
        subscription.remove();
      }
    };
  }, [getUnloadedPictures, isAboveIOS14]);

  return {
    photos,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
  };
};
