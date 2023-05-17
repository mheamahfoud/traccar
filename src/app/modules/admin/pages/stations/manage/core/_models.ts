import { ID, Response } from '../../../../../../../_metronic/helpers'

export type Station = {
  id: number,
  name:string,


}


export type StationQueryResponse = Response<Array<Station>>

export const initialVehicleModel: Station = {
  "id": null,
  "name": null
 
}




