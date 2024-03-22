import { create } from "zustand";

interface Local {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useMenuStore = create<Local>((set, get) => {
  return {
    visible: false,
    setVisible: (visible: boolean) => {
      set({ visible })
    }
  }
})
