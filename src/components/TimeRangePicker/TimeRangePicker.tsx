import { Tabs } from '../Tabs/Tabs'
export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}
// 放在外面只初始化一次即可
const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: '本月' },
  { key: 'lastMonth', text: '上月' },
  { key: 'thisYear', text: '今年' },
  { key: 'custom', text: '自定义时间' },
]
export const TimeRangePicker: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
  )
}
