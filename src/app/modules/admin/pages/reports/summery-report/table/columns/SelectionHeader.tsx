import { FC, PropsWithChildren } from 'react'
import { HeaderProps } from 'react-table'
import { useListView } from '../../core/ListViewProvider'
import { SummeryReport } from '../../core/_models'
import SelectionHoc from '../../../../../components/table/columns/SelectionHoc'


type Props = {
  tableProps: PropsWithChildren<HeaderProps<SummeryReport>>
}

const SelectionHeader: FC<Props> = ({ tableProps }) => {
  const { isAllSelected, onSelectAll } = useListView()
  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>

      <SelectionHoc isSelected={isAllSelected} onClick={onSelectAll} />

    </th>
  )
}

export { SelectionHeader }
