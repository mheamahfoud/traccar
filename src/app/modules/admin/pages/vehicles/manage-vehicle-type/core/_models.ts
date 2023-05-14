
import { ID, Response } from '../../../../../../../_metronic/helpers'

export type VehicleType = {
  id: number
  vehicletype?: string
  displayname?: string
  icon?: string | null
  isenable?: boolean
  seats?: number,
}




export type VehicleTypeQueryResponse = Response<Array<VehicleType>>




export const initialVehicleType: VehicleType = {
  id: null,
  vehicletype: null,
  displayname: null,
  icon: null,
  isenable: false,
  seats: null,
}




