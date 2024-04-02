import styled from 'styled-components'
import { useState } from 'react'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TimeRangePicker } from '../../components/TimeRangePicker/TimeRangePicker'
import { TopNav } from '../../components/TopNav'
import type { TimeRange } from '../../components/TimeRangePicker/TimeRangePicker'
import { TopMenu } from '../../components/TopMenu/TopMenu';
import { useMenuStore } from '../../stores/useMenuStore'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'

const Div = styled.div`
  background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </Div>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />
    </div>
  )
}
