import {useListView} from '../../core/ListViewProvider'
import {ListToolbar} from './ListToolbar'
import {ListGrouping} from './ListGrouping'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { InputFilterSearch } from '../../../../../components/fields/inputFilterSearch'


const ListHeader = () => {
  const {selected} = useListView();
  const {updateState} = useQueryRequest()
  return (
    <div className='card-header border-0 pt-6 d-flex -justify-content-end'>
      {/* <InputFilterSearch updateState={updateState}  /> */}
      {/* <ListSearchComponent /> */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
      <ListToolbar />
        {/* begin::Group actions */}
        {/* {selected.length > 0 ? <ListGrouping /> : <ListToolbar />} */}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ListHeader}
