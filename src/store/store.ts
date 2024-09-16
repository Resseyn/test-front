import { create } from "zustand";

interface NameState {
  name: string;
  setName: (name: string) => void;
}

export const useNameStore = create<NameState>((set) => ({
  name: "",
  setName: (name: string) => {
    set({ name });
  },
}));
