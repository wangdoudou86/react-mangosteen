import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
export default [
  itemsMock,
  meMock
] as MockMethod[]
