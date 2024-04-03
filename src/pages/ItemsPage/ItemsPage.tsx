import { useState } from 'react'
import { AddItemFloatButton } from '../../components/AddItemFloatButton'
import { TimeRangePicker } from '../../components/TimeRangePicker/TimeRangePicker'
import { TopNav } from '../../components/TopNav'
import type { TimeRange } from '../../components/TimeRangePicker/TimeRangePicker'
import { TopMenu } from '../../components/TopMenu/TopMenu';
import { useMenuStore } from '../../stores/useMenuStore'
import { Icon } from '../../components/Icon/Icon'
import { Gradient } from '../../components/Gradient'
import { ItemsList } from './components/ItemsList'
import { ItemsSummary } from './components/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Gradient>
        <TopNav icon={<Icon name="menu" className="w-24px h-24px" onClick={() => { setVisible(!visible) }} />} />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </Gradient>
      <ItemsSummary />
      <ItemsList />
      <AddItemFloatButton />
      <TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />
    </div>
  )
}
