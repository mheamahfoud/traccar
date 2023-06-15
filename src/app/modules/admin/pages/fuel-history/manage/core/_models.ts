import { ID, Response } from '../../../../../../../_metronic/helpers'
export type FuelHistory = {
  id: number
  vehicles_id: string,
  date: string,
  qty:string,
  cost_per_unit:string,
  consumption:string,
  image:string,
  province:string,
  start_meter:string,
  end_meter:string
  vehicle_data:any
}
export type FuelHistoryQueryResponse = Response<Array<FuelHistory>>

export type CarOutService = {
  id: number
  vehicles_id: string,
  start: string,
  end:string

}
export const initialCarServiceModel: CarOutService = {
  id: null,
  vehicles_id: null,
  start: null,
  end:null
}

