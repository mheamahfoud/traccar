import {useQuery} from 'react-query'
import {ModalForm} from './ModalForm'

import {useListView} from '../core/ListViewProvider'
import {getEventDetail} from '../core/_requests'
import { QUERIES, isNotEmpty } from '../../../../../../../_metronic/helpers'
import { Spinner } from '../../../../components/Spinner'

const ModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data,
    error,
  } = useQuery(
    `${QUERIES.WORKING_CARS_DAYS_LIST_VALUES}-car-${itemIdForUpdate}`,
    () => {
      return getEventDetail(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )



  if (!isLoading && !error && data) {
    return <ModalForm isLoading={isLoading} data={data} />
  }
  else{
    return <Spinner/>
  }
  return null
}

export {ModalFormWrapper}
