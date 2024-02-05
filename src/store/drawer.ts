import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useDrawerStore = create<DrawerStore>()((set) => ({
  isOpen: false,
  setIsOpen: (data) => set({ isOpen: data }),
}));
