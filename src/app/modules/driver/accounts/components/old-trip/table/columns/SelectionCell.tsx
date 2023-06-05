import { FC, useMemo } from 'react'

import { useListView } from '../../core/ListViewProvider'
import SelectionHoc from '../../../../../../../../_metronic/helpers/components/table/columns/SelectionHoc'
import { ID } from '../../../../../../../../_metronic/helpers/crud-helper/models'


type Props = {
  id: ID
}

const SelectionCell: FC<Props> = ({ id }) => {
  const { selected, onSelect } = useListView()
  const isSelected = useMemo(() => selected.includes(id), [id, selected])
  return (
    <SelectionHoc isSelected={isSelected} onClick={() => {
      onSelect(id)
    }} />

  )
}

export { SelectionCell }
