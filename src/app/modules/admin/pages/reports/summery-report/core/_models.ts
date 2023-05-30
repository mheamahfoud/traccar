import {ID, Response} from '../../../../../../../_metronic/helpers'

export type TripReport = {
  id: number
  startTime: string,
  endTime: string,
  distance: string,
  averageSpeed:string,
  endOdometer:string,
  startAddress:string,
  startOdometer:string,
  maxSpeed:string,
  duration:string,
  spentFuel:string,
}

export type TripReportQueryResponse = Response<Array<TripReport>>


