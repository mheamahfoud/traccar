
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { ID, KTIcon, QUERIES, optionAlertConfirm } from '../../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { useQueryResponse, useQueryResponseData } from '../../core/QueryResponseProvider'
import { destroy } from '../../core/_requests'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { EditMakerPath, EditModelPath,  } from '../../../routes/RoutesNames'
import { useIntl } from 'react-intl'
type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const { setItemIdForUpdate } = useListView()
  const { query } = useQueryResponse()
  const items = useQueryResponseData()
  const queryClient = useQueryClient()
  const intl = useIntl();
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleEdit = () => {
    const data = items.find(x=>x.id==id);
    navigate(EditModelPath,{ state: data })
  }

  const handleDelete = () => {
    Swal.fire(
      { ...optionAlertConfirm }
    ).then((result) => {
      if (result.isConfirmed) {
        deleteItem.mutateAsync()
      }
    });
  }
  const deleteItem = useMutation(() => destroy(id), {
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.VEHICLES_TYPES}-${query}`])
    },
    onError: () => {

    }
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTIcon iconName='down' className='fs-5 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={handleEdit}>
            {
              intl.formatMessage({ id: 'edit' })
            }
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            //onClick={async () => await deleteItem.mutateAsync()}
            onClick={handleDelete}
          >
            {
              intl.formatMessage({ id: 'delete' })
            }

          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export { ActionsCell }
