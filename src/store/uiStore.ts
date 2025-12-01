// src/store/uiStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Mode = 'light' | 'dark';

type UiState = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set({ mode: get().mode === 'dark' ? 'light' : 'dark' }),
    }),
    {
      name: 'whzan-ui-store',
    }
  )
);
