/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, KTIcon, QUERIES, optionAlertConfirm} from '../../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse, useQueryResponseData} from '../../core/QueryResponseProvider'
import {destroy, getAccountCar} from '../../core/_requests'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {
  AccountVehiclesPath,
  EditMakerPath,
  EditModelPath,
  EditVehiclesPath,
  ViewVehiclesPath,
} from '../../../routes/RoutesNames'
import {useIntl} from 'react-intl'
import {ActionButton} from '../../../../../components/buttons/ActionButton'
import {MenuActionItem} from '../../../../../components/Menu/MenuActionItem'
import {MenuActionWrapper} from '../../../../../components/Menu/MenuActionWrapper'
type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const navigate = useNavigate()
  const {setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const items = useQueryResponseData()
  const queryClient = useQueryClient()
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleEdit = () => {
    const data = items.find((x) => x.id == id)
    navigate(EditVehiclesPath, {state: data})
  }

  const handleDelete = () => {
    Swal.fire({...optionAlertConfirm}).then((result) => {
      if (result.isConfirmed) {
        deleteItem.mutateAsync()
      }
    })
  }
  const deleteItem = useMutation(() => destroy(id), {
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.VEHICLES_TYPES}-${query}`])
    },
    onError: () => {},
  })

  const handleAccount = async () => {
    navigate(AccountVehiclesPath, {state: id})
  }
  const handleView = () => {
    navigate(ViewVehiclesPath, {state: id})
  }
  return (
    <>
      <ActionButton />
      <MenuActionWrapper>
        <MenuActionItem title={intl.formatMessage({id: 'edit'})} onCLick={handleEdit} />
        <MenuActionItem title={intl.formatMessage({id: 'account'})} onCLick={handleAccount} />
        <MenuActionItem title={intl.formatMessage({id: 'edit'})} onCLick={handleEdit} />
        <MenuActionItem title={intl.formatMessage({id: 'view'})} onCLick={handleView} />
      </MenuActionWrapper>
    </>
  )
}

export {ActionsCell}
