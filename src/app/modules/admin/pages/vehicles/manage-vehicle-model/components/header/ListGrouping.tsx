import { useQueryClient, useMutation } from 'react-query'
import { QUERIES, optionAlertConfirm } from '../../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { destroySelected } from '../../core/_requests'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { ListGroupingHoc } from '../../../../../components/table/header/ListGrouping'


const ListGrouping = () => {
  const [confirm, setConfirm] = useState(false);
  const { selected, clearSelected } = useListView()
  const queryClient = useQueryClient()
  const { query } = useQueryResponse()

  const deleteSelectedItems = useMutation(() => destroySelected(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.VEHICLES_MODELS}-${query}`])
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
