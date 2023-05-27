import { KTCard, KTCardBody, } from '../../../../../../_metronic/helpers'
import { ListHeader } from './components/header/ListHeader'
import { ListViewProvider, useListView, } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider, useQueryResponseLoading, } from './core/QueryResponseProvider'
import { ListLoading } from '../../../components/table/loading/ListLoading'
import { MYCalendar } from './calendar'
import { ModalView } from './components/event-modal/ModalView'



const List = () => {
  const isLoading = useQueryResponseLoading();
  const { itemIdForUpdate } = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <KTCardBody className='py-4'>
          <MYCalendar />
          {isLoading && <ListLoading />}
        </KTCardBody>
        {itemIdForUpdate !== undefined && <ModalView />}
      </KTCard>


    </>
  )
}

const ManageWorkingCarsDaysWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <List />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { ManageWorkingCarsDaysWrapper }
