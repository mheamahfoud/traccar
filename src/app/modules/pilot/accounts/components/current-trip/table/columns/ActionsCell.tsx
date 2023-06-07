/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
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
import {PilotrStatus, TripDriver} from '../../../../core/Model'
import {cancelTrip, startTrip} from '../../../../core/request'
import { InputSelectFilter } from '../../../../../../admin/components/fields/inputSelectFilter'
import { getReasonCancelList } from '../../../../../../admin/pages/core/commonRequests'

type Props = {
  data: TripDriver
}

const ActionsCell: FC<Props> = ({data}) => {

  const [enableApi, setEnableApi] = useState(false)

  const {
    data: options,
  } = useQuery(
    `${QUERIES.ALL_Vehicle_LIST_VALUES}-${enableApi}`,
    () => {
      return getReasonCancelList()
    },
    {
      enabled: enableApi
    }
  )

  
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
  const startItem = useMutation(() => cancelTrip(data?.id), {
    onSuccess: () => {
      setLoading(false)
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.DRIVER_CURRENT_TRIP_LIST_VALUES}-${query}`])
    },
    onError: () => {
      setLoading(false)
    },
  })
  const transformOptionsForSweetAlert = (options) => {
    const transformedOptions = {}
    transformedOptions['']="Select Value"
    options.forEach((option) => {
      transformedOptions[option.value] = option.text;
    });
    return transformedOptions;
  };
  const handleEnd = () => {
    setEnableApi(true)
    Swal.fire({
      title: 'Reason',
      input: 'select',
      showCancelButton: true,
      inputOptions: transformOptionsForSweetAlert(options)||[],
      ...optionAlertConfirm,
      text:'',
      confirmButtonText: 'Yes, cancel it!',
      inputValidator: (value) => {
        if (!value) {
          return 'You must select an option!';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedValue = result.value;
        endItem.mutateAsync(selectedValue)
        setLoading(true)
        setEnableApi(false)
     
      }
    })
  }
  const endItem = useMutation((selectedValue : number) => cancelTrip({reason:selectedValue,path_id:data?.id}), {
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
        {data?.status == PilotrStatus.in_Progress && (
          <button type='button' className='btn btn-danger py-2 px-2' onClick={handleEnd}>
            <i className='bi bi-x fs-2'></i>
            {intl.formatMessage({id: 'cencel'})}
          </button>
        )}
      </div>
    </>
  )
}

export {ActionsCell}
