import { ID, Response } from '../../../../../../../_metronic/helpers'

export type CarOutService = {
  id: number
  vehicles_id: string,
  start: string,
  end:string

}
export type CarOutServiceQueryResponse = Response<Array<CarOutService>>
export const initialCarServiceModel: CarOutService = {
  id: null,
  vehicles_id: null,
  start: null,
  end:null
}

