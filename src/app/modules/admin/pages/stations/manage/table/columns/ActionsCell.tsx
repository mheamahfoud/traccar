/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useContext, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {useDispatch} from 'react-redux'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, KTIcon, QUERIES, optionAlertConfirm} from '../../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseSetLoading,
} from '../../core/QueryResponseProvider'
//import { destroy } from '../../core/_requests'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {EditPath, MapPath, PermissionPath} from '../../../routes/RoutesNames'
import {useIntl} from 'react-intl'
import {GetStationInfo} from '../../../../../../../../services/traccargps'
import {MenuActionWrapper} from '../../../../../components/Menu/MenuActionWrapper'
import {MenuActionItem} from '../../../../../components/Menu/MenuActionItem'
import {ActionButton} from '../../../../../components/buttons/ActionButton'
type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const setLoading = useQueryResponseSetLoading()
  const dispatch = useDispatch()
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
    navigate(EditPath, {state: data})
  }

  const handleDelete = () => {
    Swal.fire({...optionAlertConfirm}).then((result) => {
      if (result.isConfirmed) {
        //    deleteItem.mutateAsync()
      }
    })
  }


  // const deleteItem = useMutation(() => destroy(id), {
  //   onSuccess: () => {
  //     // ✅ update detail view directly
  //     queryClient.invalidateQueries([`${QUERIES.VEHICLES_COLORS}-${query}`])
  //   },
  //   onError: () => {

  //   }
  // })
  const handleMap = () => {
    navigate(MapPath, {state: id})
  }

  const handlePermission = () => {
    navigate(PermissionPath, {state: id})
  }



  return (
    <>
      <ActionButton />
      {/* begin::Menu */}
      <MenuActionWrapper>
        <MenuActionItem title={intl.formatMessage({id: 'edit'})} onCLick={handleEdit} />

        <MenuActionItem title={intl.formatMessage({id: 'move_Map'})} onCLick={handleMap} />
        <MenuActionItem title={intl.formatMessage({id: 'permissions'})} onCLick={handlePermission} />
        <MenuActionItem title={intl.formatMessage({id: 'delete'})} onCLick={handleDelete} />
      </MenuActionWrapper>
      {/* end::Menu */}
    </>
  )
}

export {ActionsCell}
