import { defineStore } from 'pinia';

export const useStoreStatus = defineStore('status', {
  state: () => ({
    isModalOpen: false,
  }),
});
