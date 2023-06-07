/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {
  useQueryResponse,
  useQueryResponseData,
  useQueryResponseSetLoading,
} from '../../core/QueryResponseProvider'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {useAuth} from '../../../../../../auth'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components/MenuComponent'
import {optionAlertConfirm} from '../../../../../../../../_metronic/helpers/crud-helper/helpers'
import {QUERIES} from '../../../../../../../../_metronic/helpers/crud-helper/consts'
import {DriverStatus, TripDriver} from '../../../../core/Model'
import {EndTrip, StartTrip} from '../../../../core/request'

type Props = {
  data: TripDriver
}

const ActionsCell: FC<Props> = ({data}) => {
  const navigate = useNavigate()
  const setLoading = useQueryResponseSetLoading()
  const {query} = useQueryResponse()
  const items = useQueryResponseData()
  const queryClient = useQueryClient()
  const {currentUser} = useAuth()
  const intl = useIntl()
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const handleStart = () => {
    Swal.fire({
      ...optionAlertConfirm,
      text: 'Once started, you will not be able to recover',
      confirmButtonText: 'Yes, start it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        startItem.mutateAsync()
      }
    })
  }
  const startItem = useMutation(() => StartTrip(data?.id), {
    onSuccess: () => {
      setLoading(false)
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.DRIVER_CURRENT_TRIP_LIST_VALUES}-${query}`])
    },
    onError: () => {
      setLoading(false)
    },
  })
  const handleEnd = () => {
    Swal.fire({
      ...optionAlertConfirm,
      text: 'Once ended, you will not be able to recover',
      confirmButtonText: 'Yes, end it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        endItem.mutateAsync()
      }
    })
  }
  const endItem = useMutation(() => EndTrip(data?.id), {
    onSuccess: () => {
      setLoading(false)
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.DRIVER_CURRENT_TRIP_LIST_VALUES}-${query}`])
    },
    onError: () => {
      setLoading(false)
    },
  })
  return (
    <>
      <div className='d-flex justify-content-end'>
        {data?.status == DriverStatus.in_Progress && (
          <button type='button' className='btn btn-danger py-2 px-2' onClick={handleStart}>
            <i className='bi bi-skip-end-fill fs-2'></i>
            {intl.formatMessage({id: 'start'})}
          </button>
        )}
        {data?.status == DriverStatus.done && (
          <button type='button' className='btn btn-danger py-2 px-2' onClick={handleEnd}>
            <i className='bi bi-x fs-2'></i>
            {intl.formatMessage({id: 'end'})}
          </button>
        )}
        {/* <button type='button' className='btn btn-danger py-2 px-2' onClick={() => {}}>
          <i className='bi bi-skip-end-fill fs-2'></i>
          {intl.formatMessage({id: 'cancel'})}
        </button> */}
      </div>
    </>
  )
}

export {ActionsCell}
