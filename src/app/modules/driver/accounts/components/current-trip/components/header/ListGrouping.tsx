import { useQueryClient, useMutation } from 'react-query'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { destroySelectedItems } from '../../core/_requests'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { optionAlertConfirm } from '../../../../../../../../_metronic/helpers/crud-helper/helpers'
import { QUERIES } from '../../../../../../../../_metronic/helpers/crud-helper/consts'
import { ListGroupingHoc } from '../../../../../../../../_metronic/helpers/components/table/header/ListGrouping'



const ListGrouping = () => {
  const [confirm, setConfirm] = useState(false);
  const { selected, clearSelected } = useListView()
  const queryClient = useQueryClient()
  const { query } = useQueryResponse()

  const deleteSelectedItems = useMutation(() => destroySelectedItems(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.VEHICLES_COLORS}-${query}`])
      clearSelected()
      setConfirm(false)
    },
    onError: () => {
      setConfirm(false)
    }
  })
  const handleDelete = () => {
    Swal.fire(
      { ...optionAlertConfirm }
    ).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedItems.mutateAsync()
      }
    });
  }

  return (
    <ListGroupingHoc selected={selected} onclick={handleDelete} />
  )
}

export { ListGrouping }
