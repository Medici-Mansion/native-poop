import { create } from 'zustand';
interface ImageStore {
  image?: string;
  setImage: (image: string) => void;
}

/**
 * 이미지 전송용 테스트 스토어입니다.
 * 확인 후 적절한 로직으로 변경하여 해당 스토어 삭제 바랍니다.
 * @deprecated
 */
export const useImageStore = create<ImageStore>(set => ({
  image: '',
  setImage(image) {
    set({ image });
  },
}));
