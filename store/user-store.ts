import {create} from 'zustand';

interface User {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<User>(set => ({
  isLogin: true,

  login: () => {
    set(state => ({
      isLogin: true,
    }));
  },

  logout: () => {
    set(state => ({
      isLogin: false,
    }));
  },
}));
