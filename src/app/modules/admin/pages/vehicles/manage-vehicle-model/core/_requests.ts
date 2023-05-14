
import axios, { AxiosResponse } from 'axios'
import { ConvertStringToObject, ID, ResponeApiCheck, } from '../../../../../../../_metronic/helpers'
import {  VehicleModel, VehicleModelQueryResponse } from './_models'
const getList = (query: string, page: number): Promise<VehicleModelQueryResponse> => {
  return axios
    .post(`list_vehicles_model?${'page=' + page}`, {
      ...ConvertStringToObject(query)
    })
    .then((d: any) => {
      return {
        data: d.data?.data?.data,
        payload: {
          pagination: {
            page_num: d.data?.data?.current_page,
            page_size: d.data?.data?.per_page,
            links: d.data?.data?.links
          }
        }
      }
    })
}

const create = (object: VehicleModel) => {
  return axios
    .post('store_vehicle_model', object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  //.then((response: Response<VehicleType>) => response.data)
}

const update = (object: VehicleModel) => {
  return axios.post(`update_vehicle_model/${object.id}`, object)
    .then((response: AxiosResponse<ResponeApiCheck>) => response.data)
  // .then((response: ResponeApiCheck) => response)
}


const destroy = (id: ID): Promise<void> => {
  return axios.post(`${'destroy_vehicle_model'}/${id}`).then(() => { })
}

const destroySelected = (selectedIds: Array<ID>): Promise<void> => {
  const requests = selectedIds.map((id) => axios.post(`${'destroy_vehicle_model'}/${id}`))
  return axios.all(requests).then(() => { })
}

export { getList, destroy, destroySelected, create, update }
