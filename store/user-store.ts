import { GetMeResponse } from '@/types/server/user/me';
import { create } from 'zustand';

interface User {
  user?: GetMeResponse | null;
  isLogin: boolean;
  login: (user: GetMeResponse) => void;
  logout: () => void;
}

export const useUserStore = create<User>(set => ({
  isLogin: false,
  user: null,
  login: (user: GetMeResponse) => {
    set(() => ({
      isLogin: true,
      user,
    }));
  },

  logout: () => {
    set(() => ({
      user: null,
      isLogin: false,
    }));
  },
}));
