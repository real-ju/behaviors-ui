import type { UserState } from '#/store';

import { defineStore } from 'pinia';
import { store } from '@/store';
// import { login } from '@/api/auth';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    isLogin: true,
    user: null,
    token: null
  }),
  getters: {
    getUser(state) {
      return state.user || {};
    },
    getToken(state) {
      return state.token || '';
    }
  },
  actions: {
    async login(params: Recordable) {
      // const res = await login(params);
      // return res;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isLogin = false;
    }
  },
  persist: { key: 'pinia-persistedstate-user' }
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
