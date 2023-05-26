/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, QUERIES, optionAlertConfirm} from '../../../../../../../../_metronic/helpers'
import {useQueryResponse, useQueryResponseData, useQueryResponseSetLoading} from '../../core/QueryResponseProvider'
import {destroy} from '../../core/_requests'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {ActionButton} from '../../../../../components/buttons/ActionButton'
import {MenuActionItem} from '../../../../../components/Menu/MenuActionItem'
import {MenuActionWrapper} from '../../../../../components/Menu/MenuActionWrapper'
import { EditWorkingCarspath } from '../../../routes/RoutesNames'
import { Terminal } from '../../core/_models'
type Props = {
  data: Terminal
}

const ActionsCell: FC<Props> = ({data}) => {
  const navigate = useNavigate()
  const setLoading= useQueryResponseSetLoading();
  const {query} = useQueryResponse()
  const items = useQueryResponseData()
  const queryClient = useQueryClient()
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleEdit = () => {
    const data = items.find((x) => x.id == data?.id)
    navigate(EditWorkingCarspath, {state: data})
  }

  const handleDelete = () => {
    Swal.fire({...optionAlertConfirm}).then((result) => {
      if (result.isConfirmed) {
       // setLoading(true)
       // deleteItem.mutateAsync()
      }
    })
  }
  const deleteItem = useMutation(() => destroy(data?.id), {
    onSuccess: () => {
      setLoading(false)
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.VEHICLES_COLORS}-${query}`])
    },
    onError: () => {
      setLoading(false)
    },
  })
  const handleMap = () => {
    navigate('/terminal', {state: data?.id})
  }
  return (
    <>
      <ActionButton />
      {/* begin::Menu */}
      <MenuActionWrapper>
        <MenuActionItem title={intl.formatMessage({id: 'edit'})} onCLick={handleEdit} />

        <MenuActionItem title={intl.formatMessage({id: 'delete'})} onCLick={handleDelete}  />

    {   data?.permissions.map(x=>x.code).includes('View_Terminal_Account') &&  <MenuActionItem title={intl.formatMessage({id: 'move_to_map'})} onCLick={handleMap} />}
      </MenuActionWrapper>
      {/* end::Menu */}
    </>
  )
}

export {ActionsCell}
