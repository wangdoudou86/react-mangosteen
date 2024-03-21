import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import p from '../assets/images/pig.svg'
import { ajax } from '../lib/ajax'
import { useTitle } from '../hooks/useTitle';
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'

interface Props {
  title?: string
}
export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async (path) => {
    return (await ajax.get<Resource<User>>(path)).data.resource
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async (path) => {
    return (await ajax.get<Resources<Item>>(path)).data
  })
  console.log(meData, 'meData')
  console.log(meError, 'meError')
  console.log(itemsData, 'itemsData')
  console.log(itemsError, 'itemsError')

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <Loading className="h-screen" />
  }

  // itemsData?.resources?.[0] 等同于判断 itemsData?.resources?.length && itemsData?.resources.length > 0
  if (itemsData?.resources?.[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="128" height="130" src={p} />
    </div>
    <div px-16px>
      <button d-btn >开始记账</button>
    </div>
    <AddItemFloatButton />
  </div>
}
