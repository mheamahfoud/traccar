// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import {Trip} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
const columnsTable :  ReadonlyArray<Column<Trip>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<Trip> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },

 
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='date' />} className='min-w-125px' />,
    accessor: 'date',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='fromGroup' />} className='min-w-125px' />,
    accessor: 'fromGroup',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='fromBuilding' />} className='min-w-125px' />,
    accessor: 'fromBuilding',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='region' />} className='min-w-125px' />,
    accessor: 'region',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='toGroup' />} className='min-w-125px' />,
    accessor: 'toGroup',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='toBuilding' />} className='min-w-125px' />,
    accessor: 'toBuilding',
  },
  {
    Header: (props) => <CustomHeader<Trip>  tableProps={props} title={<Localize value='count' />} className='min-w-125px' />,
    accessor: 'count',
  },
  {
    Header: (props) => (
      <CustomHeader<VehicleColor>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell data={props.data[props.row.index]} />,
  },
]

export {columnsTable}


