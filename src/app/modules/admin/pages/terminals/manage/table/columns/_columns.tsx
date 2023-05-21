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
    Header: (props) => <CustomHeader<VehicleColor> tableProps={props} title={'#'} className='min-w-125px' />,
    accessor: 'id',
  },

 
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='name' />} className='min-w-125px' />,
    accessor: 'name',
  },
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='email' />} className='min-w-125px' />,
    accessor: 'email',
  },
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='password' />} className='min-w-125px' />,
    accessor: 'mypassword',
  },
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='station' />} className='min-w-125px' />,
    accessor: 'station',
  },
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='longitude' />} className='min-w-125px' />,
    accessor: 'longitude',
  },
  {
    Header: (props) => <CustomHeader<VehicleColor>  tableProps={props} title={<Localize value='latitude' />} className='min-w-125px' />,
    accessor: 'latitude',
  },
  {
    Header: (props) => (
      <CustomHeader<VehicleColor>  tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {columnsTable}


