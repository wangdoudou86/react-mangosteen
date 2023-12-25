import { create } from "zustand";

interface Local {
  hasReadWelcomes: boolean
  setHasReadWelcomes: (read: boolean) => void
}

const init = localStorage.getItem('hasReadWelcomes');
export const useLocalStore = create<Local>((set, get) => {
  return {
    hasReadWelcomes: init === 'yes', // 为什么用布尔值呢，因为万一用户自己把hasReadWelcomes填了其他值呢
    setHasReadWelcomes: (read: boolean) => {
      const result = read ? 'yes' : 'no'
      localStorage.setItem('hasReadWelcomes', result)
      set({ hasReadWelcomes: result === 'yes' })
    }
  }
})
