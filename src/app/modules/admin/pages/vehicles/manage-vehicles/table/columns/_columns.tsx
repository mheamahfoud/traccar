// @ts-nocheck
import {Column} from 'react-table'
import {EnableCell} from './EnableCell'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import { IconCell } from './IconCell'
import {VehicleType} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize'
const columnsTable :  ReadonlyArray<Column<VehicleType>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<VehicleType> tableProps={props} title={'#'} className='min-w-80px' />,
    accessor: 'id',
  },
  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='make' />} className='min-w-125px' />,
    accessor: 'make',
  },
  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='model' />} className='min-w-100px' />,
    accessor: 'model',
  },
  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='type' />} className='min-w-100px' />,
    accessor: 'type_id',
  },

  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='color' />} className='min-w-100px' />,
    accessor: 'color',
  },

  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='license_plate' />} className='min-w-125px' />,
    accessor: 'license_plate',
  },


  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='gps_code' />} className='min-w-100px' />,
    accessor: 'gps_code',
  },


  {
    Header: (props) => <CustomHeader<VehicleType>  tableProps={props} title={<Localize value='group' />} className='min-w-100px' />,
    accessor: 'group',
  },




  {
    Header: (props) => (
      <CustomHeader<VehicleType>  tableProps={props} title= {<Localize value='in_service' /> }   className='min-w-100px' />
    ),
    id: 'in_service',
    Cell: ({...props}) => <EnableCell isenable={props.data[props.row.index].isenable} />,
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


