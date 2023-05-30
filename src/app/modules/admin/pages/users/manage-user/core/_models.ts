import { ID, Response } from '../../../../../../../_metronic/helpers'

export type User = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  group_id:string



}


export type UserQueryResponse = Response<Array<User>>

export const initialVehicleModel: User = {
  "id": null,
  "name": null,
  "email": null,
  "created_at": null,
  "group_id":null

}




