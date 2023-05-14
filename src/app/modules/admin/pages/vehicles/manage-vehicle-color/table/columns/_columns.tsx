// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import {VehicleColor} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
const columnsTable :  ReadonlyArray<Column<VehicleColor>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<VehicleType> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },

  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='color' />} className='min-w-125px' />,
    accessor: 'color',
  },

 
  
  {
    Header: (props) => (
      <CustomHeader<VehicleType>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {columnsTable}


