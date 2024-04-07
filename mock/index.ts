import type { MockMethod } from 'vite-plugin-mock'
import { itemsMock } from './items.mock'
import { meMock } from './me.mock'
import { sessionMock } from './session.mock'
export default [
  itemsMock,
  meMock,
  sessionMock
] as MockMethod[]
