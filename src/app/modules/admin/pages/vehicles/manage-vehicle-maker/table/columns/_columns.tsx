// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import { IconCell } from './IconCell'
import {VehicleMaker} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
const columnsTable :  ReadonlyArray<Column<VehicleMaker>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<VehicleMaker> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => <CustomHeader<VehicleMaker>  tableProps={props} title={<Localize value='picture' />} className='min-w-125px' />,
    id: 'image',
    Cell: ({...props}) => <IconCell icon={props.data[props.row.index].image} />,
  },

  {
    Header: (props) => <CustomHeader<VehicleMaker>  tableProps={props} title={<Localize value='make' />} className='min-w-125px' />,
    accessor: 'make',
  },
 
  
  {
    Header: (props) => (
      <CustomHeader<VehicleMaker>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {columnsTable}


