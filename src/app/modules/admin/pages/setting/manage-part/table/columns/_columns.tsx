// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import {Part} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
import { EnableCell } from '../../../../../components/table/columns/EnableCell'


const columnsTable :  ReadonlyArray<Column<Part>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<Part> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },
  {
    Header: (props) => <CustomHeader<Part>  tableProps={props} title={<Localize value='ads' />} className='min-w-125px' />,
    accessor: 'ads_id',
  },
  {
    Header: (props) => <CustomHeader<Part>  tableProps={props} title={<Localize value='name' />} className='min-w-125px' />,
    accessor: 'name',
  },

  {
    Header: (props) => <CustomHeader<Part>  tableProps={props} title={<Localize value='maintenance' />} className='min-w-125px' />,
    id: 'maintenance',
    Cell: ({...props}) => <EnableCell isenable={props.data[props.row.index]?.maintenance} />,
  },

  
  {
    Header: (props) => (
      <CustomHeader<Part>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell data={props.data[props.row.index]} />,
  },
]

export {columnsTable}


