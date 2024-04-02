import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'

let id = 0
function createId() {
  id += 1
  return id
}
function create(attrs?: Partial<Item>): Item {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.datatype.number({ min: 99, max: 1000_00 }),
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

function createList(n: number, attrs?: Partial<Item>): Item[] {
  return Array.from({ length: n }).map(() => create(attrs))
}

function createResponse({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<Item>): Resources<Item> {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount
  return {
    resources: left > 0 ? createList(Math.min(left, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}

export const itemsMock: MockMethod = {
  url: '/api/v1/items',
  method: 'get',
  statusCode: 200, // statusCode >= 400时，就会返回错误res
  response: ({ query }: ResponseParams): Resources<Item> =>
    createResponse({ count: 30, perPage: 10, page: parseInt(query.page) }),
}
