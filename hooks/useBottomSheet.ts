import BottomSheet from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';

export const useBottomSheet = (snapPoint: string) => {
  const sheetRef = useRef<BottomSheet>(null);

  const handleSheetChange = useCallback(() => {
    console.log('handleSheetChange', 0);
  }, []);

  const showBottomSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const hideBottomSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => [snapPoint], []);

  return {
    ref: sheetRef,
    showBottomSheet,
    hideBottomSheet,
    snapPoints,
    handleSheetChange,
  };
};
