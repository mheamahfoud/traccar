// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import {User} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
import { CustomCellDate } from './CustomCellDate'
const columnsTable :  ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<User> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },

  {
    Header: (props) => <CustomHeader<User>  tableProps={props} title={<Localize value='name' />} className='min-w-125px' />,
    accessor: 'name',
  },

 
  {
    Header: (props) => <CustomHeader<User>  tableProps={props} title={<Localize value='email' />} className='min-w-125px' />,
    accessor: 'email',
  },
  {
    Header: (props) => <CustomHeader<User>  tableProps={props} title={<Localize value='created_at' />} className='min-w-125px' />,
    id: 'created_at',
    Cell: ({...props}) => <CustomCellDate date={props.data[props.row.index]?.created_at} />,
    
  },
  {
    Header: (props) => (
      <CustomHeader<User>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell data={props.data[props.row.index]} />,
  },
]

export {columnsTable}


