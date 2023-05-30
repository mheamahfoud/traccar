// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {SelectionCell} from './SelectionCell'
import {SelectionHeader} from './SelectionHeader'
import { CustomHeader } from './CustomHeader'
import {TripReport} from '../../core/_models'
import { Localize } from '../../../../../../../../_metronic/i18n/Localize';








const columnsTable :  ReadonlyArray<Column<TripReport>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader<TripReport> tableProps={props} title={<Localize value='startTime' />} className='min-w-125px' />,
    accessor: 'startTime',
  },
  {
    Header: (props) => <CustomHeader<TripReport> tableProps={props} title={<Localize value='endTime' />} className='min-w-125px' />,
    accessor: 'endTime',
  },
 
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='endOdometer' />} className='min-w-125px' />,
    accessor: 'endOdometer',
  },
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='distance' />} className='min-w-125px' />,
    accessor: 'distance',
  },
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='averageSpeed' />} className='min-w-125px' />,
    accessor: 'averageSpeed',
  },

  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='startAddress' />} className='min-w-125px' />,
    accessor: 'startAddress',
  },
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='startOdometer' />} className='min-w-125px' />,
    accessor: 'startOdometer',
  },


  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='maxSpeed' />} className='min-w-125px' />,
    accessor: 'maxSpeed',
  },
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='duration' />} className='min-w-125px' />,
    accessor: 'duration',
  },
  {
    Header: (props) => <CustomHeader<TripReport>  tableProps={props} title={<Localize value='spentFuel' />} className='min-w-125px' />,
    accessor: 'spentFuel',
  },

 
]

export {columnsTable}


