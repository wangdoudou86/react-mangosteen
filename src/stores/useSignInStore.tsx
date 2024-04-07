import { create } from "zustand";
import type { FormError } from "../lib/validate";

type Data = {
  email: string
  code: string
}

type SignIn = {
  data: Data
  setData: (data: Partial<Data>) => void
  error: FormError<Data>
  setError: (error: Partial<FormError<Data>>) => void
}

export const useSignInStore = create<SignIn>((set, get) => (
  {
    data: {
      email: '',
      code: ''
    },
    setData: (data: Partial<Data>) => {
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }))
    },
    error: {
      email: [],
      code: []
    },
    setError: (error: Partial<FormError<Data>>) => {
      set(state => ({
        ...state,
        error: {
          ...error
        }
      }))
    }
  }
))
