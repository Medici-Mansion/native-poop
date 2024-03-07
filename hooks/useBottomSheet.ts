import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';

export const useBottomSheet = () => {
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

  const snapPoints = useMemo(() => ['50%'], []);

  return {
    ref: sheetRef,
    showBottomSheet,
    hideBottomSheet,
    snapPoints,
    handleSheetChange,
  };
};
